const {ethers} = require("hardhat");
const contractabi = require("../artifacts/contracts/Lock.sol/Lock.json")
async function main(){
    const ContractAddress=process.env.CONTRACT_ADDRESS_PROXY;
    const alchemy = new ethers.providers.AlchemyProvider("maticmum",process.env.ALCHEMY_API_KEY);
    const userWallet = new ethers.Wallet(process.env.PRIVATE_KEY_ACCOUNT1, alchemy);
    const lock = new ethers.Contract(ContractAddress, contractabi.abi, userWallet);

    const tx = await lock.withdraw();
    const rc =  await tx.wait();
    console.log("result=", rc);
                               


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });