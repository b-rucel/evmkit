
# pulsechain scripts

This directory contains several scripts for interacting with the Pulsechain network.


### 1. `current.block.js`

**Purpose:** This script fetches and displays the latest block number on the Pulsechain network.

**Logic:**
- It uses `ethers.js`'s `JsonRpcProvider` to connect to the Pulsechain RPC endpoint (`https://rpc-pulsechain.g4mm4.io`).
- The `getLatestBlock` asynchronous function calls `provider.getBlockNumber()` to retrieve the current block number.


### 2. `gasfee.js`

**Purpose:** This script retrieves the current gas price on Pulsechain and formats it into millibeats (mB).

**Logic:**
- It uses `ethers.js`'s `JsonRpcProvider` to connect to the Pulsechain RPC endpoint (`https://rpc-pulsechain.g4mm4.io`).
- The `formatGasPrice` function takes a gas amount in Wei, converts it to Ether using `ethers.formatEther`, and then multiplies by 1000 to represent it in millibeats, formatted to 3 decimal places.
- The `main` function fetches the fee data using `provider.getFeeData()`.
- It then extracts the `gasPrice` from the fee data (defaulting to `BigInt(0)` if not available) and logs the formatted gas price.


### 3. `pls.price.js`

**Purpose:** This script interacts with the PulseX router to determine the price of 1 PLS (Pulsechain) in DAI (Dai Stablecoin).

**Logic:**
- Connects to the Pulsechain RPC.
- Defines the ABI for the `getAmountsOut` function of a Uniswap V2-like router.
- Specifies the contract addresses for Wrapped PLS (WPLS) and DAI tokens.
- The `formatNumber` function converts a BigInt amount to a fixed-point number with 10 decimal places.
- In the `main` function:
    - It initializes an `ethers.Contract` instance for the PulseX router.
    - It defines `onePls` as 1 PLS in Wei.
    - It sets up a `path` array for the token swap from WPLS to DAI.
    - It calls `pulsex_router.getAmountsOut(onePls, path)` to get the output amounts for the swap.
    - It logs the raw amounts array, then the formatted amount of 1 PLS (which should be 1), and finally the formatted amount of DAI received for 1 PLS.
    - There's an additional calculation to adjust the DAI amount, suggesting a known offset or correction for the price.

**Important Details:**
- Interacts with the PulseX router at address `0x165C3410fC91EF562C50559f7d2289fEbed552d9`.
- Uses specific token addresses for WPLS (`0xA1077a294dDE1B09bB078844df40758a5D0f9a27`) and DAI (`0xefD766cCb38EaF1dfd701853BFCe31359239F305`).
- The `getAmountsOut` function is crucial for price discovery on decentralized exchanges.
- The final `console.log` for DAI includes a hardcoded adjustment (`+ ethers.parseEther('0.000000191')`). This adjustment is made because dexscreener shows slightly different values.