// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract ServiceContract {
    struct Service {
        string logo;
        string name;
        string category;
        string addressDetail;
        string phoneNumber;
        string email;
        uint256 cost;
        string currency;
        address owner;
    }

    struct Order {
        address user;
        uint256 serviceId;
        bool isCompleted;
        string serviceName;
        uint256 serviceCost;
        string serviceCurrency;
    }

    mapping(address => Service[]) public services;
    Order[] public orders;
    address[] public serviceProviders;
    uint256 public orderCount;

    event ServiceAdded(address indexed user, string name);
    event ServiceDeleted(address indexed user, string name);
    event OrderPlaced(address indexed user, uint256 serviceId, uint256 orderId);
    event OrderCompleted(uint256 orderId);

    function addService(
        string memory _logo,
        string memory _name,
        string memory _category,
        string memory _addressDetail,
        string memory _phoneNumber,
        string memory _email,
        uint256 _cost,
        string memory _currency
    ) public {
        require(bytes(_name).length > 0, "Service name required");
        require(bytes(_category).length > 0, "Service category required");
        require(bytes(_addressDetail).length > 0, "Address required");
        require(bytes(_phoneNumber).length > 0, "Phone number required");
        require(bytes(_email).length > 0, "Email required");
        require(_cost > 0, "Cost must be greater than zero");
        require(bytes(_currency).length > 0, "Currency required");

        Service memory newService = Service({
            logo: _logo,
            name: _name,
            category: _category,
            addressDetail: _addressDetail,
            phoneNumber: _phoneNumber,
            email: _email,
            cost: _cost,
            currency: _currency,
            owner: msg.sender
        });

        services[msg.sender].push(newService);
        if (services[msg.sender].length == 1) {
            serviceProviders.push(msg.sender);
        }
        emit ServiceAdded(msg.sender, _name);
    }

    function getServices(address _user) public view returns (Service[] memory) {
        return services[_user];
    }

    function deleteService(uint256 index) public {
        require(index < services[msg.sender].length, "Service index out of bounds");
        Service[] storage userServices = services[msg.sender];

        string memory serviceName = userServices[index].name;

        for (uint256 i = index; i < userServices.length - 1; i++) {
            userServices[i] = userServices[i + 1];
        }
        userServices.pop();
        emit ServiceDeleted(msg.sender, serviceName);
    }

    function getAllServices() public view returns (Service[] memory) {
        uint totalServices;
        for (uint i = 0; i < serviceProviders.length; i++) {
            totalServices += services[serviceProviders[i]].length;
        }

        Service[] memory allServices = new Service[](totalServices);
        uint counter = 0;
        for (uint i = 0; i < serviceProviders.length; i++) {
            for (uint j = 0; j < services[serviceProviders[i]].length; j++) {
                allServices[counter] = services[serviceProviders[i]][j];
                counter++;
            }
        }

        return allServices;
    }

    function placeOrder(uint256 serviceId) public payable {
        Service memory service = getServiceById(serviceId);

        orders.push(Order({
            user: msg.sender,
            serviceId: serviceId,
            isCompleted: false,
            serviceName: service.name,
            serviceCost: service.cost,
            serviceCurrency: service.currency 
        }));

        emit OrderPlaced(msg.sender, serviceId, orderCount);
        orderCount++;
    }

    function confirmOrder(uint256 orderId) public {
        Order storage order = orders[orderId];
        require(order.user == msg.sender, "Only the user who placed the order can confirm it");

        order.isCompleted = true;
        Service memory service = getServiceById(order.serviceId);
        payable(service.owner).transfer(service.cost);

        emit OrderCompleted(orderId);
    }

    function getServiceById(uint256 serviceId) public view returns (Service memory) {
        uint counter = 0;
        for (uint i = 0; i < serviceProviders.length; i++) {
            for (uint j = 0; j < services[serviceProviders[i]].length; j++) {
                if (counter == serviceId) {
                    return services[serviceProviders[i]][j];
                }
                counter++;
            }
        }
        revert("Service not found");
    }

    function getAllOrders() public view returns (Order[] memory) {
    Order[] memory allOrders = new Order[](orderCount);
    for (uint i = 0; i < orderCount; i++) {
        allOrders[i] = orders[i];
    }
        return allOrders;
    }

    function getOrdersByStatus(bool isCompleted) public view returns (Order[] memory) {
        uint count = 0;
        for (uint i = 0; i < orderCount; i++) {
            if (orders[i].isCompleted == isCompleted) {
                count++;
            }
        }

        Order[] memory filteredOrders = new Order[](count);
        uint index = 0;
        for (uint i = 0; i < orderCount; i++) {
            if (orders[i].isCompleted == isCompleted) {
                filteredOrders[index] = orders[i];
                index++;
            }
        }
        return filteredOrders;
    }
}
