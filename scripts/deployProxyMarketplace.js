const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {
  
  const owner = await ethers.getSigner();
  const defaultListingFees = ethers.utils.parseUnits("0.0001", "ether");
  //await lock.deployed();
  //proxy
  const Lock = await ethers.getContractFactory("NFTMarketplace");
  console.log("Deploying Lock, ProxyAdmin, and then Proxy...");
  const lockproxy = await upgrades.deployProxy(Lock, [defaultListingFees], { initializer: 'initialize'});
  //console.log("Proxy of New lock deployed to:", lockproxy.address);

  console.log(
    `NFT Marketplace proxy deployed to ${lockproxy.address}, with owner =  ${owner.address}`
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
