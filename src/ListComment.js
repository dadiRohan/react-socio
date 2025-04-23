import React,{ useState, useEffect, useCallback } from "react";
import { CreateComment } from "./CreateComment";
import { projectURL } from "./utils/mockdata";

export const ListComment = ({postId}) => {

    const [userComment, setUserComment] = useState([]);
    const [commentAdded, setCommentAdded] = useState(false);

    const fetchComments = useCallback(async () => {
        const fetchCommentPath = projectURL + "comments?postId="+postId;
        const commentList = await fetch(fetchCommentPath,{
            headers:{"cors":"no-cors"}
        });
        const commentJson = await commentList.json();
        setUserComment(commentJson.reverse());
    }, [postId]);

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
                                src={data?.imgPath}
                                className="relative inline-block h-8 w-8 rounded-full"
                                />
                                <div className="flex flex-col ml-3 text-sm">
                                <span className="text-slate-800 font-semibold">{data?.created_by}</span>
                                <span className="text-slate-600">{data?.created_date}</span>
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
