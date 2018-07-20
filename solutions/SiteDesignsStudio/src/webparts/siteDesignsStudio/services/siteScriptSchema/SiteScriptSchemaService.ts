import { get } from '@microsoft/sp-lodash-subset';
import { ISiteScriptAction } from '../../models/ISiteScript';
import DefaultSchema from '../../schema/schema';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';
import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface ISiteScriptSchemaService {
	configure(schemaJSONorURL?: string, forceReconfigure?: boolean): Promise<any>;
	getNewSiteScript(): any;
	getSiteScriptSchema(): any;
	getActionSchema(action: ISiteScriptAction): any;
	getActionTitle(action: ISiteScriptAction, parentAction?: ISiteScriptAction): string;
	getActionTitleByVerb(actionVerb: string, parentActionVerb?: string): string;
	getActionDescription(action: ISiteScriptAction, parentAction?: ISiteScriptAction): string;
	getActionDescriptionByVerb(actionVerb: string, parentActionVerb?: string): string;
	getSubActionSchemaByVerbs(parentActionVerb: string, subActionVerb: string): any;
	getSubActionSchema(parentAction: ISiteScriptAction, subAction: ISiteScriptAction): any;
	getAvailableActions(): string[];
	getAvailableSubActions(parentAction: ISiteScriptAction): string[];
}

export class SiteScriptSchemaService implements ISiteScriptSchemaService {
	private schema: any = null;
	private isConfigured: boolean = false;
	private availableActions: string[] = null;
	private availableSubActionByVerb: {} = null;
	private availableActionSchemas = null;
	private availableSubActionSchemasByVerb = null;

	constructor(private serviceScope: ServiceScope) {}

	private _getElementSchema(object: any, property: string = null): any {
		let value = !property ? object : object[property];
		if (value['$ref']) {
			let path = value['$ref'];
			return this._getPropertyFromPath(this.schema, path);
		}

		return value;
	}

	private _getPropertyFromPath(object: any, path: string, separator: string = '/'): any {
		path = path.replace('#/', '').replace('#', '').replace(new RegExp(separator, 'g'), '.');
		return get(object, path);
	}

	private _getVerbFromActionSchema(actionDefinition: any): string {
		if (
			!actionDefinition.properties ||
			!actionDefinition.properties.verb ||
			!actionDefinition.properties.verb.enum ||
			!actionDefinition.properties.verb.enum.length
		) {
			throw new Error('Invalid Action schema');
		}

		return actionDefinition.properties.verb.enum[0];
	}

	private _getSubActionsSchemaFromParentActionSchema(parentActionDefinition: any): any[] {
		if (!parentActionDefinition.properties) {
			throw new Error('Invalid Action schema');
		}

		if (!parentActionDefinition.properties.subactions) {
			return null;
		}

		if (
			parentActionDefinition.properties.subactions.type != 'array' ||
			!parentActionDefinition.properties.subactions.items ||
			!parentActionDefinition.properties.subactions.items.anyOf
		) {
			throw new Error('Invalid Action schema');
		}

		return parentActionDefinition.properties.subactions.items.anyOf.map((subActionSchema) =>
			this._getElementSchema(subActionSchema)
		);
	}

	public configure(schemaJSONorURL?: string, forceReconfigure: boolean = false): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.isConfigured && !forceReconfigure) {
				resolve();
				return;
			}

			this._loadSchema(schemaJSONorURL)
				.then((schema) => {
					if (!schema) {
						reject('Schema cannot be found');
						return;
					}

					this.schema = schema;
					try {
						// Get available action schemas
						let actionsArraySchema = this.schema.properties.actions;

						if (!actionsArraySchema.type || actionsArraySchema.type != 'array') {
							throw new Error('Invalid Actions schema');
						}

						if (!actionsArraySchema.items || !actionsArraySchema.items.anyOf) {
							throw new Error('Invalid Actions schema');
						}

						let actionsArraySchemaItems = actionsArraySchema.items;

						// Get Main Actions schema
						let availableActionSchemasAsArray: any[] = actionsArraySchemaItems.anyOf.map((action) =>
							this._getElementSchema(action)
						);
						this.availableActionSchemas = {};
						availableActionSchemasAsArray.forEach((actionSchema) => {
							// Keep the current action schema
							let actionVerb = this._getVerbFromActionSchema(actionSchema);
							this.availableActionSchemas[actionVerb] = actionSchema;

							// Check if the current action has subactions
							let subActionSchemas = this._getSubActionsSchemaFromParentActionSchema(actionSchema);
							if (subActionSchemas) {
								// If yes, keep the sub actions schema and verbs

								// Keep the list of subactions verbs
								if (!this.availableSubActionByVerb) {
									this.availableSubActionByVerb = {};
								}
								this.availableSubActionByVerb[actionVerb] = subActionSchemas.map((sa) =>
									this._getVerbFromActionSchema(sa)
								);

								// Keep the list of subactions schemas
								if (!this.availableSubActionSchemasByVerb) {
									this.availableSubActionSchemasByVerb = {};
								}
								this.availableSubActionSchemasByVerb[actionVerb] = {};
								subActionSchemas.forEach((sas) => {
									let subActionVerb = this._getVerbFromActionSchema(sas);
									this.availableSubActionSchemasByVerb[actionVerb][subActionVerb] = sas;
								});
							}
						});
						this.availableActions = availableActionSchemasAsArray.map((a) =>
							this._getVerbFromActionSchema(a)
						);

						this.isConfigured = true;
						resolve();
					} catch (error) {
						reject(error);
					}
				})
				.catch((error) => reject(error));
		});
	}

	public getNewSiteScript(): any {
		return {
			$schema: 'schema.json',
			actions: [],
			bindata: {},
			version: 1
		};
	}

	public getSiteScriptSchema(): any {
		return this.schema;
	}

	public getActionSchema(action: ISiteScriptAction): any {
		return this._getActionSchemaByVerb(action.verb);
	}

	private _getActionSchemaByVerb(actionVerb: string): any {
		if (!this.isConfigured) {
			throw new Error(
				'The Schema Service is not properly configured. Make sure the configure() method has been called.'
			);
		}

		let directResolvedSchema = this.availableActionSchemas[actionVerb];
		if (directResolvedSchema) {
			return directResolvedSchema;
		}

		// Try to find the schema by case insensitive key
		let availableActionKeys = Object.keys(this.availableActionSchemas);
		let foundKeys = availableActionKeys.filter((k) => k.toUpperCase() == actionVerb.toUpperCase());
		let actionSchemaKey = foundKeys.length == 1 ? foundKeys[0] : null;
		return this.availableActionSchemas[actionSchemaKey];
	}

	public getActionTitle(action: ISiteScriptAction, parentAction: ISiteScriptAction): string {
		return this.getActionTitleByVerb(action.verb, parentAction && parentAction.verb);
	}
	public getActionTitleByVerb(actionVerb: string, parentActionVerb: string): string {
		let actionSchema = parentActionVerb
			? this.getSubActionSchemaByVerbs(parentActionVerb, actionVerb)
			: this._getActionSchemaByVerb(actionVerb);
		return actionSchema.title;
	}
	public getActionDescription(action: ISiteScriptAction, parentAction: ISiteScriptAction): string {
		return this.getActionDescriptionByVerb(action.verb, parentAction && parentAction.verb);
	}
	public getActionDescriptionByVerb(actionVerb: string, parentActionVerb: string): string {
		let actionSchema = parentActionVerb
			? this.getSubActionSchemaByVerbs(parentActionVerb, actionVerb)
			: this._getActionSchemaByVerb(actionVerb);
		return actionSchema.description;
	}

	public getSubActionSchemaByVerbs(parentActionVerb: string, subActionVerb: string): any {
		if (!this.isConfigured) {
			throw new Error(
				'The Schema Service is not properly configured. Make sure the configure() method has been called.'
			);
		}

		let availableSubActionSchemas = this.availableSubActionSchemasByVerb[parentActionVerb];
		let directResolvedSchema = availableSubActionSchemas[subActionVerb];
		if (directResolvedSchema) {
			return directResolvedSchema;
		}

		// Try to find the schema by case insensitive key
		let availableSubActionKeys = Object.keys(availableSubActionSchemas);
		let foundKeys = availableSubActionKeys.filter((k) => k.toUpperCase() == subActionVerb.toUpperCase());
		let subActionSchemaKey = foundKeys.length == 1 ? foundKeys[0] : null;
		return availableSubActionSchemas[subActionSchemaKey];
	}
	public getSubActionSchema(parentAction: ISiteScriptAction, subAction: ISiteScriptAction): any {
		return this.getSubActionSchemaByVerbs(parentAction.verb, subAction.verb);
	}

	public getAvailableActions(): string[] {
		if (!this.isConfigured) {
			throw new Error(
				'The Schema Service is not properly configured. Make sure the configure() method has been called.'
			);
		}

		return this.availableActions;
	}

	public getAvailableSubActions(parentAction: ISiteScriptAction): string[] {
		if (!this.isConfigured) {
			throw new Error(
				'The Schema Service is not properly configured. Make sure the configure() method has been called.'
			);
		}

		return this.availableSubActionByVerb[parentAction.verb];
	}

	private _loadSchema(schemaJSONorURL: string): Promise<any> {
		return new Promise((resolve, reject) => {
			// If argument is not set, use the embedded default schema
			if (!schemaJSONorURL) {
				resolve(DefaultSchema);
				return;
			}

			if (
				schemaJSONorURL.indexOf('/') == 0 ||
				schemaJSONorURL.indexOf('http://') == 0 ||
				schemaJSONorURL.indexOf('https://') == 0
			) {
				// The argument is a URL
				// Fetch the schema at the specified URL
				this._getSchemaFromUrl(schemaJSONorURL).then((schema) => resolve(schema)).catch((error) => {
					console.error('An error occured while trying to fetch schema from URL', error);
					reject(error);
				});
			} else {
				// The argument is supposed to be JSON stringified
				try {
					let schema = JSON.parse(schemaJSONorURL);
					resolve(schema);
				} catch (error) {
					console.error('An error occured while parsing JSON string', error);
					reject(error);
				}
			}
		});
	}

	private _getSchemaFromUrl(url: string): Promise<any> {
		// Use spHttpClient if it is a SPO URL, use regular httpClient otherwise
		if (url.indexOf('.sharepoint.com') > -1) {
			let spHttpClient: SPHttpClient = this.serviceScope.consume(SPHttpClient.serviceKey);
			return spHttpClient.get(url, SPHttpClient.configurations.v1).then((v) => v.json());
		} else {
			let httpClient: HttpClient = this.serviceScope.consume(HttpClient.serviceKey);
			return httpClient.get(url, HttpClient.configurations.v1).then((v) => v.json());
		}
	}
}

export const SiteScriptSchemaServiceKey = ServiceKey.create<ISiteScriptSchemaService>(
	'YPCODE:SiteScriptSchemaService',
	SiteScriptSchemaService
);
