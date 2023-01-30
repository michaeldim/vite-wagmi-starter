import { Button, Form, Input, Select } from 'antd'
import { BigNumber, utils } from 'ethers'
import { useAccount, useBalance } from 'wagmi'
import type { FetchBalanceResult } from 'wagmi/actions'

import { useGeist } from '@/hooks/useGeist'
import { useERC20Balance } from '@/hooks/useTokenBalance'

import { DepositComponent } from './components/DepositComponent'
import { RepayComponent } from './components/RepayComponent'

const Geist = () => {
  const { data, isLoading, isError } = useGeist()
  const { address } = useAccount()

  const gUsdBal = useERC20Balance(
    '0xe578C856933D8e1082740bf7661e379Aa2A30b26',
    '0x7bdfe11c4981dd4c33e1aa62457b8773253791b3'
  )

  const ftmDebtBal = useERC20Balance(
    '0x53d01d351Fa001DB3c893388E43e3C630A8764F5',
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
        <h1>{Number(utils.formatEther(data.healthFactor)).toFixed(3)} Health Factor</h1>
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

export default Geist
