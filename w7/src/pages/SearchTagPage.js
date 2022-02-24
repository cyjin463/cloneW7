import React from 'react';
import styled from 'styled-components';
import SearchTag from '../components/SearchTag';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

function SearchTagPage(props) {
    const dispatch = useDispatch();

    const tag_name = props.match.params.tag
    const search_tag_list = useSelector(state => state.post.tag_list)
    const listLength = search_tag_list?.length ? search_tag_list.length : 0;

    React.useEffect(() => {
        dispatch(postActions.searchTagDB(tag_name));
    }, [])

    return (<>
        <main style={{ marginTop: "3rem" }}>
            <SearchTagContainer>
                <SearchTagHeader>
                    <h1 style={{ fontSize: "3rem", margin: "0", lineHeight: "1.5", color: "#ECECEC" }}># {tag_name}</h1>
                    <div className="count" style={{ color: "#ACACAC" }}>
                        총 {listLength}개의 포스트
                    </div>
                </SearchTagHeader>
                <div className="Container" style={{ width: "100%", height: "100%", background: "#121212" }}>
                    {search_tag_list &&
                        search_tag_list.map((s, idx) => {
                            return <SearchTag {...s} key={idx} />
                        })
                    }
                </div>
            </SearchTagContainer>
        </main>
    </>
    );
}

const SearchTagContainer = styled.div`
    width: 702px;
    margin: 0px auto;
    box-sizing: border-box;
    background: "#121212";
`

const SearchTagHeader = styled.div`
    padding-bottom: 4rem;
`

export default SearchTagPage;