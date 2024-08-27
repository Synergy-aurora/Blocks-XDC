import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
   mapping(address => uint256) public royalties;
    address[] public royaltyRecipients;
    uint256 public totalRoyalties;

    event RoyaltySet(address indexed recipient, uint256 amount);
    event RoyaltiesDistributed(uint256 amount);

    function setRoyalty(address recipient, uint256 amount) public onlyOwner {
        require(amount > 0, "Royalty must be greater than 0");

        if (royalties[recipient] == 0) {
            royaltyRecipients.push(recipient);
        }

        royalties[recipient] = amount;
        emit RoyaltySet(recipient, amount);
    }

    function distributeRoyalties() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        for (uint256 i = 0; i < royaltyRecipients.length; i++) {
            address recipient = royaltyRecipients[i];
            uint256 amount = royalties[recipient];
            if (amount > 0) {
                payable(recipient).transfer(amount);
            }
        }
        totalRoyalties += balance;
        emit RoyaltiesDistributed(balance);
    }

    function getRoyaltyRecipients() external view returns (address[] memory) {
        return royaltyRecipients;
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '10',
  name: 'Royalty Distribution Contract',
  description:
    'A Royalty Distribution Contract manages and distributes royalties to recipients as defined by the contract owner.',
  tags: ['Royalty', 'Distribution'],
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
