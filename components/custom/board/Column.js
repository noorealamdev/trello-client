import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { mapOrder } from "../../../utils/sort";
import { Container, Draggable } from "react-smooth-dnd";
import Icon from "../../ui/Icon";
import Tooltip from "../../ui/Tooltip";
import Dropdown from "../../ui/Dropdown";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Textinput from "../../ui/Textinput";
import _ from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Column({ column, onCardDrop }) {
	//const cards = mapOrder(column.cards, column.cardOrder, 'id');
	const [showNewCardModal, setShowNewCardModal] = useState(false);

	let cards = column.cards;

	// Formik hook to handle the form state
	const newCardFormik = useFormik({
		initialValues: {
			title: "",
		},
		// Yup schema to validate the form
		validationSchema: Yup.object().shape({
			title: Yup.string().required("Title is required"),
		}),
		// Handle form submission
		onSubmit: async (values, { resetForm }) => {
			// Make a request to your backend to store the data
			//console.log(values.title);

			const newCard = {
				id: Math.random(),
				board_id: "1",
				column_id: column.id,
				name: values.title,
				image: null,
			};

			cards.unshift(newCard);

			setShowNewCardModal(false);
			//resetForm({});

			console.log("After added new card>>>>>>", newCard)
		},
	});

	return (
		<>
			<div className="kanban-board-column flex-none rounded-xl transition-all duration-100 shadow-none bg-slate-200 dark:bg-slate-700">
				<header className="column-drag-handle relative flex justify-between items-center rounded-xl px-4 py-2 cursor-grab">
					<span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-primary-500"></span>
					<h2 className="text-[15px] text-slate-900 dark:text-white leading-normal">
						{column.name}
					</h2>
					<div className="flex items-center">
						<Dropdown
							classMenuItems="left-100 w-[180px] top-[110%]"
							label={
								<Icon
									className="w-7 h-7 hover:bg-slate-300 rounded dark:hover:bg-slate-800"
									icon="ph:dots-three-bold"
								/>
							}
						>
							<div className="py-2 text-sm cursor-pointer">
								<h2 className="text-[14px] py-2 text-slate-700 dark:text-white text-center">
									Column actions
								</h2>
								<div className="px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-700">
									Action
								</div>
								<div className="px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-700">
									Rename Column
								</div>
								<div
									className="px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-700"
									onClick={() =>
										console.log("Column deleted")
									}
								>
									Delete Column
								</div>
							</div>
						</Dropdown>
					</div>
				</header>
				<div className="column-inner">
					<div className="px-2 py-2 rounded-bl rounded-br">
						<Container
							groupName="col"
							// onDragStart={e => console.log("drag started", e)}
							// onDragEnd={e => console.log("drag end", e)}
							// onDragEnter={() => {
							//     console.log("drag enter:", column.id);
							// }}
							// onDragLeave={() => {
							//     console.log("drag leave:", column.id);
							// }}
							// onDropReady={p => console.log('Drop ready: ', p)}
							onDrop={ (dropResult) => onCardDrop(dropResult, column.id) }
							getChildPayload={(index) => cards[index]}
							dragClass="card-ghost"
							dropClass="card-ghost-drop"
							dropPlaceholder={{
								animationDuration: 150,
								showOnTop: true,
								className: "drop-preview",
							}}
							dropPlaceholderAnimationDuration={200}
						>
							{cards &&
								cards.length > 0 &&
								cards.map((card, index) => {
									return (
										<>
											<Draggable key={index}>
												<Card
													key={card.id}
													card={card}
												/>
											</Draggable>
										</>
									);
								})}
						</Container>
					</div>
				</div>
				<footer
					className="column-footer bg-slate-200 dark:bg-slate-700 dark:hover:text-white px-4 py-2 hover:text-slate-900 flex items-center cursor-pointer"
					onClick={() => setShowNewCardModal(true)}
				>
					<Icon className="mr-1" icon="heroicons:plus" />{" "}
					<span className="select-none">Add a card</span>
				</footer>
			</div>
			{/*column end*/}

			<Modal
				title="Add new card"
				activeModal={showNewCardModal}
				onClose={() => setShowNewCardModal(false)}
				footer={
					<Button
						text="Close"
						btnClass="btn-primary"
						onClick={() => setShowNewCardModal(false)}
					/>
				}
			>
				<div className="text-base text-slate-600 dark:text-slate-300">
					<form
						onSubmit={newCardFormik.handleSubmit}
						className="space-y-4 "
					>
						<Textinput
							name="title"
							label="Card title"
							type="text"
							placeholder="Enter a title for this card"
							value={newCardFormik.values.title}
							onChange={newCardFormik.handleChange}
							error={newCardFormik.errors.title}
						/>

						<div className="ltr:text-right rtl:text-left">
							<button
								type="submit"
								className="btn btn-dark  text-center"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
