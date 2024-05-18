// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;

    constructor() {
        owner = msg.sender; // Set the owner to the address that deploys the contract
    }

    // Modifier to restrict certain functions to only the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: caller is not the owner");
        _;
    }

    // Function to receive Ether, msg.data must be empty
    receive() external payable {}

    // Function to withdraw all Ether from this contract, restricted to owner
    function withdraw() public onlyOwner {
        uint amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    // Function to get the balance of the contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
