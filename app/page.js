import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<p className="mt-4 text-center">
				Welcome to Memorizer, the tool for memorizing text by making parts of it disappear.
			</p>
			<div className="flex flex-col items-center justify-center min-h-screen py-2">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
					<Link href="/make-my-own">Make My Own</Link>
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
					<Link href="/create-link">Create a link to share</Link>
				</button>
			</div>
		</div>
	);
}
