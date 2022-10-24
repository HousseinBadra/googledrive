import React from 'react'
import {Container} from 'react-bootstrap'

export default function AuthContainer({children}) {
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight:'100vh'}}>
        <div style={{maxWidth:'400px'}}> 
        {children}
        </div></Container>
  )
}
