import React from 'react';
import Comment from './Comment';

function CommentList(props) {
    const { postId, post_list } = props;

    const comment_list = post_list.commentList;
    console.log(comment_list)

    return (
        <>
            {comment_list &&
                comment_list.map((comment, idx) => {
                    return (
                        <Comment key={idx}  {...comment} />
                    )
                })
            }
        </>
    );
}


export default CommentList;