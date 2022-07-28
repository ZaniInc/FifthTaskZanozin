
const hre = require("hardhat");

async function main() {
  let baseURI = "https://gateway.pinata.cloud/ipfs/QmcUH66aaS6iCLJdDCas845xkzcRYgq8NNwfs3FMir8wTs/";
  let nftPrice = ether('0.001');

  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy(nftPrice,baseURI);

  await myNFT.deployed();

  console.log("NFT CONTRACT", lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
