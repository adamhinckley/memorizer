'use client';
import { useEffect, useState } from 'react';

const CreateLink = () => {
	const [value, setValue] = useState('');
	const [urlValue, setUrlValue] = useState('second');
	const [buttonTitle, setButtonTitle] = useState('Copy Link');

	const onChange = (event) => {
		setValue(event.target.value);
		if (buttonTitle === 'Copied!') {
			setButtonTitle('Create Link');
		}
	};

	const handleClick = () => {
		const param = encodeURIComponent(value);
		const { origin, pathname, host } = window.location;
		// copy url to clipboard

		const isLocal = window.location.href.includes('localhost');

		const originToUse = isLocal ? host : origin;

		const textToCopy = `${originToUse}/shared-link?${param}`;
		navigator.clipboard.writeText(textToCopy);
		setButtonTitle('Copied!');
	};

	useEffect(() => {
		// save url params to state
		// parse params to string
		const decodedUrl = decodeURIComponent(window.location.search);
		const spaces = decodedUrl.replace(/\+/g, ' ');
		setUrlValue(spaces);
	}, []);

	return (
		<div className="flex flex-col w-full max-w-2xl">
			<textarea
				value={value}
				onChange={onChange}
				placeholder="Add the text you want to share with someone here..."
				className=" w-full h-1/3 rounded border"
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:bg-gray-300"
				onClick={handleClick}
				disabled={!value}
			>
				{buttonTitle}
			</button>
		</div>
	);
};

export default CreateLink;
