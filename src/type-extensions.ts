import "hardhat/types/config";
import "hardhat/types/runtime";

import type { IFakeERC20Network } from './types';

/*
	Extends the HardhatConfig and HardhatUserConfig with the fakeERC20Network types
*/
declare module "hardhat/types/config" {
	export interface HardhatConfig {
		fakeERC20Network: IFakeERC20Network
    }

	export interface HardhatUserConfig {
		fakeERC20Network?: IFakeERC20Network
	}
}
