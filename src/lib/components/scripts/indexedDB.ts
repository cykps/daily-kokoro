import type { NovelId } from '$lib/novels/dict';
type EpisodeIdx = number;

interface EpisodeIdxRecord {
	id: NovelId;
	episodeIdx: EpisodeIdx;
}

const DB_NAME = 'novelDb';
const EPIOSODE_IDX_STORE_NAME = 'epiosodeIdxs';
const LAST_NOTIFIED_TIME_STORE_NAME = 'lastNotifiedTimes';

// IndexedDBデータベースを開く
async function openDatabase(dbName: string, storeName: string): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: 'id' });
			}
		};

		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			resolve(db);
		};

		request.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest).error);
		};
	});
}

// データを追加する関数
async function addData(dbName: string, storeName: string, data: any): Promise<void> {
	const db = await openDatabase(dbName, storeName);

	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.add(data);

		request.onsuccess = () => {
			resolve();
		};

		request.onerror = (event) => {
			reject((event.target as IDBRequest).error);
		};
	});
}

// データを追加する関数
async function putData(dbName: string, storeName: string, data: any): Promise<void> {
	const db = await openDatabase(dbName, storeName);

	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.put(data);

		request.onsuccess = () => {
			resolve();
		};

		request.onerror = (event) => {
			reject((event.target as IDBRequest).error);
		};
	});
}

// データを取得する関数
async function getData(
	dbName: string,
	storeName: string,
	id: string
): Promise<EpisodeIdxRecord | undefined> {
	const db = await openDatabase(dbName, storeName);

	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		const request = store.get(id);

		request.onsuccess = (event) => {
			resolve((event.target as IDBRequest).result);
		};

		request.onerror = (event) => {
			reject((event.target as IDBRequest).error);
		};
	});
}

export async function putEpisodeIdx(novelId: NovelId, episodeIdx: EpisodeIdx) {
	return await putData(DB_NAME, EPIOSODE_IDX_STORE_NAME, { id: novelId, data: episodeIdx });
}
export async function getEpisodeIdx(novelId: NovelId) {
	return await getData(DB_NAME, EPIOSODE_IDX_STORE_NAME, novelId);
}
