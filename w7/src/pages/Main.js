import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import PostList from '../components/PostList';
import { actionCreators as postActions } from '../redux/modules/post';


function Main(props) {
    const dispatch = useDispatch();
    const post_list = useSelector(state => state.post.list)

    const [toggleName, setToggleName] = React.useState("이번 주");

    React.useEffect(() => {
        dispatch(postActions.getLikePostWeekDB());
    }, [post_list.length])

    React.useEffect(() => {
        dispatch(postActions.detailPostDB(249));
    }, [])


    const trendingPost = () => {
        dispatch(postActions.getLikePostWeekDB());
    }

    const onClickTodayPost = () => {
        setToggleName("오늘")
        dispatch(postActions.getLikePostTodayDB());
    }

    const onClickWeekPost = () => {
        setToggleName("이번 주")
        dispatch(postActions.getLikePostWeekDB());
    }

    const onClickMonthPost = () => {
        setToggleName("이번 달")
        dispatch(postActions.getLikePostMonthDB());
    }

    if (!post_list) {
        return (
            <div style={{ width: "90%", margin: "0 auto" }}>
                <PostListHeader>
                    <PostListTrandingHeader>
                        <div style={{ display: "flex", position: "relative", width: "14rem", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <PostTrendingBox as="a" href="/" onClick={trendingPost}>
                                    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="1em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                                    </svg>
                                    트렌딩
                                </PostTrendingBox>
                                <PostRecentBox as="a" href="/recent" >
                                    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="1em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                                    </svg>
                                    최신
                                </PostRecentBox>
                            </div>
                            <div style={{ width: "50%", height: "2px", position: "absolute", bottom: "0px", backgroundColor: "#E0E0E0" }}></div>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                    이번 주
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item href="#/action-1" onClick={onClickTodayPost}>
                                        오늘
                                    </Dropdown.Item>
                                    <Dropdown.Item active onClick={onClickWeekPost}>이번 주</Dropdown.Item>
                                    <Dropdown.Item onClick={onClickMonthPost}>이번 달</Dropdown.Item>
                                    {/* <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </PostListTrandingHeader>
                    <div style={{}}>...</div>
                </PostListHeader>
            </div>
        );
    }

    return (
        <div style={{ width: "90%", margin: "0 auto" }}>
            <PostListHeader>
                <PostListTrandingHeader>
                    <div style={{ display: "flex", position: "relative", width: "14rem", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <PostTrendingBox as="a" href="/" onClick={trendingPost}>
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="1em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                                </svg>
                                트렌딩
                            </PostTrendingBox>
                            <PostRecentBox as="a" href="/recent" >
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="1em" width="1.3em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                                </svg>
                                최신
                            </PostRecentBox>
                        </div>
                        <div style={{ width: "50%", height: "2px", position: "absolute", bottom: "0px", backgroundColor: "#E0E0E0" }}></div>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                {toggleName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={onClickTodayPost}>
                                    오늘
                                </Dropdown.Item>
                                <Dropdown.Item onClick={onClickWeekPost}>이번 주</Dropdown.Item>
                                <Dropdown.Item onClick={onClickMonthPost}>이번 달</Dropdown.Item>
                                {/* <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </PostListTrandingHeader>
                <div style={{}}>...</div>
            </PostListHeader>
            <PostList post_list={post_list} />
        </div>
    );
}


const PostListHeader = styled.div`
    // width: 90%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const PostListTrandingHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const PostTrendingBox = styled.div`
    display: flex;
    width: 7rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    color: #ACACAC;
    text-decoration: none;

    &:active {
        color: #ECECEC;
        font-weight: bold;
    }
`

const PostRecentBox = styled.div`
    display: flex;
    width: 7rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    color: #ACACAC;
    text-decoration: none;

    &:active {
        color: #ECECEC;
        font-weight: bold;
    }
`

export default Main;