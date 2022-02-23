import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { actionCreators as postActions } from '../redux/modules/post';


import Post from './Post';

function PostList(props) {
    const dispatch = useDispatch();
    const post_list = props.post_list;

    return (
        <>
            <PostListStyled>
                {post_list.map((p, idx) => {
                    return (
                        <Post key={idx} {...p} />
                    )
                })}
            </PostListStyled>
        </>
    );
}

const PostListStyled = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    // width: 90%;
    margin: 2rem auto;
    justify-content: space-around;
    // border: 2px solid blue;
    box-sizing: border-box;
    background-color: #121212;
`

export default PostList;