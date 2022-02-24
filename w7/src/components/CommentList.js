import React from 'react';
import Comment from './Comment';

function CommentList(props) {
    const { postId, comment_list } = props;

    return (
        <>
            {comment_list &&
                comment_list.map((comment, idx) => {
                    return (
                        <div div key={idx} >
                            <Comment  {...comment} />
                        </div>
                    )
                })
            }
        </>
    );
}


export default CommentList;