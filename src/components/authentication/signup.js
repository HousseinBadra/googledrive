import React from 'react'
import {Card , Button , Form, Alert} from "react-bootstrap"
import { useRef } from 'react'
import { useAuth } from '../../contexts/auth'
import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import AuthContainer from './authContainer'

export default function Signup() {
    const emailref=useRef()
    const passwordref=useRef()
    const passwordconfirmationref=useRef()
    const {signup}=useAuth()
    const history=useNavigate()
  
    const [error,seterror]=useState('')
    const [loading,setloading]=useState(false)

    async function handlesubmit(e){
        e.preventDefault()
        if(passwordref.current.value !== passwordconfirmationref.current.value){
         return seterror('Passwords do not match')
        }
        try{seterror('')
        setloading(true)
     
            await signup(emailref.current.value,passwordref.current.value)
            history('/login')
        }
        catch{
           seterror('failed to create an account')
        }
        setloading(false)
    }

  return (
   <AuthContainer>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign up</h2>
            {error ? <Alert variant='danger'>{error}</Alert> :null}
            <Form onSubmit={handlesubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailref} type='email' required></Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordref} type='password' required></Form.Control>
                </Form.Group>
                <Form.Group id='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control ref={passwordconfirmationref} type='password' required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className='w-100' type='submit'>Sign up</Button> 
            </Form>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Log in</Link>
            </div>
        </Card.Body>
      </Card>
   </AuthContainer>
  )
}
