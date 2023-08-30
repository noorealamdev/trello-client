export default function Card({ card }) {
	return (
		<>
			<div className="kanban-card card rounded-md bg-white dark:bg-slate-800 shadow-base custom-className card-body p-3 cursor-pointer">
				<header className="flex justify-between items-end">
					<div className="flex space-x-2 rtl:space-x-reverse">
						<div className="text-base leading-6">
							<div className="text-sm dark:text-slate-200 text-slate-900 max-w-full">
								{card.name}
							</div>
						</div>
					</div>
				</header>
			</div>
		</>
	);
}
