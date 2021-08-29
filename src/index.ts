import { extendConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

import { deployTokens } from "./tasks";
import { defaultSettings, TASK_NAME } from "./utils";

import "./type-extensions";
import type { HardhatConfig, HardhatUserConfig } from "hardhat/types";

extendConfig(
    (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
        //If no fakeERC20Network settings object, then add the default settings
        if (!config.fakeERC20Network) {
            config.fakeERC20Network = defaultSettings;
        }

        //If no tokens, add default token
        if (
            !config.fakeERC20Network.tokens ||
            config.fakeERC20Network.tokens.length === 0
        ) {
            config.fakeERC20Network.tokens = defaultSettings.tokens;
        }

        //If no defaultMintAmount, then add it
        if (!config.fakeERC20Network.defaultMintAmount) {
            config.fakeERC20Network.defaultMintAmount =
                defaultSettings.defaultMintAmount;
        }
    }
);

task(
    TASK_NAME,
    "Deploys fake ERC20 tokens to your localhost network"
).setAction(async (_, hre) => {
	deployTokens(hre);
});
