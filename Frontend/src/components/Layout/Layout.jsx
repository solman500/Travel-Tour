import React from 'react'
import Header from '../Header/Header'
import Router from '../../router/router'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <>
      <Header/>
      {/* <main> */}
        
      <Router/>
      {/* </main> */}
      <Footer/>

    </>
  )
}

export default Layout
