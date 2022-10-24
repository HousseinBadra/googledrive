import { useEffect, useReducer } from "react";
import { getDoc,doc, onSnapshot, query, where } from 'firebase/firestore'
import { useAuth } from '../contexts/auth'
import { firestore } from "../firebase";
import { database } from "../firebase";

const ACTIONS={SELECT_FOLDER:'SELECT-FOLDER',
UPDATE_FOLDER:'UPDATE-FOLDER',
SET_CHILD_FOLDERS:'SET_CHILD_FOLDERS',
SET_CHILD_FILES:'SET_CHILD_FILES'}

export const ROOT_FOLDER={name:'ROOT',id:null,path:[]}

function reducer(state,{type,payload}){
 switch(type){
    case ACTIONS.SELECT_FOLDER:    
        return {folderId:payload.folderId,
            folder:payload.folder,
            childFolders:[],
            childFiles:[]
          }
    case ACTIONS.UPDATE_FOLDER:
       
        return {...state,folder:payload.folder}
    case ACTIONS.SET_CHILD_FOLDERS:
        return {...state,childFolders:payload.childFolders}   
    case ACTIONS.SET_CHILD_FILES:
        return {...state,childFiles:payload.childFiles}  
    default:
         return state
 }
}

export function useFolder(folderId = null,folder=null){
    const [state,dispatch]=useReducer(reducer,{
      folderId,
      folder,
      childFolders:[],
      childFiles:[]
    })

    const {currentUser}=useAuth()

   useEffect(()=>{
    dispatch({type:ACTIONS.SELECT_FOLDER,payload:{folderId,folder}})
   },[folder,folderId])

   useEffect(()=>{
    if (folderId == null){
        return dispatch({
            type:ACTIONS.UPDATE_FOLDER,
            payload:{folder:ROOT_FOLDER}
        })
    }
    const docref=doc(firestore,'folders',folderId)
    getDoc(docref).then((doc)=>{
      
        dispatch({
            type:ACTIONS.UPDATE_FOLDER,
            payload:{folder:database.formatdoc(doc)}
        })
    }).catch(()=>{
        dispatch({
            type:ACTIONS.UPDATE_FOLDER,
            payload:{folder:ROOT_FOLDER}
        })
    })
   },[folderId])
   useEffect(()=>{
    const q=query(database.folders,where('userId', '==', currentUser.uid))
    const clean=onSnapshot(q,(snapshot)=>{
        const data=snapshot.docs.map(elem=>database.formatdoc(elem)).filter(elem=>{
            return elem.parentId===folderId
        })
        
        dispatch({type:ACTIONS.SET_CHILD_FOLDERS,
        payload:{childFolders:data}})
    })
  return ()=>clean()
   },[folderId,currentUser])
   useEffect(()=>{
    const q=query(database.files,where('userId', '==', currentUser.uid))
    const clean=onSnapshot(q,(snapshot)=>{
        const data=snapshot.docs.map(elem=>database.formatdoc(elem)).filter(elem=>{
            return elem.folderId===folderId 
        })
        
        dispatch({type:ACTIONS.SET_CHILD_FILES,
        payload:{childFiles:data}})
    })
  return ()=>clean()
   },[folderId,currentUser])
return state
}