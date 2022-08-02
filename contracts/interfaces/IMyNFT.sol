// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/**
 * @title Nft
 * @author Pavel Zanozin
 * @notice This SC allows users buy NFT and register
 * ownership on blockchain
 */
interface IMyNFT {
    /**
     * @dev event logs info about NFT's price when owner
     * call function 'setNftPrice'
     *
     * @param price - price per NFT
     */
    event SetNFTPrice(uint256 price);

    /**
     * @dev event logs info base URI , when owner call
     * 'setBaseURI'
     *
     * @param URILink - contain base URI link for all
     * NFT's
     */
    event SetBaseURI(string URILink);

    /**
     * @dev event logs info about who's buy nft and
     * how many ether's transfer to SC
     *
     * @param buyer - who's buy
     * @param tokenID - token ID which user buy
     * @param ethers - how many ether's transfer
     */
    event Buy(address buyer, uint256 tokenID ,uint256 ethers);

    /**
     * @dev allows user buy nft's for the price which set
     * by the owner . Don't take any params
     *
     * @notice can be by call by any one . revert transaction if
     * all nft's was minted or paymant value too low
     */
    function buy() external payable;

    /**
     * @dev allows owner set price per tokens in ether
     *
     * @param price_ - input price per nft
     * @notice can be call only by owner , price can't be 0
     */
    function setNftPrice(uint256 price_) external;

    /**
     * @dev allows owner take ether from SC , which earned by
     * sell NFT's
     *
     * @notice can be by call by owner
     */
    function withdraw() external;
}