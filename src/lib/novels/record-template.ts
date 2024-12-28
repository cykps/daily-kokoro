type Html = string;

export interface Novel {
	title: string;
	author: string;
	source: Source;
	html: Html[];
	summary: Html;
}

interface Source {
	text: Html;
	url?: string;
	summary: string;
}
