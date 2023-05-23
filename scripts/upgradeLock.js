const {ethers} = require("hardhat");
async function main(){
    // Deploy the smart contract
    const owner = await ethers.getSigner();
    console.log("owner=",owner.address);
    const lock = await ethers.getContractFactory("Lock");
    const lockUpgrade = await upgrades.upgradeProxy(process.env.CONTRACT_ADDRESS_PROXY, lock, {gasPrice: 1500000,
        gasLimit: 1500000,});
    console.log(`Annnnnnnnnnnnd, upgrade contract is done!! = ${ lockUpgrade.address} hamdoullah,with onwer address = ${owner.address}`);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  