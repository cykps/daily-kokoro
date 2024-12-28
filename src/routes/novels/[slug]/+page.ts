import { novelDict } from '$lib/novels/dict';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const novel = novelDict?.[params.slug];
	if (novel) {
		return { id: params.slug, novel: novel };
	}

	error(404);
};
