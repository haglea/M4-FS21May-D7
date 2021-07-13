import { Button, Form } from 'react-bootstrap';
import { useState } from "react";
import { useEffect } from 'react';

const AddComment = (props) => {

    const [comment, setComment] = useState({
        comment: '',
        rate: 1,
        elementId: null
    })

    /* state = {
        comment: {
            comment: '',
            rate: 1,
            elementId: null
        }
    } */

    useEffect(() => {       
            setComment({
                ...comment,
                elementId: props.asin
            })        
    }, [])

    const sendComment = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments', {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-type': 'application/json',
                    Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNmMwMGIzNTgxNzAwMTVjMjI3NDkiLCJpYXQiOjE2MjUwNTgzMDQsImV4cCI6MTYyNjI2NzkwNH0.Ibc--VACzfbnbVnmlo0H7tPvvmxWZW_tKIx3RWPsOSE",
             }
            })
            if (response.ok) {
                // the comment has been sent succesfully!!
                alert('Comment was sent!')
            } else {
                console.log('error')
                alert('something went wrong')
            }
        } catch (error) {
            console.log('error')
        }
    }

    
        return (
            <div>
                <Form onSubmit={sendComment}>
                    <Form.Group>
                        <Form.Label>Comment text</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add comment here"
                            value={comment.comment}
                            onChange={e => setComment({
                                    ...comment,
                                    comment: e.target.value
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={comment.rate}
                            onChange={e => setComment({
                                comment: {
                                    ...comment,
                                    rate: e.target.value
                                }
                            })}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    
}

export default AddComment