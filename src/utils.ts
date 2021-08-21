import "isomorphic-fetch";

import type { HardhatConfig } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { InitialUserData } from "../src/types";

export const TASK_NAME = "deploy-fake-erc20";

export const defaultSettings = {
    tokens: [
        {
            name: "Fake ERC20 Token",
            symbol: "FAKE",
        },
    ],
    defaultMintAmount: "1000000000000000000000",
};

/*
	 Checks to make sure that a local instance of HardHat node is running
 */
export async function checkLocalhostNetwork(config: HardhatConfig) {
    //Make sure the "localhost" url is set so we can ping it
    if (!config?.networks?.localhost?.url) {
        throw new Error("No localhost URL");
    }

    // The JSON-RPC server run by the `hardhat node` task returns status=200 with an
    // empty body when the server is sent a request with the method set to "OPTIONS"
    // and refuses the connection if the server is not running
    const response = await fetch(config.networks.localhost.url, {
        method: "OPTIONS",
    }).catch((err) => {
        throw new Error(
            "Can't find the HardHat local server. You must start the server using the `npx hardhat node` command."
        );
    });

    if (response.status !== 200) {
        throw new Error(
            "Did not get the expected status from the local server"
        );
    }

    return true;
}

/*
	Format ETH accounts and initial mint balance object for the fake ERC20 contract
*/
export function getInitialUserData(
    accounts: SignerWithAddress[],
    initialMintAmount: string
): InitialUserData[] {
    return accounts.map((account) => {
        return {
            userAddress: account.address,
            initialBalance: initialMintAmount,
        };
    });
}
