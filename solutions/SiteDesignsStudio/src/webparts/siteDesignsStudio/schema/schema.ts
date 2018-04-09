import * as strings from 'SiteDesignsStudioWebPartStrings';
const getActionTitle = (value: string, defaultValue: string) => strings[`Schema_Action_${value}_Title`] || defaultValue;
const getActionDescription = (value: string, defaultValue: string) =>
	strings[`Schema_Action_${value}_Desc`] || defaultValue;
const getPropertyTitle = (value: string, actionId: string, defaultValue: string) =>
	strings[`Schema_${actionId}_${value}_Title`] || defaultValue;
const getPropertyDescription = (value: string, actionId: string, defaultValue: string) =>
	strings[`Schema_${actionId}_${value}_Desc`] || defaultValue;

export default {
	$schema: 'http://json-schema.org/draft-06/schema#',
	title: 'SiteScript',
	description: 'A SharePoint Site Script definition',
	definitions: {
		createSPList_setTitle: {
			type: 'object',
			title: getActionTitle('createSPList_setTitle', 'Set the Title'),
			description: getActionDescription('createSPList_setTitle', 'Set the title of the list'),
			properties: {
				verb: {
					enum: [ 'setTitle' ]
				},
				title: {
					title: getPropertyTitle('title', 'createSPList_setTitle', 'Title'),
					description: getPropertyDescription('title', 'createSPList_setTitle', 'Title of the list'),
					type: 'string'
				}
			},
			required: [ 'verb', 'title' ]
		},
		createSPList_setDescription: {
			type: 'object',
			title: getActionTitle('createSPList_setDescription', 'Set the description'),
			description: getActionDescription('createSPList_setDescription', 'Set the description of the list'),
			properties: {
				verb: {
					enum: [ 'setDescription' ]
				},
				description: {
					title: getPropertyTitle('description', 'createSPList_setDescription', 'Description'),
					description: getPropertyDescription(
						'description',
						'createSPList_setDescription',
						'Description of the site'
					),
					type: 'string'
				}
			},
			required: [ 'verb', 'description' ]
		},
		createSPList_addSPField: {
			type: 'object',
			title: getActionTitle('createSPList_addSPField', 'Add a field'),
			description: getActionDescription('createSPList_addSPField', 'Add a field to the list'),
			properties: {
				verb: {
					enum: [ 'addSPField' ]
				},
				fieldType: {
					title: getPropertyTitle('fieldType', 'createSPList_addSPField', 'Field Type'),
					description: getPropertyDescription(
						'fieldType',
						'createSPList_addSPField',
						'The type of the field'
					),
					enum: [ 'Text', 'Note', 'Number', 'Boolean', 'User', 'DateTime' ]
				},
				displayName: {
					title: getPropertyTitle('displayName', 'createSPList_addSPField', 'Display Name'),
					description: getPropertyDescription(
						'displayName',
						'createSPList_addSPField',
						'The name of the field to display'
					),
					type: 'string'
				},
				isRequired: {
					title: getPropertyTitle('isRequired', 'createSPList_addSPField', 'Is required'),
					description: getPropertyDescription(
						'isRequired',
						'createSPList_addSPField',
						'Is the field required'
					),
					type: 'boolean'
				},
				addToDefaultView: {
					title: getPropertyTitle('addToDefaultView', 'createSPList_addSPField', 'Add to default view'),
					description: getPropertyDescription(
						'addToDefaultView',
						'createSPList_addSPField',
						'The field is added to default view'
					),
					type: 'boolean'
				}
			},
			required: [ 'verb', 'fieldType', 'displayName' ]
		},
		createSPList_deleteSPField: {
			type: 'object',
			title: getActionTitle('createSPList_deleteSPField', 'Delete a field'),
			description: getActionDescription('createSPList_deleteSPField', 'Delete a field from the list'),
			properties: {
				verb: {
					enum: [ 'deleteSPField' ]
				},
				displayName: {
					title: getPropertyTitle('displayName', 'createSPList_deleteSPField', 'Display Name'),
					description: getPropertyDescription(
						'displayName',
						'createSPList_deleteSPField',
						'The display name of the field'
					),
					type: 'string'
				}
			},
			required: [ 'verb', 'displayName' ]
		},
		createSPList_addContentType: {
			type: 'object',
			title: getActionTitle('createSPList_addContentType', 'Add a Content Type'),
			description: getActionDescription(
				'createSPList_addContentType',
				'Add an existing Site Content Type to the list'
			),
			properties: {
				verb: {
					enum: [ 'addContentType' ]
				},
				name: {
					title: getPropertyTitle('name', 'createSPList_addContentType', "Content Type's name"),
					description: getPropertyDescription(
						'name',
						'createSPList_addContentType',
						'The name of an existing Site Content Type'
					),
					type: 'string'
				}
			},
			required: [ 'verb', 'name' ]
		},
		createSPList_removeContentType: {
			type: 'object',
			title: getActionTitle('createSPList_removeContentType', 'Remove a Content Type'),
			description: getActionDescription('createSPList_removeContentType', 'Remove a Content Type from the list'),
			properties: {
				verb: {
					enum: [ 'removeContentType' ]
				},
				name: {
					title: getPropertyTitle('name', 'createSPList_removeContentType', "Content Type's name"),
					description: getPropertyDescription(
						'name',
						'createSPList_removeContentType',
						'The name of the Content Type'
					),
					type: 'string'
				}
			},
			required: [ 'verb', 'name' ]
		},
		createSPList_setSPFieldCustomFormatter: {
			type: 'object',
			title: getActionTitle('createSPList_setSPFieldCustomFormatter', 'Set Field custom formatter'),
			description: getActionDescription(
				'createSPList_setSPFieldCustomFormatter',
				'Set a custom formatter to the specified field'
			),
			properties: {
				verb: {
					enum: [ 'setSPFieldCustomFormatter' ]
				},
				fieldDisplayName: {
					title: getPropertyTitle(
						'fieldDisplayName',
						'createSPList_setSPFieldCustomFormatter',
						"Field's display name"
					),
					description: getPropertyDescription(
						'fieldDisplayName',
						'createSPList_setSPFieldCustomFormatter',
						'The display name of the field to apply the formatting on'
					),
					type: 'string'
				},
				formatterJSON: {
					title: getPropertyTitle(
						'formatterJSON',
						'createSPList_setSPFieldCustomFormatter',
						'The formatter JSON'
					),
					description: getPropertyDescription(
						'formatterJSON',
						'createSPList_setSPFieldCustomFormatter',
						'The formatter rules expressed in JSON'
					),
					type: 'object'
				}
			},
			required: [ 'verb', 'fieldDisplayName', 'formatterJSON' ]
		},
		createSPList: {
			type: 'object',
			title: getActionTitle('createSPList', 'Create a List'),
			description: getActionDescription('createSPList', 'Create a SharePoint List script'),
			properties: {
				verb: {
					enum: [ 'createSPList' ]
				},
				listName: {
					title: getPropertyTitle('listName', 'createSPList', "List's name"),
					description: getPropertyDescription('listName', 'createSPList', 'The name of the List'),
					type: 'string'
				},
				templateType: {
					title: getPropertyTitle('templateType', 'createSPList', "List's Template Type"),
					description: getPropertyDescription(
						'templateType',
						'createSPList',
						'The template type of the list'
					),
					type: 'number'
				},
				subactions: {
					title: getPropertyTitle('subactions', 'createSPList', 'Sub actions'),
					description: getPropertyDescription(
						'subactions',
						'createSPList',
						'Define the sub actions of the Create List action'
					),
					type: 'array',
					items: {
						anyOf: [
							{ type: 'object', $ref: '#/definitions/createSPList_setTitle' },
							{ type: 'object', $ref: '#/definitions/createSPList_setDescription' },
							{ type: 'object', $ref: '#/definitions/createSPList_addSPField' },
							{ type: 'object', $ref: '#/definitions/createSPList_deleteSPField' },
							{ type: 'object', $ref: '#/definitions/createSPList_addContentType' },
							{ type: 'object', $ref: '#/definitions/createSPList_removeContentType' },
							{ type: 'object', $ref: '#/definitions/createSPList_setSPFieldCustomFormatter' }
						]
					}
				}
			},
			required: [ 'verb', 'listName', 'templateType' ]
		},
		addNavLink: {
			title: getActionTitle('addNavLink', 'Add a Navigation Link'),
			description: getActionDescription('addNavLink', 'Add a navigation link to the site'),
			type: 'object',
			properties: {
				verb: {
					enum: [ 'addNavLink' ]
				},
				url: {
					title: getPropertyTitle('url', 'addNavLink', "Link's URL"),
					description: getPropertyDescription('url', 'addNavLink', 'The URL of the navigation Link'),
					type: 'string'
				},
				displayName: {
					title: getPropertyTitle('displayName', 'addNavLink', "Link's text"),
					description: getPropertyDescription('displayName', 'addNavLink', 'The text of the navigation Link'),
					type: 'string'
				},
				isWebRelative: {
					title: getPropertyTitle('isWebRelative', 'addNavLink', 'Is Web Relative'),
					description: getPropertyDescription(
						'isWebRelative',
						'addNavLink',
						'Is the URL of the link web-relative ?'
					),
					type: 'boolean'
				}
			},
			required: [ 'verb', 'url', 'displayName', 'isWebRelative' ]
		},
		applyTheme: {
			title: getActionTitle('applyTheme', 'Apply a theme'),
			description: getActionDescription('applyTheme', 'Apply a custom theme to the site'),
			type: 'object',
			properties: {
				verb: {
					enum: [ 'applyTheme' ]
				},
				themeName: {
					title: getPropertyTitle('themeName', 'applyTheme', "Theme's name"),
					description: getPropertyDescription(
						'themeName',
						'applyTheme',
						'The name of the custom theme to apply'
					),
					type: 'string'
				}
			},
			required: [ 'verb', 'themeName' ]
		},
		setSiteLogo: {
			type: 'object',
			title: getActionTitle('setSiteLogo', 'Set the Site Logo'),
			description: getActionDescription('setSiteLogo', 'Set the logo of the site'),
			properties: {
				verb: {
					enum: [ 'setSiteLogo' ]
				},
				url: {
					title: getPropertyTitle('url', 'setSiteLogo', "Site logo's URL"),
					description: getPropertyDescription('url', 'setSiteLogo', 'The URL of the Site logo'),
					type: 'string'
				}
			},
			required: [ 'verb', 'url' ]
		},
		joinHubSite: {
			type: 'object',
			title: getActionTitle('joinHubSite', 'Join a Hub Site'),
			description: getActionDescription('joinHubSite', 'Join the current site to a specified Hub Site'),
			properties: {
				verb: {
					enum: [ 'joinHubSite' ]
				},
				hubSiteId: {
					title: getPropertyTitle('hubSiteId', 'joinHubSite', 'Hub Site'),
					description: getPropertyDescription('hubSiteId', 'joinHubSite', 'The identifier of the Hub Site'),
					type: 'string'
				}
			},
			required: [ 'verb', 'hubSiteId' ]
		},
		triggerFlow: {
			title: getActionTitle('triggerFlow', 'Trigger a Flow'),
			description: getActionDescription(
				'triggerFlow',
				'Trigger the specified Microsoft Flow with specified parameters'
			),
			type: 'object',
			properties: {
				verb: {
					enum: [ 'triggerFlow' ]
				},
				url: {
					title: getPropertyTitle('url', 'triggerFlow', "Flow's URL"),
					description: getPropertyDescription('url', 'triggerFlow', 'The URL of the Flow to trigger'),
					type: 'string'
				},
				name: {
					title: getPropertyTitle('name', 'triggerFlow', "Flow's name"),
					description: getPropertyDescription('name', 'triggerFlow', 'The name of the Flow to trigger'),
					type: 'string'
				},
				parameters: {
					title: getPropertyTitle('parameters', 'triggerFlow', "Flow's parameters"),
					description: getPropertyDescription(
						'parameters',
						'triggerFlow',
						'The set of parameters of the Flow'
					),
					type: 'object'
				}
			},
			required: [ 'verb', 'url', 'name' ]
		},
		setSiteExternalSharingCapability: {
			type: 'object',
			title: getActionTitle('setSiteExternalSharingCapability', 'Set site external sharing capability'),
			description: getActionDescription(
				'setSiteExternalSharingCapability',
				'Set the external sharing capability of the site'
			),
			properties: {
				verb: {
					enum: [ 'setSiteExternalSharingCapability' ]
				},
				capability: {
					title: getPropertyTitle(
						'capability',
						'setSiteExternalSharingCapability',
						'External sharing capability'
					),
					description: getPropertyDescription(
						'capability',
						'setSiteExternalSharingCapability',
						'The defined external sharing capability'
					),
					enum: [
						'Disabled',
						'ExistingExternalUserSharingOnly',
						'ExternalUserSharingOnly',
						'ExternalUserAndGuestSharing'
					]
				}
			},
			required: [ 'verb', 'capability' ]
		}
	},
	type: 'object',
	properties: {
		actions: {
			type: 'array',
			description: 'The definition of the script actions',
			items: {
				anyOf: [
					{ type: 'object', $ref: '#/definitions/createSPList' },
					{ type: 'object', $ref: '#/definitions/addNavLink' },
					{ type: 'object', $ref: '#/definitions/applyTheme' },
					{ type: 'object', $ref: '#/definitions/setSiteLogo' },
					{ type: 'object', $ref: '#/definitions/joinHubSite' },
					{ type: 'object', $ref: '#/definitions/triggerFlow' },
					{ type: 'object', $ref: '#/definitions/setSiteExternalSharingCapability' }
				]
			}
		},
		bindata: {
			type: 'object',
			additionalProperties: false
		},
		version: {
			type: 'number'
		}
	},
	required: [ 'actions', 'bindata', 'version' ]
};
