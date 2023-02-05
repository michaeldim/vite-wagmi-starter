import { useAccount, useContractRead } from 'wagmi'

import { useGeistLendingPoolContract } from '../useGeistLendingPoolContract'

export const useGeist = () => {
  const { address } = useAccount()
  const geistLendingPoolContract = useGeistLendingPoolContract()

  const { data, isLoading, isError } = useContractRead({
    ...geistLendingPoolContract,
    functionName: 'getUserAccountData',
    args: ['0x7bdfE11c4981Dd4c33E1aa62457B8773253791b3'],
    watch: true,
  })

  return { data, isError, isLoading }
}
