import { Button, Form, Input, Select } from 'antd'
import { BigNumber, utils } from 'ethers'
import { useAccount, useBalance } from 'wagmi'
import type { FetchBalanceResult } from 'wagmi/actions'

import { useTarot } from '@/hooks/tarot/useTarot'
import { useERC20Balance } from '@/hooks/useTokenBalance'

// import { DepositComponent } from './components/DepositComponent'
import { RepayTarotComponent } from './components/RepayTarotComponent'

const Tarot = () => {
  const { data, isLoading, isError } = useTarot('ftm')
  const { data: usdcData, isLoading: usdcLoading, isError: usdcIsLoading } = useTarot('usdc')

  const { address } = useAccount()

  const { data: ftmBalance } = useBalance({
    address,
  })

  if (isLoading && usdcLoading) {
    return <h1>isLoading</h1>
  } else if (data && usdcData) {
    return (
      <div>
        <h1>Tarot Debt's</h1>
        {ftmBalance && (
          <h2>
            This wallet: {address} | {utils.formatEther(ftmBalance.value)}
          </h2>
        )}
        <h2>{Number(utils.formatEther(data)).toFixed(2)} FTM</h2>
        <h2>{Number(utils.formatUnits(usdcData, 6)).toFixed(2)} USDC </h2>

        {ftmBalance && <RepayTarotComponent {...ftmBalance} />}
      </div>
    )
  }
}

export default Tarot
