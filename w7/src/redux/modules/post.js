// import axios from 'axios';
// import { doc } from 'prettier';
// import React from 'react';
// import { createAction, handleActions } from 'redux-actions';


// //액션  타입 생성
// const LOAD_POST = "LOAD_POST"


// //액션 생성
// const loadPost = createAction(LOAD_POST, (post_list) => ({post_list}))

// //초기값 셋팅
// const initialState = {
//     list: []
// }

// const loadPostM = () => async(dispatch, getState ) => {
//     axios.get("http://localhost:3003/boards")
//     .then ((res) => {
//         console.log("확인")
//         const post_data = res.data
//         const post_list = []
//         post_data.forEach((doc) => {
//                 post_list.push({id: doc.id, ...doc,})
//             }
//         )
//         dispatch(loadPost(post_list))
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

// export default handleActions (
//     {
//         [LOAD_POST]: (
//             state=initialState,
//             action = {}
//         ) =>{
//             return {
//                 ...state,
//                 list:action.payload.post_list,
//             }
//         },
//     },
//     initialState
// )

// const actionCreators = {
//     loadPostM
// }


// export {actionCreators};