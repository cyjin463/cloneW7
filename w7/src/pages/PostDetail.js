import React from 'react';
import styled from 'styled-components';
import Grid from '../elements/Geid';
import { history } from '../redux/configureStore'
import { Container, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post"
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';

const PostDetail = (props) => {
    const dispatch = useDispatch();

    React.useEffect(async () => {
        dispatch(postActions.getDatePostDB())
    }, [])

    const post_list = useSelector(state => state.post.list)
    // console.log('post_list', post_list)

    const user_info = useSelector(state => state.user.userInfo)
    // console.log('user_info', user_info)

    const post_id = props.match.params.postingId
    console.log(post_id)

    const post_find = post_list.find(p => p.postId == post_id)
    console.log('post_find', post_find)

    const postId = props.match.params.id;

    return (
        <>
            <Grid>
                <Grid width="760px" height="740px">
                    <div style={{ width: "770", height: "370", marginTop: "3rem" }}>
                        <div style={{ width: "760", height: "70", marginBottom: "32px" }}>
                            <h1 style={{ lineHeight: "1.5", fontWeight: "800", fontSize: "3rem", color: "#ececec" }}>여기는 제목 입니다.</h1>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ fontSize: "1rem", color: "#ececec" }}>
                                <span style={{ fontWeight: "400" }}><a>name</a></span>
                                <span> . </span>
                                <span> 현재시간 - 받은값 계산</span>
                            </div>
                            <div
                                style={{
                                    width: "73px",
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    WebkitBoxAlign: "center",
                                    boxSizing: "inherit",
                                    fontSize: "1rem",
                                    color: "#d9d9d9",
                                    backgroundColor: "#1e1e1e",
                                }}>
                                <button style={{
                                    background: "#1e1e1e",
                                    border: "1px solid #a0a0a0",
                                    paddingLeft: "0.75rem",
                                    paddingRight: "0.75rem",
                                    display: "flex",
                                    WebkitBoxAlign: "center",
                                    alignItems: "center",
                                    height: "1.5rem",
                                    borderRadius: "0.75rem",
                                    outline: "none",
                                    color: "#a0a0a0"
                                }}>
                                    <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" style={{ marginRight: "0.75rem", fontFamily: "inherit" }}>
                                        <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
                                    </svg>
                                    <span>104</span>
                                </button>
                            </div>
                        </div>
                        <div style={{ width: "100%", marginTop: "15px" }}>
                            {/* 태그는 맵돌리기 */}
                            <a style={{
                                backgroundColor: "#252525",
                                color: "#96f2d7",
                                borderRadius: "5rem",
                                padding: "5px",
                                fontWeight: "400",
                                marginRight: "0.8rem",
                            }}
                                variant="primary">
                                태그1
                            </a>
                        </div>
                        <Grid width="768px" height="167px" bg="#1E1E1E" margin="32px 0px 0px" padding="32px 24px">

                        </Grid>
                    </div>
                </Grid>
                <Grid>
                    <button onClick={() => { history.push('/') }}>버어튼</button>
                </Grid>
            </Grid>
            <CommentContainer>
                <h4 style={{
                    fontSize: "1.125rem",
                    lineHeight: "1.5",
                    fontWeight: "600",
                    marginBottom: "1rem"
                }}>
                    개의 댓글
                </h4>
                <div style={{ color: "#ECECEC" }}>
                    <CommentWrite postId={postId} />
                    <CommentList postId={postId} />
                </div>
            </CommentContainer>
        </>
    );
};

const CommentContainer = styled.div`
    margin-top: 3rem;
    width: 80%;
    color: #ECECEC;
    margin-right: auto;
    margin-left: auto;
`

export default PostDetail;