# hardhat-deploy-fake-erc20

***WORK IN PROGRESS***

A [Hardhat](https://hardhat.org) plugin to deploy a configurable number of ERC-20 tokens to your local hardhat network. The plugin uses [OpenZeppelin's](https://openzeppelin.com/) ERC-20 contract to deploy the tokens and automatically mint tokens for each user on the network.

## Installation
Run the following command to install hardhat-deploy-fake-erc20 in your hardhat project. The pluging requires the [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers) plugin and the Ethereum library `ethers.js`.

```bash
npm install hardhat-deploy-fake-erc20 @nomiclabs/hardhat-ethers ethers@^5.0.0
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-deploy-fake-erc20");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-deploy-fake-erc20";
```


## Required plugins
- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)
