// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public tokenCountId;
    uint256 public nftPrice;
    uint256 public tokenSupply = 6;
    string public baseURILink;

    constructor(uint256 price_) ERC721("MyNft", "MNT") {
        setNftPrice(price_);
    }

    function buy() external payable {
        require(msg.value == nftPrice, "Error : payment value too low");
        require(
            tokenCountId._value < tokenSupply,
            "Error : all NFT's was sold"
        );
        require(bytes(baseURILink).length > 0, "Error : first set base URI");
        tokenCountId.increment();
        uint256 newTokenId = tokenCountId.current();
        _safeMint(msg.sender, newTokenId);
    }

    function setNftPrice(uint256 price_) public onlyOwner {
        require(price_ > 0, "Error : nft price can't be equal 0");
        nftPrice = price_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURILink;
    }

    function setBaseURI(string calldata baseURI_) external onlyOwner {
        require(bytes(baseURI_).length > 0, "Error : not valid URI");
        baseURILink = baseURI_;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }
}
