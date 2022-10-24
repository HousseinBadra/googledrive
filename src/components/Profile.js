import React from 'react'
import {Card,Button,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/auth'
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import AuthContainer from './authentication/authContainer'

const Profile=()=> {
  
    const [error,seterror]=React.useState('')
    const {currentUser,logout} = useAuth()
    const navigate=useNavigate()
    
   async function handlelogout(){
        seterror('')
        try{
            await logout()
            navigate('/login')
        }
        catch{
            seterror('Failed to logout')
        }
    }

    return (<AuthContainer>
        <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error ? <Alert variant='danger'>{error}</Alert> :null}
            <strong>Email :</strong> {currentUser.email}
            <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
            <div className='w-100 text-center mt-3'>
                <Link to='/'>Drive</Link>
            </div>
        </Card.Body>  
        </Card>
        <div className='w-100 text-center mt-2'>
          <Button variant='link' onClick={handlelogout}>Log out</Button>
        </div>
        </AuthContainer>)
}

export default Profile