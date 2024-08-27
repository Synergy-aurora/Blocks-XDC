import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    uint256 public requiredConfirmations;
    mapping(address => bool) public isOwner;
    mapping(uint256 => mapping(address => bool)) public confirmations;

    event Deposit(address indexed sender, uint256 amount);
    event SubmitTransaction(address indexed owner, uint256 indexed transactionId);
    event ConfirmTransaction(address indexed owner, uint256 indexed transactionId);
    event RevokeConfirmation(address indexed owner, uint256 indexed transactionId);
    event ExecuteTransaction(address indexed owner, uint256 indexed transactionId);

    constructor(address[] memory _owners, uint256 _requiredConfirmations) {
        require(_owners.length > 0, "At least one owner required");
        require(_requiredConfirmations > 0 && _requiredConfirmations <= _owners.length, "Invalid number of required confirmations");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid address");
            require(!isOwner[owner], "Owner not unique");
            isOwner[owner] = true;
        }
        requiredConfirmations = _requiredConfirmations;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction(address destination, uint256 value, bytes memory data) public {
        uint256 transactionId = 0; // Replace with logic to generate unique transaction ID
        emit SubmitTransaction(msg.sender, transactionId);
    }

    function confirmTransaction(uint256 transactionId) public {
        require(isOwner[msg.sender], "Not an owner");
        require(!confirmations[transactionId][msg.sender], "Transaction already confirmed");
        confirmations[transactionId][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, transactionId);
    }

    function revokeConfirmation(uint256 transactionId) public {
        require(isOwner[msg.sender], "Not an owner");
        require(confirmations[transactionId][msg.sender], "Transaction not confirmed");
        confirmations[transactionId][msg.sender] = false;
        emit RevokeConfirmation(msg.sender, transactionId);
    }

    function executeTransaction(uint256 transactionId) public {
        // Replace with logic to execute the transaction
        emit ExecuteTransaction(msg.sender, transactionId);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '5',
  name: 'Multi-Signature Wallet Contract',
  description:
    'A Multi-Signature Wallet Contract requires multiple signatures to approve and execute transactions, enhancing security for funds management.',
  tags: ['Wallet', 'Security'],
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
