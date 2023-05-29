const {ethers} = require("hardhat");
async function main(){
    // Deploy the smart contract
    const owner = await ethers.getSigner();
    console.log("owner=",owner.address);
    const lock = await ethers.getContractFactory("MyContract");
    const lockUpgrade = await upgrades.upgradeProxy("0x73837a36745e006f902b72f5d1c29933b140ae78", lock, {gasPrice: 1500000,
        gasLimit: 1500000,});
    console.log(`Annnnnnnnnnnnd, upgrade contract is done!! = ${ lockUpgrade.address} hamdoullah,with onwer address = ${owner.address}`);

    //wait for 5 block transactions to ensure deployment before verifying
//    console.log(`Waiting for > 5 confirmation before Contract verification`);
//    await lockUpgrade.deployTransaction.wait(7);
//    await hre.run("verify:verify", {
//      address: process.env.CONTRACT_ADDRESS_MY_CONTRACT
//    });
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  