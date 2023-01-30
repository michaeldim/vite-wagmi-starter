import { Address, useAccount, useBalance } from 'wagmi'

export const useERC20Balance = (tokenAddress: Address, accountAddress?: Address) => {
  const account = useAccount()
  const { data } = useBalance({
    token: tokenAddress,
    address: accountAddress || account.address,
  })

  return data
}
