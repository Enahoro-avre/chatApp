import { updateCurrentUser } from 'firebase/auth'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'
import add from "../image/add.jpg"
import more from "../image/more.jpg"
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Navigate } from 'react-router-dom'

function Input() {

  const navigate = Navigate()

  const [ text , setText ] = useState("")
  const [ img , setImg ] = useState(null)

  const {currentUser} = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {

    if (img) {

    const storageRef = ref(storage, uuid);
 
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
    (error) => {
      //  setErr(true)
    }, 
    () => {
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc , (db , "chats" , data.chatId), {
          messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.uid,
            date:Timestamp.now(),
            img:downloadURL

          })
        })

      });
  }

);

    }else {
      await updateDoc(doc , (db , "chats" , data.chatId), {
        messages:arrayUnion({
          id:uuid,
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
      })
    }

    await updateDoc(doc (db , "userChats" , currentUser.uid), {
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.uid + ".date"]:serverTimestamp()
    })

    await updateDoc(doc (db , "userChats" , data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.uid + ".date"]:serverTimestamp(),
    })

    setText("")
    setImg(null)
  }

  return (
    <div className='input'>
        <input type="text" placeholder='Type Message...' onChange={e=> setText(e.target.value)} value={text}/>
        <div className="send">
            <img src={more} alt="Imagee" />
            <input type="text" style={{display:"none"}} id="file" onChange={e => setImg(e.target.file[0])}/>
            <label htmlFor="file">
                <img src={add} alt="Imagee" />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input