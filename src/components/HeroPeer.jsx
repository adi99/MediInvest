import { setGlobalState, useGlobalState } from '../store'
const Hero = () => {
  const [stats] = useGlobalState('stats')

  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6">
      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold
      tracking-tight mb-12"
      >
        <span className="capitalize">Peer Review Projects on</span>
        <br />
        <span className="uppercase text-green-600">MediInvest</span>
      </h1>
    </div>
  )
}

export default Hero
