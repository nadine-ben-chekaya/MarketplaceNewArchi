const {ethers} = require("hardhat");
const Marketplacejson= require("../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json");
const contractadr= process.env.CONTRACT_ADDRESS_MARKET;
async function main(){
    const owner = await ethers.getSigner();
    console.log("owner=",owner.address);
    //Configuration
    const alchemy= new ethers.providers.AlchemyProvider("maticmum",process.env.ALCHEMY_API_KEY);
    const userwallet= new ethers.Wallet(process.env.PRIVATE_KEY_ACCOUNT1, alchemy);
    const Contract= new ethers.Contract(contractadr,Marketplacejson.abi,userwallet);

    //Transactions
    const gasPriceOracle = "https://gasstation-mainnet.matic.network";
    const gasPrice = await ethers.provider.getGasPrice(gasPriceOracle);
    const defaultNftPrice = ethers.utils.parseUnits("0.001", "ether");

    const version = await Contract.getVersion();
    console.log("version=", version);

    const listingfees = await Contract.getListingPrice();
    console.log("listing fees=", listingfees);
    
    const estimate= await Contract.estimateGas.createMarketItem(process.env.CONTRACT_ADDRESS_TOKEN, 2, defaultNftPrice);
    console.log("estimate=", estimate);
    const tx = await Contract.createMarketItem(process.env.CONTRACT_ADDRESS_TOKEN, 2, defaultNftPrice, {gasPrice: gasPrice,
        gasLimit: estimate.mul(6),});
    const rc = await tx.wait();
    console.log("result=", rc);
    console.log("Creating new item in marketplace successfully");

    



}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  