const { expect } = require("chai");
const { ethers, deployments } = require("hardhat");

describe("Upgrading", function () {

    it("Should be able to deploy the contract", async function () {
        await deployments.fixture(["NftAuction"]);
        const auctionDeployment = await deployments.get("NftAuction");
        const auction = await ethers.getContractAt("NftAuction", auctionDeployment.address);
        await auction.createAuction(
            100 * 1000,
            ethers.parseEther("1"), // <-- 这里用 utils
            ethers.ZeroAddress,
            1 // tokenId
        );

        const auctionInfo = await auction.auctions(0);
        console.log("Create Success: ", auctionInfo);

        await deployments.fixture(["UpgradeNftAuction"]);
        const auctionV2 = await ethers.getContractAt("NftAuctionV2", auctionDeployment.address);
        const message = await auctionV2.testHello();
        const auctionInfoV2 = await auctionV2.auctions(0);
        console.log("Upgrade Success: ", auctionInfoV2);

        expect(message).to.equal("Hello, World!");
        expect(auctionInfo.startTime).to.equal(auctionInfoV2.startTime);
    });

});