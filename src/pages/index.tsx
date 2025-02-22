import { formatAmount } from '@did-network/dapp-sdk'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAccount, useBalance } from 'wagmi'

import { NetworkSwitcher } from '@/components/SwitchNetworks'
import { WalletModal } from '@/components/WalletModal'

const Home = () => {
  const navigator = useNavigate()
  const { address } = useAccount()
  const { data: balance } = useBalance({
    address,
  })

  const [show, setShow] = useState(false)

  const onCancel = () => {
    setShow(false)
  }

  return (
    <div className="App relative p-4 lt-md:p-8 min-h-screen flex-col-center">
      <a
        href="https://github.com/fisand/vite-antd-seed"
        target="_blank"
        className="absolute top-6 right-10 text-#aaa hover:text-black"
      >
        <span className="inline-flex w-8 h-8 i-carbon:logo-github"></span>
      </a>
      <a href="https://github.com/zouhangwithsweet" target="_blank">
        <img
          src="https://zouhaha-blog-next.vercel.app/logo.png"
          alt=""
          className="w-32 rounded-full mb-10 shadow hover:shadow-blue-300"
        />
      </a>
      <p className="text-3xl font-bold underline hover:text-blue-300">Hello Vite + React + Wagmi Dapp!</p>
      <p className="text-center">
        {address} <br /> {formatAmount(balance?.formatted)}
      </p>
      <p className="flex gap-4">
        <Button type="primary" onClick={() => setShow(true)} className="flex items-center">
          {address ? 'disconnect' : 'connect'} <span className="i-carbon:cookie"></span>
        </Button>
      </p>
      <div>
        <NetworkSwitcher />
      </div>
      <p>
        <a onClick={() => navigator('/about')}>About</a>
        {' | '}
        <a onClick={() => navigator('/geist')}>Geist</a>
        {' | '}
        <a onClick={() => navigator('/granary')}>Granary</a>
        {' | '}
        <a onClick={() => navigator('/tarot')}>Tarot</a>
      </p>

      <WalletModal open={show} onCancel={onCancel} />
    </div>
  )
}

export default Home
