// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract StoryOwnership {
    
    // Structure to represent a contribution
    struct Contribution {
        address contributor;   // The address of the contributor
        string content;        // The text or contribution made
        uint timestamp;        // Timestamp of when the contribution was made
    }
    
    // The story is represented as an array of contributions
    Contribution[] public contributions;
    
    // Mapping to store how many contributions a user has made
    mapping(address => uint) public userContributions;
    
    // Owner of the story contract (could be the person who started the story)
    address public owner;
    
    // Event to log contributions
    event ContributionAdded(address indexed contributor, string content, uint timestamp);
    
    // Modifier to restrict actions to the owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;  // The deployer of the contract becomes the owner
    }

    // Function for contributors to add content to the story
    function addContribution(string memory content) public {
        uint timestamp = block.timestamp; // The time when the contribution is made
        contributions.push(Contribution(msg.sender, content, timestamp));  // Add the contribution to the list
        
        userContributions[msg.sender] += 1; // Increase the contributor's contribution count
        
        // Emit an event that a contribution has been added
        emit ContributionAdded(msg.sender, content, timestamp);
    }
    
    // Function to view the total number of contributions in the story
    function getTotalContributions() public view returns (uint) {
        return contributions.length;
    }
    
    // Function to get a specific contribution by index
    function getContribution(uint index) public view returns (address contributor, string memory content, uint timestamp) {
        require(index < contributions.length, "Contribution does not exist.");
        Contribution memory contribution = contributions[index];
        return (contribution.contributor, contribution.content, contribution.timestamp);
    }
    
    // Function to view how many contributions a specific user has made
    function getUserContributions(address user) public view returns (uint) {
        return userContributions[user];
    }

    // Function to get the full history of contributions (for the owner)
    function getAllContributions() public view onlyOwner returns (Contribution[] memory) {
        return contributions;
    }
}