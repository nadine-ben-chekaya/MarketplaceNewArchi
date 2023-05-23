// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
string constant CONTRACT_VERSION = "2.0.0";
contract MyToken is Initializable, ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //address contractAddress;
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _name, string memory _symbole) initializer public {
        __ERC721_init(_name, _symbole);
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function safeMint(string memory tokenURI, address marketplaceAddress) public returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        setApprovalForAll(marketplaceAddress, true);
        return newItemId;

    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
    {}

    function MySetApproval(address _contractadr) public{
       setApprovalForAll(_contractadr, true); 
       
    }

    function getVersion() external pure returns(string memory){
        return CONTRACT_VERSION;
    }
}
