import React,{ useState, useEffect, useCallback } from "react";
import { CreateComment } from "./CreateComment";
import { projectURL } from "./utils/mockdata";

export const ListComment = ({postId}) => {

    const [userComment, setUserComment] = useState([]);
    const [commentAdded, setCommentAdded] = useState(false);

    const fetchComments = useCallback(async () => {
        const fetchCommentPath = projectURL + "comments/"+postId;
        const commentList = await fetch(fetchCommentPath,{
            headers:{"cors":"no-cors"}
        });
        const commentJson = await commentList.json();
        setUserComment(commentJson.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }, [postId]);

    function timeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };

        for (const [unit, value] of Object.entries(intervals)) {
            const count = Math.floor(seconds / value);
            if (count >= 1) {
            return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
            }
        }

        return "just now";
    }    

    useEffect(() => {
        fetchComments();
    },[fetchComments, commentAdded]);

    return (
        <div>
            <CreateComment postId={postId} onCommentCreated={() => setCommentAdded(prev => !prev)}/>
        {
            userComment?.map((data,index)=>(
                <div className="flex justify-center items-center" key={index}>
                    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-400 rounded-lg w-5/6">      

                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center">
                                <img
                                alt="Tania Andrew"
                                src="https://cdn-icons-png.flaticon.com/512/11461/11461171.png"
                                className="relative inline-block h-8 w-8 rounded-full"
                                />
                                <div className="flex flex-col ml-3 text-sm">
                                <span className="text-slate-800 font-semibold">{data?.created_by?.username}</span>
                                <span className="text-slate-600">{timeAgo(data?.created_at)}</span>
                                </div>
                            </div>
                        </div>


                        <div className="p-4">
                            <div className="mb-2 text-slate-800 text-xl font-semibold">{data?.comment}</div>
                        </div>

                    </div>
                </div>
            ))
        }

        </div>
    );
};
