const SecurityErrorListener = require("solhint/lib/tree-listener");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");
require("solhint");
require("solidity-coverage");
let secret = require("./secret.json")


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  network:{
    ropsten:{
      url:secret.api,
      accounts:[secret.key]
    }
  },
  etherscan:{
    apiKey: secret.etherApi,
  },
  solidity: "0.8.10",
};