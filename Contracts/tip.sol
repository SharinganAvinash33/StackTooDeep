// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool); // Add this line
    function balanceOf(address account) external view returns (uint256);
}

contract ProphesyPlatform {

    address public owner;
    IERC20 public platformToken; // Token used for tipping and payments

    // Mapping to store user balances (in case we want to track platform-specific balances)
    mapping(address => uint256) public balances;

    // Events
    event TipReceived(address indexed from, address indexed to, uint256 amount);
    event ContentUnlocked(address indexed reader, address indexed author, uint256 paymentAmount);

    constructor(address _platformToken) {
        owner = msg.sender;
        platformToken = IERC20(_platformToken); // Initialize the platform token (ERC20)
    }

    // Modifier to restrict certain functions to the owner (e.g., withdrawals)
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Tipping function: allows users to tip another user (writer/author)
    function tipWriter(address recipient, uint256 amount) public {
        require(amount > 0, "Tip amount must be greater than zero.");
        require(platformToken.balanceOf(msg.sender) >= amount, "Insufficient balance.");

        // Transfer tokens from sender to recipient (author)
        platformToken.transferFrom(msg.sender, recipient, amount);

        // Emit event for the transaction
        emit TipReceived(msg.sender, recipient, amount);
    }

    // Unlock content function: allows users to pay the author to unlock content
    function unlockContent(address author, uint256 amount) public {
        require(amount > 0, "Payment amount must be greater than zero.");
        require(platformToken.balanceOf(msg.sender) >= amount, "Insufficient balance.");

        // Transfer tokens to the author
        platformToken.transferFrom(msg.sender, author, amount);

        // Emit event to indicate content has been unlocked
        emit ContentUnlocked(msg.sender, author, amount);
    }

    // Function to withdraw tokens from the contract to the owner's wallet
    function withdraw(uint256 amount) public onlyOwner {
        require(platformToken.balanceOf(address(this)) >= amount, "Insufficient contract balance.");
        platformToken.transfer(owner, amount);
    }

    // Function to check the balance of the contract in the platform token
    function getContractBalance() public view returns (uint256) {
        return platformToken.balanceOf(address(this));
    }

    // Function to check the balance of a user
    function getUserBalance(address user) public view returns (uint256) {
        return platformToken.balanceOf(user);
    }
}