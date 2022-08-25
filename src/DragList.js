import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { useSelector } from "react-redux";
import { TASK_STATES } from "./redux.js/reducer";

const DragDropContextContainer = styled.div`
  padding: 20px;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns:repeat(4, 1fr);;
  grid-gap: 8px;
`;

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

function DragList() {
    const state = useSelector((state) => state);

    const [elements, setElements] = React.useState([]);

    useEffect(() => {
        setElements(state)
    }, [state])

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...elements };

        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );
        setElements(listCopy);
    };


    return (
        <>
            <DragDropContextContainer>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ListGrid>
                        {Object.keys(TASK_STATES).map((listKey) => (
                            elements[listKey] && <DraggableElement
                                elements={elements[listKey] ? elements[listKey] : []}
                                key={listKey}
                                dataKey={listKey}
                                prefix={listKey}
                            />
                        ))}
                    </ListGrid>
                </DragDropContext>
            </DragDropContextContainer>
        </>
    );
}

export default DragList;
