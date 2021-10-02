pragma solidity ^0.5.16;

contract DUser {
    uint256 userCount = 0;
    string public name = "DUser";
    mapping(uint256 => User) public users;

    struct User {
        uint256 id;
        string userName;
        string publicKey;
    }
}
