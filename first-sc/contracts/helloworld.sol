// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Helloworld {
    event UpdatedMessage(string oldStr, string newStr);

    string public message;

    constructor() {
        message = "Hello World";
    }

    function update(string memory newMessage) public {
        string memory oldMsg = message;
        message = newMessage;
        emit UpdatedMessage(oldMsg, newMessage);
    }
}
