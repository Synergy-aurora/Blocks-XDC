import { Template } from '../types/template';
import OpenZeppelinContext from '../packages/@openzeppelin/contracts/utils/Context';
import OpenZeppelinOwnable from '../packages/@openzeppelin/contracts/access/Ownable';

export const CODE: string = `
// SPDX-License-Identifier: {{license}}
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract {{contractName}} is Ownable {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE, REFUNDED }
    State public currentState;

    address public buyer;
    address public seller;
    uint256 public price;
    uint256 public deadline;

    event PaymentMade(address indexed buyer, uint256 amount);
    event DeliveryConfirmed(address indexed seller);
    event RefundIssued(address indexed buyer);

    constructor(address _seller, uint256 _price, uint256 _deadline) {
        buyer = msg.sender;
        seller = _seller;
        price = _price;
        deadline = _deadline;
        currentState = State.AWAITING_PAYMENT;
    }

    function makePayment() public payable {
        require(msg.sender == buyer, "Only the buyer can make payment");
        require(currentState == State.AWAITING_PAYMENT, "Invalid state");
        require(msg.value == price, "Incorrect payment amount");

        currentState = State.AWAITING_DELIVERY;
        emit PaymentMade(buyer, msg.value);
    }

    function confirmDelivery() public {
        require(msg.sender == seller, "Only the seller can confirm delivery");
        require(currentState == State.AWAITING_DELIVERY, "Invalid state");

        currentState = State.COMPLETE;
        payable(seller).transfer(price);
        emit DeliveryConfirmed(seller);
    }

    function requestRefund() public {
        require(msg.sender == buyer, "Only the buyer can request a refund");
        require(currentState == State.AWAITING_PAYMENT || (currentState == State.AWAITING_DELIVERY && block.timestamp > deadline), "Refund not applicable");

        currentState = State.REFUNDED;
        payable(buyer).transfer(address(this).balance);
        emit RefundIssued(buyer);
    }
}
`;

export const TEMPLATE: Template = {
  templateId: '6',
  name: 'Escrow Contract',
  description:
    'An Escrow Contract holds funds until the contract conditions are met, ensuring fair transactions between buyers and sellers.',
  tags: ['Escrow', 'Payment'],
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
