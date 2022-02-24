import React from 'react';
import styled from 'styled-components';

const HashTag = (props) => {
    return <Tag onClick={props._onClick}>{props.children}</Tag>;
};

HashTag.defaultProps = {
    _onClick: () => { }
};
const Tag = styled.div`
    ${(props) => props.theme.flex_row};
    color: #96F2D7;
    background-color: #1E1E1E;
    padding: 0 0.75rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    font-size: 14px;
    margin: 0.5rem 0;
    cursor: pointer;
    margin-right: 0.5rem;
`;
export default HashTag;