'use client';
import { useEffect, useState } from 'react';

const CreateLink = () => {
	const [value, setValue] = useState('');
	const [urlValue, setUrlValue] = useState('second');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const handleClick = () => {
		const param = encodeURIComponent(value);
		// add params to url
		// window.history.pushState({}, '', `?${param}`);
		console.log('param', param);
		const { origin, pathname, host } = window.location;
		// copy url to clipboard

		const isLocal = window.location.href.includes('localhost');

		const originToUse = isLocal ? host : origin;

		const textToCopy = `${originToUse}/shared-link?${param}`;
		console.log('textToCopy', textToCopy);
		console.log('window.location', window.location);
		navigator.clipboard.writeText(textToCopy);

		const paramsString = decodeURIComponent(param);
		// replace + with empty space
		const spaces = paramsString.replace(/\+/g, ' ');
		//
	};

	useEffect(() => {
		// save url params to state
		// parse params to string
		const decodedUrl = decodeURIComponent(window.location.search);
		const spaces = decodedUrl.replace(/\+/g, ' ');
		setUrlValue(spaces);
	}, [window.location.search]);

	return (
		<div className="flex flex-col w-full max-w-2xl">
			<textarea
				value={value}
				onChange={onChange}
				placeholder="Add the text you want to memorize here..."
				className=" w-full h-1/3 rounded border"
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:bg-gray-300"
				onClick={handleClick}
				disabled={!value}
			>
				Create Link
			</button>
		</div>
	);
};

export default CreateLink;