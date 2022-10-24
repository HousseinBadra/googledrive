import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bootstrap"
import { Link } from 'react-router-dom'

export default function Folder({folder}) {
  return (
    <Button as={Link} to={`/folder/${folder.id}`} state={{folder:folder}} variant='outline-dark' className='text-truncate w-100 d-flex justify-content-center align-items-center'><FontAwesomeIcon icon={faFolder} className='m-2'></FontAwesomeIcon>{folder.name} </Button>
  )
}
