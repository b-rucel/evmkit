const { JsonRpcProvider } = require('ethers')
const { ethers } = require('ethers')

const rpcurl = 'https://rpc-pulsechain.g4mm4.io'
const provider = new JsonRpcProvider(rpcurl)

function formatGasPrice(gasInWei) {
  const gasPrice = Number(ethers.formatEther(gasInWei.toString()))
  return (gasPrice * 1000).toFixed(3)
}

async function main() {
  const feeData = await provider.getFeeData()
  const gasPrice = feeData.gasPrice ?? BigInt(0)

  console.log(`Pulsechain gas: ${formatGasPrice(gasPrice)} mB`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
