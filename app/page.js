import Image from 'next/image';
import TextArea from './components/textArea';

export default function Home() {
	return (
		<div className="w-full m-auto bg-blue-400  h-full flex  justify-center p-4 ">
			<TextArea />
		</div>
	);
}
