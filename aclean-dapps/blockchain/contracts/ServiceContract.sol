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
    }

    mapping(address => Service[]) public services;
    address[] public serviceProviders;

    event ServiceAdded(address indexed user, string name);
    event ServiceDeleted(address indexed user, string name);

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
            currency: _currency
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

        for (uint256 i = index; i < userServices.length - 1; i++) {
            userServices[i] = userServices[i + 1];
        }

        userServices.pop();
        emit ServiceDeleted(msg.sender, userServices[index].name);
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
}
