import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './views/Home'
import Project from './views/Project'
import PeerReview from './views/PeerReview'
import Investor from './views/Investor'
import { isWallectConnected } from './services/blockchain'
import { ToastContainer } from 'react-toastify'
import ProjectPeer from './views/ProjectPeer'
import ProjectInv from './views/ProjectInv'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await isWallectConnected()
    console.log('Blockchain loaded')
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen relative">
      <Header />
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projectpeer/:id" element={<ProjectPeer />} />
          <Route path="/projectinv/:id" element={<ProjectInv />} />
          <Route path="/peer-rev" element={<PeerReview />} />
          <Route path="/investor" element={<Investor />} />
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
