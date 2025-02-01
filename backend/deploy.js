const { ethers } = require("hardhat");

async function main() {
  const tip = await ethers.getContractFactory("StoryOwnership");
  const tipping = await tip.deploy(); // Deploy the contract

  await tipping.deployed();

  console.log("Tipping contract deployed to:", tipping.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});