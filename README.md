# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

``` test result
PS F:\Users\ilian\Documents\Web3\nft-auction> npx hardhat test
WARNING: You are currently using Node.js v23.11.1, which is not supported by Hardhat. This can lead to unexpected behavior. See https://hardhat.org/nodejs-versions




  Upgrading
Deploying NftAuction contract with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
NftAuction deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Deployer address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Deployment info saved to ./NFTAuction_deployment.json       
Create Success:  Result(9) [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  100000n,
  1000000000000000000n,
  false,
  '0x0000000000000000000000000000000000000000',
  0n,
  1756102730n,
  '0x0000000000000000000000000000000000000000',
  1n
]
NftAuction upgraded! Proxy address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Upgrade Success:  Result(9) [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  100000n,
  1000000000000000000n,
  false,
  '0x0000000000000000000000000000000000000000',
  0n,
  1756102730n,
  '0x0000000000000000000000000000000000000000',
  1n
]
    ✔ Should be able to deploy the contract (737ms)


  1 passing (741ms)

·············································································································
|  Solidity and Network Configuration                                                                       │
························|·················|···············|·················|································
|  Solidity: 0.8.28     ·  Optim: false   ·  Runs: 200    ·  viaIR: false   ·     Block: 30,000,000 gas     │
························|·················|···············|·················|································
|  Methods                                                                                                  │
························|·················|···············|·················|················|···············
|  Contracts / Methods  ·  Min            ·  Max          ·  Avg            ·  # calls       ·  usd (avg)   │
························|·················|···············|·················|················|···············
|  NftAuction           ·                                                                                   │
························|·················|···············|·················|················|···············
|      createAuction    ·              -  ·            -  ·        170,325  ·             1  ·           -  │
························|·················|···············|·················|················|···············
|  Deployments                            ·                                 ·  % of limit    ·              │
························|·················|···············|·················|················|···············
|  NftAuction           ·              -  ·            -  ·      1,141,050  ·         3.8 %  ·           -  │
························|·················|···············|·················|················|···············
|  NftAuctionV2         ·              -  ·            -  ·      1,169,152  ·         3.9 %  ·           -  │
························|·················|···············|·················|················|···············
|  Key                                                                                                      │
·············································································································
|  ◯  Execution gas for this method does not include intrinsic gas overhead                                 │
·············································································································
|  △  Cost was non-zero but below the precision setting for the currency display (see options)              │
·············································································································
|  Toolchain:  hardhat                                                                                      │
·············································································································

``` test complete