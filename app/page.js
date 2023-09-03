import Link from 'next/link';

export default function Home() {
	return (
		// <nav className="">
		// 	<li>
		// 		<Link href="/make-my-own">Make My Own</Link>
		// 	</li>
		// 	<li>
		// 		<Link href="/create-link">Create a link to share</Link>
		// 	</li>
		// </nav>
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<nav className="flex flex-col items-center  ">
				<Link href="/make-my-own">Make My Own</Link>
				<Link href="/create-link">Create a link to share</Link>
			</nav>
		</div>
	);
}
