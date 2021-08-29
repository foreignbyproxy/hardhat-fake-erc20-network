import { extendConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";

import { deployTokens } from "./tasks";
import { defaultSettings, TASK_NAME } from "./utils";

import "./type-extensions";
import type { HardhatConfig, HardhatUserConfig } from "hardhat/types";

extendConfig(
    (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
		//Merge default settings and userConfig for fakeERC20Network
		config.fakeERC20Network = {
			...defaultSettings,
			...userConfig.fakeERC20Network
		}
    }
);

task(
    TASK_NAME,
    "Deploys fake ERC20 tokens to your localhost network"
).setAction(deployTokens);
