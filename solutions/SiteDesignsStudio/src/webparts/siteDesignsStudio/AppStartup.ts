import {
	ISiteScriptSchemaService,
	SiteScriptSchemaServiceKey
} from './services/siteScriptSchema/SiteScriptSchemaService';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SiteDesignsServiceKey, ISiteDesignsService } from './services/siteDesigns/SiteDesignsService';
import { MockSiteDesignsService } from './services/siteDesigns/MockSiteDesignsService';
import { ISiteDesignsStudioWebPartProps } from './SiteDesignsStudioWebPart';

export class AppStartup {
	public static configureServices(appContext: IWebPartContext, properties: ISiteDesignsStudioWebPartProps): Promise<ServiceScope> {
		switch (Environment.type) {
			case EnvironmentType.Local:
			case EnvironmentType.Test:
				return AppStartup.configureTestServices(appContext, properties);
			default:
				return AppStartup.configureProductionServices(appContext, properties);
		}
	}

	private static configureTestServices(appContext: IWebPartContext, properties: ISiteDesignsStudioWebPartProps): Promise<ServiceScope> {
		return new Promise((resolve, reject) => {
			let rootServiceScope = appContext.host.serviceScope;
			rootServiceScope.whenFinished(() => {
				// Here create a dedicated service scope for test or local context
				const childScope: ServiceScope = rootServiceScope.startNewChild();
				// Register the services that will override default implementation
				childScope.createAndProvide(SiteDesignsServiceKey, MockSiteDesignsService);
				// Must call the finish() method to make sure the child scope is ready to be used
				childScope.finish();

				childScope.whenFinished(() => {
					// If other services must be configured, it must done HERE
					// Configure the Schema Service
					let schemaService: ISiteScriptSchemaService = rootServiceScope.consume<ISiteScriptSchemaService>(
						SiteScriptSchemaServiceKey
					);
					schemaService
						.configure(properties.siteDesignSchema)
						.then(() => {
							resolve(childScope);
						})
						.catch((error) => {
							reject(error);
						});
				});
			});
		});
	}

	private static configureProductionServices(appContext: IWebPartContext, properties: ISiteDesignsStudioWebPartProps): Promise<ServiceScope> {
		return new Promise((resolve, reject) => {
			let rootServiceScope = appContext.host.serviceScope;
			rootServiceScope.whenFinished(() => {
				// Configure the Site Designs service with the current context url
				let siteDesignsService: ISiteDesignsService = rootServiceScope.consume<ISiteDesignsService>(
					SiteDesignsServiceKey
				);
				siteDesignsService.baseUrl = appContext.pageContext.web.serverRelativeUrl;

				// Configure the Schema Service
				let schemaService: ISiteScriptSchemaService = rootServiceScope.consume<ISiteScriptSchemaService>(
					SiteScriptSchemaServiceKey
				);
				schemaService
					.configure(properties.siteDesignSchema)
					.then(() => {
						resolve(rootServiceScope);
					})
					.catch((error) => {
						reject(error);
					});
			});
		});
	}
}
