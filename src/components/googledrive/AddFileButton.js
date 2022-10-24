import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { storage,database } from '../../firebase'
import { useAuth } from '../../contexts/auth'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { ref ,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { addDoc, getDocs, onSnapshot } from 'firebase/firestore'
import ReactDOM from 'react-dom'
import { useState } from 'react'
import { ProgressBar, Toast } from 'react-bootstrap'
import { uuidv4 } from '@firebase/util'
import { where,query,getDoc } from 'firebase/firestore'
export default function AddFileButton({currentFolder}) {
   const [uploadingFiles,setuploadingFiles]=useState([])
   const {currentUser} = useAuth()

  function handleUpload(e){
   const file=e.target.files[0]
   if (file == null || currentFolder == null) return

   const id=uuidv4()
   setuploadingFiles((prev)=>{return [...prev,{id:id,name:file.name,progress:0,error:false}]})
   
   const currentfolderpath= currentFolder === ROOT_FOLDER ? '' : currentFolder.name
   const path=currentFolder.path.length >0 ? currentFolder.path.map((elem)=>elem.name).join('/') : ''
   const filepath=`/files/${currentUser.uid}${path ? `/${path}` : ''}${currentfolderpath ? `/${currentfolderpath}` : ''}/${file.name}`
   const uploadRef=ref(storage,filepath)
   const uploadTask=uploadBytesResumable(uploadRef,file)

   uploadTask.on('state_changed',(snapshot)=>{
    
    setuploadingFiles((prev)=>{
      return prev.map((elem)=>{
        if (elem.id === id){
          return {...elem,progress:snapshot.bytesTransferred/snapshot.totalBytes}
        }
        return elem
      })
    })
   },()=>{
    setuploadingFiles((prev)=>{
      return prev.map((elem)=>{
        if (elem.id === id){
          return {...elem,error:true}
        }
        return elem
      })
    })
   },()=>{
    setuploadingFiles((prev)=>{
      return prev.filter((elem)=>elem.id !== id)
    })
    const q=query(database.files,where('userId', '==', currentUser.uid),where('name','==',file.name),where('folderId','==',currentFolder.id))
     return onSnapshot(q,(snapshot)=>{
      if(snapshot.docs.length === 0){
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          addDoc(database.files,{url:url,
            name:file.name,
            createdAt:database.getCurrentTimestamp(),
            folderId:currentFolder.id,
            userId:currentUser.uid})
        })
      }
     })
   
    
    
    // getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
    //   addDoc(database.files,{url:url,
    //     name:file.name,
    //     createdAt:database.getCurrentTimestamp(),
    //     folderId:currentFolder.id,
    //     userId:currentUser.uid})
    // })
    
   })
  }

  return (
    <>
    <label className='btn btn-outline-success btn-sm m-0 mr-2'>
        <FontAwesomeIcon icon={faFileDownload}></FontAwesomeIcon>
        <input type='file' onChange={handleUpload} style={{position:'absolute',left:'-999999px',opacity:'0'}}></input>
    </label>
    {uploadingFiles.length  && ReactDOM.createPortal(
      <div
      style={{position:'absolute',
      buttom:'1rem',
      right:'1rem',
      maxWidth:'250px'}}>
       {uploadingFiles.map((elem)=>{
        
        return (<Toast key={elem.id} onClose={()=>{
          setuploadingFiles((prev)=> prev.filter((upload)=>{return elem.id !== upload.id }))
        }}>
          <Toast.Header className='text-truncate w-100 d-block' closeButton={elem.error}>
            {elem.name}
          </Toast.Header>
          <Toast.Body>
          <ProgressBar
          variant={elem.error ? 'danger' : 'primary'}
          animated={!elem.error}
          now={elem.error ? 100 : elem.progress * 100}
          label={elem.error?'Error': `${Math.round(elem.progress*100)}%`}
          ></ProgressBar>
          </Toast.Body> 
        </Toast>)
       })}
      </div>,document.body
    )}
    </>
  )
}
