export default function Card({ card }) {

    return (
        <>
            <div className="kanban-card card rounded-md bg-white dark:bg-slate-800 shadow-base custom-className card-body p-3">
                <header className="flex justify-between items-end">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                        <div className="text-base leading-6">
                            <div className="dark:text-slate-200 text-slate-900 max-w-full">
                                { card.title }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="dropstart relative">
                            <ul className="dropdown-menu min-w-max absolute text-sm text-slate-700 dark:text-white hidden bg-white dark:bg-slate-700 shadow z-[2] float-left overflow-hidden list-none text-left rounded-lg mt-1 m-0 bg-clip-padding border-none">
                                <li>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#editModal"
                                       className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm dark:text-slate-300 last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center capitalize rtl:space-x-reverse">

                                        <span>Edit</span></a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm dark:text-slate-300 last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center capitalize rtl:space-x-reverse">

                                        <span>Delete</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}