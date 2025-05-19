import React from "react";
import { useState } from "react";
import { projectURL } from "./utils/mockdata";

const CreatePost = ({onPostCreated}) => {

    const [newPost,setNewPost] = useState('');

    const userName = localStorage.getItem("loggedUserName");

    const date = new Date(Date.now());
    const FullDate = date.getFullYear()+'-'+ (date.getMonth() + 1) +'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

    const onSubmit = (e) => {
        e.preventDefault();
        
        const userId = localStorage.getItem("loggedUserId");

        const dataInput = {
            imgPath : 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png',
            post:newPost,
            created_by: userId
        };

        const postPath = projectURL + "posts/create";

        try {
            fetch(postPath,{
              headers:{"cors":"no-cors", "Content-Type":"application/json"},
              method: 'POST',
              body: JSON.stringify(dataInput),
            }).then(res=>{
              console.log("res status " + res.status);
              setNewPost('');
              onPostCreated();
            });
        } catch (error) {
            console.log("error "+error);
        }
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center px-40 py-2 rounded-lg bg-gray-150 dark:bg-gray-900">
                    <textarea value={newPost} onChange={(e) => { setNewPost(e.target.value)} }
                    id="chat" rows="5" className="block mx-11 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." required>
                    </textarea>
                        
                    <button type="submit" className="inline-flex justify-center text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg className="w-28 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;