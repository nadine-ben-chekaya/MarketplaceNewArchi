const {ethers} = require("hardhat");
const Tokenjson= require("../artifacts/contracts/MyToken.sol/MyToken.json");
const contractadr= process.env.CONTRACT_ADDRESS_TOKEN;
async function main(){
    const owner = await ethers.getSigner();
    console.log("owner=",owner.address);
    //Configuration
    const alchemy= new ethers.providers.AlchemyProvider("maticmum",process.env.ALCHEMY_API_KEY);
    const userwallet= new ethers.Wallet(process.env.PRIVATE_KEY_ACCOUNT1, alchemy);
    const tokenContract= new ethers.Contract(contractadr,Tokenjson.abi,userwallet);

    //Transactions
    const gasPriceOracle = "https://gasstation-mainnet.matic.network";
    const gasPrice = await ethers.provider.getGasPrice(gasPriceOracle);

    const version = await tokenContract.getVersion();
    console.log("version=", version);
    
    const estimate= await tokenContract.estimateGas.safeMint("url1", process.env.CONTRACT_ADDRESS_MARKET);
    console.log("estimate=", estimate);
    const tx = await tokenContract.safeMint("url1", process.env.CONTRACT_ADDRESS_MARKET, {gasPrice: gasPrice,
        gasLimit: estimate.mul(6),});
    const rc = await tx.wait();
    console.log("result=", rc);
    console.log("Minting new nft successfully");

    



}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  