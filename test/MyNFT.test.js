const MyNFT = artifacts.require("./MyNFT");

const {
  ether,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert,
  balance,
  time, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const { expect } = require("chai");
const { Web3 } = require('hardhat');
const BN = Web3.utils.BN;

contract("MyNFT", async ([owner, acc1, acc2, acc3, acc4, acc5, acc6]) => {

  let baseURI = "https://ipfs.io/ipfs/QmUMxEPMdDfz3FjQbnrhejUoUPX4DydGEptGA2PDsjMKMh/";

  before(async () => {
    instanceNFT = await MyNFT.new(ether('0.001'),baseURI);
  });

  describe("Initialize contract - false", async () => {
    it("Error : nft price can't be equal 0", async () => {
      await expectRevert(MyNFT.new(ether('0'),baseURI), "Error : nft price can't be equal 0");
    });
  });

  describe("setNftPrice function", async () => {

    describe("False", async () => {
      it("Ownable: caller is not the owner", async () => {
        let currentPrice = await instanceNFT.nftPrice();
        expect(currentPrice).to.be.bignumber.equal(ether('0.001'));
        await expectRevert(instanceNFT.setNftPrice(ether('1'), { from: acc6 }), "Ownable: caller is not the owner");
        let currentPriceAfter = await instanceNFT.nftPrice();
        expect(currentPriceAfter).to.be.bignumber.equal(ether('0.001'));
      });
    });

    describe("Done", async () => {
      it("change price by owner", async () => {
        let currentPrice = await instanceNFT.nftPrice();
        expect(currentPrice).to.be.bignumber.equal(ether('0.001'));
        await instanceNFT.setNftPrice(ether('1'));
        let currentPriceAfter = await instanceNFT.nftPrice();
        expect(currentPriceAfter).to.be.bignumber.equal(ether('1'));
      });
    });
  });

  describe("setBaseURI function", async () => {

    describe("False", async () => {
      it("Error : not valid URI", async () => {
        let baseURL = await instanceNFT.baseURILink();
        expect(baseURL).to.be.equal(baseURI);
        await expectRevert(instanceNFT.setBaseURI(""), "Error : not valid URI");
        let baseURL_ = await instanceNFT.baseURILink();
        expect(baseURL_).to.be.equal(baseURI);
      });
      it("Ownable : caller is not the owner", async () => {
        let baseURL = await instanceNFT.baseURILink();
        expect(baseURL).to.be.equal(baseURI);
        await expectRevert(instanceNFT.setBaseURI(baseURI, { from: acc6 }), "Ownable: caller is not the owner");
        let baseURL_ = await instanceNFT.baseURILink();
        expect(baseURL_).to.be.equal(baseURI);
      });
    });

    describe("Done", async () => {
      it("setBaseURI - done in first time", async () => {
        let firstBaseURI = "https://ipfs.io/ipfs/";
        await instanceNFT.setBaseURI(firstBaseURI);
        let baseURL = await instanceNFT.baseURILink();
        expect(baseURL).to.be.equal(firstBaseURI);
      });

      it("setBaseURI - done in second time", async () => {
        let firstBaseURI = "https://ipfs.io/ipfs/";
        let baseURLBefore = await instanceNFT.baseURILink();
        expect(baseURLBefore).to.be.equal(firstBaseURI);
        await instanceNFT.setBaseURI(baseURI);
        let baseURLAfter = await instanceNFT.baseURILink();
        expect(baseURLAfter).to.be.equal(baseURI);
      });
    });

  });

  describe("Buy function", async () => {

    describe("Done", async () => {
      it("buy by owner", async () => {
        let balanceBefore = await instanceNFT.balanceOf(owner);
        expect(balanceBefore).to.be.bignumber.equal(new BN(0));
        await instanceNFT.buy({ value: ether('1') });
        let balanceAfter = await instanceNFT.balanceOf(owner);
        expect(balanceAfter).to.be.bignumber.equal(new BN(1));
        let tokenURI = await instanceNFT.tokenURI(new BN(1));
        expect(tokenURI).to.be.equal("https://ipfs.io/ipfs/QmUMxEPMdDfz3FjQbnrhejUoUPX4DydGEptGA2PDsjMKMh/1.json");
      });

      it("buy by acc1", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc1);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc1);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await instanceNFT.buy({ from: acc1, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc1);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc1);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
      });

      it("buy by acc2", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc2);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc2);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await instanceNFT.buy({ from: acc2, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc2);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc2);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
      });

      it("buy by acc3", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc3);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc3);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await instanceNFT.buy({ from: acc3, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc3);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc3);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
      });

      it("buy by acc4", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc4);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc4);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await instanceNFT.buy({ from: acc4, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc4);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc4);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
      });

      it("buy by acc5", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc5);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc5);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await instanceNFT.buy({ from: acc5, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc5);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc5);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
      });

    });
    describe("False", async () => {
      it("Error : all NFT's was sold", async () => {
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await expectRevert(instanceNFT.buy({ from: acc6, value: ether('1') }), "Error : all NFT's was sold");
        let balanceAfterNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(0));
      });

      it("Error : payment value too low", async () => {
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await expectRevert(instanceNFT.buy({ from: acc6, value: ether('0') }), "Error : payment value too low");
        let balanceAfterNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(0));
      });
    });
  });

});
