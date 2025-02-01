// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentGateway {
    address payable public recipient; // Wallet that receives the payments
    uint256 public constant MIN_PAYMENT = 1; // Minimum required payment (0.001 ether in wei)

    event PaymentReceived(address indexed sender, uint256 amount, uint256 timestamp);

    constructor(address payable _recipient) { // Constructor to set initial recipient
        require(_recipient != address(0), "Invalid recipient address");
        recipient = _recipient;
    }

    // Function to allow users to send ETH (minimum 0.001 ETH, no max limit)
    function pay() public payable {
        require(msg.value >= MIN_PAYMENT, "Amount must be at least 0.001 ETH");

        // Transfer funds to the recipient
        (bool success, ) = recipient.call{value: msg.value}(""); // Use call for better error handling
        require(success, "Transfer failed");

        // Emit event
        emit PaymentReceived(msg.sender, msg.value, block.timestamp);
    }

    // Function to check the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to update the recipient address (only current recipient can update)
    function updateRecipient(address payable newRecipient) public {
        require(msg.sender == recipient, "Only the recipient can update the address");
        require(newRecipient != address(0), "Invalid new recipient address");
        recipient = newRecipient;
    }
}