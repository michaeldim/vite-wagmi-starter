import { useAccount, useContractRead } from 'wagmi'

import { useGranaryLendingPoolContract } from './useGranaryLendingPoolContract'

export const useGranary = () => {
  const { address } = useAccount()
  const GranaryLendingPoolContract = useGranaryLendingPoolContract()

  const { data, isLoading, isError } = useContractRead({
    ...GranaryLendingPoolContract,
    functionName: 'getUserAccountData',
    args: ['0x7bdfE11c4981Dd4c33E1aa62457B8773253791b3'],
    watch: true,
  })

  return { data, isError, isLoading }
}
