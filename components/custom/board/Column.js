import Card from "./Card";
import {mapOrder} from "../../../utils/sort";
import {Container, Draggable} from "react-smooth-dnd";

export default function Column({column, onCardDrop}) {
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    return (
        <>
            <div className="kanban-board-column w-[300px] flex-none rounded-xl transition-all duration-100 shadow-none bg-slate-200 dark:bg-slate-700">
                <div className="column-drag-handle relative flex justify-between items-center rounded-xl px-6 py-2">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-primary-500"></span>
                    <h3 className="text-lg text-slate-900 dark:text-white font-medium capitalize">{column.title}</h3>
                    <div className="flex items-center space-x-2">
                        <button className="scale border border-slate-200 dark:border-slate-700 dark:text-slate-400 rounded h-6 w-6 flex flex-col items-center
            justify-center text-base text-slate-600" data-tippy-content="Delete" data-tippy-theme="danger">
                            <iconify-icon icon="fluent:delete-20-regular"></iconify-icon>
                        </button>
                    </div>
                </div>

                <div className="column-inner">
                    <div className="px-2 py-2 rounded-bl rounded-br cursor-grab">
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
                            { cards && cards.length > 0 && cards.map((card, index) => {
                            return (
                                <>
                                <Draggable key={index}>
                                    <Card key={card.id} card={card} />
                                </Draggable>
                                </>
                            )
                        })}

                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}