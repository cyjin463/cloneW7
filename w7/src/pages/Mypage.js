import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post"

const Mypage = () => {

    const dispatch = useDispatch()

    const user_info = useSelector(state => state.user.userInfo)
    console.log(user_info)

    const nickname = user_info.nickname
    console.log(nickname)

    React.useEffect(() => {
        console.log("Mypag보내기")
        dispatch(postActions.myPostDB(nickname))
    }, []);

    return (
        <div style={{width: "768px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    }}>
            <div style={{width:"100%",
                        marginTop: "5.625rem",
                        }}>
                <div style={{display: "flex",
                            WebkitBoxAlign: "center",
                            alignItems: "center",
                            }}>
                    <div style={{color: "-webkit-link",
                                cursor: "pointer",
                                textDecoration: "underline",
                                }}>
                        <img style={{display: "block",
                                    width: "8rem",
                                    height: "8rem",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    boxShadow: "rgb(0 0 0 / 6%) 0px 0px 4px 0px",
                                    }} 
                            src={user_info.imgUrl} /> 
                    </div>
                    <div style={{display: "flex",
                                flexDirection: "column",
                                WebkitBoxPack: "center",
                                justifyContent: "center",
                                marginLeft: "1rem",
                                }}>
                        <div style={{fontSize: "1.5rem",
                                    lineHight: "1.5",
                                    fontWeight: "bold",
                                    color:"#ececec",
                                    }}>
                            {user_info.nickname}
                        </div>                
                    </div>
                </div>
                <div style={{width: "100%",
                            height: "1px",
                            marginTop: "2rem",
                            marginBottom: "1.5rem",
                            backgroundColor: "#252525"
                            }}>
                </div>
                <div style={{display: "flex",
                            color:"#acacac",
                            }}>
                </div>
            </div>
            <div style={{height: "1rem",
                        marginTop: "2rem",
                        boxShadow: "rgb(0 0 0 / 4%) 0px 8px 8px -8px inset, rgb(0 0 0 / 4%) 0px -8px 8px -8px inset",
                        display: "none",
                        backgroundColor:"#1e1e1e"}}>
            </div>
            <div style={{marginTop: "4.5rem",
                        marginBottom: "4.5rem",
                        display: "flex",
                        WebkitBoxPack: "center",
                        justifyContent: "center",
                        }}>
                <div style={{display:"flex",
                            position:"relative",
                            }}>
                    <div style={{display: "flex",
                                WebkitBoxAlign: "center",
                                alignItems: "center",
                                WebkitBoxPack: "center",
                                justifyContent: "center",
                                fontSize: "1.325rem",
                                width: "8rem",
                                height: "3rem",
                                textDecoration: "none",
                                transition: "color 0.25s ease-in-out 0s",
                                fontWeight: "600",
                                color:"#63e6be",
                                }}>
    글
                    </div>
                    <div style={{display: "flex",
                                WebkitBoxAlign: "center",
                                alignItems: "center",
                                WebkitBoxPack: "center",
                                justifyContent: "center",
                                fontSize: "1.325rem",
                                width: "8rem",
                                height: "3rem",
                                textDecoration: "none",
                                transition: "color 0.25s ease-in-out 0s",
                                fontWeight: "600",
                                color:"#d9d9d9",
                                }}>
    시리즈
                    </div>
                    <div style={{display: "flex",
                                WebkitBoxAlign: "center",
                                alignItems: "center",
                                WebkitBoxPack: "center",
                                justifyContent: "center",
                                fontSize: "1.325rem",
                                width: "8rem",
                                height: "3rem",
                                textDecoration: "none",
                                transition: "color 0.25s ease-in-out 0s",
                                fontWeight: "600",
                                color:"#d9d9d9",
                                }}>
    소개
                    </div>
                    <div style={{width: "8rem",
                                height: "2px",
                                background: "#63e6be",
                                position: "absolute",
                                bottom: "-2px",
                                transition: "left 0.25s ease-in-out 0s",
                                }}>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <section style={{display: "flex",
                                WebkitBoxPack: "end",
                                justifyContent: "flex-end",
                                marginBottom: "2rem",
                                }}>
                        <div style={{display: "flex",
                                    height: "2.25rem",
                                    border: "1px solid #a0a0a0",
                                    paddingLeft: "0.625rem",
                                    paddingRight: "0.625rem",
                                    WebkitBoxAlign: "center",
                                    alignItems: "center",
                                    transition: "all 0.125s ease-in 0s",
                                    cursor: "text",
                                    }}>
                            <svg width="17" height="17" viewBox="0 0 17 17">
                                <path   d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                                        fill="currentColor">
                                </path>
                            </svg>
                            <input style={{transition: "all 0.125s ease-in 0s",
                                            fontSize: "0.875rem",
                                            flex: "1 1 0%",
                                            display: "block",
                                            lineHeight: "1rem",
                                            height: "1rem",
                                            padding: "0px",
                                            border: "none",
                                            outline: "0px",
                                            background: "transparent",
                                            color: "#d9d9d9",
                                            minWidth: "0px",
                                        }}/>
                        </div>
                    </section>
                </div>
                    <div>
                        <div style={{position: "absolute",
                                    width: "11.5rem",
                                    left: "-13.5rem",
                                    }}>
                            <div>
                                <div style={{fontSize: "1rem",
                                            lineHeight: "1",
                                            paddingBottom: "0.5rem",
                                            borderBottom: "1px solid #a0a0a0",
                                            marginBottom: "1rem",
                                            color: "#d9d9d9",
                                            fontWeight: "bold",
                                            }}>
    태그 목록
                                </div>
                                <ul style={{listStyle: "none",
                                            paddingLeft: "0px",
                                            }}>
                                    <li style={{
                                        color: "#acacac",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.5",
                                        }}>
                                        <div style={{color: "inherit",
                                                    textDecoration: "none",
                                                    }}>
    전체보기
                                        </div>
                                        <span>
    전체 태그 수
                                        </span>
                                    </li>
                                    {/* 여기부터는 태그 맵돌리기 */}
                                    <li style={{
                                        color: "#acacac",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.5",
                                        }}>
                                        <div style={{color: "inherit",
                                                    textDecoration: "none",
                                                    }}>
    태그네임
                                        </div>
                                        <span>
    해당 태그 수
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                <div style={{overflowX: "auto",
                            marginTop: "-1.5rem",
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            marginBottom: "0.5rem",
                            display:"flex",
                            }}>
                    <div style={{flexShrink: "0",
                                height: "1.5rem",
                                fontSize: "0.75rem",
                                borderRadius: "0.75rem",
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                                background:"#1e1e1e",
                                color: "#ececec",
                                display: "flex",
                                WebkitBoxAlign: "center",
                                alignItems: "center",
                                lineHeight: "1.5",
                                textDecoration: "none",
                                }}>
    전체보기
                        <span style={{marginLeft:" ]0.25rem",
                                    color: "#acacac",
                                    fontSize: "0.75rem",
                                    }}>
    태그 전체 수
                        </span>
                    </div>
                    {/* 맵돌리기~ */}
                    <div style={{flexShrink: "0",
                                height: "1.5rem",
                                fontSize: "0.75rem",
                                borderRadius: "0.75rem",
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                                background:"#1e1e1e",
                                color: "#ececec",
                                display: "flex",
                                WebkitBoxAlign: "center",
                                alignItems: "center",
                                lineHeight: "1.5",
                                textDecoration: "none",
                                }}>
    태그네임
                        <span style={{marginLeft:" ]0.25rem",
                                    color: "#acacac",
                                    fontSize: "0.75rem",
                                    }}>
    태그 수
                        </span>
                    </div>
                </div>
                <div>
                    {/* 게시글 리스트 가져오기 */}
                    <div style={{paddingTop:"0px",
                                paddingBottom:"4rem",
                                lineHeight:"1.5",
                                }}> 
                        <div style={{paddingTop:"52.356%",
                                    marginBottom:"1rem",
                                    width:"100%",
                                    position:"relative",
                                    }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;