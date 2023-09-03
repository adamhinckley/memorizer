'use client';
import { useState, useRef } from 'react';
import DisappearingWords from './disappearingWords';
import ClickToRemove from './clickToRemove';

const TextArea = () => {
	const [value, setValue] = useState('');
	const [arrayToMemorize, setArrayToMemorize] = useState([]);

	const onChange = (event) => {
		console.log(event.target.value);
		setValue(event.target.value);
	};

	const replaceEscapeCharactersWithEmptyString = (array) => {
		const newArray = [];
		array.forEach((word) => {
			if (word.includes('\n')) {
				const splitWord = word.split('\n');
				splitWord.forEach((word, index) => {
					if (index < splitWord.length - 1 && word !== '') {
						newArray.push(word, '');
					} else {
						newArray.push(word);
					}
				});
			} else {
				newArray.push(word);
			}
		});

		console.log('newArray', newArray);
		return newArray;
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
