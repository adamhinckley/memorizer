import { useState } from 'react';

const spliceStack = [];
const DisappearingWords = ({ arrayToMemorize }) => {
	const [hiddenIndices, setHiddenIndices] = useState([]);
	const [shuffledIndices, setShuffledIndices] = useState([]);
	const [amountToSplice, setAmountToSplice] = useState(0);

	const disappear = () => {
		if (shuffledIndices.length === 0) {
			const indicesWithValues = arrayToMemorize
				.map((word, index) => {
					if (word !== '') {
						return index;
					}
				})
				.filter((index) => index !== undefined);

			// shuffle the array of indices with values
			for (let i = indicesWithValues.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[indicesWithValues[i], indicesWithValues[j]] = [
					indicesWithValues[j],
					indicesWithValues[i]
				];
			}
			setAmountToSplice(
				Math.floor(
					!hiddenIndices.length ? shuffledIndices.length / 6 : hiddenIndices.length / 3
				)
			);

			setShuffledIndices(indicesWithValues);
		}

		setAmountToSplice(
			Math.floor(
				!hiddenIndices.length ? shuffledIndices.length / 6 : hiddenIndices.length / 3
			)
		);

		if (amountToSplice > 0) {
			spliceStack.push(amountToSplice);
		}

		console.log('spliceStack', spliceStack);
		// remove the first 25% iof indicesWithValues and add it to hiddenIndexes
		const indicesToHide = shuffledIndices.splice(0, amountToSplice);
		console.log('indicesToHide', indicesToHide);
		setHiddenIndices((prev) => [...prev, ...indicesToHide]);
	};

	const undo = () => {
		const amountToUnsplice = spliceStack.pop();
		const indicesToUnhide = hiddenIndices.splice(
			hiddenIndices.length - amountToUnsplice,
			amountToUnsplice
		);
		setShuffledIndices((prev) => [...prev, ...indicesToUnhide]);
	};
	return (
		<div className="flex flex-col w-full max-w-2xl ">
			<div w-full max-w-2xl>
				{arrayToMemorize.map((word, index) => {
					const isHidden = hiddenIndices.includes(index);
					const splitWord = isHidden ? word.split('') : null;
					const onlyUnderlines = splitWord?.map(() => '_').join('');
					if (word === '') {
						return <br key={index} />;
					}
					return isHidden ? (
						<span key={index}>
							{onlyUnderlines}
							{'  '}
						</span>
					) : (
						<span key={index}>{word} </span>
					);
				})}
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
				onClick={disappear}
			>
				Remove Words
			</button>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
				onClick={undo}
			>
				Undo
			</button>
		</div>
	);
};

export default DisappearingWords;
