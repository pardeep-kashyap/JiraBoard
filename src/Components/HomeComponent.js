import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DragList from "../DragList";
import { setCurrentData } from "../redux.js/action";

export default function HomeComponent() {
    const dispatch = useDispatch();
    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full  flex justify-between	">
                    <h1 className="inline flex items-center text-3xl pl-4	 font-bold text-gray-600	">Board</h1>
                    <NavLink className="cursor-pointer	ant-btn ant-btn-primary" style={{
                        padding: '10px',
                        margin: '30px',
                    }} to="/task" onClick={() => dispatch(setCurrentData(
                        {
                            currentTaskType: 'todo',
                            currentIndex: undefined
                        }
                    ))}>Add New Task</NavLink>
                </div>
                <DragList />
            </div>
        </>
    )
}