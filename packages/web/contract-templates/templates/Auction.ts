import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;

    event AuctionStarted(uint256 endTime);
    event NewBid(address indexed bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor(uint256 _duration) {
        auctionEndTime = block.timestamp + _duration;
        emit AuctionStarted(auctionEndTime);
    }

    function placeBid() public payable {
        require(block.timestamp < auctionEndTime, "Auction has ended");
        require(msg.value > highestBid, "Bid too low");

        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid); // Refund the previous highest bidder
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit NewBid(msg.sender, msg.value);
    }

    function endAuction() public onlyOwner {
        require(block.timestamp >= auctionEndTime, "Auction not yet ended");

        address winner = highestBidder;
        uint256 winningBid = highestBid;

        highestBidder = address(0);
        highestBid = 0;
        auctionEndTime = 0;

        emit AuctionEnded(winner, winningBid);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '12',
  name: 'Auction Contract',
  description:
    'An Auction Contract allows users to place bids on an item. The highest bidder wins the auction when it ends.',
  tags: ['Auction', 'Bid'],
  code: CODE.trim(),
  inputs: [],
  dependencies: [
    {
      path: '@openzeppelin/contracts/access/Ownable.sol',
      fileContent: OpenZeppelinOwnable,
    },
    {
      path: '@openzeppelin/contracts/utils/Context.sol',
      fileContent: OpenZeppelinContext,
    },
  ],
};

export default TEMPLATE;
