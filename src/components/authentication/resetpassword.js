import React from 'react'
import {Card , Button , Form, Alert} from "react-bootstrap"
import { useRef } from 'react'
import { useAuth } from '../../contexts/auth'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import AuthContainer from './authContainer'


export default function Forgetpassword() {
    const emailref=useRef()
    
  
    const {resetpassword}=useAuth()
   
  
    const [error,seterror]=useState('')
    const [loading,setloading]=useState(false)
    const [message,setmessage]=useState('')

    async function handlesubmit(e){
        e.preventDefault()
        try{seterror('')
            setloading(true)
            setmessage('')
            await resetpassword(emailref.current.value)
            setmessage('Check your inbox for furthur instructions')
        }
        catch{
           seterror('failed to reset password')
        }
        setloading(false)
    }

  return (
   <AuthContainer>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Reset password</h2>
            {error ? <Alert variant='danger'>{error}</Alert> :null}
            {message ? <Alert variant='success'>{message}</Alert> :null}
            <Form onSubmit={handlesubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailref} type='email' required></Form.Control>
                </Form.Group>
               
                
                <Button disabled={loading} className='w-100' type='submit'>Reset password</Button> 
            </Form>
            <div className='w-100 text-center mt-3'>
                 <Link to='/login'>Sign in</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
                Don't have an account ? <Link to='/signup'>Signup</Link>
            </div>
            </AuthContainer>
  )
}