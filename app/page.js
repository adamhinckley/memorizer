'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const getLocation = () => {
	let location = 'Location not available';
	return navigator.geolocation?.getCurrentPosition(
		(position) => {
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;
			const accuracy = position.coords.accuracy; // in meters

			return ` ${lat.toFixed(4)}, ${lng.toFixed(4)}, Accuracy: ${accuracy} meters`;
		},
		(error) => {
			console.error('Error getting location:', error.message);
		},
		{ enableHighAccuracy: true }
	);
};

export default function Home() {
	const [location, setLocation] = useState('Getting location...');

	useEffect(() => {
		navigator.geolocation?.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;
				const accuracy = position.coords.accuracy;
				setLocation(
					`Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}, Accuracy: ${accuracy} meters`
				);
			},
			(error) => {
				console.error('Error getting location:', error.message);
				setLocation('Location not available');
			},
			{ enableHighAccuracy: true }
		);
	}, []);
	return (
		<div>
			<p className="mt-4 text-center">
				Welcome to Memorizer, the tool for memorizing text by making parts of it disappear.
			</p>
			<p>{location}</p>
			<div className="flex flex-col items-center justify-center min-h-screen py-2">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
					<Link href="/make-my-own">Make My Own</Link>
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
					<Link href="/create-link">Create a link to share</Link>
				</button>
			</div>
		</div>
	);
}
