// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");
  const owner = await ethers.getSigner();

  //const Lock = await hre.ethers.getContractFactory("Lock");
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //await lock.deployed();
  //proxy
  const Lock = await ethers.getContractFactory("Lock");
  console.log("Deploying Lock, ProxyAdmin, and then Proxy...");
  const lockproxy = await upgrades.deployProxy(Lock, [unlockTime], { initializer: 'initialize' , value:lockedAmount});
  //console.log("Proxy of New lock deployed to:", lockproxy.address);

  console.log(
    `Lock proxy with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lockproxy.address}, with owner =  ${owner.address}`
  );

  //wait for 5 block transactions to ensure deployment before verifying
   console.log(`Waiting for > 5 confirmation before Contract verification`);
   await lockproxy.deployTransaction.wait(7);
   await hre.run("verify:verify", {
     address: lockproxy.address
   });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
