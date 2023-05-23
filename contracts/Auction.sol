// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Auction {  
    event Start();
    event End(address highestBidder, uint highestBid);
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);

    address payable public seller;

    bool public started;
    bool public ended;
    uint public endAt;

    uint public nftId;

    uint public highestBid;
    address public highestBidder;
    mapping(address => uint) public bids;

    constructor () {
        seller = payable(msg.sender);
    }

    function start(address _nft, uint _nftId, uint startingBid) external {
        require(!started, "Already started!");
        require(msg.sender == seller, "You did not start the auction!");
        highestBid = startingBid;

        nftId = _nftId;
        
        IERC721(_nft).transferFrom(msg.sender, address(this), nftId);
        
        started = true;
        endAt = block.timestamp + 2 days;

        emit Start();
    }

    function bid() external payable {
        require(started, "Not started.");
        require(block.timestamp < endAt, "Ended!");
        require(msg.value > highestBid);

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(highestBidder, highestBid);
    }

    function withdraw() external payable {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bal);

        emit Withdraw(msg.sender, bal);
    }

    function end(address _nft) external {
        require(started, "You need to start first!");
        //require(block.timestamp >= endAt, "Auction is still ongoing!");
        require(!ended, "Auction already ended!");

        if (highestBidder != address(0)) {
            IERC721(_nft).transferFrom(address(this),highestBidder, nftId);
            payable(msg.sender).transfer(highestBid);
        } else {
            IERC721(_nft).transferFrom(address(this),seller, nftId);
        }

        ended = true;
        started= false;
        emit End(highestBidder, highestBid);
    }

    
}