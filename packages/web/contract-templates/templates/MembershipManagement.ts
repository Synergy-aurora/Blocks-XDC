import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    struct Member {
        bool isActive;
        uint256 joinDate;
    }

    mapping(address => Member) public members;

    event MembershipGranted(address indexed member);
    event MembershipRevoked(address indexed member);

    function grantMembership(address member) public onlyOwner {
        require(!members[member].isActive, "Already a member");

        members[member] = Member(true, block.timestamp);
        emit MembershipGranted(member);
    }

    function revokeMembership(address member) public onlyOwner {
        require(members[member].isActive, "Not a member");

        members[member].isActive = false;
        emit MembershipRevoked(member);
    }

    function isMember(address member) public view returns (bool) {
        return members[member].isActive;
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '11',
  name: 'Membership Management Contract',
  description:
    'A Membership Management Contract allows the owner to grant and revoke membership status to addresses, managing active memberships.',
  tags: ['Membership', 'Access'],
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
