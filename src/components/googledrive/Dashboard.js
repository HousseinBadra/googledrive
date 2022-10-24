import React from 'react'
import NavbarComponent from './NavbarComponent'
import {Container} from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../../hooks/useFolder'
import Folder from './Folder'
import { useParams ,useLocation} from 'react-router-dom'
import FolderBreadcrumb from './FolderBreadcrumb'
import AddFileButton from './AddFileButton'
import File from './File'

export default function Dashboard() {
  const {folderId} = useParams()
  const {state={}}=useLocation()
  const {folder,childFolders,childFiles}=useFolder(folderId,state? state.folder : null)
  
  return (
    <div>
        <NavbarComponent/>
        <div className='d-flex align-items-center'>
          <FolderBreadcrumb currentFolder={folder}></FolderBreadcrumb>
          <AddFolderButton currentFolder={folder}/>
          <AddFileButton currentFolder={folder}/>
        </div>
        <Container fluid >
            <div className='d-flex flex-wrap'>
            {childFolders.map((child)=><div key={child.id} style={{maxWidth:'250px'}} className='p-2'>
                  <Folder folder={child} />
                  </div>)}            
            </div>    
            <div className='d-flex flex-wrap'>
            {childFiles.map((child)=><div key={child.id} style={{maxWidth:'250px'}} className='p-2'>
                  <File file={child} />
                  </div>)}            
            </div>        
        </Container>
    </div>
  )
}
