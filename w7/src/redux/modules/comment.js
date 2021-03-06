import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import apis from '../../common/api';
import { useSelector } from 'react-redux';

// actions
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";

// action creators
const getComment = createAction(GET_COMMENT, (postingId, comment_list) => ({ postingId, comment_list }));
const addComment = createAction(ADD_COMMENT, (nickname, comment, postingId, profileImage, is_me, createdAtComment, commentId) => ({ nickname, comment, postingId, profileImage, is_me, createdAtComment, commentId }));
const deleteComment = createAction(DELETE_COMMENT, (postingId, commentId) => ({ postingId, commentId }))
const editComment = createAction(EDIT_COMMENT, (postingId, commentId, newComment) => ({ postingId, commentId, newComment }))

//initialState
const initialState = {
    list: [],
}

// middleware actions
// const getCommentDB = (postId) => {
//     return async function (dispatch, getState) {
//         if (!postId) {
//             return;
//         }

//         await apis.get(`/api/comments/${postId}`)
//             .then((response) => {
//                 console.log("response", postId, response.data.comments)
//                 // dispatch(getComment(postId, response.data.comments))
//             }).catch((err) => {
//                 console.log("댓글 가져오기 실패", postId, err);
//             })
//     }
// }

const addCommentDB = (nickname, comment, postId, profileImage) => {
    return async function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');
        await apis.post(`/api/comment`, {
            "nickname": nickname,
            "comment": comment,
            "postingId": postId
        },
            {
                headers: {
                    "Authorization": `${token}`
                }
            }
        ).then(function (response) {
            console.log(response)
            const createdAtComment = response.data.createdAtComment;
            const commentId = response.data.commentId;
            let is_me = true;

            dispatch(addComment(nickname, comment, postId, profileImage, is_me, createdAtComment, commentId))
            window.location.reload();
        }).catch((err) => {
            console.log("댓글 추가하기 실패", postId, err);
        })
    }
}

const deleteCommentDB = (postId, nickname, commentId) => {
    return async function (dispatch, getState) {
        const token = sessionStorage.getItem('token');
        await apis.delete(`/api/comment/${commentId}`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }
        ).then(function (response) {

            dispatch(deleteComment(postId, commentId))
            window.location.reload();
        }).catch((err) => {
            console.log("댓글 삭제가 실패했습니다.", err)
        })
    }
}
const editCommentDB = (postId, nickname, newComment, commentId) => {
    return async function (dispatch, getState) {
        const token = sessionStorage.getItem('token');
        await apis.put(`/api/comment/${commentId}`, {
            "nickname": nickname,
            "comment": newComment,
            "commentId": commentId,
        },
            {
                headers: {
                    "Authorization": `${token}`
                }
            }
        ).then(function (response) {
            console.log(response)
            dispatch(editComment(postId, commentId, newComment))
            window.location.reload();
        }).catch((err) => {
            console.log("댓글 수정에 실패했습니다.", err)
        })
    }
}

//reducer
export default handleActions({
    [GET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.comment_list;
    }),

    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list.push(action.payload);
    }),

    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        const filter_comment = draft.list.filter((c) => c.commentId !== action.payload.commentId)
        draft.list = filter_comment;
    }),

    [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
        const newComments = draft.list.find((c) => c.commentId === action.payload.commentId)
        newComments.comment = action.payload.newComment;
    })
},
    initialState
);


const actionCreators = {
    // getCommentDB,
    getComment,
    addCommentDB,
    addComment,
    deleteCommentDB,
    deleteComment,
    editCommentDB,
    editComment,
};

export { actionCreators };