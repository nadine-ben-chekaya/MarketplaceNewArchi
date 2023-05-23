// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";
string constant CONTRACT_VERSION = "2.0.0";
contract Lock is Initializable, OwnableUpgradeable, UUPSUpgradeable{
    uint public unlockTime;
    address payable public myowner;

    event Withdrawal(uint amount, uint when);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint _unlockTime) initializer public payable{
       require(
             block.timestamp < _unlockTime,
             "Unlock time should be in the future"
         );

         unlockTime = _unlockTime;
         myowner = payable(msg.sender);
    }

    // constructor(uint _unlockTime) payable {
    //     require(
    //         block.timestamp < _unlockTime,
    //         "Unlock time should be in the future"
    //     );

    //     unlockTime = _unlockTime;
    //     myowner = payable(msg.sender);
    // }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == myowner, "You aren't the myowner");

        emit Withdrawal(address(this).balance, block.timestamp);

        myowner.transfer(address(this).balance);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
    {}

    function getVersion() external pure returns(string memory){
        return CONTRACT_VERSION;
    }



}
