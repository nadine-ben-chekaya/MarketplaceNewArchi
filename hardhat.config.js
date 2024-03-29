require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
//require("../node_modules/@openzeppelin/contracts-upgradeable");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const {
  ALCHEMY_MUMBAI_API_URL,
  PRIVATE_KEY,
  PRIVATE_KEY_ACCOUNT1,
  POLYGONSCAN_API_KEY,
} = process.env;
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "mumbai",
  networks: {
    mumbai:{
      url: ALCHEMY_MUMBAI_API_URL,
      accounts: [`0x${PRIVATE_KEY_ACCOUNT1}`],
      gasPrice: 8000000000,
      
    }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  
  },
};
