// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counter;

    Counter tokenCountId;
    uint256 nftPrice;
    string baseURI;

    constructor() ERC721("MyNft", "MNT") {}

    function buy() external payable {
        require(msg.value >= price_ , "error");
        _safeMint(msg.sender, tokenCountId);
        _addTokenToOwnerEnumeration(msg.sender,tokenCountId);
        tokenCountId.increment();
    }

    function setNftPrice(uint256 price_) external onlyOwner {
        nftPrice = price_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUR
        I;
    }
    function setBaseUri (string memory baseURI_) external onlyOwner{
        baseURI = baseURI_;
    }
}
