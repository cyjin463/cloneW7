import React from 'react';
import Grid from '../elements/Geid';
import { actionCreators as userActions } from '../redux/modules/user';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { idCheck } from '../shared/common';


    const Login = (props) => {
        const {history} = props
        const dispatch = useDispatch();
    
        const [id, setId] = React.useState("");
        const [password, setPassword] = React.useState("");
    
        const login = () => {
        if(id === "" || password === "") {
            window.alert("모두 입력해주세요!");
            return;
        }
    
        if(!idCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }
    
        dispatch(userActions.loginM(id, password));
        }
    return (
        <div style={{height:"800px"}}>
            <Grid is_flex width="800px" height="600px" bg="#121212" color="" margin="100px auto 0px auto">
                    <div style={{width: "350px",
                                background: "#1e1e1e",
                                padding: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                WebkitBoxPack: "center",
                                justifyContent: "center",
                                WebkitBoxAlign: "center",
                                alignItems: "center"
                                }}>
                        <div>
                        <img style={{width: "100%",
                                    height: "auto",
                                    display: "block",
                                    }}
                            src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg"/>
                            <div style={{
                                    fontSize: "1.75rem",
                                    marginTop: "1.5rem",
                                    color: "#d9d9d9",
                                    textAlign: "center",
                                    fontWeight: "600",
                            }}>
                                환영합니다.
                            </div>
                        </div>
                    </div>
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
                        <div style={{display:"flex", justifyContent: "space-around"}}>
                        <Button style={{background: "#96f2d7",
                                        color: "#121212",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        outline: "none",
                                        border: "none",
                                        borderRadius: "5px",
                                        width: "6rem",
                                        wordBreak: "keep-all",
                                        cursor: "pointer",
                                        }}
                                        variant="primary" onClick={login}>로그인</Button>{' '}
                        <Button style={{background: "#96f2d7",
                                        color: "#121212",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        outline: "none",
                                        border: "none",
                                        borderRadius: "5px",
                                        width: "6rem",
                                        wordBreak: "keep-all",
                                        cursor: "pointer",
                                        }}
                                        variant="primary" onClick={login}>회원가입</Button>{' '}
                        </div>
                        </Form>
                    </Grid>
            </Grid>
        </div>
    );
};
export default Login;

