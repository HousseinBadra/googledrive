import React from 'react'
import {Card , Button , Form, Alert} from "react-bootstrap"
import { useRef } from 'react'
import { useAuth } from '../../contexts/auth'
import { useState } from 'react' 
import {Link,useNavigate} from 'react-router-dom'
import AuthContainer from './authContainer'


export default function Updateprofile() {
    const emailref=useRef()
    const passwordref=useRef()
    const passwordconfirmationref=useRef()
    const {currentUser,setEmail,updatepassword}=useAuth()
    const history=useNavigate()
  
    const [error,seterror]=useState('')
    const [loading,setloading]=useState(false)

     function handlesubmit(e){
        e.preventDefault()
        seterror('')
        setloading(true)
        if(passwordref.current.value !== passwordconfirmationref.current.value){
         return seterror('Passwords do not match')
        }

const promises=[]
if(emailref.current.value !== currentUser.email){
    promises.push(setEmail(emailref.current.value))
}
if(passwordref.current.value){
    promises.push(updatepassword(passwordref.current.value))
}
Promise.all(promises).then(()=>{
    history('/user')
}).catch(()=>{
    seterror('failed to update profile')
}).finally(()=>{
    setloading(false)
})
    }

  return (
   <AuthContainer>
   <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update profile</h2>
            {error ? <Alert variant='danger'>{error}</Alert> :null}
            <Form onSubmit={handlesubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailref} type='email' required defaultValue={currentUser.email}></Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordref} type='password' placeholder='keep blank to keep the same'></Form.Control>
                </Form.Group>
                <Form.Group id='password-confirm'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control ref={passwordconfirmationref} type='password'  placeholder='keep blank to keep the same'></Form.Control>
                </Form.Group>
                <Button disabled={loading} className='w-100' type='submit'>Update</Button> 
            </Form>
            
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
                 <Link to='/user'>Cancel</Link>
            </div>
            </AuthContainer>
  )
}