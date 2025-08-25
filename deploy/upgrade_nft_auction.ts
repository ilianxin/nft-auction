import { ethers, upgrades } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // 读取之前保存的 JSON 文件
  const storedPath = path.resolve(__dirname, "../deployed_contracts.json");
  if (!fs.existsSync(storedPath)) {
    throw new Error("deployed_contracts.json not found!");
  }
  const { proxyAddress } = JSON.parse(fs.readFileSync(storedPath, "utf-8"));

  // 新的实现合约工厂
  const NftAuctionV2 = await ethers.getContractFactory("NftAuctionV2");

  // 升级
  const upgraded = await upgrades.upgradeProxy(proxyAddress, NftAuctionV2);

  console.log("NftAuction upgraded! Proxy address:", await upgraded.getAddress());
}


export default func;
func.tags = ["UpgradeNftAuction"];