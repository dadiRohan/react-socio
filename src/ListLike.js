import  {useState, useEffect} from 'react';
import { projectURL } from './utils/mockdata';  

export const ListLike = ({postId}) => {
    const [userLike, setUserLike] = useState([]);
    const [likeAdded, setLikeAdded] = useState(false);

    const fetchLikes = async () => {
        const fetchLikePath = `${projectURL}likes/${postId}`;
        const likeList = await fetch(fetchLikePath, {
            headers: { "cors": "no-cors" }
        });
        const likeJson = await likeList.json();
        setUserLike(likeJson);
    };

    fetchLikes();    

    // useEffect(() => {
    //     fetchLikes();
    // }, [userLike , likeAdded , postId , setLikeAdded]);

    return (
        <div>
            <ul>
                {userLike}
            </ul>
        </div>
    );
}