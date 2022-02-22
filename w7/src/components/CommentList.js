import React from 'react';
import Comment from './Comment';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';


function CommentList(props) {
    const dispatch = useDispatch();
    const { postId } = props;
    // const comment_list = useSelector(state => state.comment.list);
    const user_info = useSelector(state => state.user.userInfo)
    const nickname = user_info.nickname;
    const profileImage = user_info.profileImage;


    const comment_list = [
        {
            content: "냠냠asdfadsfasdfasdfsdfadsfasdfasdsdfadsfasdfasdsdfadsfasdfasdsdfadsfasdfasdsdfadsfasdfasadsfasdfasd",
            date: "2일 전",
            nickname: nickname,
            profileImage: "https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2",
        },
        {
            content: "냠냠",
            date: "2일 전",
            nickname: nickname,
            profileImage: "https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2",
        },
        {
            content: "냠냠",
            date: "2일 전",
            nickname: nickname,
            profileImage: "https://mblogthumb-phinf.pstatic.net/20141204_276/firstgjp_14176838057819gNtv_JPEG/___.jpg?type=w2",
        },

    ]

    // React.useEffect(() => {
    //     if (!comment_list[postId]) {
    //         dispatch(commentActions.getCommentDB(postId))
    //     }
    // }, []);

    if (!comment_list[postId] || !postId) {
        return null;
    }

    return (
        <>
            {comment_list &&
                comment_list.map((comment, idx) => {
                    return (
                        <div key={idx}>
                            <Comment  {...comment} nickname={nickname} />
                        </div>
                    )
                })
            }
        </>
    );
}

CommentList.defaultProps = {
    postId: null
};

export default CommentList;