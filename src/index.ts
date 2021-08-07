import { extendConfig, task } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-ethers";
import fetch from "node-fetch";

import "./type-extensions";

extendConfig(
    (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
        config.fakeERC20Network = {
            tokens: [
                {
                    name: "Fake ERC20 Token",
                    symbol: "FAKE",
                },
            ],
            defaultMintAmount: "1000000000000000000000",
        };
    }
);

task(
    "erc20-faker",
    "Deploys fake ERC20 tokens to your localhost network"
).setAction(async (_, hre) => {
    const { config, ethers } = hre;

    await checkLocalhostNetwork(config);

    const { fakeERC20Network } = config;

    //Check to see if there are any token set
    if (fakeERC20Network.tokens.length === 0) {
        throw new Error("No tokens set to deploy");
    }

    //Get all the users on the network
    const accounts = await ethers.getSigners();

    //Get the ERC20 Factory ABI
    const ERC20FakeFactory = await ethers.getContractFactory(
        "ERC20FakeFactory"
    );

    //Iterate over each token to deploy the ERC20FakeFactory contract on the local network and
    //mint the token for each signer
    const tokenAddresses: {
        [k: string]: string;
    } = {};

    for (let token of fakeERC20Network.tokens) {
        console.log(`Deploying: ${token.name} (${token.symbol})`);

        //Get an array for each user and their initial token balance
        let initialUsers = accounts.map((account) => {
            return {
                userAddress: account.address,
                initialBalance:
                    token.defaultMintAmount ??
                    fakeERC20Network.defaultMintAmount,
            };
        });

        //Deploy the token and wait until it is mined on the local network
        try {
            let contract = await ERC20FakeFactory.deploy(
                token.name,
                token.symbol,
                initialUsers
            );

            await contract.deployTransaction.wait();

            console.log(`Token Deployed: ${token.name} - (${contract.address})`);
            tokenAddresses[token.symbol] = contract.address;
        } catch (error) {
            console.log(`Token Deployment Failed: ${token.name}`);
        }
    }

    // Display all of the tokens
    console.log(`All Tokens Deployed (${fakeERC20Network.tokens.length})`);
    console.log(``);
    console.log("Tokens Contracts");
    console.log("=========================");
    Object.keys(tokenAddresses).forEach((symbol) => {
        console.log(`${symbol} - ${tokenAddresses[symbol]}`);
    });
});

/*
	 Checks to make sure that a local instance of HardHat node is running
 */
async function checkLocalhostNetwork(config: HardhatConfig) {
    //Make sure the "localhost" url is set so we can ping it
    if (!config?.networks?.localhost?.url) {
        throw new Error("No localhost URL");
    }

    // The JSON-RPC server run by the `hardhat node` task returns status=200 with an
    // empty body when the server is sent a request with the method set to "OPTIONS"
    // and refuses the connection if the server is not running
    fetch(config.networks.localhost.url, {
        method: "OPTIONS",
    })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(
                    "Did not get the expected status from the local server"
                );
            }
        })
        .catch(() => {
            throw new Error(
                "Can't find the HardHat local server. You must start the server using the `npx hardhat node` command."
            );
        });
}
