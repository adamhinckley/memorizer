import { useState } from 'react';

const ClickToRemove = ({ arrayToMemorize, setArrayToMemorize, setValue }) => {
	const [hiddenIndices, setHiddenIndices] = useState([]);

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

	const handleReset = () => {
		setValue('');
		setArrayToMemorize([]);
	};

	return (
		<div className="flex flex-col w-full max-w-2xl cursor-pointer">
			<p className="text-center mb-8">Click on words to hide/show them</p>
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
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
				onClick={handleReset}
			>
				Reset
			</button>
		</div>
	);
};

export default ClickToRemove;
