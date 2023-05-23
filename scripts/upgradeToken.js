const {ethers} = require("hardhat");

async function main(){
    //Upgrade Token Contract
    const owner = await ethers.getSigner();
    const mytoken = await ethers.getContractFactory("MyToken");
    const mytokenv2 = await upgrades.upgradeProxy(process.env.CONTRACT_ADDRESS_TOKEN,mytoken);
    console.log(`Annnnnnnnnnnnd, upgrade contract is done!! = ${ mytokenv2.address} hamdoullah,with onwer address = ${owner.address}`);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });