import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { instance } from 'check-types';


const LOGIN = "LOGIN"
const setLogin = createAction(LOGIN, user => ([user]))

const initialState ={
    user:null
}

const loginM = (username, password) => 
    async(dispatch, getstate, {history}) => {
        console.log("보냅니다")
        axios.post("http://localhost:3003/login",
            {
				username: username,
				password: password,
			}
        )
        .then(res => {
            console.log(res, "성공")
            
            // const _auth = res.header.authorization
            dispatch(setLogin())
        })
        .catch(err => {
            window.alert("아이디와, 비밀번호를 확인해주세요.")
            console.log(err)
        })
    }
    export default handleActions (
        {
            [LOGIN]: (state, action) => {
                state.user = action.payload.user
            }
        },
        initialState
    )
const actionCreators = {
    loginM
}


export {actionCreators};