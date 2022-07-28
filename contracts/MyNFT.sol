// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IMyNFT.sol";

/**
 * @title Nft
 * @author Pavel Zanozin
 * @notice This SC allows users buy NFT and register
 * ownership on blockchain
 */
contract MyNFT is ERC721, Ownable, IMyNFT {
    using Counters for Counters.Counter;
    using Strings for uint256;

    /**
     * @dev contain how many tokens was minted at
     * current time.
     *
     * @notice using 'Counter' library from OpenZeppelin.
     */
    Counters.Counter public tokenCountId;

    /**
     * @dev contain NFT price.
     *
     * @notice can be changed by owner.
     */
    uint256 public nftPrice;

    /**
     * @dev contain max tokens supply
     *
     */
    uint256 public tokenSupply = 5;

    /**
     * @dev contain baseURI.
     *
     * @notice can be changed by owner.
     */
    string public baseURILink;

    /**
     * @dev Input uint256 for 'price_' and string for 'baseURI_'
     *
     * @param price_ - price per nft
     * @param baseURI_ - base URI fro nft's
     */
    constructor(uint256 price_, string memory baseURI_) ERC721("MyNft", "MNT") {
        setNftPrice(price_);
        setBaseURI(baseURI_);
    }

    /**
     * @dev allows user buy nft's for the price which set
     * by the owner . Don't take any params
     *
     * @notice can be by call by any one . revert transaction if
     * all nft's was minted or paymant value too low
     */
    function buy() external payable override {
        require(msg.value == nftPrice, "Error : payment value too low");
        require(
            tokenCountId.current() <= tokenSupply,
            "Error : all NFT's was sold"
        );
        _safeMint(msg.sender, tokenCountId.current());
        emit Buy(msg.sender, tokenCountId.current(), msg.value);
        tokenCountId.increment();
    }

    /**
     * @dev allows owner set price per tokens in ether
     *
     * @param price_ - input price per nft
     * @notice can be call only by owner , price can't be 0
     */
    function setNftPrice(uint256 price_) public override onlyOwner {
        require(price_ > 0, "Error : nft price can't be equal 0");
        nftPrice = price_;
        emit SetNFTPrice(price_);
    }

    /**
     * @dev See {ERC721-_baseURI}.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURILink;
    }

    /**
     * @dev allows owner set base URI for all NFT's
     *
     * @param baseURI_ - input base URI
     * @notice can be call only by owner , 'baseURI_' can't be 0
     */
    function setBaseURI(string memory baseURI_) internal onlyOwner {
        require(bytes(baseURI_).length > 0, "Error : not valid URI");
        baseURILink = baseURI_;
        emit SetBaseURI(baseURI_);
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
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }
}
