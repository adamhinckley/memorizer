import './globals.css';

export const metadata = {
	title: 'Memorizer',
	description: 'Memorize anything with spaced repetition'
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="h-screen">{children}</body>
		</html>
	);
}
