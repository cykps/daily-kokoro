import type { Novel } from './record-template';

import { kokoro } from './database/kokoro';

export type NovelId = string;
interface NovelDict {
	[key: NovelId]: Novel;
}

export const novelDict: NovelDict = {
	kokoro: kokoro
};

export const novelList = Object.entries(novelDict);
