//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20FakeFactory is ERC20 {
    struct Account {
        address userAddress;
        uint256 initialBalance;
    }

    constructor(string memory _name, string memory _symbol, Account[] memory _initialUsers ) ERC20(_name, _symbol) {
		for (uint256 index = 0; index < _initialUsers.length; index++) {
			_mint(_initialUsers[index].userAddress, _initialUsers[index].initialBalance);
		}
	}
}
