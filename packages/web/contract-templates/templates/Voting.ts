import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint256 public candidateCount;
    uint256 public totalVotes;

    event CandidateAdded(uint256 indexed candidateId, string name);
    event Voted(address indexed voter, uint256 indexed candidateId);

    function addCandidate(string memory name) public onlyOwner {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
        emit CandidateAdded(candidateCount, name);
    }

    function vote(uint256 candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(candidates[candidateId].id != 0, "Invalid candidate ID");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
        totalVotes++;

        emit Voted(msg.sender, candidateId);
    }

    function getCandidate(uint256 candidateId) public view returns (string memory name, uint256 voteCount) {
        require(candidates[candidateId].id != 0, "Invalid candidate ID");
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '8',
  name: 'Voting Contract',
  description:
    'A Voting Contract allows for the creation of candidates and voting on them. It ensures that each address can only vote once.',
  tags: ['Voting', 'Election'],
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
