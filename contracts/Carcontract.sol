// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Carcontract {
    struct Car {
        address owner;
        string carName;
    }

    mapping(uint256 => Car) public OwnersName;

    function createCar(uint256 tokenId, string memory carName) public {
        OwnersName[tokenId] = Car(msg.sender, carName);
    }

    function ownerOfCar(uint256 _tokenId) public view returns (address) {
        return OwnersName[_tokenId].owner;
    }

    function buyCar(uint256 _tokenId) public payable {
        payable(OwnersName[_tokenId].owner).transfer(msg.value);
        OwnersName[_tokenId].owner = msg.sender;
    }
}
