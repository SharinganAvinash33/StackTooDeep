const { ethers } = require("hardhat");

async function main() {
  const tip = await ethers.getContractFactory("PaymentGateway");
  const tipping = await tip.deploy("0xa5e89442b06034cB3b4AbF6Ed0bc00D095Da0878");
  // const tipping = await tip.deploy(); // Deploy the contract

  await tipping.deployed();

  console.log("Tipping contract deployed to:", tipping.address);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1;
});