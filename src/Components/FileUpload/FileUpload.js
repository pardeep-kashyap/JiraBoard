import { DeleteOutlined, EyeOutlined, FileImageOutlined, PlusCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useEffect, useRef, useState } from 'react';
import './FileUpload.css'

function FileUpload({ uploadComplete, filesInput }) {
    const [files, setFiles] = useState([])

    useEffect(() => {
        setFiles(filesInput)
    }, [filesInput])

    const remove = (index) => {
        const filesTemp = [...files];
        filesTemp.splice(index, 1);
        setFiles([...filesTemp]);
        uploadComplete([...filesTemp]);
    }

    const fileAdd = (newFiles) => {
        const allFiles = [...files, ...newFiles];
        setFiles(allFiles);
        uploadComplete(allFiles);
        console.log("allFiles", allFiles);
    }


    return (
        <>
            <span className='mb-2  text-slate-500	'>
                <span className='pl-1   text-2xl'>
                    Attachment
                </span> </span>
            {
                files && files.length ?
                    <Gallary files={files} OnRemove={remove} OnFileAdd={fileAdd} /> :
                    <DropAndSelectionFile OnFileAdd={fileAdd} />
            }
        </>

    )
}

export default FileUpload;

const DropAndSelectionFile = ({ OnFileAdd, addMore }) => {
    const fileInputRef = useRef();

    const onFileInputChange = (element) => {
        fileInputRef.current.click()
        if (element.target.files && element.target.files.length) {
            let filePromises = Array.from(element.target.files).map((file) => {
                return new Promise((resolve, reject) => {
                    var fr = new FileReader();
                    fr.onload = () => {
                        return resolve(
                            {
                                file,
                                data: fr.result
                            }
                        )
                    }
                    fr.readAsDataURL(file);
                })
            });
            Promise.all(filePromises).then((result) => {
                OnFileAdd(result)
            })

        }

    }
    return (
        <>

            <div className='relative' style={{
                height: !addMore ? '0px' : "90px",
                border: "1px solid lightgray",
                padding: "5px",
                visibility: addMore ? 'visible' : 'hidden'

            }}>
                <div className='flex justify-center top-0 h-full w-full items-center relative  text-slate-500	'>
                    <PlusCircleOutlined className='font-xl' onClick={() => fileInputRef.current.click()} style={{
                        fontSize: "2rem"
                    }} />

                </div>

            </div>

            <div style={{
                visibility: !addMore ? 'visible' : 'hidden'
            }} className="flex justify-center items-center w-full ant-upload flex-col	">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col justify-center items-center pb-6">
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" strokeLinecap="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" accept="image/*" ref={fileInputRef} type="file" className="hidden" multiple onChange={onFileInputChange} />
                </label>
                <div className='gallary flex overflow-y-auto' style={{
                    maxWidth: "500px"
                }}>

                </div>
            </div>


        </>

    )
}

const Gallary = ({ files = [], OnRemove, OnFileAdd }) => {
    console.log("files", files)
    const preview = (base64File) => {
        const newTab = window.open();
        newTab?.document.write(
            `<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${base64File}" width="100px" height="100px" ></body></html>`);
        newTab?.document.close();
    }


    return (
        <div className="grid grid-cols-7 gap-2	bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed h-64 pl-2 pt-2 w-full">
            {
                files && files.length && files.map((file, index) =>
                    <div className='relative' key={'index' + index} style={{
                        height: "max-content",
                        border: "1px solid lightgray",
                        padding: "5px",
                        height: "90px"
                    }}>
                        <div className='flex justify-center top-0 h-full w-full items-center relative'>
                            <img
                                className="image-view"

                                style={{
                                    width: "55px",
                                    maxHeight: "75px"
                                }} src={file.data} alt={file.file.name} />
                            <div className='absolute flex justify-center top-0 h-full w-full items-center action'>
                                <EyeOutlined onClick={() => preview(file.data)} />
                                <DeleteOutlined className='pl-2' onClick={() => OnRemove(index)} />
                            </div>
                        </div>
                        {/* <div className="w-full text-center text-slate-500	text-xs	font-thin		" title={file.file.name}>{file.file.name}</div> */}

                    </div>

                )
            }
            {
                files && files.length && <DropAndSelectionFile OnFileAdd={OnFileAdd} addMore={true} />
            }
        </div >
    )
}