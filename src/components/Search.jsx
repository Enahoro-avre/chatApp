import React from 'react'
import { useState } from 'react'
import profile from "../image/profile.jpg"
import { collection, query, where , getDocs, doc, setDoc , updateDoc, serverTimestamp , getDoc } from "firebase/firestore";
import { db } from "../firebase"
// import { async } from '@firebase/util';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Search() {

  const [username , Setusername] = useState('')
  const [user , Setuser] = useState(null)
  const [err , Seterr] = useState(false) 
  
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db , "users"),
      where("displayName", "==" , username)
    )

    try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          Setuser(doc.data())
        });
    } catch(err) {
      Seterr(true)
    }
    

  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch()
    // e.target.value = ''
  }

  const handleSelect = async() => {
    // check if the chat coversation exists in firestore , if not create one..
    const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc( db , "chats" , combinedID))

      if(!res.exists()){
        // creat a chat in chat collection
        await setDoc(doc  (db , "chats" , combinedID),{messages:[]})

        // Create user chats
        await updateDoc(doc (db , "userChats" , currentUser.uid ),{
          [combinedID+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            PhotoURL:user.PhotoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        }); 
 
         // Create user chats
        await updateDoc(doc (db , "userChats" , user.uid ),{
          [combinedID+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            PhotoURL:currentUser.PhotoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        })
      }
    }catch (err) {

    }
    Setuser(null)
    // Setusername("")
    
  }
  return (
    <div className='search'>
        <div className="searchForm">
            <input type="text" 
            placeholder='Find a user'
            onKeyDown={handleKey}
            onChange={e=>Setusername(e.target.value)}
            value={username}

            />
        </div>
        {err && <span>User not found</span>}
        { user && <div className="userChat" onClick={handleSelect}>
            <img src={user.PhotoURL} alt="" />
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search