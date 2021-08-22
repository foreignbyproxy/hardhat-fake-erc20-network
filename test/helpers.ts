import path from "path";
import decache from "decache";
import { resetHardhatContext } from "hardhat/plugins-testing";

import type{ HardhatRuntimeEnvironment } from "hardhat/types";

declare module "mocha" {
    interface Context {
        hre: HardhatRuntimeEnvironment;
    }
}

export function useEnvironment(fixtureProjectName: string) {
    beforeEach("Loading hardhat environment", function () {
        process.chdir(
            path.join(__dirname, "test-projects", fixtureProjectName)
        );

		//Makes sure that Hardhat is not cached and it loads a fresh config every test. This was
		//causing issues where tests would have the wrong config loaded.
        decache("hardhat");
        this.hre = require("hardhat");
    });

    afterEach("Resetting hardhat", function () {
        resetHardhatContext();
    });
}
