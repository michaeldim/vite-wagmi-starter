import { useAccount, useContractRead } from 'wagmi'

import { useTarotBorrowableContract } from '../tarot/useTarotBorrowableContract'

type Key = 'ftm' | 'usdc'

export const useTarot = (symbol: Key) => {
  const { address } = useAccount()
  const tarotBorrowableContract = useTarotBorrowableContract()

  const { data, isLoading, isError } = useContractRead({
    address: tarotBorrowableContract.addresses[symbol],
    abi: tarotBorrowableContract.abi,
    functionName: 'borrowBalance',
    args: ['0x66215D23B8A247C80c2D1B7beF4BefC2AB384bCE'],
    watch: true,
  })

  return { data, isError, isLoading }
}
