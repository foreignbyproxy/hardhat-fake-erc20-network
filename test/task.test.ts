import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";
import sinon from "sinon";

import mute from "mute";

chai.use(chaiAsPromised);
chai.use(jestSnapshotPlugin());

import { useEnvironment } from "./helpers";

import * as utils from "../src/utils";

describe("Task", function () {
    useEnvironment("full-config");

    let getInitialUserDataSPY = sinon.spy(utils, "getInitialUserData");
    let getTaskResultsDisplaySPY = sinon.spy(utils, "getTaskResultsDisplay");

    afterEach(function () {
        sinon.reset();
    });

    after(function () {
        sinon.restore();
    });

    it("Task - Throws if local network not detected and exits", async function () {
        let ethersGetSignersSPY = sinon.spy(this.hre.ethers, "getSigners");
        let ethersContractFactorySPY = sinon.spy(
            this.hre.ethers,
            "ContractFactory"
        );

        await expect(this.hre.run(utils.TASK_NAME)).to.be.rejectedWith(Error);

        // Expect the task to end so the following functions are not called
        expect(ethersGetSignersSPY.called).to.equal(false);
        expect(ethersContractFactorySPY.called).to.equal(false);
        expect(getInitialUserDataSPY.called).to.equal(false);
    });

    it("Task - Task completes successfully", async function () {
        const tokenNumber = this.hre.config.fakeERC20Network.tokens.length;
        let ethersContractFactorySPY = sinon.spy(
            this.hre.ethers,
            "ContractFactory"
        );

        //Setup stubs and spies5
        sinon.stub(console, "log");

        const checkLocalhostNetworkSTUB = sinon
            .stub(utils, "checkLocalhostNetwork")
            .returns(Promise.resolve(true));

        /*
			Run task

			Note: Using mute package to suppress the output from Ora.
			Ora uses process.stderr.write instead of console.log.
		*/
        let unmute = mute();
        await this.hre.run(utils.TASK_NAME).finally(unmute);

        //Tests
        expect(checkLocalhostNetworkSTUB.called).to.equal(true);
        expect(ethersContractFactorySPY.called).to.equal(true);
        expect(getInitialUserDataSPY.callCount).to.equal(tokenNumber);
        expect(getTaskResultsDisplaySPY.calledOnce).to.equal(true);
        expect(getTaskResultsDisplaySPY.firstCall.args[0]).toMatchSnapshot();

        checkLocalhostNetworkSTUB.restore();
    });
});
