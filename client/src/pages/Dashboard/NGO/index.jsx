import React from 'react'
import Header from './Components/Header'
import Sider from './Components/Sider'
import Routes from './pages/Routes'
import { useTabContext } from "../../../contexts/Tab/TabContext"
const NGO = () => {
  const { isOpen, setIsOpen } = useTabContext()
  return (
    <div>
      <Sider />
      <Header />
      <div className='min-h-screen' onClick={() => setIsOpen(false)}>
        <Routes />
      </div>
    </div>
  )
}

export default NGO