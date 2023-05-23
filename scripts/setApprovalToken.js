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
    
    const estimate= await tokenContract.estimateGas.MySetApproval(process.env.CONTRACT_ADDRESS_AUCTION);
    console.log("estimate=", estimate);
    const tx = await tokenContract.MySetApproval(process.env.CONTRACT_ADDRESS_AUCTION, {gasPrice: gasPrice,
        gasLimit: estimate.mul(6),});
    const rc = await tx.wait();
    console.log("result=", rc);
    console.log("Approving Auction to use MyToken's nfts successfully");

    



}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  