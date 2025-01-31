// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayToReadMore {

    // Structure to represent a chapter
    struct Chapter {
        address author;        // Author of the chapter
        string content;        // Content of the chapter
        uint256 price;         // Price to unlock this chapter (in Wei, smallest unit of Ether)
        uint256 timestamp;     // Timestamp when the chapter was added
        bool isUnlocked;       // Whether the chapter has been unlocked by the user
    }

    // Array to store all the chapters of the story
    Chapter[] public chapters;

    // Mapping to track which chapters a user has unlocked
    mapping(address => mapping(uint256 => bool)) public userUnlockedChapters;

    // Event to log when a user pays to unlock a chapter
    event ChapterUnlocked(address indexed user, uint256 chapterIndex, uint256 amountPaid);

    // Function to add a new chapter to the story (only the author can add)
    function addChapter(string memory content, uint256 price) public {
        uint256 timestamp = block.timestamp;  // Time when the chapter is added
        chapters.push(Chapter(msg.sender, content, price, timestamp, false));  // Add the new chapter
    }

    // Function to unlock a chapter by paying the required fee
    function unlockChapter(uint256 chapterIndex) public payable {
        require(chapterIndex < chapters.length, "Chapter does not exist.");
        Chapter storage chapter = chapters[chapterIndex];
        require(!chapter.isUnlocked, "Chapter already unlocked.");
        require(msg.value >= chapter.price, "Insufficient funds to unlock chapter.");

        // Mark the chapter as unlocked for this user
        userUnlockedChapters[msg.sender][chapterIndex] = true;
        chapter.isUnlocked = true; // Set chapter as unlocked globally

        // Transfer the payment to the author of the chapter
        payable(chapter.author).transfer(msg.value);

        // Emit the event to notify that a chapter has been unlocked
        emit ChapterUnlocked(msg.sender, chapterIndex, msg.value);
    }

    // Function to get the total number of chapters in the story
    function getTotalChapters() public view returns (uint256) {
        return chapters.length;
    }

    // Function to get a specific chapter's details
    function getChapter(uint256 chapterIndex) public view returns (address author, string memory content, uint256 price, uint256 timestamp, bool isUnlocked) {
        require(chapterIndex < chapters.length, "Chapter does not exist.");
        Chapter memory chapter = chapters[chapterIndex];
        return (chapter.author, chapter.content, chapter.price, chapter.timestamp, chapter.isUnlocked);
    }

    // Function to check if a user has unlocked a specific chapter
    function hasUnlockedChapter(address user, uint256 chapterIndex) public view returns (bool) {
        return userUnlockedChapters[user][chapterIndex];
    }
}