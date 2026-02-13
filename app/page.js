'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
	const [location, setLocation] = useState('Click button to get location');
	const [permissionStatus, setPermissionStatus] = useState('unknown');

	const requestLocation = () => {
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

		setLocation('Getting location...');

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const lat = position.coords.latitude;
				const lng = position.coords.longitude;
				const accuracy = position.coords.accuracy;
				setLocation(
					`Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}, Accuracy: ${accuracy} meters`
				);
				setPermissionStatus('granted');
			},
			(error) => {
				console.error('Error getting location:', error);
				let errorMsg = 'Location not available';

				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMsg =
							'❌ Permission denied. On mobile: \n1. Go to browser settings\n2. Find this site\n3. Allow location access\n4. Refresh page';
						setPermissionStatus('denied');
						break;
					case error.POSITION_UNAVAILABLE:
						errorMsg =
							'❌ Location information unavailable. Make sure location services are enabled on your device.';
						break;
					case error.TIMEOUT:
						errorMsg = '❌ Location request timed out. Try again.';
						break;
					default:
						errorMsg = `❌ Error: ${error.message}`;
				}

				setLocation(errorMsg);
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
		);
	};

	useEffect(() => {
		// Check permission status on load
		if (navigator.permissions && navigator.permissions.query) {
			navigator.permissions
				.query({ name: 'geolocation' })
				.then((result) => {
					setPermissionStatus(result.state);
					if (result.state === 'granted') {
						requestLocation();
					} else if (result.state === 'prompt') {
						setLocation('👆 Click "Get My Location" to enable location access');
					} else {
						setLocation(
							'⚠️ Location blocked. Check browser settings to allow location access.'
						);
					}
				})
				.catch(() => {
					// Permissions API not supported, just show button
					setLocation('👆 Click "Get My Location" to enable location access');
				});
		}
	}, []);
	return (
		<div>
			<p className="mt-4 text-center">
				Welcome to Memorizer, the tool for memorizing text by making parts of it disappear.
			</p>

			<div className="flex flex-col items-center mt-4">
				<button
					onClick={requestLocation}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
				>
					📍 Get My Location
				</button>
				<p className="text-sm text-center whitespace-pre-line px-4">{location}</p>
			</div>

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
