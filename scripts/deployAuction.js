const hre = require("hardhat");

async function main() {
  const owner = await hre.ethers.getSigner();
  const Lock = await hre.ethers.getContractFactory("Auction");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(
    `Auction deployed to ${lock.address}, with owner =  ${owner.address}`
  );

  //wait for 5 block transactions to ensure deployment before verifying
  console.log(`Waiting for > 5 confirmation before Contract verification`);
  await lock.deployTransaction.wait(7);
  await hre.run("verify:verify", {
    address: lock.address,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
