'use client';
import { useState } from 'react';
import { replaceEscapeCharactersWithEmptyString } from '../util/helpers';

const SharedTextToMemorize = () => {
	const [hiddenIndices, setHiddenIndices] = useState([]);
	const text = window ? window.location.search : '';

	if (!text) {
		return null;
	}
	const decodedUrl = decodeURIComponent(text).slice(1);

	const spaces = decodedUrl.replace(/\+/g, ' ');
	const array = spaces.split(' ');
	const arrayToMemorize = replaceEscapeCharactersWithEmptyString(array);

	const handleRemove = (index) => {
		setHiddenIndices((prev) => [...prev, index]);
	};

	const handleAdd = (index) => {
		//find the index and remove it from hiddenIndices
		const indexToRemove = hiddenIndices.findIndex((hiddenIndex) => hiddenIndex === index);
		const newHiddenIndices = [...hiddenIndices];
		newHiddenIndices.splice(indexToRemove, 1);
		setHiddenIndices(newHiddenIndices);
	};

	return (
		<div className="flex flex-col w-full max-w-2xl cursor-pointer">
			<p className="text-center mb-8 font-bold">Click on words to hide/show them</p>
			<div w-full max-w-2xl>
				{arrayToMemorize.map((word, index) => {
					const isHidden = hiddenIndices.includes(index);
					if (word === '') {
						return <br key={index} />;
					}
					return isHidden ? (
						<span
							key={index}
							onClick={() => handleAdd(index)}
							className="text-transparent border-b border-black mr-1"
						>
							{word}{' '}
						</span>
					) : (
						<span key={index} onClick={() => handleRemove(index)} className="mr-1">
							{word}{' '}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default SharedTextToMemorize;
