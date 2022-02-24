import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';


function SearchTag(props) {

    const { postingId, thumnail, title, content, dayBefore, commentCnt, nickname, tag, profileImage } = props;
    console.log(thumnail)
    return (

        <SearchTagContent>
            <SearchTagInner>
                <div className="user-info" style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1.5rem"
                }}>
                    <div as="a" onClick={() => { history.push(`/my/${nickname}`) }}>
                        <img src={profileImage} alt="thumbnail"
                            style={{
                                display: "block",
                                cursor: "pointer",
                                width: "3rem",
                                height: "3rem",
                                marginRight: "1rem",
                                background: "#121212",
                                objectFit: "cover",
                                borderRadius: "1.5rem",
                                boxShadow: "rgb(0 0 0 / 10%) 0px 0px 8px"
                            }}
                        />
                    </div>
                    <div className="username" style={{ fontSize: "0.875rem", color: "#ECECEC", fontWeight: "bold" }}>
                        <div as="a" onClick={() => { history.push(`/my/${nickname}`) }} style={{ cursor: "pointer" }}>{nickname}</div>
                    </div>
                </div>

                <div as="a" onClick={() => { history.push(`/post/${postingId}`) }} style={{ textDecoration: "none", cursor: "pointer" }}>
                    <div className="post-thumbnail"
                        style={{ width: "100%", position: "relative", paddingTop: "30%", marginBottom: "1rem" }}>
                        {thumnail ?
                            <img src={thumnail} alt="post-thumbnail"
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                    objectFit: "cover"
                                }}
                            />
                            : null}
                    </div>
                </div>

                <div as="a" onClick={() => { history.push(`/post/${postingId}`) }} style={{ textDecoration: "none", cursor: "pointer" }}>
                    <h2 style={{ fontSize: "1.5rem", margin: "0", color: "#ECECEC", wordBreak: "keep-all" }}>
                        {title}
                    </h2>
                </div>

                <p
                    style={{
                        marginBottom: "2rem",
                        marginTop: "0.5rem",
                        fontSize: "1rem",
                        color: "#D9D9D9",
                        wordBreak: "keep-all",
                        overflowWrap: "break-word",
                    }}
                >
                    {content}
                </p>

                <div className="tags-wrapper" style={{ marginBottom: "-0.875rem" }}>
                    {tag.map((t, idx) => {
                        return (
                            <div as="a"
                                key={idx}
                                style={{
                                    marginBottom: "0.875rem",
                                    background: "#252525",
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem",
                                    height: "2rem",
                                    borderRadius: "1rem",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    marginRight: "0.875rem",
                                    color: "#96F2D7",
                                    textDecoration: "none",
                                    fontWeight: "500",
                                    fontSize: "1rem",
                                }}
                                variant="primary"
                                onClick={() => { history.push(`/posting/tags/${t}`) }}
                            >
                                {t}
                            </div>
                        )
                    })}
                </div>

                <div className="subinfo"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "1rem",
                        color: "#ACACAC",
                        fontSize: "0.875rem",
                    }}
                >
                    <span>{dayBefore}</span>
                    <div className="separator" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>·</div>
                    <span>{commentCnt}개의 댓글</span>
                </div>
            </SearchTagInner>
        </SearchTagContent>
    );
}



const SearchTagContent = styled.div``
const SearchTagInner = styled.div`
    padding-top: 0px;
    padding-bottom: 4rem;
    line-height: 1.5;
`
export default SearchTag;