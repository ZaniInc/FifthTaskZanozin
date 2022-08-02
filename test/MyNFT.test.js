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

  let baseURI = "https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/";

  before(async () => {
    instanceNFT = await MyNFT.new(ether('0.001'), baseURI);
  });

  describe("Initialize contract - false", async () => {
    it("Error : nft price can't be equal 0", async () => {
      await expectRevert(MyNFT.new(ether('0'), baseURI), "Error : nft price can't be equal 0");
    });
    it("Error : not valid URI", async () => {
      await expectRevert(MyNFT.new(ether('1'), ""), "Error : not valid URI");
    });
  });

  describe("Check correct initialize contract", async () => {
    it("Successs initialize", async () => {
      let priceBefore = await instanceNFT.nftPrice();
      expect(priceBefore).to.be.bignumber.equal(ether('0.001'),);
      let baseUri = await instanceNFT.baseURILink();
      expect(baseUri).to.be.equal(baseURI);
    });
  });

  describe("setNftPrice", async () => {

    describe("Should fail if", async () => {
      it("Ownable: caller is not the owner", async () => {
        let currentPrice = await instanceNFT.nftPrice();
        expect(currentPrice).to.be.bignumber.equal(ether('0.001'));
        await expectRevert(instanceNFT.setNftPrice(ether('1'), { from: acc6 }), "Ownable: caller is not the owner");
        let currentPriceAfter = await instanceNFT.nftPrice();
        expect(currentPriceAfter).to.be.bignumber.equal(ether('0.001'));
      });
    });

    describe("Success", async () => {
      it("change price by owner and emit events", async () => {
        let currentPrice = await instanceNFT.nftPrice();
        expect(currentPrice).to.be.bignumber.equal(ether('0.001'));
        let tx = await instanceNFT.setNftPrice(ether('1'));
        let currentPriceAfter = await instanceNFT.nftPrice();
        expect(currentPriceAfter).to.be.bignumber.equal(ether('1'));
        expectEvent(tx, "SetNFTPrice", { price: ether('1') });
      });
    });
  });

  describe("Buy", async () => {

    describe("Success", async () => {
      it("buy by owner", async () => {
        let balanceBefore = await instanceNFT.balanceOf(owner);
        expect(balanceBefore).to.be.bignumber.equal(new BN(0));
        tx = await instanceNFT.buy({ value: ether('1') });
        let balanceAfter = await instanceNFT.balanceOf(owner);
        expect(balanceAfter).to.be.bignumber.equal(new BN(1));
        let event = expectEvent(tx, "Buy");
        expectEvent(tx, "Buy", { buyer: owner, ethers: ether('1') });
        expect(event.args.tokenID).to.be.bignumber.equal(new BN(0));
      });

      it("buy by acc1", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc1);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc1);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        let tx = await instanceNFT.buy({ from: acc1, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc1);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc1);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
        expectEvent(tx, "Buy", { buyer: acc1, ethers: ether('1') });
      });

      it("buy by acc2", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc2);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc2);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        let tx = await instanceNFT.buy({ from: acc2, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc2);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc2);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
        expectEvent(tx, "Buy", { buyer: acc2, ethers: ether('1') });
      });

      it("buy by acc3", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc3);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc3);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        let tx = await instanceNFT.buy({ from: acc3, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc3);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc3);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
        expectEvent(tx, "Buy", { buyer: acc3, ethers: ether('1') });
      });

      it("buy by acc4", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc4);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc4);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        let tx = await instanceNFT.buy({ from: acc4, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc4);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc4);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
        expectEvent(tx, "Buy", { buyer: acc4, ethers: ether('1') });
      });

      it("buy by acc5", async () => {
        let etherBalanceBefore = await web3.eth.getBalance(acc5);
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc5);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        let tx = await instanceNFT.buy({ from: acc5, value: ether('1') });
        let balanceAfterNFT = await instanceNFT.balanceOf(acc5);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(1));
        let etherBalanceAfter = await web3.eth.getBalance(acc5);
        let etherBalance = new BN(etherBalanceAfter).add(ether('1'));
        expect(Number(etherBalance)).to.be.closeTo(Number(etherBalanceBefore), Number(ether('0.0003')));
        expectEvent(tx, "Buy", { buyer: acc5, ethers: ether('1') });
      });

    });
    describe("Should fail if", async () => {
      it("Error : all NFT's was sold", async () => {
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await expectRevert(instanceNFT.buy({ from: acc6, value: ether('1') }), "Error : all NFT's was sold");
        let balanceAfterNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(0));
      });

      it("Error : incorrect payment value", async () => {
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await expectRevert(instanceNFT.buy({ from: acc6, value: ether('0') }), "Error : incorrect payment value");
        let balanceAfterNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(0));
      });

      it("Error : incorrect payment value", async () => {
        let balanceBeforeNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceBeforeNFT).to.be.bignumber.equal(new BN(0));
        await expectRevert(instanceNFT.buy({ from: acc6, value: ether('2') }), "Error : incorrect payment value");
        let balanceAfterNFT = await instanceNFT.balanceOf(acc6);
        expect(balanceAfterNFT).to.be.bignumber.equal(new BN(0));
      });
    });
  });

  describe("Check tokens Id's", async () => {
    describe("Success", async () => {
      it("owner of token 0", async () => {
        let tokenURI = await instanceNFT.tokenURI(new BN(0));
        expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/0.json");
        let ownerOfToken0 = await instanceNFT.ownerOf(new BN(0));
        expect(ownerOfToken0).to.be.equal(owner);
      });
      it("owner of token 1", async () => {
        let tokenURI = await instanceNFT.tokenURI(new BN(1));
        expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/1.json");
        let ownerOfToken0 = await instanceNFT.ownerOf(new BN(1));
        expect(ownerOfToken0).to.be.equal(acc1);
      });
      it("owner of token 2", async () => {
        let tokenURI = await instanceNFT.tokenURI(new BN(2));
        expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/2.json");
        let ownerOfToken0 = await instanceNFT.ownerOf(new BN(2));
        expect(ownerOfToken0).to.be.equal(acc2);
      });
      it("owner of token 3", async () => {
        let tokenURI = await instanceNFT.tokenURI(new BN(3));
        expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/3.json");
        let ownerOfToken0 = await instanceNFT.ownerOf(new BN(3));
        expect(ownerOfToken0).to.be.equal(acc3);
      });
      it("owner of token 4", async () => {
        let tokenURI = await instanceNFT.tokenURI(new BN(4));
        expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/4.json");
        let ownerOfToken0 = await instanceNFT.ownerOf(new BN(4));
        expect(ownerOfToken0).to.be.equal(acc4);
      });
      it("owner of token 5", async () => {
        let tokenURI = await instanceNFT.tokenURI(new BN(5));
        expect(tokenURI).to.be.equal("https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/5.json");
        let ownerOfToken0 = await instanceNFT.ownerOf(new BN(5));
        expect(ownerOfToken0).to.be.equal(acc5);
      });
    });

  });

  describe("Withdraw", async () => {

    describe("Should fail if", async () => {
      it("Ownable: caller is not the owner", async () => {
        let contractBalanceBefore = await web3.eth.getBalance(instanceNFT.address);
        expect(contractBalanceBefore).to.be.bignumber.equal(ether('6'));
        await expectRevert(instanceNFT.withdraw({ from: acc2 }), "Ownable: caller is not the owner");
        let contractBalanceAfter = await web3.eth.getBalance(instanceNFT.address);
        expect(contractBalanceAfter).to.be.bignumber.equal(ether('6'));
      });
    });

    describe("Success", async () => {
      it("withdraw by owner", async () => {
        let contractBalanceBefore = await web3.eth.getBalance(instanceNFT.address);
        expect(contractBalanceBefore).to.be.bignumber.equal(ether('6'));
        let ownerBalanceBefore = await web3.eth.getBalance(owner);
        expect(Number(ownerBalanceBefore)).to.be.closeTo(Number(ether('9998.9877')), Number(ether('0.00005')));
        await instanceNFT.withdraw();
        let contractBalanceAfter = await web3.eth.getBalance(instanceNFT.address);
        expect(contractBalanceAfter).to.be.bignumber.equal(ether('0'));
        let ownerBalanceAfter = await web3.eth.getBalance(owner);
        expect(Number(ownerBalanceAfter)).to.be.closeTo(Number(ether('10004.9876')), Number(ether('0.00005')));
      });
    });

  });

});
