import React from 'react';
import Grid from '../elements/Geid';
import { actionCreators as userActions } from "../redux/modules/user"
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch } from 'react-redux';
import { Container, Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { history } from '../redux/configureStore'


const Login = () => {
    const dispatch = useDispatch()
    const [id, setId] = React.useState("")
    const [password, setPassword] = React.useState("")
    
    const login = e => {
        e.preventDefault()
        if (id === "" || password === "" ) {
            window.alert("값이 대머리입니다.")
            return
        }
        console.log(id,password, "의 로그인 요청을 dispatch 하였습니다.")
        dispatch(userActions.loginM(id,password))
    }
    return (
        <div style={{height:"800px"}}>
            <Grid is_flex width="800px" height="600px" bg="#121212" color="" margin="100px auto 0px auto">
                    <Grid width="350px" align_items="center" justify_content="center" bg="#444444">
                    {/* <img src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg" alt="welcome" /> */}
                    </Grid>
                    <Grid is_flex textAlign="center" width="450px" bg="#1e1e1e" color="#ececec" >
                        <Form style={{width:"350px", margin:"auto" }} >
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label >아이디를 입력해주세요</Form.Label>
                                <Form.Control type="text"  placeholder="ID입력" onChange={e => {setId(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>비밀번호를 입력해주세요</Form.Label>
                                <Form.Control type="password" placeholder="Password 입력" onChange={e => {setPassword(e.target.value)}} />
                            </Form.Group>
                        <Button style={{backgroundColor:"#96f2d7", color:"#121212"}} variant="primary" onClick={login}>Primary</Button>{' '}
                        <button onClick={() => {history.push('/post')}}>버어튼</button>
                        </Form>
                    </Grid>
            </Grid>
        </div>
    );
};
export default Login;

