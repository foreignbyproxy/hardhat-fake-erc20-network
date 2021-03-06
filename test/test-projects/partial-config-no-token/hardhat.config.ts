// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
    solidity: "0.7.3",
    fakeERC20Network: {
        defaultMintAmount: "70000000000000000000",
    },
};

export default config;
