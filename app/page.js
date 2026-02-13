'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
	const [location, setLocation] = useState('Getting location...');

	useEffect(() => {
		// Check if geolocation is available
		if (!navigator.geolocation) {
			setLocation('Geolocation is not supported by your browser');
			return;
		}

		// Check if we're in a secure context (HTTPS or localhost)
		if (!window.isSecureContext) {
			setLocation('⚠️ Geolocation requires HTTPS. Please deploy with HTTPS enabled.');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;
				const accuracy = position.coords.accuracy;
				setLocation(
					`Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}, Accuracy: ${accuracy} meters`
				);
			},
			(error) => {
				console.error('Error getting location:', error);
				let errorMsg = 'Location not available';
				
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMsg = '❌ Location permission denied. Please enable location access in your browser settings.';
						break;
					case error.POSITION_UNAVAILABLE:
						errorMsg = '❌ Location information unavailable.';
						break;
					case error.TIMEOUT:
						errorMsg = '❌ Location request timed out.';
						break;
					default:
						errorMsg = `❌ Error getting location: ${error.message}`;
				}
				
				setLocation(errorMsg);
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
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
