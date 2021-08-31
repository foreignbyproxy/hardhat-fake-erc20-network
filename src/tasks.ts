import ora from "ora";
import {
    checkLocalhostNetwork,
    getInitialUserData,
    getTaskResultsDisplay,
} from "./utils";

import ERC20FakeFactory from '../artifacts/contracts/ERC20FakeFactory.sol/ERC20FakeFactory.json';

import type { TaskResults } from "./types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

export async function deployTokens(_: any, hre: HardhatRuntimeEnvironment) {
    const { config, ethers } = hre;

    //Check to make sure a network is running on localhost
    await checkLocalhostNetwork(config);

    const { fakeERC20Network } = config;

    //Get all the users on the network
    const accounts = await ethers.getSigners();

    //Get the ERC20 Factory ABI
    const contractFactory = new ethers.ContractFactory(
        ERC20FakeFactory.abi,
        ERC20FakeFactory.bytecode,
		accounts[0]
    );

    const spinner = ora();

    //Iterate over each token to deploy the ERC20FakeFactory contract on the local network and
    //mint the token for each signer
    const taskResults: TaskResults = {};

    for (let token of fakeERC20Network.tokens) {
        spinner.start(`Deploying: ${token.name} (${token.symbol})`);

        //Get an array for each user and their initial token balance
        const initialMintAmount =
            token.defaultMintAmount ?? fakeERC20Network.defaultMintAmount;
        let initialUsers = getInitialUserData(accounts, initialMintAmount);

        //Deploy the token and wait until it is mined on the local network
        try {
            let contract = await contractFactory.deploy(
                token.name,
                token.symbol,
                initialUsers
            );

            await contract.deployTransaction.wait();

            spinner.succeed(
                `Token Deployed: ${token.name} - (${contract.address})`
            );
            taskResults[token.symbol] = contract.address;
        } catch (error) {
            taskResults[token.symbol] = "Failed";
            spinner.fail(`Token Deployment Failed: ${token.name}`);
        }
    }

    // Display task results
    spinner.info(`Tokens Deployed`);
    const results = getTaskResultsDisplay(taskResults);
    console.log(results);
}
