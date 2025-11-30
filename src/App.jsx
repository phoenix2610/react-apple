import React from 'react'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import ProductViewer from './components/productviewer.jsx'
import Showcase from './components/showcase.jsx'
import Performance from './components/performance.jsx'
import Features from './components/features.jsx'
import Highlights from './components/Highlights.jsx'
import Footers from './components/footers.jsx'

const App = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footers />
    </main>
  )
}

export default App