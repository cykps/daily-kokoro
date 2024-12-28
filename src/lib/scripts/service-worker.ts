export async function register() {
	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register('/service-worker.js', {
				type: 'module'
			});
			return registration.scope;
		} catch {
			return null;
		}
	} else {
		return null;
	}
}
