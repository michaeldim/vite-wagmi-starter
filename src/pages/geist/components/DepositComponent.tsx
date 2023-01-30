import { BigNumber, utils } from 'ethers'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { FetchBalanceResult } from 'wagmi/dist/actions'

import { useGeistLendingPoolContract } from '@/hooks/useGeistLendingPoolContract'

type DepositUsdcParams = {
  asset: `0x${string}`
  amount: BigNumber
  onBehalfOf: `0x${string}`
  referralCode: number
}

export const DepositComponent = (usdcBalance: FetchBalanceResult) => {
  const geistLendingPoolContract = useGeistLendingPoolContract()

  const { address } = useAccount()

  const depositUsdcParams: DepositUsdcParams = {
    asset: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    amount: usdcBalance.value,
    onBehalfOf: '0x7bdfE11c4981Dd4c33E1aa62457B8773253791b3',
    referralCode: 0,
  }

  const { config } = usePrepareContractWrite({
    ...geistLendingPoolContract,
    functionName: 'deposit',
    args: [
      depositUsdcParams.asset,
      depositUsdcParams.amount,
      depositUsdcParams.onBehalfOf,
      depositUsdcParams.referralCode,
    ],
  })

  const { data, write, isLoading: iisWriteLoading } = useContractWrite(config)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const pending = `Depositing ${utils.formatUnits(usdcBalance.value, usdcBalance.decimals)} ${
    usdcBalance.symbol
  }, from: ${address} to ${depositUsdcParams.onBehalfOf})}`

  if (usdcBalance.value.isZero()) {
    return <h2>No USDC balance to use</h2>
  } else {
    return (
      <div>
        <code>{iisWriteLoading ? pending : ''}</code>
        <button disabled={!write || isLoading} onClick={() => write?.()}>
          {isLoading ? 'Depositing...' : 'Deposit USDC'}
        </button>
        {isSuccess && (
          <div>
            Successfully deposited USDC into geist
            <div>
              <a href={`https://ftmscan.io/tx/${data?.hash}`}>Ftmscan</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}
