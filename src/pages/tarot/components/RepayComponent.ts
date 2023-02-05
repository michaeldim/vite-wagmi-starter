import { BigNumber, utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import type { FetchBalanceResult } from 'wagmi/actions'

import { useGeistLendingPoolContract } from '@/hooks/useGeistLendingPoolContract'
import { useWethGatewayContract } from '@/hooks/useWethGatewayContract'

type RepayEthParams = {
  lendingPool: `0x${string}`
  amount: BigNumber
  rateMode: BigNumber
  onBehalfOf: `0x${string}`
}

export const RepayComponent = (ftmBalance: FetchBalanceResult) => {
  return <div></div>
}
