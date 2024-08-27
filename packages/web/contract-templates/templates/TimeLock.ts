import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    uint256 public unlockTime;
    address public beneficiary;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed beneficiary, uint256 amount);

    constructor(address _beneficiary, uint256 _unlockTime) {
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_unlockTime > block.timestamp, "Unlock time should be in the future");

        beneficiary = _beneficiary;
        unlockTime = _unlockTime;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() public {
        require(msg.sender == beneficiary, "Only the beneficiary can withdraw");
        require(block.timestamp >= unlockTime, "Funds are still locked");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        payable(beneficiary).transfer(balance);
        emit Withdraw(beneficiary, balance);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '7',
  name: 'Timelock Contract',
  description:
    'A Timelock Contract locks funds until a specified time has passed, ensuring that funds are only accessible after the unlock time.',
  tags: ['Timelock', 'Lock'],
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
