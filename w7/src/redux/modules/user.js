import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios'

import { setToken } from "../../shared/token";
import { setCookie, deleteCookie } from "../../shared/Cookie";


const LOGIN = "LOGIN"
const LOG_OUT = "LOG_OUT"
const USER_INFO = "USER_INFO"

const setLogin = createAction(LOGIN, user => ({user}));
const logOut = createAction(LOG_OUT, ()  => ({ }));

const initialState = {
    userInfo: {
        username: "",
        nickname: "",
    },
    isLogin: false,
    };

const loginCheckM = () => {
    const token = sessionStorage.getItem("token");
    return function (dispatch, getState, {history}) {
        axios.post("http://yuseon.shop/islogin", {}, {
            headers: { 
                "Authorization": `${token}`, 
            },
            })
            .then((res) => {
            dispatch(setLogin(
                {
                username: res.data.username,
                nickname: res.data.nickname
                })
            );
            })
            .catch((err) => {
            console.log("로그인 확인 실패", err)
            })
        }
        }

            const loginM = (username, password) => {
                return function (dispatch, getState, { history }) {
                axios
                /* .post('http://yuseon.shop/user/login',{ */
                .post('http://yuseon.shop/user/login',{
                    username: username,
                    password: password,
                })
                .then((res) => {
                    const token_res = res.headers.authorization;
                    setToken(token_res);
                    
                    return token_res
                })
                .then((token_res) =>{
                    axios({ 
                    method: "post", 
                    url: "http://yuseon.shop/islogin", 
                    headers: { 
                        /* "content-type": "applicaton/json;charset=UTF-8", 
                        "accept": "application/json",  */
                        "Authorization": `${token_res}`, 
                    }, 
                    })
                    .then((res) => {
                    dispatch(setLogin(
                        {
                        username: res.data.username,
                        nickname: res.data.nickname
                        })
                    );
                    })
                    .catch((err) => {
                    console.log("로그인 확인 실패", err)
                    })
                    history.replace('/')
                })
                .catch((err) => {
                    window.alert("이메일이나 패스워드를 다시 확인해주세요!")
                })
                };
            };

    export const logoutM = () =>
	async (dispatch, getState, { history }) => {
		axios.get("http://yuseon.shop/user/logout")
			.then(res => {
				// deleteCookie = (name)
				deleteCookie("token")
				localStorage.removeItem("username")
				localStorage.removeItem("token")
				dispatch(logOut())
				history.replace("/")
				window.location.reload()
			})
			.catch(err => {
				console.log(err)
			})
	}


    // const loginCheckM = () => {
    //     return function (dispatch, getState, { history }) {
    //         console.log("로그인 체크")
    //         const userId = localStorage.getItem("username")
    //         const tokenCheck = document.cookie
    //         console.log(userId,tokenCheck)
    //         if (tokenCheck) {
    //             dispatch(
    //                 setLogin({
    //                     username: userId,
    //                 })
    //             )
    //         } else {
    //             dispatch(logOut())
    //         }
    //     }
    // }


    // const userinfoM = () => async (dispatch, getState) => {
    //     return function (dispatch, getState, {history }){
    //         instance.get("http://yuseon.shop/islogin")

    //         .then(res => {
    //             console.log("user값을 불러왔어요", res)
    //             dispatch(
    //                 setUserInfo({
    //                     username: res.data.username,
    //                     nickname: res.data.nickname,
    //                     // registerStudyList: res.data.registerStudyList,
    //                 })
    //             )
    //         })
    //         .catch(err => {
    //             // window.alert("user값을 불러오지 못했습니다");
    //             console.log(err)
    //         })
    //     }
        
    // };


    export default handleActions (
        {
            [LOGIN]: (state, action) => {
                // console.log("setUser 리듀서로 도착했습니다", state, action.payload);
                state.user = action.payload.user
                state.is_login = true
                console.log("setUser 리듀서로 적용 완료", state, action.payload, state.user)
            },
            [LOG_OUT]: (state, action) => {
                console.log("logOut 리듀서로 도착했습니다", state, action.payload)
                state.user = null
                state.is_login = false
                return state
            },
    
            [USER_INFO]: (state, action) => {
                console.log("setUserInfo 리듀서로 도착했습니다", state, action.payload)
                state.user = action.payload.userinfo
                return state
            },
        },
        initialState
    )



const actionCreators = {
	loginM,
	logoutM,
	loginCheckM,
}


export {actionCreators};