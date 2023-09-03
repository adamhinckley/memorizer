import Image from 'next/image';
import TextArea from './components/textArea';

export default function Home() {
	return (
		<div className="w-full m-auto h-full flex  justify-center p-4 ">
			<TextArea />
		</div>
	);
}
