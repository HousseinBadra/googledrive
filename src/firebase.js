import 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore,collection, serverTimestamp} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const app=initializeApp({
        apiKey: "AIzaSyCQOxwkXVRHpBBlu4MfROxWQMCw0gRLBXI",
        authDomain: "auth-test-d3288.firebaseapp.com",
        projectId: "auth-test-d3288",
        storageBucket: "auth-test-d3288.appspot.com",
        messagingSenderId: "873315546129",
        appId: "1:873315546129:web:02df5f584aa330fe9c6db0"
     
})
export const auth=getAuth(app)
export const firestore=getFirestore(app)
export const storage = getStorage(app)

export const database={
        folders:collection(firestore,'folders'),
        files:collection(firestore,'files'),
        getCurrentTimestamp:serverTimestamp,
        formatdoc: (doc)=> {return {
                id:doc.id,
                ...doc.data()
            }}
}
export default app