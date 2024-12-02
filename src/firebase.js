import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {
    addDoc,
    collection,
    getFirestore
} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyA8lOnXJoJm_DKOXAwWBLxv2JPa56I0WRM",
    authDomain: "netflix-clone-c45b6.firebaseapp.com",
    projectId: "netflix-clone-c45b6",
    storageBucket: "netflix-clone-c45b6.firebasestorage.app",
    messagingSenderId: "70743825882",
    appId: "1:70743825882:web:f43534b7180a88bacab4e3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}
// const logout = async () => {
//     signOut(auth)
// }

const logout = async () => {
    try {
        await signOut(auth)
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error during sign out:", error);
    }
}

export { auth, db, login, signup, logout }