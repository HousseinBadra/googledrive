import React , {useState} from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { database } from '../../firebase'
import { addDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/auth'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function AddFolderButton({currentFolder}) {
 
    const [ismodalopen,setmodal]=useState(false)
    const [name,setname] = React.useState('')
    const {currentUser}=useAuth()

   
    // const basepath=currentFolder.id===ROOT_FOLDER.id ? [] : [...currentFolder.path,{name:currentFolder.name,id:currentFolder.id}]
    
    function togglemodal(){
      setmodal((old) => !old)
    }
     function handlesubmit(e){
        e.preventDefault()

        if (currentFolder == null) return 

        addDoc(database.folders,{
         name:name,
         parentId:currentFolder.id,
         userId:currentUser.uid,
        path:currentFolder.id===ROOT_FOLDER.id ? [] : [...currentFolder.path,{name:currentFolder.name,id:currentFolder.id}],
         createdAt:database.getCurrentTimestamp()
        })
        setname('')
        togglemodal()
    }
  return (
    <>
   <Button onClick={togglemodal} variant='outline-success' size='sm' className='m-2'>
    <FontAwesomeIcon icon={faFolderPlus}></FontAwesomeIcon>
   </Button>
   <Modal show={ismodalopen} onHide={togglemodal}>
    <Form onSubmit={handlesubmit}>
        <Modal.Body>
            <Form.Group>
                <Form.Label>Folder name</Form.Label>
                <Form.Control type='text' required value={name} onChange={(e)=>{setname(e.target.value)}}></Form.Control>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={togglemodal}>Close</Button>
            <Button variant='success' type='submit'>Add folder</Button>
        </Modal.Footer>
    </Form>
   </Modal>
   </>
  )
}
