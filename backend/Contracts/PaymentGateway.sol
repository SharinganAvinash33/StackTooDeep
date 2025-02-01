// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentGateway is Ownable {
    address payable public recipient;
    uint256 public constant MIN_PAYMENT = 0.001 ether;

    event PaymentReceived(address indexed sender, uint256 amount, uint256 timestamp);

    constructor(address payable _recipient) {
        require(_recipient != address(0), "Invalid recipient address");
        recipient = _recipient;
    }

    function pay() public payable {
        require(msg.value >= MIN_PAYMENT, "Amount must be at least 0.001 ETH");

        (bool success, ) = recipient.call{value: msg.value}("");
        require(success, "Payment transfer failed");

        emit PaymentReceived(msg.sender, msg.value, block.timestamp);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function updateRecipient(address payable newRecipient) public onlyOwner {
        require(newRecipient != address(0), "Invalid new recipient address");
        recipient = newRecipient;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}