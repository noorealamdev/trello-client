"use client";

import { useEffect, useRef, useState } from "react";
import Column from "./Column";
import { boardInitData } from "../../../constant/data";
import { mapOrder } from "../../../utils/sort";
import _ from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../../utils/dragDrop";
import Icon from "../../ui/Icon";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8001/api";

export default function Board() {
	const [board, setBoard] = useState({});
	const [columns, setColumns] = useState([]);
	const [showAddColumnField, setShowAddColumnField] = useState(false);
	const [columnTitleValue, setColumnTitleValue] = useState("");
	const columnTitleInputRef = useRef(null);

	// Loading single board data via API
	useEffect(() => {
		axios.get(`${baseUrl}/board/1`).then((response) => {
			//console.log('Board Data from API>>>>', response.data);
			const boardData = response.data[0];
			if (boardData) {
				setBoard(boardData);
				setColumns(boardData.columns);
			}
			else {
				setBoard(null);
				setColumns(null);
			}

		});
	}, []);

	// Add new column
	useEffect(() => {
		if (
			showAddColumnField === true &&
			columnTitleInputRef &&
			columnTitleInputRef.current
		) {
			columnTitleInputRef.current.focus();
		}
	}, [showAddColumnField]);

	// On column drop callback
	const onColumnDrop = (dropResult) => {
		let newColumns = [...columns];
		newColumns = applyDrag(newColumns, dropResult);

		let newBoard = { ...board };
		newBoard.column_order = newColumns.map((column) => column.id);
		newBoard.columns = newColumns;

		setColumns(newColumns);
		setBoard(newBoard);

		console.log("Updated columns on column drop>>>>>>", newColumns)
		console.log("Updated board on column drop>>>>>>", newBoard)
	};

	// On card drop callback
	const onCardDrop = (dropResult, columnId) => {
		if (
			dropResult.removedIndex !== null ||
			dropResult.addedIndex !== null
		) {
			let newColumns = [...columns];
			let currentColumns = newColumns.find(
				(column) => column.id === columnId
			);
			currentColumns.cards = applyDrag(currentColumns.cards, dropResult);
			currentColumns.card_order = currentColumns.cards.map(
				(card) => card.id
			);
			setColumns(newColumns);

			console.log("After moved card>>>>>>", newColumns)
		}
	};

	const handleAddColumnSubmit = () => {
		if (!columnTitleValue) {
			if (columnTitleInputRef && columnTitleInputRef.current) {
				columnTitleInputRef.current.focus();
			}
		}

		if (columnTitleValue) {
			// Update board columns
			const _columns = _.cloneDeep(columns);
			_columns.push({
				id: "column-4",
				board_id: "1",
				name: columnTitleValue,
				cards: [],
			});
			setColumns(_columns);
			setColumnTitleValue("");
			setShowAddColumnField(false);
			console.log("After added new column>>>>>>", _columns)
		}

	};

	if (_.isEmpty(board)) {
		return (
			<div className="text-center mt-10">
				<h2 className="text-2xl">You don't have any board created</h2>
				<button className="btn btn-primary mt-2">Create a board</button>
			</div>
		);
	}

	return (
		<>
			<div className="custom-kanban-board flex overflow-hidden overflow-x-auto pb-4 rtl:space-x-reverse">
				<Container
					orientation="horizontal"
					onDrop={onColumnDrop}
					getChildPayload={(index) => columns[index]}
					dragHandleSelector=".column-drag-handle"
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: "column-drop-preview",
					}}
				>
					{columns &&
						columns.length > 0 &&
						columns.map((column, index) => {
							return (
								<>
									<Draggable key={index}>
										<Column
											column={column}
											onCardDrop={onCardDrop}
										/>
									</Draggable>
								</>
							);
						})}
				</Container>

				<div className="add-board-new-column">
					<div className="w-[270px] px-2 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300">
						{showAddColumnField === false ? (
							<div
								className="flex items-center cursor-pointer"
								onClick={() => setShowAddColumnField(true)}
							>
								<Icon className="mr-1" icon="heroicons:plus" />{" "}
								<span className="select-none">
									Add another column
								</span>
							</div>
						) : (
							<div>
								<input
									ref={columnTitleInputRef}
									type="text"
									className="form-control mb-2 h-[32px] text-sm"
									placeholder="Enter column title..."
									value={columnTitleValue}
									onChange={(event) =>
										setColumnTitleValue(event.target.value)
									}
								/>
								<div className="flex items-center">
									<button
										onClick={handleAddColumnSubmit}
										className="btn btn-sm btn-primary hover:"
									>
										Save
									</button>
									<span
										onClick={() => {
											setShowAddColumnField(false);
											setColumnTitleValue("");
										}}
									>
										<Icon
											className="ml-3 h-8 w-8 cursor-pointer"
											icon="material-symbols:cancel-outline"
										/>
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
