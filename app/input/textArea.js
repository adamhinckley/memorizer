'use client';
import { useState, useRef } from 'react';
import DisappearingWords from '../components/disappearingWords';
import ClickToRemove from './clickToRemove';
import { replaceEscapeCharactersWithEmptyString } from '../util/helpers';

const TextArea = () => {
	const [value, setValue] = useState('');
	const [arrayToMemorize, setArrayToMemorize] = useState([]);

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const handleClick = () => {
		const valueArray = value.split(' ');
		setArrayToMemorize(replaceEscapeCharactersWithEmptyString(valueArray));
	};

	return !arrayToMemorize.length ? (
		<div className="flex flex-col w-full max-w-2xl">
			<textarea
				value={value}
				onChange={onChange}
				placeholder="Add the text you want to memorize here..."
				className=" w-full h-1/3 rounded border"
			/>
			{!arrayToMemorize.length && (
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:bg-gray-300"
					onClick={handleClick}
					disabled={!value}
				>
					Memorize
				</button>
			)}
		</div>
	) : (
		<div className="flex flex-col">
			{/* <DisappearingWords arrayToMemorize={arrayToMemorize} /> */}
			<ClickToRemove
				arrayToMemorize={arrayToMemorize}
				setArrayToMemorize={setArrayToMemorize}
				setValue={setValue}
			/>
		</div>
	);
};

export default TextArea;
