import { putEpisodeIdx, getEpisodeIdx } from '$lib/components/scripts/indexedDB';

// Notification
// Service Workerのインストールイベント
self.addEventListener('install', (event: ExtendableEvent) => {
	(self as any).skipWaiting();
	console.log('Service Worker installed');
});

// Service Workerのアクティベートイベント
self.addEventListener('activate', (event: ExtendableEvent) => {
	(self as any).clients.claim();
	console.log('Service Worker activated');

	// Notificationの対応状況をチェック
	if ('Notification' in self) {
		console.log('Notifications are supported in this browser');
	} else {
		console.log('Notifications are not supported in this browser');
	}
});

// 通知クリックイベント
self.addEventListener('notificationclick', (event: NotificationEvent) => {
	event.notification.close();
	event.waitUntil(
		(self as any).clients
			.matchAll({ type: 'window', includeUncontrolled: true })
			.then((clientList: WindowClient[]) => {
				if (clientList.length > 0) {
					clientList[0].focus();
				} else {
					(self as any).clients.openWindow('/');
				}
			})
	);
});

// 通知を表示する関数
async function showNotification() {
	if ('Notification' in self) {
		let data = await getEpisodeIdx('kokoro');
		(self as any).registration.showNotification('定期通知', {
			body: `${data}これは10秒ごとのプッシュ通知です。`,
			icon: '/icon.png'
		});
	} else {
		console.log('Notifications are not supported in this browser');
	}
}

// 10秒ごとに通知を送る
//setInterval(() => {
//    showNotification();
//}, 10000);
