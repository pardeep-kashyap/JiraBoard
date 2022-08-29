import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateTask } from '../redux.js/action';
import { TASK_STATES } from '../redux.js/reducer';
import Comments from './Comments/Comments';
import FileUpload from './FileUpload/FileUpload';

function AddNewTask(props) {

    const [files, setFiles] = useState([]);
    const [comments, setComments] = useState([]);

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    const isUpdate = () => state.currentIndex >= 0 && state.currentTaskType;

    useEffect(() => {
        if (state.currentIndex >= 0 && state.currentTaskType) {
            const taskDetails = state[state.currentTaskType][state.currentIndex];
            if (taskDetails) {
                setValue('title', taskDetails.title);
                setValue('description', taskDetails.description);
                setValue('status', state.currentTaskType);
                setFiles(taskDetails.files ? taskDetails.files : [])
                setComments(taskDetails.comments ? taskDetails.comments : [])
            }
        }
    }, [])



    const onSubmit = data => {
        let tasks = localStorage.getItem('tasks');
        tasks = tasks ? JSON.parse(tasks) : TASK_STATES;
        let status = [];
        if (tasks && tasks[data.status]) {
            status = tasks[data.status] || [];
        }
        const taskDetail = {
            title: data.title,
            id: Math.floor(Math.random() * 1000).toString(),
            description: data.description,
            date: new Date(),
            index: data.index ? data.index : status.length,
            files,
            comments
        }
        if (state.currentIndex >= 0 && state.currentTaskType) {
            status[state.currentIndex] = taskDetail;
        } else {
            status.push(taskDetail)
        }

        tasks[data.status] = status;
        dispatch(updateTask(
            {
                task: tasks
            }
        ))
        navigate('/', { replace: true });
    }

    const updateTaskFieldsAndDispatch = (key, data) => {
        if (state.currentIndex >= 0 && state.currentTaskType) {
            const tempState = { ...state }
            const task = state[state.currentTaskType][state.currentIndex];
            task[key] = data;

            tempState[state.currentTaskType][state.currentIndex] = task;
            dispatch(updateTask(
                {
                    taskType: state.currentTaskType,
                    task: tempState
                }
            ))
        }
    }

    const uploadComplete = (files) => {
        setFiles(files);
        updateTaskFieldsAndDispatch('files', files);
    }

    const commentAdded = (comments) => {
        setComments(comments);
        updateTaskFieldsAndDispatch('comments', comments);
    }

    return (
        <>
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-end">
                        <input type="submit" value={isUpdate() ? 'Update' : 'Add'} style={{
                            height: "32px",
                            padding: "4px 15px",
                            fontSize: "14px",
                        }} className="w-auto visible ant-btn-primary" />
                    </div>
                    <div className=" flex items-center w-full">
                        <div style={{
                            width: "40%"
                        }}>

                            <div className="  md:w-3/4 lg:w-2/2">
                                <div className="mb-5">
                                    <label htmlFor="title" className="block mb-2 font-bold text-gray-600">Title</label>
                                    <input type="text" id="title" name="title" placeholder="Put in your task tittle." {...register("title", { required: true, maxLength: 80 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="status" className="block mb-2 font-bold text-gray-600">Status</label>
                                    <select id="status" name="status"  {...register("status", { required: true, maxLength: 80 })} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Status">
                                        <option defaultValue>Open this select status</option>
                                        <option value="todo">To do</option>
                                        <option value="inProgress" >In Progress</option>
                                        <option value="done">Done</option>
                                        <option value="hodel" >Hold</option>
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="description" className="block mb-2 font-bold text-gray-600">Description</label>
                                    <textarea id="description" name="description" placeholder="Put in task description." {...register("description", { required: true, maxLength: 80 })} className="border border-gray-300 shadow p-3 w-full rounded mb-" />
                                </div>
                            </div>
                        </div>
                        <div className=" w-auto flex justify-center  flex-col" style={{
                            width: "60%"
                        }}>
                            <FileUpload uploadComplete={uploadComplete} filesInput={files} />
                        </div>
                    </div>
                </form>
                {
                    isUpdate() && <Comments commentAdded={commentAdded} commentsInput={comments} />
                }
            </div>
        </>
    )
}

export default AddNewTask;


