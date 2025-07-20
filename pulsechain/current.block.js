require('dotenv').config()
const { JsonRpcProvider } = require('ethers')

const rpcurl = 'https://rpc-pulsechain.g4mm4.io'
const provider = new JsonRpcProvider(rpcurl)

const getLatestBlock = async () => {
  const blockNumber = await provider.getBlockNumber()
  console.log(`Latest block number: \x1b[36m${blockNumber}\x1b[0m`)
}

getLatestBlock()
