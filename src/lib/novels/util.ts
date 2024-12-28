import { base } from '$app/paths';

export function id2Path(novelId: string) {
	return `${base}/novels/${novelId}`;
}
