import { Button, Form, Input, Select } from 'antd'
import { BigNumber, utils } from 'ethers'
import { useAccount, useBalance } from 'wagmi'
import type { FetchBalanceResult } from 'wagmi/actions'

import { useGranary } from '@/hooks/useGranary'
import { useERC20Balance } from '@/hooks/useTokenBalance'

import { DepositComponent } from './components/DepositComponent'
import { RepayComponent } from './components/RepayComponent'

const Granary = () => {
  const { data, isLoading, isError } = useGranary()
  const { address } = useAccount()

  const gUsdBal = useERC20Balance(
    '0x0638546741f12fA55F840A763A5aEF9671C74Fc1',
    '0x7bdfe11c4981dd4c33e1aa62457b8773253791b3'
  )

  const ftmDebtBal = useERC20Balance(
    '0x0f7f11AA3C42aaa5e653EbEd07220B4392a976A4',
    '0x7bdfe11c4981dd4c33e1aa62457b8773253791b3'
  )

  const usdcBalance = useERC20Balance('0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', address)

  const { data: ftmBalance } = useBalance({
    address,
  })

  if (isLoading) {
    return <h1>isLoading</h1>
  } else if (data) {
    return (
      <div>
        <h1>Granary {Number(utils.formatEther(data.healthFactor)).toFixed(3)} Health Factor</h1>
        <h2>
          Deposited {Number(gUsdBal?.formatted).toFixed(2)} {gUsdBal?.symbol}
        </h2>

        <h2>
          Borrowed {Number(ftmDebtBal?.formatted).toFixed(2)} {ftmDebtBal?.symbol}
        </h2>

        <h2>
          {ftmBalance?.formatted} {ftmBalance?.symbol}
        </h2>

        <h2>
          {usdcBalance?.formatted} {usdcBalance?.symbol}
        </h2>
        {usdcBalance && <DepositComponent {...usdcBalance} />}
        {ftmBalance && <RepayComponent {...ftmBalance} />}
      </div>
    )
  }
}

export default Granary
