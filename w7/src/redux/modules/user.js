import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from '../../common/api';

// initialState
const initialState = {
    user: null,
    is_login: false,
    isCheckUsername: false,
    isCheckNickname: false,
};

// actions
const LOGIN = "LOGIN";
const CHECK_USERNAME = "CHECK_USERNAME";
const CHECK_NICKNAME = "CHECK_NICKNAME";




// action creators
const setLogin = createAction(LOGIN, (user) => ({ user }));
const setCheckUsername = createAction(CHECK_USERNAME, (isCheckUsername) => ({ isCheckUsername }));
const setCheckNickname = createAction(CHECK_NICKNAME, (isCheckNickname) => ({ isCheckNickname }));




//middleware actions
const checkUsernameDB = (username, isCheckUsername) => {
    return async function (dispatch, getState, { history }) {
        console.log(username, isCheckUsername)
        await apis.post("/user/usernameCheck", { "username": username }
        ).then((res) => {
            if (res.data === false) {
                window.alert("이미 존재하는 이메일 입니다.");
                return;
            }
            dispatch(setCheckUsername(!isCheckUsername))
        })
    }
}

const checkNicknameDB = (nickname, isCheckNickname) => {
    return async function (dispatch, getState, { history }) {
        await apis.post("/user/nicknameCheck", { "nickname": nickname }
        ).then((res) => {
            if (res.data === false) {
                window.alert("이미 존재하는 닉네임 입니다.");
                return;
            }
            dispatch(setCheckNickname(!isCheckNickname))
        })
    }
}

const signupDB = (username, nickname, password, ProfileImage) => {
    return async function (dispatch, getState, { history }) {
        console.log(username, nickname, password)
        // const form = new FormData();
        // form.append('username', username);
        // form.append('nickname', nickname);
        // form.append('password', password);
        // form.append('ProfileImage', ProfileImage ? ProfileImage : null)
        // ProfileImage: ProfileImage ? ProfileImage : null,

        await apis
            .post("/user/signup", {
                "username": username,
                "nickname": nickname,
                "password": password,
            })
            .then(function (response) {
                console.log(response)
                history.push("/login");
            })
            .catch((err) => {
                console.log("회원가입 실패", err)
                window.alert("회원가입에 실패했어요");
            });
    };
};


// reducer
export default handleActions(
    {
        [LOGIN]: (state, action) => produce(state, (draft) => {
            draft.name = action.payload.user
            console.log("action.payload.user", action.payload.user)
        }),
        [CHECK_USERNAME]: (state, action) => produce(state, (draft) => {
            console.log("CHECK_USERNAME 리듀서로 적용 완료", state, action.payload);
            draft.isCheckUsername = action.payload.isCheckUsername;
            window.alert("해당 이메일은 사용 가능합니다.")
        }),
        [CHECK_NICKNAME]: (state, action) => produce(state, (draft) => {
            console.log("CHECK_NICKNAME 리듀서로 적용 완료", state, action.payload);
            draft.isCheckNickname = action.payload.isCheckNickname;
            window.alert("해당 닉네임은 사용 가능합니다.")
        }),
    },
    initialState
);




const actionCreators = {
    setCheckUsername,
    setCheckNickname,
    signupDB,
    checkUsernameDB,
    checkNicknameDB,
};

export { actionCreators }