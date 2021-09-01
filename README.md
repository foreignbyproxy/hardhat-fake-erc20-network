# hardhat-deploy-fake-erc20

A [Hardhat](https://hardhat.org) plugin to deploy a configurable number of ERC-20 tokens to the local Hardhat network. This is inteded to be used to help developers quickly deploy ERC20 tokens and mint a beginning balance for each account on the network. This is useful for dApps that interact with multiple ERC20 tokens. The plugin uses [OpenZeppelin's](https://openzeppelin.com/) ERC-20 contract to create the tokens.

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

-   [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)


## Configuration

The plugin adds the `fakeERC20Network` property to `hardhat.config.js`.

This is an example:

```js
module.exports = {
    fakeERC20Network: {
        tokens: [
            {
                name: "Gold",
                symbol: "GLD",
                defaultMintAmount: "80000000000000000000",
            },
			...
        ],
        defaultMintAmount: "80000000000000000000",
    },
};
```

**tokens** - An array of objects that describe the tokens to be deployed to the local network.

| Property          | Required | Description                                                     |
| ----------------- | -------- | --------------------------------------------------------------- |
| name              | Yes      | The name of the ERC20 token                                     |
| symbol            | Yes      | The Symbol of the token                                         |
| defaultMintAmount | Yes      | The amount to mint for each user. Overrides `defaultMintAmount` |

**defaultMintAmount** - The amount to of each token to minto for each user. This is a fallback if no `defaultMintAmount` is added to the tokens

## Tasks

The plugin adds the `deploy-fake-erc20` task to Hardhat. The task will deploy the tokens described in the `fakeERC20Network.tokens` array and mint the `defaultMintAmount` for each user on the network. The task returns the contract address for each token deployed.

```
npx hardhat deploy-fake-erc20
```
