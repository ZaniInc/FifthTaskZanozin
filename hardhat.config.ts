import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-truffle5";
import {Web3} from "@nomiclabs/hardhat-web3";
import "solhint";
import "solidity-coverage";

const config: HardhatUserConfig = {
  solidity: "0.8.7",
};

export default config;
