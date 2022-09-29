// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import { IERC20 } from "@openzeppelin/contracts/interfaces/IERC20.sol";

contract KingOfFools {
	//keeps track of tokenSymbol => previousDepositor
	mapping(bytes32 => address) internal previousDepositor;
	uint256 public tokenMinRequiredAmount;

	address public owner;
	address public kingOfFools;

	event TokenTransfer(address receiver, uint256 amount);

	constructor() {
		owner = msg.sender;
	}

	function getMinAmountToParticipate() external view returns (uint256 balance) {
		return tokenMinRequiredAmount;
	}

	receive() external payable {
		require(
			msg.value >= tokenMinRequiredAmount || previousDepositor[bytes32("ETH")] == address(0),
			"KingOfFools: insuffcient value!"
		);

		if (previousDepositor[bytes32("ETH")] != address(0)) {
			(bool success, ) = previousDepositor[bytes32("ETH")].call{ value: msg.value }("");
			require(success, "KingOfFools: transfer to winner failed");
			kingOfFools = msg.sender;
		}
		//Set the min amount required by next paticipant.
		tokenMinRequiredAmount = (msg.value * 15) / 10;
		//Set tthe prevous depositor to send the prize
		previousDepositor[bytes32("ETH")] = msg.sender;
	}

	// todo
	// implement the erc20 token deposite function
	// so this be able to recieve erc20 tokens if thoes are whitelisted contracts

	// //keeps track of all whitelisted tokens to use in this contract
	// mapping(bytes32 => address) public whitelistedTokens;
	// mapping(bytes32 => uint256) public tokenAmounts;
	// //keeps track of tokenSymbol => amountStoredForContract

	// error InsufficientAmount(uint256 amount);
	// error InsufficientFund();

	// function addToWhitelist(bytes32 _symbol, address _contractAddress) external {
	// 	require(msg.sender == owner, "KingOfFools: only owner!");
	// 	whitelistedTokens[_symbol] = _contractAddress;
	// }

	// function depositeToken(uint256 _amount, bytes32 _symbol) external returns (bool) {
	// 	if ((_amount < (tokenAmounts[_symbol] * 150) / 100) || _amount == 0) {
	// 		revert InsufficientAmount(_amount);
	// 	}
	// 	require(whitelistedTokens[_symbol] != address(0), "KingOfFools: token is not whitelisted");
	// 	IERC20(whitelistedTokens[_symbol]).transferFrom(msg.sender, address(this), _amount);
	// 	if (previousDepositor[_symbol] != address(0)) {
	// 		_transferAmount(_amount, _symbol, previousDepositor[_symbol]);
	// 		kingOfFools = msg.sender;
	// 		emit TokenTransfer(previousDepositor[_symbol], _amount);
	// 	}
	// 	if (tokenAmounts[_symbol] == 0) {
	// 		tokenAmounts[_symbol] = _amount;
	// 	}
	// 	previousDepositor[_symbol] = msg.sender;
	// 	return true;
	// }

	// function _transferAmount(
	// 	uint256 _amount,
	// 	bytes32 _symbol,
	// 	address _receiver
	// ) private {
	// 	if (_amount > tokenAmounts[_symbol]) {
	// 		revert InsufficientFund();
	// 	}
	// 	IERC20(whitelistedTokens[_symbol]).transfer(_receiver, _amount);
	// }
}
