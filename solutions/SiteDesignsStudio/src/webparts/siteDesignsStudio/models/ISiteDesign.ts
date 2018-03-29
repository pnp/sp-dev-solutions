export enum WebTemplate {
	None = 0,
	TeamSite = 64,
	CommunicationSite = 68
}

export interface ISiteDesign {
	Id: string;
	Title: string;
	WebTemplate: string;
	SiteScriptIds: string[];
	Description: string;
	PreviewImageUrl: string;
	PreviewImageAltText: string;
	IsDefault: boolean;
	Version: number;
}

export const SiteDesignEntitySchema = {
	type: 'object',
	properties: {
		Id: { type: 'string' },
		Title: { type: 'string' },
		Description: { type: 'string' },
		SiteScriptIds: { type: 'array', items: { type: 'string' } },
		Version: { type: 'number' },
		WebTemplate: { type: 'string' },
		PreviewImageUrl: { type: 'string' },
		PreviewImageAltText: { type: 'string' },
		IsDefault: { type: 'boolean' }
	}
};
