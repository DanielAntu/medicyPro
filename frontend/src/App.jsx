import './App.css'
import { Outlet } from 'react-router-dom'

// components
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
      <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
