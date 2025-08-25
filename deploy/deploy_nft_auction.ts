import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AbiCoder } from "ethers";
import * as fs from "fs";
import { log } from "console";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying NftAuction contract with the account:", deployer);
  const nftAuction = await ethers.getContractFactory("NftAuction");

  const nftAuctionProxy = await hre.upgrades.deployProxy(nftAuction, [], { initializer: 'initialize' });

  await nftAuctionProxy.waitForDeployment();

  const proxyAddress  = await nftAuctionProxy.getAddress();
  const implAddress= await hre.upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log("NftAuction deployed to:", proxyAddress);
  console.log("Deployer address:", implAddress);

  const storedPath = "./deployed_contracts.json";
  const data = {
    proxyAddress,
    implAddress,
  };
  fs.writeFileSync(storedPath, JSON.stringify(data, null, 2), "utf-8");

  await hre.deployments.save("NftAuction", {
    address: proxyAddress,
    abi: nftAuction.interface.format("json"),
  });

    await save("NFTAuction", {
    proxAddress: proxyAddress,
    implAddress: implAddress,
    abi: nftAuction.interface.format("json"),
    args: [],
    log: true,
    });

//   await deploy("NftAuction", {
//     from: deployer,
//     args: [],
//     log: true,
//   });
};


export default func;
func.tags = ["NftAuction"];


async function save(
    name: string,
    {
        proxAddress,
        implAddress,
        abi,
        args,
        log,
    }: { proxAddress: string; implAddress: string; abi: any; args: any[]; log: boolean }
) {
    const savePath = `./${name}_deployment.json`;
    const content = {
        proxAddress,
        implAddress,
        abi,
        args,
        log,
    };
    fs.writeFileSync(savePath, JSON.stringify(content, null, 2), "utf-8");
    if (log) {
        console.log(`Deployment info saved to ${savePath}`);
    }
}


