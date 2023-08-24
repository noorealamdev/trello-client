"use client";

import {useEffect, useState} from "react";
import Column from "./Column";
import {boardInitData} from "../../../constant/data";
import {mapOrder} from "../../../utils/sort";
import _ from 'lodash';
import { Container, Draggable } from 'react-smooth-dnd';
import {applyDrag} from "../../../utils/dragDrop";

export default function Board() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect( () => {
        const boardData = boardInitData.boards.find(board => board.id === 'board-1');
        setBoard(boardData);
        setColumns(mapOrder(boardData.columns, boardData.columnOrder, 'id'));
    }, [])

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = {...board};
        newBoard.columnOrder = newColumns.map(column => column.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }

    const onCardDrop = (dropResult, columnId) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null ) {
            let newColumns = [...columns];
            let currentColumns = newColumns.find(column => column.id === columnId);
            currentColumns.cards = applyDrag(currentColumns.cards, dropResult);
            currentColumns.cardOrder = currentColumns.cards.map(card => card.id);
            setColumns(newColumns);
        }
    }

    if ( _.isEmpty(board) ) {
        return (
            <h2>You don't have any board created</h2>
        )
    }

    return (
        <>
            <div className="custom-kanban-board flex space-x-6 overflow-hidden overflow-x-auto pb-4 rtl:space-x-reverse">
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    getChildPayload={index => columns[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                >
                { columns && columns.length > 0 && columns.map((column, index) => {
                    return (
                        <>
                            <Draggable key={index}>
                                <Column
                                    column={column}
                                    onCardDrop={onCardDrop}
                                />
                            </Draggable>
                        </>
                    )
                })}

                </Container>
            </div>
        </>
    )
}