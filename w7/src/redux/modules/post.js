import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from 'axios';

import { actionCreators as userActions } from './user';
import apis from '../../common/api';

// initialState
const initialState = {
    list: [],
    list2: [],
    list3: [],
    tag_list: [],
};


// actions
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DETAIL_POST = "DETAIL_POST"
const DELETE_POST = "DELETE_POST";
const EDIT_LIKE = "EDIT_LIKE"
const EDIT_DISLIKE = "EDIT_DISLIKE"
const MY_POST = "MY_POST"
const EDIT_POST = "EDIT_POST"
const SEARCH_TAG = "SEARCH_TAG"

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const detailPost = createAction(DETAIL_POST, (post_list2) => ({ post_list2 }));

const editLike = createAction(EDIT_LIKE, (postingId, nickname, is_post_like, _like) => ({ postingId, nickname, is_post_like, _like }));
const editDislike = createAction(EDIT_DISLIKE, (postingId, nickname, is_post_like, _like) => ({ postingId, nickname, is_post_like, _like }));
const deletePost = createAction(DELETE_POST, (postingId) => ({ postingId }));
const myPost = createAction(MY_POST, (post_list3) => ({ post_list3 }));
const editPost = createAction(EDIT_POST, (contents) => ({ contents }));
const searchTag = createAction(SEARCH_TAG, (tag_list) => ({ tag_list }));


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
        await apis.get('http://yuseon.shop/api/posting/likes/today').then((response) => {
            console.log((response.data.articles))
            dispatch(getPost(response.data.articles))
        }).catch((err) => {
            console.log(err)
        })
    }
}

const addPostDB = (title, contents, previewUrlList, nickname, hashTagList) => {
    return async function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');

        await apis.post("/api/posting", {
            'title': title,
            'content': contents,
            'imageFiles': previewUrlList,
            'nickname': nickname,
            'tag': hashTagList,
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

const deletePostDB = (nickname, postingid) => {
    return async function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');
        console.log(nickname, postingid)
        await apis.delete(`/api/posting/${postingid}`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }
        ).then(function (res) {
            dispatch(deletePost(postingid))
            history.push('/')
            window.location.reload()
        }).catch((err) => {
            console.log("게시글 삭제가 실패했습니다.", err)
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

const myPostDB = (nickname) => {
    return function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');
        console.log(nickname)
        apis
            .get(`http://yuseon.shop/api/mypage/${nickname}`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            })
            .then((res) => {
                console.log(res.data)
                dispatch(myPost(res.data))
            }).catch((err) => {
                console.log(err)
            })
    }
}

const editPostDB = (contents, postingId) => {
    return async function (dispatch, getState, { history }) {
        const token = sessionStorage.getItem('token');
        console.log(contents)
        await apis.put(`/api/posting/${postingId}`,
            {
                nickname: contents.nickname,
                title: contents.title,
                content: contents.contents,
            },
            {
                headers: {
                    "Authorization": `${token}`
                }
            }
        ).then((res) => {
            console.log("수정성공", res)
            dispatch(editPost(contents))
            history.push("/")
        })
            .catch((err) => {
                console.log(err)
                window.alert("수정 실패")
            })
    }
}

const searchTagDB = (tag) => {
    return async function (dispatch, getState, { history }) {
        await apis.get(`/api/posting/tag/${tag}`)
            .then((res) => {
                console.log(res)
                dispatch(searchTag(res.data));
            })
            .catch((err) => {
                console.log(err)
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
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            console.log("수정합니다")
        }),
        [SEARCH_TAG]: (state, action) => produce(state, (draft) => {
            draft.tag_list = action.payload.tag_list;
        }),
        [MY_POST]: (state, action) => produce(state, (draft) => {
            draft.list3 = action.payload.post_list3;
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
    deletePost,
    deletePostDB,
    myPost,
    myPostDB,
    editPost,
    editPostDB,
    searchTag,
    searchTagDB,
};

export { actionCreators }
