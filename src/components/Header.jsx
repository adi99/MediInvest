import { TbBusinessplan } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header
      className="flex justify-between items-center
        p-5 bg-white shadow-lg fixed top-0 left-0 right-0"
    >
      <Link
        to="/"
        className="flex justify-start items-center
      text-xl text-black space-x-1"
      >
        <span>MediInvest</span>
        <TbBusinessplan />
      </Link>

      <div className="flex space-x-2">
        <Link
          to="/peer-rev"
          className="inline-block px-6 py-2.5 bg-gray-200
          text-gray-700 font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-gray-300"
        >
          Peer-Review
        </Link>
        <div style={{ width: '200px' }}></div> {/* Space between buttons */}
        <Link
          to="/investor"
          className="inline-block px-6 py-2.5 bg-gray-200
          text-gray-700 font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-gray-300"
        >
          Investor
        </Link>
      </div>

      {connectedAccount ? (
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-green-700"
        >
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-green-600
          text-white font-medium text-xs leading-tight uppercase
          rounded-full shadow-md hover:bg-green-700"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </header>
  )
}

export default Header
