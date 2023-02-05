import { BigNumber, utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils.js'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import type { FetchBalanceResult } from 'wagmi/actions'

import { useTarotRouterContract } from '@/hooks/tarot/useTarotRouterContract'

type RepayEthParams = {
  borrowable: `0x${string}`
  borrower: `0x${string}`
  deadline: BigNumber
}

export const RepayTarotComponent = (ftmBalance: FetchBalanceResult) => {
  const tarotRouterContract = useTarotRouterContract()

  const currentDate = new Date()
  const twentyMinutesLater = BigNumber.from(Math.floor(Date.now() / 1000) + 3600 * 4)

  const repayEthParams: RepayEthParams = {
    borrowable: '0x47c7B3f5Fa0d52Dfd51bB04977235adBE32a3002',
    borrower: '0x66215D23B8A247C80c2D1B7beF4BefC2AB384bCE',
    deadline: twentyMinutesLater,
  }

  const { address } = useAccount()

  const ftmValue = ftmBalance.value.sub(utils.parseEther('10'))

  const { config } = usePrepareContractWrite({
    ...tarotRouterContract,
    functionName: 'repayETH',
    args: [repayEthParams.borrowable, repayEthParams.borrower, repayEthParams.deadline],
    overrides: {
      value: ftmValue,
    },
  })

  const { data, write, isLoading: iisWriteLoading } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const pending = `Repaying ${utils.formatEther(ftmValue)} ${ftmBalance.symbol}, from: ${address} to ${
    repayEthParams.borrower
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
