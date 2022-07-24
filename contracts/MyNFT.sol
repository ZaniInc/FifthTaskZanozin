// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter tokenCountId;
    uint256 nftPrice;
    string baseURI;

    constructor() ERC721("MyNft", "MNT") {}

    function buy() external payable {
        require(msg.value >= nftPrice, "error");
        uint256 newTokenId = tokenCountId.current();
        _safeMint(msg.sender, newTokenId);
        tokenCountId.increment();
    }

    function setNftPrice(uint256 price_) external onlyOwner {
        nftPrice = price_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }
}
