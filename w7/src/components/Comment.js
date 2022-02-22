import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';

function Comment(props) {
    const dispatch = useDispatch();
    const { content, commentId, date, profileImage, nickname, id } = props;

    const [newComment, setNewComment] = React.useState("");
    const [isEdit, setIsEdit] = React.useState(false);

    // const is_me = (userName === loginId) ? true : false;

    const handleCommentDelete = () => {
        dispatch(commentActions.deleteCommentDB(id, commentId))
    }



    const handleCommentEdit = () => {
        if (isEdit) {
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }
    const changeNewComment = (e) => {
        setNewComment(e.target.value)
    }

    const submitNewComment = () => {
        dispatch(commentActions.editCommentDB(id, commentId, newComment))
            .then(() => {
                setIsEdit(false);
            })
    }
    React.useEffect(() => { dispatch(commentActions.getCommentDB(id)); }, [isEdit])

    return (
        <>
            <CommentContentsContainer>
                <CommentUserBox>
                    <div className="profile" style={{ display: "flex", alignItems: "center" }}>
                        <a href="#" style={{ textDecoration: "none" }}>
                            <img
                                src={profileImage}
                                alt="comment-user-thumbnail"
                                style={{
                                    width: "3.375rem",
                                    height: "3.375rem",
                                    display: "block",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                            />
                        </a>
                        <div className="comment-info" style={{ marginLeft: "1rem", lineHeight: "1" }}>
                            <div
                                className="username"
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: "#ECECEC",
                                    textDecoration: "none"
                                }}>
                                <a href={`/@${nickname}`} style={{ textDecoration: "none" }}>{nickname}</a>
                            </div>
                            <div className="date" style={{ marginTop: "0.5rem", color: "#ACACAC", fontSize: "0.875rem" }}>{date}</div>
                        </div>
                    </div>
                </CommentUserBox>
                <CommentContents>
                    <CommentContentsOuter>
                        <CommentContentsInner>
                            <div>
                                <p>{content}</p>
                            </div>
                        </CommentContentsInner>
                    </CommentContentsOuter>
                </CommentContents>
            </CommentContentsContainer>
            <CommentFooter>
                <CommentFooterInner>
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12" style={{ marginRight: "0.5rem" }}>
                        <path fill="currentColor" d="M5.5 2.5h1v3h3v1h-3v3h-1v-3h-3v-1h3v-3z">
                        </path>
                        <path fill="currentColor" fill-rule="evenodd" d="M1 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm10 1H1v10h10V1z" clip-rule="evenodd">
                        </path>
                    </svg>
                    <span>답글 달기</span>
                </CommentFooterInner>
            </CommentFooter>
        </>
    );
}

const CommentContentsContainer = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    color: #ECECEC;
    box-sizing: border-box;
`
const CommentUserBox = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CommentContents = styled.div`
    font-size: 1.125rem;
    color: #ECECEC;
    transition: color 0.125s ease-in 0s;
    line-height: 1.7;
    letter-spacing: -0.004em;
    word-break: keep-all;
    overflow-wrap: break-word;
`

const CommentContentsOuter = styled.div``
const CommentContentsInner = styled.div`
    font-size: 1.125rem;
    color: #ECECEC;
    transition: color 0.125s ease-in 0s;
    line-height: 1.7;
    letter-spacing: -0.004em;
    word-break: keep-all;
    overflow-wrap: break-word;
`

const CommentFooter = styled.div`
    margin-bottom: 2rem;
    color: #ECECEC;
`

const CommentFooterInner = styled.div`
    display: inline-flex;
    align-items: center;
    color: #96F2D7;
    font-weight: bold;
    cursor: pointer;
`

export default Comment;