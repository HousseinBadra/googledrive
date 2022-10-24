import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { Link } from 'react-router-dom'

export default function FolderBreadcrumb({currentFolder}) {

const path=currentFolder ? currentFolder===ROOT_FOLDER ? [] : [ROOT_FOLDER,...currentFolder.path] : []


  return (
    <Breadcrumb className='flex-grow-1' listProps={{className:'bg-white m-0 p-2'}}>
        {path.map((elem,index)=>(<Breadcrumb.Item 
        className='text-truncate d-inline-block '
        style={{maxWidth:'200px'}} 
        key={elem.id}
        linkAs={Link}
        linkProps={{to:elem.id===ROOT_FOLDER.id ? '/' :`/folder/${elem.id}`,
                   state:{folder:{...elem,path:path.slice(1,index)}}}}
        >
        {elem.name}
        </Breadcrumb.Item>)
    )}
    {currentFolder && <Breadcrumb.Item 
    className='text-truncate d-inline-block '
    style={{maxWidth:'200px'}} 
    active>
    {currentFolder.name}
    </Breadcrumb.Item>}
    </Breadcrumb>
  )
}
