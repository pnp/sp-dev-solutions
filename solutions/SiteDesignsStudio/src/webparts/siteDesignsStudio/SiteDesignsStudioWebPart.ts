import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, ServiceScope } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-webpart-base';

import * as strings from 'SiteDesignsStudioWebPartStrings';
import SiteDesignsStudio from './components/SiteDesignsStudio';
import { ISiteDesignsStudioProps } from './components/ISiteDesignsStudioProps';
import { AppStartup } from './AppStartup';
import { PropertyPaneSchemaEditor } from './components/settings/SchemaPropertyEditor';
import { update, get } from '@microsoft/sp-lodash-subset';
import {
	SiteScriptSchemaServiceKey,
	ISiteScriptSchemaService
} from './services/siteScriptSchema/SiteScriptSchemaService';

export interface ISiteDesignsStudioWebPartProps {
  siteDesignSchema: string;
  useWizardActionGenerators: boolean;
  useWizardPropertyEditors: boolean;
}

export default class SiteDesignsStudioWebPart extends BaseClientSideWebPart<ISiteDesignsStudioWebPartProps> {
	private usedServiceScope: ServiceScope;
	private schemaService: ISiteScriptSchemaService;

	public onInit(): Promise<any> {
		return (
			super
				.onInit()
				// Set the global configuration of the application
				// This is where we will define the proper services according to the context (Local, Test, Prod,...)
				// or according to specific settings
				.then((_) => AppStartup.configureServices(this.context, this.properties))
				// When configuration is done, we get the instances of the services we want to use
				.then((serviceScope) => {
					this.usedServiceScope = serviceScope;
					this.schemaService = serviceScope.consume(SiteScriptSchemaServiceKey);
					// Configure the schema service with WebPart property if set
					if (this.properties.siteDesignSchema) {
						this.schemaService.configure(this.properties.siteDesignSchema);
					}
					// Get services instance references here
					// this.dataService = serviceScope.consume(DataServiceKey);
					// this.config = serviceScope.consume(ConfigurationServiceKey);
				})
		);
	}

	public render(): void {
		const element: React.ReactElement<ISiteDesignsStudioProps> = React.createElement(SiteDesignsStudio, {
      serviceScope: this.usedServiceScope,
      useWizardActionGenerators: this.properties.useWizardActionGenerators,
      useWizardPropertyEditors: this.properties.useWizardPropertyEditors
		});

		ReactDom.render(element, this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.2');
	}

	private onPropertyChanged(propertyPath: string, newValue: any): void {
		console.log('on property changed', propertyPath, newValue);
		const oldValue: any = get(this.properties, propertyPath);
		// store new value in web part properties
		update(this.properties, propertyPath, (): any => {
			return newValue;
		});

		// Update the schema used by the schema service
		if (propertyPath == 'siteDesignSchema') {
			this.schemaService.configure(newValue, true);
		}

		// refresh web part
		this.render();
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.SettingsGroupName,
							groupFields: [
								new PropertyPaneSchemaEditor('siteDesignSchema', {
									label: strings.SchemaPropertyButtonLabel,
									onSchemaPropertyChanged: (value) =>
										this.onPropertyChanged('siteDesignSchema', value),
									value: this.properties.siteDesignSchema,
                  serviceScope: this.usedServiceScope
								})
							]
            },
            {
							groupName: strings.WizardsPropertyGroup,
							groupFields: [
								PropertyPaneToggle('useWizardActionGenerators', {
									label: strings.UseWizardActionGeneratorLabel,
									checked: this.properties.useWizardActionGenerators
                }),
                PropertyPaneToggle('useWizardPropertyEditors', {
									label: strings.UseWizardPropertyEditorLabel,
									checked: this.properties.useWizardPropertyEditors
								})
							]
						}
					]
				}
			]
		};
	}
}
