import Card from "./Card";
import {mapOrder} from "../../../utils/sort";
import {Container, Draggable} from "react-smooth-dnd";
import Icon from "../../ui/Icon";
import Tooltip from "../../ui/Tooltip";

export default function Column({column, onCardDrop}) {
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    return (
        <>
            <div className="kanban-board-column flex-none rounded-xl transition-all duration-100 shadow-none bg-slate-200 dark:bg-slate-700">
                <header className="column-drag-handle relative flex justify-between items-center rounded-xl px-4 py-3 cursor-grab">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-primary-500"></span>
                    <h2 className="text-[15px] text-slate-900 dark:text-white leading-normal">{column.title}</h2>
                    <div className="flex items-center">
                        <Tooltip
                            placement="top"
                            arrow
                            theme="dark"
                            content="Add Card"
                        >
                            <button
                                className="border border-slate-700 dark:border-slate-200 dark:text-slate-400 rounded h-5 w-5 flex flex-col  items-center justify-center text-base text-slate-600"
                            >
                                <Icon className="h-5 w-5" icon="heroicons-outline:plus-sm" />
                            </button>
                        </Tooltip>
                        <button
                            className="dark:text-slate-400 h-6 w-6 flex flex-col ml-3 items-center justify-center text-base text-slate-600"
                        >
                            <Icon className="h-6 w-6" icon="ph:dots-three-bold" />
                        </button>
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
                            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
                            getChildPayload={index => cards[index]}
                            dragClass="card-ghost"
                            dropClass="card-ghost-drop"
                            dropPlaceholder={{
                                animationDuration: 150,
                                showOnTop: true,
                                className: 'drop-preview'
                            }}
                            dropPlaceholderAnimationDuration={200}
                        >
                            {cards && cards.length > 0 && cards.map((card, index) => {
                                return (
                                    <>
                                        <Draggable key={index}>
                                            <Card key={card.id} card={card}/>
                                        </Draggable>
                                    </>
                                )
                            })}

                        </Container>
                    </div>
                </div>
            </div>
            {/*column end*/}
        </>
    )
}