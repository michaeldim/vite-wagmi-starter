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
  const wethGatewayContract = useWethGatewayContract()

  const repayEthParams: RepayEthParams = {
    lendingPool: '0x9FAD24f572045c7869117160A571B2e50b10d068',
    amount: ftmBalance.value.sub(utils.parseEther('10')),
    rateMode: BigNumber.from('2'),
    onBehalfOf: '0x7bdfE11c4981Dd4c33E1aa62457B8773253791b3',
  }

  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    ...wethGatewayContract,
    functionName: 'repayETH',
    args: [repayEthParams.lendingPool, repayEthParams.amount, repayEthParams.rateMode, repayEthParams.onBehalfOf],
    overrides: {
      value: repayEthParams.amount,
    },
  })

  const { data, write, isLoading: iisWriteLoading } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const pending = `Repaying ${utils.formatEther(repayEthParams.amount)} ${ftmBalance.symbol}, from: ${address} to ${
    repayEthParams.onBehalfOf
  })}`

  return (
    <div>
      <code>{iisWriteLoading ? pending : ''}</code>
      <button disabled={!write || isLoading} onClick={() => write?.()}>
        {isLoading ? 'Repaying FTM...' : 'Repay FTM'}
      </button>
      {isSuccess && (
        <div>
          Successfully repayed Geist FTM debt!
          <div>
            <a href={`https://ftmscan.io/tx/${data?.hash}`}>ftmscan</a>
          </div>
        </div>
      )}
    </div>
  )
}
