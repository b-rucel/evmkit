const { JsonRpcProvider } = require('ethers')
const { ethers } = require('ethers')

const rpcurl = 'https://rpc-pulsechain.g4mm4.io'
const provider = new JsonRpcProvider(rpcurl)

const pulsex_router_abi = [
  'function getAmountsOut(uint256 amountIn, address[] memory path) public view returns (uint256[] memory amounts)',
]

const WPLS = '0xA1077a294dDE1B09bB078844df40758a5D0f9a27';
const DAI = '0xefD766cCb38EaF1dfd701853BFCe31359239F305';

function formatNumber(number) {
  return Number(ethers.formatEther(number.toString())).toFixed(10)
}

async function main() {
  const pulsex_router_address = '0x165C3410fC91EF562C50559f7d2289fEbed552d9'

  const pulsex_router = new ethers.Contract(pulsex_router_address, pulsex_router_abi, provider) 

  const onePls = ethers.parseEther('1'); // 1 PLS in wei
     
  // console.log(onePls)
  const path = [WPLS, DAI];

  const amounts = await pulsex_router.getAmountsOut(onePls, path);

  // think its getting amounts for 1 pls
  console.log(amounts)

  // 1 PLS
  console.log(formatNumber(amounts[0]))

  // number of DAI for 1 PLS
  console.log(formatNumber(amounts[1]))


  // can this be a constant since the price is alway off just a little bit
  // console.log(formatNumber(amounts[1] + ethers.parseEther('0.000000091')))
  console.log(formatNumber(amounts[1] + ethers.parseEther('0.000000191')))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
