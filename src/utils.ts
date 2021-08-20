import "isomorphic-fetch";
import { HardhatConfig } from "hardhat/types";

export const TASK_NAME = 'deploy-fake-erc20';

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
