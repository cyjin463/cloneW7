import React from 'react';
import Comment from './Comment';

function CommentList(props) {
    const { postId, post_list } = props;

    const comment_list = post_list.commentList;

    return (
        <>
            {comment_list &&
                comment_list.map((comment, idx) => {
                    return (
                        <div key={idx} >
                            <Comment  {...comment} />
                        </div>
                    )
                })
            }
        </>
    );
}


export default CommentList;