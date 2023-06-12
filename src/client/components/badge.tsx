export function NewBadge() {
	return (
		<span className="inline-flex items-center px-2.5 py-0.5 mx-1 rounded-full text-xs font-medium bg-teal-500 text-teal-900">
			new
		</span>
	);
}

export function HotBadge() {
	return (
		<span className="inline-flex items-center px-2.5 py-0.5 mx-1 rounded-full text-xs font-medium bg-red-500 text-red-900">
			hot
		</span>
	);
}

export function HiddenBadge() {
	return (
		<span className="inline-flex items-center px-2.5 py-0.5 mx-1 rounded-full text-xs font-medium bg-yellow-500 text-yellow-900">
			hidden
		</span>
	);
}
