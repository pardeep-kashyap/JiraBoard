import { Draggable } from "react-beautiful-dnd";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeTask, setCurrentData } from "./redux.js/action";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
const timeSinceText = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
};



const CardHeader = styled.div`
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index, dataKey }) => {
  console.log("item", item)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getDay = useCallback((date) => {
    return timeSinceText(new Date(date)).toString()
  })


  const edit = () => {
    navigate("/task");
    console.log("ss")
    dispatch(setCurrentData(
      {
        currentTaskType: dataKey,
        currentIndex: index
      }
    ))
  }

  const remove = () => {
    dispatch(removeTask(
      {
        currentTaskType: dataKey,
        currentIndex: index
      }
    ))
  }

  return (
    <>
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <DragItem
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >

              <CardHeader>
                <span>
                  {item.title}
                </span>

                <EditOutlined onClick={() => edit(item)} />
              </CardHeader>
              <span className="text-xs">{item.description}</span>
              <CardFooter>
                <span className="text-xs"> {getDay(item.date)}</span>

                <CloseCircleOutlined className="pointer" onClick={() => remove()} />
              </CardFooter>
            </DragItem>
          );
        }}
      </Draggable>
    </>
  );
};

export default ListItem;
