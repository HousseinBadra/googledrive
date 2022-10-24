import React, { createContext, useContext,useEffect,useState } from 'react'
import { createUserWithEmailAndPassword, signOut, updateEmail,updatePassword } from 'firebase/auth'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { sendPasswordResetEmail } from 'firebase/auth'

const Authcontext=createContext()

export function useAuth(){
    return useContext(Authcontext)
}

const  AuthProvider=({children})=>{

const [currentUser,setcurrentUser]=React.useState()
const [loading,setloading]= useState(true)

function signup(email,password){
   return createUserWithEmailAndPassword(auth,email,password)
}

function loguser(email,password){
   return signInWithEmailAndPassword(auth,email,password)
}

function logout(){
  return signOut(auth)
}

function resetpassword(email){
 return sendPasswordResetEmail(auth,email)
}
function setEmail(email){
return updateEmail(currentUser,email)
}

function updatepassword(password){
return updatePassword(currentUser,password)
}

useEffect(()=>{
 const unsubscribe= auth.onAuthStateChanged((user)=>{
    setcurrentUser(user)
    setloading(false)
 })
 return unsubscribe
},[])
const value={
    currentUser,
    signup,
    loguser,
    logout,
    resetpassword,
    setEmail,
    updatepassword
}
return ( < Authcontext.Provider value={value}>
   {loading ? null : children}
   </Authcontext.Provider>
  
  )
}

export default AuthProvider