import React from 'react';
import Prism from 'prismjs';
import axios from 'axios';
import styled from 'styled-components';
import TextAreaAutoResize from "react-textarea-autosize";

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import useInput from '../shared/useInput';
import HashTag from '../elements/HashTag';

// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

export default function PostAdd(props) {
    const dispatch = useDispatch();
    const editorRef = React.createRef();
    const [contents, setContents] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [previewUrlList, setPreviewUrlList] = React.useState([]);
    const token = sessionStorage.getItem("token");

    const post_list = useSelector(state => state.post.list2)
    // console.log(post_list.content)
    const postingId = props.match.params.id
    const is_edit = postingId ? true : false

    const user_info = useSelector(state => state.user.userInfo)
    const nickname = user_info.nickname


    const editPost = () => {
        const _contents = {
            nickname: nickname,
            title: title,
            content: contents,
        }
        dispatch(postActions.editPostDB(_contents, postingId))
    }


    React.useEffect(() => {
        if (editorRef.current) {
            // 기존에 Image 를 Import 하는 Hook 을 제거한다.
            editorRef.current.getInstance().removeHook("addImageBlobHook");

            // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
            editorRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    (async () => {
                        let formData = new FormData();
                        formData.append("image", blob);

                        await axios.post("http://yuseon.shop/api/posting/image",
                            formData, {
                            headers: {
                                "Authorization": `${token}`,
                            }
                        },
                        ).then((res) => {
                            console.log(res.data);
                            const imageUrl = res.data

                            // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
                            callback(imageUrl, "image");
                            return imageUrl;
                        }).then((res) => {
                            setPreviewUrlList(previewUrlList.concat(res))
                        })
                    })();
                    return false;
                });
        }

        return () => { };
    }, [editorRef]);


    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const postWrite = () => {
        if (contents === "" || title === "") {
            window.alert("내용을 입력해주세요.");
            return;
        }

        dispatch(postActions.addPostDB(title, contents, previewUrlList, user_info.nickname, hashTagList))
        editorRef.current.value = "";
    }

    // const [value, onChangeValue, setValue] = React.useInput('');
    const [value, onChangeValue, setValue] = useInput('');

    const [hashTagList, setHashTagList] = React.useState([]);

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            if (hashTagList.indexOf(value) < 0) {
                setHashTagList([...hashTagList, value]);
            }
            setValue('');
        }
    };

    const removeHashTag = (e) => {
        const idx = hashTagList.indexOf(e.target.innerHTML);
        hashTagList.splice(idx, 1);
        setHashTagList([...hashTagList]);
    };


    return (
        <div style={{ backgroundColor: "black" }}>
            {is_edit
                ? <div style={{
                    paddingTop: "2rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                }}>
                    <TextAreaAutoResize
                        defaultValue={post_list.title}
                        placeholder="제목을 입력해주세요."
                        onChange={changeTitle}
                        style={{
                            padding: "0px",
                            fontSize: "2.75rem",
                            width: "100%",
                            resize: "none",
                            lineHeight: "1.5",
                            outline: "none",
                            border: "none",
                            fontWeight: "bold",
                            overflow: "hidden",
                            backgroundColor: "black",
                            color: "#fff"
                        }}
                    />
                    <TagBox>
                        {hashTagList.map((h, idx) => {
                            return (
                                <HashTag key={idx} idx={idx} _onClick={removeHashTag}>
                                    {h}
                                </HashTag>
                            );
                        })}
                        <TagInputBox
                            type="text"
                            onKeyPress={onEnter}
                            placeholder="태그를 입력하세요"
                            onChange={onChangeValue}
                            value={value || ''}
                            onClick={removeHashTag}
                        />
                    </TagBox>

                    <TitleFooter />
                </div>
                : <div style={{
                    paddingTop: "2rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                }}>
                    <TextAreaAutoResize
                        placeholder="제목을 입력해주세요."
                        onChange={changeTitle}
                        style={{
                            padding: "0px",
                            fontSize: "2.75rem",
                            width: "100%",
                            resize: "none",
                            lineHeight: "1.5",
                            outline: "none",
                            border: "none",
                            fontWeight: "bold",
                            overflow: "hidden",
                            backgroundColor: "black",
                            color: "#fff"
                        }}
                    />
                    <TagBox>
                        {hashTagList.map((h, idx) => {
                            return (
                                <HashTag key={idx} idx={idx} _onClick={removeHashTag}>
                                    {h}
                                </HashTag>
                            );
                        })}
                        <TagInputBox
                            type="text"
                            onKeyPress={onEnter}
                            placeholder="태그를 입력하세요"
                            onChange={onChangeValue}
                            value={value || ''}
                            onClick={removeHashTag}
                        />
                    </TagBox>

                    <TitleFooter />
                </div>
            }


            <div style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
            }}>
                {is_edit
                    ?
                    <Editor
                        height="78vh"
                        previewStyle="vertical"
                        initialEditType="markdown"
                        // initialValue={(post_list.content) = "null" ? '' : `${post_list.content}`}
                        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                        onChange={() => {
                            const innerTxt = editorRef.current.getInstance().getMarkdown();
                            setContents(innerTxt);
                        }}
                        style={{ color: "#ABABAB" }
                        }
                        ref={editorRef}
                        theme='dark'
                    />
                    :
                    <Editor
                        height="78vh"
                        previewStyle="vertical"
                        initialEditType="markdown"
                        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                        onChange={() => {
                            const innerTxt = editorRef.current.getInstance().getMarkdown();
                            setContents(innerTxt);
                        }}
                        style={{ color: "#ABABAB" }
                        }
                        ref={editorRef}
                        theme='dark'
                    />

                }
            </div>

            <WriteFooterOuter>
                <WriteFooterInner>
                    <ExitBtn>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                            style={{
                                fontSize: "1.25rem",
                                marginRight: "0.5rem"
                            }}>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                        <span style={{ fontSize: "1.125rem" }}>나가기</span>
                    </ExitBtn>
                    <WriteSaveOuter>
                        <TemporaryStorage>임시저장</TemporaryStorage>
                        {is_edit ?
                            <SaveBtn
                                onClick={editPost}
                            >수정하기</SaveBtn>
                            :
                            <SaveBtn
                                onClick={postWrite}
                            >출간하기</SaveBtn>
                        }
                    </WriteSaveOuter>
                </WriteFooterInner>
            </WriteFooterOuter>

        </div>

    );
}

const TagBox = styled.div`
    color: #ECECEC;
    font-size: 1.125rem;
    display: flex;
    flex-wrap: wrap;
`

const TagInputBox = styled.input`
    line-height: 1.5rem;
    font-size: 0.75rem;
    background: transparent;
    display: inline-flex;
    outline: none;
    cursor: text;
    font-size: 1.125rem;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
    color: #ECECEC;
`

const TitleFooter = styled.div`
    background: rgb(73, 80, 87);
    height: 6px;
    width: 4rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 1px;
`

const WriteFooterOuter = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 10;
`

const WriteFooterInner = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    height: 4rem;
    width: 100%;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
    background: #2E2E2E;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ExitBtn = styled.button`
    height: 2.5rem;
    padding: 0.5rem 1rem;
    align-items: center;
    background: none;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    display: flex;
    outline: none;
    color: #ECECEC;

    &:hover {
        background: rgba(255,255,255,0.1);
    }
`

const WriteSaveOuter = styled.div`
    justify-content: flex-end;
    align-items: center;
`

const TemporaryStorage = styled.button`
    height: 2.5rem;
    font-size: 1.125rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    color: #96F2D7;
    border-radius: 4px;
    padding: 0px 1.25rem;

    &:hover {
        background: rgba(255,255,255,0.1);
    }
`
const SaveBtn = styled.button`
    height: 2.5rem;
    font-size: 1.125rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    background: #96F2D7;
    color: #121212;
    border-radius: 4px;
    padding: 0px 1.25rem;

    &:hover {
        background: #63E6BE;
    }
`
