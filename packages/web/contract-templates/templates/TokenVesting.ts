import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    struct VestingSchedule {
        uint256 startTime;
        uint256 cliffDuration;
        uint256 vestingDuration;
        uint256 totalAmount;
        uint256 releasedAmount;
    }

    mapping(address => VestingSchedule) public vestingSchedules;

    event TokensVested(address indexed beneficiary, uint256 amount);
    event TokensReleased(address indexed beneficiary, uint256 amount);

    function setVestingSchedule(address beneficiary, uint256 startTime, uint256 cliffDuration, uint256 vestingDuration, uint256 totalAmount) public onlyOwner {
        require(vestingSchedules[beneficiary].totalAmount == 0, "Vesting schedule already set");

        vestingSchedules[beneficiary] = VestingSchedule(startTime, cliffDuration, vestingDuration, totalAmount, 0);
        emit TokensVested(beneficiary, totalAmount);
    }

    function releaseTokens() public {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "No vesting schedule found");

        uint256 vestedAmount = _calculateVestedAmount(msg.sender);
        uint256 unreleasedAmount = vestedAmount - schedule.releasedAmount;

        require(unreleasedAmount > 0, "No tokens to release");

        schedule.releasedAmount += unreleasedAmount;
        payable(msg.sender).transfer(unreleasedAmount);

        emit TokensReleased(msg.sender, unreleasedAmount);
    }

    function _calculateVestedAmount(address beneficiary) private view returns (uint256) {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];

        if (block.timestamp < schedule.startTime + schedule.cliffDuration) {
            return 0;
        }

        uint256 elapsedTime = block.timestamp - schedule.startTime;
        uint256 vestedTime = elapsedTime < schedule.vestingDuration ? elapsedTime : schedule.vestingDuration;

        return (vestedTime * schedule.totalAmount) / schedule.vestingDuration;
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '13',
  name: 'Token Vesting Contract',
  description:
    'A Token Vesting Contract manages the release of tokens over time, with a cliff period before vesting starts and a defined vesting duration.',
  tags: ['Vesting', 'Token'],
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
