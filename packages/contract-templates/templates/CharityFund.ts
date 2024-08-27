import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    struct Donation {
        address donor;
        uint256 amount;
    }

    Donation[] public donations;
    uint256 public totalDonations;

    event DonationReceived(address indexed donor, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        donations.push(Donation(msg.sender, msg.value));
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value);
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        payable(owner()).transfer(balance);
        emit FundsWithdrawn(owner(), balance);
    }

    function getDonations() public view returns (Donation[] memory) {
        return donations;
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '9',
  name: 'Charity Fund Contract',
  description:
    'A Charity Fund Contract allows users to make donations and enables the contract owner to withdraw the funds collected.',
  tags: ['Charity', 'Donation'],
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
