import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import { useState, useEffect } from "react";

const CommentArea = ({asin}) => {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


   /*  state = {
        comments: [], // comments will go here
        isLoading: false,
        isError: false
    } */

    useEffect(() => {        
          
            setIsLoading(true)
           
            const fetchComments = async () => {
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                    headers: {
                        Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNmMwMGIzNTgxNzAwMTVjMjI3NDkiLCJpYXQiOjE2MjUwNTgzMDQsImV4cCI6MTYyNjI2NzkwNH0.Ibc--VACzfbnbVnmlo0H7tPvvmxWZW_tKIx3RWPsOSE",
                     }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    setComments(comments)
                    setIsLoading(false)
                    setIsError(false)
                } else {
                    console.log('error')
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            }
            }
            fetchComments();
        
    }, [asin] )

   
        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
    
}

export default CommentArea