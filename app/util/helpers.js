export const replaceEscapeCharactersWithEmptyString = (array) => {
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
