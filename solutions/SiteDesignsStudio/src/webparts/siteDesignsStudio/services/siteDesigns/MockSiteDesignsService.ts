import { ISiteScript } from '../../models/ISiteScript';
import { ISiteDesign, WebTemplate } from '../../models/ISiteDesign';
import { ServiceScope, ServiceKey, Version } from '@microsoft/sp-core-library';
import { ISiteDesignsService } from './SiteDesignsService';
import { escape, assign, findIndex } from '@microsoft/sp-lodash-subset';

const SiteDesignsMockData: ISiteDesign[] = [
	{
		Id: '000-000-000-0001',
		Title: 'Contoso Design 01',
		WebTemplate: WebTemplate.TeamSite.toString(),
		Description: 'This is the Design for the Contoso Team Site',
		SiteScriptIds: [ '0001', '0002', '0003' ],
		PreviewImageUrl: '',
		PreviewImageAltText: 'Contoso Design 01 Preview',
		IsDefault: false,
		Version: 1
	},
	{
		Id: '000-000-000-0002',
		Title: 'Contoso Design Accounting',
		WebTemplate: WebTemplate.TeamSite.toString(),
		Description: 'This is the Design for the Contoso Accounting Team Site',
		SiteScriptIds: [ '0001', '0002', '0004' ],
		PreviewImageUrl: '',
		PreviewImageAltText: 'Contoso Design Accounting Preview',
		IsDefault: false,
		Version: 1
	},
	{
		Id: '000-000-000-0003',
		Title: 'Contoso Design Communication',
		WebTemplate: WebTemplate.CommunicationSite.toString(),
		Description: 'This is the Design for the Contoso Communication Site',
		SiteScriptIds: [ '0005', '0006' ],
		PreviewImageUrl: '',
		PreviewImageAltText: 'Contoso Design 01 Preview',
		IsDefault: false,
		Version: 1
	}
];

const SiteScriptsMockData: ISiteScript[] = [
	{
		Id: '0001',
		Title: 'Add common libraries',
		Description: 'Add the needed common libraries in the target site',
		Content: {
			actions: [],
			bindata: {},
			version: 1
		},
		Version: 1
	},
	{
		Id: '0002',
		Title: 'Set Team Site Branding',
		Description: 'Customize the site branding specific for Team Sites',
		Content: {
			actions: [
				{
					verb: 'addNavLink',
					url: 'http://localhost',
					displayName: 'Localhost',
					isWebRelative: null
				},
				{
					verb: 'applyTheme',
					themeName: 'My Theme'
				}
			],
			bindata: {},
			version: 1
		},
		Version: 1
	},
	{
		Id: '0003',
		Title: 'Set Default Team Site Navigation',
		Description: 'Customize the site branding specific for common Team Sites',
		Content: {
			actions: [
				{
					verb: 'addNavLink',
					url: 'http://localhost',
					displayName: 'Localhost',
					isWebRelative: null
				},
				{
					verb: 'applyTheme',
					themeName: 'My Theme'
				}
			],
			bindata: {},
			version: 1
		},
		Version: 1
	},
	{
		Id: '0004',
		Title: 'Set Accounting Team Site Navigation',
		Description: 'Customize the site branding specific for Accounting Team Sites',
		Content: {
			actions: [],
			bindata: {},
			version: 1
		},
		Version: 1
	},
	{
		Id: '0005',
		Title: 'Set Communication sites Navigation',
		Description: 'Customize the site navigation specific for Communication Sites',
		Content: {
			actions: [],
			bindata: {},
			version: 1
		},
		Version: 1
	},
	{
		Id: '0006',
		Title: 'Set Communication Sites Branding',
		Description: 'Customize the site branding specific for Communication Sites',
		Content: {
			actions: [],
			bindata: {},
			version: 1
		},
		Version: 1
	}
];

const MockServiceDelay = 20;

export class MockSiteDesignsService implements ISiteDesignsService {
	constructor(serviceScope: ServiceScope) {}

	public baseUrl: string = '';

	private _getSiteDesign(siteDesignId: string): ISiteDesign {
    let index = findIndex(SiteDesignsMockData, (sd) => sd.Id == siteDesignId);
    return index >= 0 ? SiteDesignsMockData[index]: null;
	}

	private _getSiteScript(siteScriptId: string): ISiteScript {
    let index = findIndex(SiteScriptsMockData, (sd) => sd.Id == siteScriptId);
    return index >= 0 ? SiteScriptsMockData[index]: null;
  }

  private _dumpInMemoryDatabase() {
    console.log("Site Designs DB =" , SiteDesignsMockData);
    console.log("Site Scripts DB =" , SiteScriptsMockData);
  }

	private _mockServiceCall<T>(action: () => T): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			setTimeout(() => {
        let result: T = action();
        this._dumpInMemoryDatabase();
				resolve(result);
			}, MockServiceDelay);
		});
	}

	public getSiteDesigns(): Promise<ISiteDesign[]> {
		return this._mockServiceCall(() => SiteDesignsMockData);
	}
	public getSiteDesign(siteDesignId: string): Promise<ISiteDesign> {
		return this._mockServiceCall(() => this._getSiteDesign(siteDesignId));
	}
	public saveSiteDesign(siteDesign: ISiteDesign): Promise<void> {
		const action = () => {
			if (siteDesign.Id) {
				// Update
				const existing = this._getSiteDesign(siteDesign.Id);
				assign(existing, siteDesign);
				return;
			} else {
				// Create
				siteDesign.Id = (+new Date()).toString();
				SiteDesignsMockData.push(siteDesign);
				return;
			}
		};

		return this._mockServiceCall(action);
	}
	public deleteSiteDesign(siteDesign: ISiteDesign | string): Promise<void> {
		const action = () => {
			let id = typeof siteDesign === 'string' ? siteDesign as string : (siteDesign as ISiteDesign).Id;
			const existing = this._getSiteDesign(id);
			let index = SiteDesignsMockData.indexOf(existing);
			SiteDesignsMockData.splice(index, 1);
		};
		return this._mockServiceCall(action);
	}
	public getSiteScripts(): Promise<ISiteScript[]> {
		return this._mockServiceCall(() => SiteScriptsMockData);
	}
	public getSiteScript(siteScriptId: string): Promise<ISiteScript> {
		return this._mockServiceCall(() => this._getSiteScript(siteScriptId));
	}

	public saveSiteScript(siteScript: ISiteScript): Promise<void> {
		const action = () => {
			if (siteScript.Id) {
				// Update
				const existing = this._getSiteScript(siteScript.Id);
				assign(existing, siteScript);
				return;
			} else {
				// Create
				siteScript.Id = (+new Date()).toString();
				SiteScriptsMockData.push(siteScript);
				return;
			}
		};
		return this._mockServiceCall(action);
	}
	public deleteSiteScript(siteScript: ISiteScript | string): Promise<void> {
		const action = () => {
			let id = typeof siteScript === 'string' ? siteScript as string : (siteScript as ISiteScript).Id;
			const existing = this._getSiteScript(id);
			let index = SiteScriptsMockData.indexOf(existing);
			SiteScriptsMockData.splice(index, 1);
		};
		return this._mockServiceCall(action);
	}
}
