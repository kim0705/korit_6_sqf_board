/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { RingLoader } from 'react-spinners';
import { storage } from "../../../firebase/firebase"
import { registerApi } from '../../../apis/registerApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
Quill.register("modules/imageResize", ImageResize);

const layout = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 30px;
    width: 1100px;
`;

const header = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px 0px;

    & > h1 {
        margin: 0;
    }

    & > button {
        box-sizing: border-box;
        border: 1px solid #c0c0c0;
        padding: 6px 15px;
        background-color: white;
        font-size: 12px;
        color: #333333;
        font-weight: 600;
        cursor: pointer;
        &:hover {
            background-color: #fafafa;
        }
        &:active {
            background-color: #eeeeee;
        }
    }
`;

const titleInput = css`
    box-sizing: border-box;
    margin-bottom: 10px;
    border: 1px solid #c0c0c0;
    outline: none;
    padding: 12px 15px;
    width: 100%;
    font-size: 16px;
`;

const editorLayout = css`
    box-sizing: border-box;
    margin-bottom: 42px;
    width: 100%;
    height: 700px;
`;

const loadingLayout = css`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #00000066;
`;

function ModifyBoardPage(props) {
    const navigate = useNavigate();
    const params = useParams();
    const boardId = params.boardId;

    const [boardModifyData, setBoardModifyData] = useState({
        boardId: boardId,
        title: "",
        content: ""
    });

    const quillRef = useRef(null);
    const [isUploading, setUploading] = useState(false);

    const boardQuery = useQuery(
        ["boardQuery", boardId],
        async () => {
            return instance.get(`/board/${boardId}`);
        },
        {
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (response) => {
                setBoardModifyData({
                    boardId: boardId,
                    title: response.data?.title,
                    content: response.data?.content,
                });
                console.log(response.data.content);
            }
        }
    );


    const boardMutation = useMutation(
        async () => {
            return await instance.put(`/board/${boardId}`, boardModifyData);
        },
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {
                alert("수정이 완료되었습니다.");
                boardQuery.refetch();
                navigate(`/board/detail/${boardId}`);
                console.log(response?.data);
            }
        }
    );

    const handleModifySubmitOnClick = async () => {
        // console.log(boardModifyData);
        boardMutation.mutateAsync();
    }

    const handleBoardModifyInputOnChange = (e) => {
        setBoardModifyData(boardModifyData => ({
            ...boardModifyData,
            title: e.target.value,
        }))
    };

    const handleQuillValueOnChange = (value) => {
        console.log(quillRef.current.getEditor().getText().trim() === "" ? "" : value);
        setBoardModifyData(boardModifyData => ({
            ...boardModifyData,
            content: quillRef.current.getEditor().getText().trim() === "" ? "" : value
        }));
    }


    const handleImageLoad = useCallback(() => { // 렌더링 할 때 다시 재정의 하지 않음
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.click();

        input.onchange = () => {
            const editor = quillRef.current.getEditor();
            const files = Array.from(input.files);
            const imgFile = files[0];

            const editPoint = editor.getSelection(true); // 현재 커서의 위치

            const storageRef = ref(storage, `board/img/${uuid()}_${imgFile.name}`);
            const task = uploadBytesResumable(storageRef, imgFile);
            setUploading(true);

            task.on(
                "state_changed",
                () => { },
                () => { },
                async () => {
                    const url = await getDownloadURL(storageRef); // 업로드 된 사진의 url가져오기
                    editor.insertEmbed(editPoint.index, "image", url);
                    editor.setSelection(editPoint.index + 1);
                    editor.insertText(editPoint.index + 1, "\n");
                    setUploading(false);
                    setBoardModifyData(boardModifyData => ({
                        ...boardModifyData,
                        content: editor.root.innerHTML
                    }));
                }
            );
        }

    }, []);

    const toolbarOptions = useMemo(() => [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }, { 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video', 'formula'],
        ['blockquote', 'code-block'],
    ], []);

    return (
        <div css={layout}>
            <header css={header}>
                <h1>Quill Edit</h1>
                <button onClick={handleModifySubmitOnClick}>수정</button>
            </header>
            <input css={titleInput} type='text' name="title"
                value={boardModifyData.title}
                onChange={handleBoardModifyInputOnChange}
                placeholder='게시글의 제목을 입력하세요' />
            <div css={editorLayout}>
                {
                    isUploading &&
                    <div css={loadingLayout}>
                        <RingLoader />
                    </div>
                }
                <ReactQuill
                    ref={quillRef}
                    style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "100%"
                    }}
                    value={boardModifyData.content}
                    onChange={handleQuillValueOnChange}
                    modules={{
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                image: handleImageLoad,
                            }
                        },
                        imageResize: {
                            parchment: Quill.import("parchment")
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default ModifyBoardPage;