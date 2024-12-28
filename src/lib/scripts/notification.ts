export async function subscribe() {
	if ('Notification' in window) {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			console.log('Notification permission granted.');
			return true;
		} else {
			alert('Notification permission denied.');
			return false;
		}
	} else {
		alert('This browser does not support notifications.');
		return false;
	}
}
