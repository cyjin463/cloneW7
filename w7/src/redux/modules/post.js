import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from 'axios';

import { actionCreators as userActions } from './user';
import apis from '../../common/api';

// initialState
const initialState = {
    list: [],
    list2: [],
};


// actions
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DETAIL_POST = "DETAIL_POST"
const EDIT_LIKE = "EDIT_LIKE"
const EDIT_DISLIKE = "EDIT_DISLIKE"


// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const detailPost = createAction(DETAIL_POST, (post_list2) => ({ post_list2 }));
const editLike = createAction(EDIT_LIKE, (postingId, nickname, is_post_like, _like) => ({ postingId, nickname, is_post_like, _like }));
const editDislike = createAction(EDIT_DISLIKE, (postingId, nickname, is_post_like, _like) => ({ postingId, nickname, is_post_like, _like }));


//middleware actions
const getDatePostDB = () => {
    return async function (dispatch, getState, { history }) {
        await axios.get('http://yuseon.shop/api/posting')
            .then((response) => {
                console.log("response1", response.data.articles)
                dispatch(getPost(response.data.articles))
            }).catch((err) => {
                console.log(err)
            })
    }
}

const getLikePostMonthDB = () => {
    return async function (dispatch, getState, { history }) {
        await apis.get('http://yuseon.shop/api/posting/likes/month',).then((response) => {
            console.log((response.data.articles))
            dispatch(getPost(response.data.articles))
        }).catch((err) => {
            console.log(err)
        })
    }
}

const getLikePostWeekDB = () => {
    return async function (dispatch, getState, { history }) {
        await apis.get('http://yuseon.shop/api/posting/likes/week').then((response) => {
            dispatch(getPost(response.data.articles))
        }).catch((err) => {
            console.log(err)
        })
    }
}

const getLikePostTodayDB = () => {
    return async function (dispatch, getState, { history }) {
        await apis.get('http://yuseon.shop/api/posting/today').then((response) => {
            console.log((response.data.articles))
            dispatch(getPost(response.data.articles))
        }).catch((err) => {
            console.log(err)
        })
    }
}

const addPostDB = (title, contents, previewUrlList, nickname, hashArr) => {
    return async function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');

        await apis.post("/api/posting", {
            'title': title,
            'content': contents,
            'imageFiles': previewUrlList,
            'nickname': nickname,
            'tag': hashArr,
        }, {
            headers: {
                "Authorization": `${token}`
            }
        }).then((res) => {
            console.log(res)
            dispatch(addPost(res.data))
            history.push('/')
        }).catch((err) => {
            console.log(err);
        })
    }
}

const detailPostDB = (postingId) => {
    return function (dispatch, getState, { history }) {
        // console.log(postingId)
        axios
            .get(`http://yuseon.shop/api/posting/${postingId}`)
            .then((res) => {
                // console.log(res)
                dispatch(detailPost(res.data))
            }).catch((err) => {
                console.log(err)
            })
    }
}

const editLikeDB = (postingId, nickname, is_post_like) => {
    return function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');
        // console.log(postingId, nickname, is_post_like)
        apis.post('/api/like', { "nickname": nickname, "postingId": postingId },
            {
                headers: {
                    "Authorization": `${token}`
                }
            }
        ).then((res) => {
            console.log(res);
            let _like = getState().post.list2.like + 1
            dispatch(userActions.addLike(postingId))
            dispatch(editLike(postingId, nickname, is_post_like, _like));
        }).catch((err) => {
            console.log(err);
        })
    }
}

const editDislikeDB = (postingId, nickname, is_post_like) => {
    return function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');
        // console.log(postingId, nickname, is_post_like)
        apis.delete('/api/unlike',
            {
                data: { "nickname": nickname, "postingId": postingId },
                headers: { "Authorization": `${token}` }
            }
        ).then((res) => {
            console.log(res);
            let _like = getState().post.list2.like - 1;
            dispatch(userActions.deleteLike(postingId))
            dispatch(editDislike(postingId, nickname, false, _like));
        })
            .catch((err) => {
                console.log("dislike 실패", err);
            })
    }
}


// reducer
export default handleActions(
    {
        [GET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.push(action.payload.post)
        }),
        [DETAIL_POST]: (state, action) => produce(state, (draft) => {
            draft.list2 = action.payload.post_list2;
        }),
        [EDIT_LIKE]: (state, action) => produce(state, (draft) => {
            draft.list2.like += 1;
        }),
        [EDIT_DISLIKE]: (state, action) => produce(state, (draft) => {
            console.log(action.payload._like)
            draft.list2.like -= 1;
        }),
    },
    initialState
);


const actionCreators = {
    getPost,
    getDatePostDB,
    getLikePostMonthDB,
    getLikePostWeekDB,
    getLikePostTodayDB,
    addPost,
    addPostDB,
    detailPost,
    detailPostDB,
    editLike,
    editLikeDB,
    editDislike,
    editDislikeDB,
};

export { actionCreators }
