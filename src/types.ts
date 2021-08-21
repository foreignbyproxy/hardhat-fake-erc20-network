export interface IFakeERC20Network {
	tokens: Token[]
	defaultMintAmount: string
}

export interface Token {
	name: string
	symbol: string
	defaultMintAmount?: string
}

export interface InitialUserData {
	userAddress: string
	initialBalance: string
}
