import { resetHardhatContext } from "hardhat/plugins-testing";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
import path from "path";

export function useEnvironment(fixtureProjectName: string) {
    beforeEach(async function () {
        process.chdir(
            path.join(__dirname, "test-projects", fixtureProjectName)
        );

        this.hre = require("hardhat");;
    });

    afterEach(function () {
        resetHardhatContext();
    });
}
