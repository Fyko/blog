export function Badge(props: { title: string; }) {
	return (
		<span className="inline-flex items-center px-2.5 py-0.5 mx-1 rounded-full text-xs font-medium bg-teal-500 text-teal-900" key={props.title}>
			{props.title}
		</span>
	)
}
