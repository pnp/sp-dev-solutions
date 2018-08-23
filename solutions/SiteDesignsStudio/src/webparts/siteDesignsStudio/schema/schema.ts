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
	title: 'JSON Schema for Site Scripts',
	description: 'A SharePoint Site Script definition',
	definitions: {
		SPListSubactions: {
			setTitle: {
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
				required: [ 'verb', 'title' ],
				additionalProperties: false
			},
			setDescription: {
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
				required: [ 'verb', 'description' ],
				additionalProperties: false
			},
			addSPField: {
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
					internalName: {
						title: getPropertyTitle('internalName', 'createSPList_addSPField', 'Internal Name'),
						description: getPropertyDescription(
							'internalName',
							'createSPList_addSPField',
							'(Optional) The internal name of the field'
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
					},
					enforceUnique: {
						title: getPropertyTitle('enforceUnique', 'createSPList_addSPField', 'Enforce Unique value'),
						description: getPropertyDescription(
							'enforceUnique',
							'createSPList_addSPField',
							'(Optional) Specifies wheter all values for this field must be unique'
						),
						type: 'boolean'
					}
				},
				required: [ 'verb', 'fieldType', 'displayName' ],
				additionalProperties: false
			},
			deleteSPField: {
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
				required: [ 'verb', 'displayName' ],
				additionalProperties: false
			},
			addSPFieldXml: {
				type: 'object',
				title: getActionTitle('createSPList_addSPFieldXml', 'Add a field as XML'),
				description: getActionDescription(
					'createSPList_addSPFieldXml',
					'Add a field to the list using its XML schema'
				),
				properties: {
					verb: {
						enum: [ 'addSPFieldXml' ]
					},
					schemaXml: {
						title: getPropertyTitle('schemaXml', 'createSPList_addSPFieldXml', 'Field XML Schema'),
						description: getPropertyDescription(
							'schemaXml',
							'createSPList_addSPFieldXml',
							'The XML Schema of the field to add'
						),
						type: 'string'
					},
					addToDefaultView: {
						title: getPropertyTitle(
							'addToDefaultView',
							'createSPList_addSPFieldXml',
							'Add to default view'
						),
						description: getPropertyDescription(
							'addToDefaultView',
							'createSPList_addSPFieldXml',
							'The field is added to default view'
						),
						type: 'boolean'
					}
				},
				required: [ 'verb', 'schemaXml' ],
				additionalProperties: false
			},
			addSPLookupFieldXml: {
				type: 'object',
				title: getActionTitle('createSPList_addSPLookupFieldXml', 'Add a lookup field as XML'),
				description: getActionDescription(
					'createSPList_addSPLookupFieldXml',
					'Enables defining lookup fields and their dependent lists element using Collaborative Application Markup Language (CAML).'
				),
				properties: {
					verb: {
						enum: [ 'addSPLookupFieldXml' ]
					},
					schemaXml: {
						title: getPropertyTitle('schemaXml', 'createSPList_addSPLookupFieldXml', 'Field XML Schema'),
						description: getPropertyDescription(
							'schemaXml',
							'createSPList_addSPLookupFieldXml',
							'The XML Schema of the field to add'
						),
						type: 'string'
					},
					targetListName: {
						title: getPropertyTitle(
							'targetListName ',
							'createSPList_addSPLookupFieldXml',
							"Target list's name"
						),
						description: getPropertyDescription(
							'targetListName ',
							'createSPList_addSPLookupFieldXml',
							'The name that identifies the list this lookup field is referencing. Provide either this or targetListUrl.'
						),
						type: 'string'
					},
					targetListUrl: {
						title: getPropertyTitle(
							'targetListUrl ',
							'createSPList_addSPLookupFieldXml',
							"Target list's URL"
						),
						description: getPropertyDescription(
							'targetListUrl ',
							'createSPList_addSPLookupFieldXml',
							'A web-relative URL that identifies the list this lookup field is referencing. Provide either this or targetListName.'
						),
						type: 'string'
					},
					addToDefaultView: {
						title: getPropertyTitle(
							'addToDefaultView',
							'createSPList_addSPLookupFieldXml',
							'Add to default view'
						),
						description: getPropertyDescription(
							'addToDefaultView',
							'createSPList_addSPLookupFieldXml',
							'The field is added to default view'
						),
						type: 'boolean'
					}
				},
				required: [ 'verb', 'schemaXml' ],
				additionalProperties: false
			},
			addSPView: {
				type: 'object',
				title: getActionTitle('createSPList_addSPView', 'Add a view'),
				description: getActionDescription('createSPList_addSPView', 'Defines and adds a view to the list'),
				properties: {
					verb: {
						enum: [ 'addSPView' ]
					},
					name: {
						title: getPropertyTitle('name', 'createSPList_addSPView', "View's name"),
						description: getPropertyDescription('name', 'createSPList_addSPView', 'The name of the view'),
						type: 'string'
					},
					viewFields: {
						title: getPropertyTitle('viewFields', 'createSPList_addSPView', 'View fields'),
						description: getPropertyDescription(
							'viewFields',
							'createSPList_addSPView',
							'The fields included in the view'
						),
						type: 'array',
						items: { type: 'string' }
					},
					query: {
						title: getPropertyTitle('query', 'createSPList_addSPView', 'View query'),
						description: getPropertyDescription(
							'query',
							'createSPList_addSPView',
							"A CAML query string that contains the where clause for the view's query"
						),
						type: 'string'
					},
					rowLimit: {
						title: getPropertyTitle('rowLimit', 'createSPList_addSPView', 'Row limit'),
						description: getPropertyDescription(
							'rowLimit',
							'createSPList_addSPView',
							'The row limit of the view'
						),
						type: 'number'
					},
					isPaged: {
						title: getPropertyTitle('isPaged', 'createSPList_addSPView', 'Is Paged'),
						description: getPropertyDescription(
							'isPaged',
							'createSPList_addSPView',
							'Specifies whether the view is paged'
						),
						type: 'boolean'
					},
					makeDefault: {
						title: getPropertyTitle('makeDefault', 'createSPList_addSPView', 'Make Default'),
						description: getPropertyDescription(
							'makeDefault',
							'createSPList_addSPView',
							'If true, the view will be made the default for the list; otherwise, false'
						),
						type: 'boolean'
					},
					scope: {
						title: getPropertyTitle('scope', 'createSPList_addSPView', "View's scope"),
						description: getPropertyDescription('scope', 'createSPList_addSPView', 'The scope of the view'),
						enum: [ 'Default', 'Recursive', 'RecursiveAll', 'FilesOnly' ]
					}
				},
				required: [ 'verb', 'name', 'viewFields' ]
			},
			removeSPView: {
				type: 'object',
				title: getActionTitle('createSPList_removeSPView', 'Remove a view'),
				description: getActionDescription('createSPList_removeSPView', 'Remove a view from the list'),
				properties: {
					verb: {
						enum: [ 'removeSPView' ]
					},
					name: {
						title: getPropertyTitle('name', 'createSPList_removeSPView', "View's name"),
						description: getPropertyDescription(
							'name',
							'createSPList_removeSPView',
							'The name of the view to remove'
						),
						type: 'string'
					}
				},
				required: [ 'verb', 'name' ],
				additionalProperties: false
			},
			addContentType: {
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
				required: [ 'verb', 'name' ],
				additionalProperties: false
			},
			removeContentType: {
				type: 'object',
				title: getActionTitle('createSPList_removeContentType', 'Remove a Content Type'),
				description: getActionDescription(
					'createSPList_removeContentType',
					'Remove a Content Type from the list'
				),
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
				required: [ 'verb', 'name' ],
				additionalProperties: false
			},
			setSPFieldCustomFormatter: {
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
				required: [ 'verb', 'fieldDisplayName', 'formatterJSON' ],
				additionalProperties: false
			},
			associateFieldCustomizer: {
				type: 'object',
				title: getActionTitle('createSPList_associateFieldCustomizer', 'Associate field customizer'),
				description: getActionDescription(
					'createSPList_associateFieldCustomizer',
					'Registers field extension for a list field'
				),
				properties: {
					verb: {
						enum: [ 'associateFieldCustomizer' ]
					},
					internalName: {
						title: getPropertyTitle(
							'internalName',
							'createSPList_associateFieldCustomizer',
							"Field's internal name"
						),
						description: getPropertyDescription(
							'internalName',
							'createSPList_associateFieldCustomizer',
							'The name of the field to operate on'
						),
						type: 'string'
					},
					clientSideComponentId: {
						title: getPropertyTitle(
							'clientSideComponentId',
							'createSPList_associateFieldCustomizer',
							'Client Side Component Id'
						),
						description: getPropertyDescription(
							'clientSideComponentId',
							'createSPList_associateFieldCustomizer',
							'The identifier (GUID) of the extension in the app catalog. This property value can be found in the manifest.json file or in the elements.xml file'
						),
						type: 'string'
					},
					clientSideComponentProperties: {
						title: getPropertyTitle(
							'clientSideComponentProperties',
							'createSPList_associateFieldCustomizer',
							'Client Side Component Properties'
						),
						description: getPropertyDescription(
							'clientSideComponentProperties',
							'createSPList_associateFieldCustomizer',
							'(Optional) Can be used to provide properties for the field customizer extension instance, is specified as stringified JSON'
						),
						type: 'string'
					}
				},
				required: [ 'verb', 'internalName', 'clientSideComponentId' ],
				additionalProperties: false
			},
			associateListViewCommandSet: {
				type: 'object',
				title: getActionTitle('createSPList_associateListViewCommandSet', 'Associate List View Command Set'),
				description: getActionDescription(
					'createSPList_associateListViewCommandSet',
					'Registers field extension for a list field'
				),
				properties: {
					verb: {
						enum: [ 'associateListViewCommandSet' ]
					},
					title: {
						title: getPropertyTitle('title', 'createSPList_associateListViewCommandSet', 'Title'),
						description: getPropertyDescription(
							'title',
							'createSPList_associateListViewCommandSet',
							'The title of the extension'
						),
						type: 'string'
					},
					location: {
						title: getPropertyTitle('location', 'createSPList_associateListViewCommandSet', 'Location'),
						description: getPropertyDescription(
							'location',
							'createSPList_associateListViewCommandSet',
							'A required parameter to specify where the command is displayed. Options are: ContextMenu or CommandBar'
						),
						type: 'string',
						enum: [ 'ContextMenu', 'CommandBar' ]
					},
					clientSideComponentId: {
						title: getPropertyTitle(
							'clientSideComponentId',
							'createSPList_associateListViewCommandSet',
							'Client Side Component Id'
						),
						description: getPropertyDescription(
							'clientSideComponentId',
							'createSPList_associateListViewCommandSet',
							'The identifier (GUID) of the extension in the app catalog. This property value can be found in the manifest.json file or in the elements.xml file'
						),
						type: 'string'
					},
					clientSideComponentProperties: {
						title: getPropertyTitle(
							'clientSideComponentProperties',
							'createSPList_associateListViewCommandSet',
							'Client Side Component Properties'
						),
						description: getPropertyDescription(
							'clientSideComponentProperties',
							'createSPList_associateListViewCommandSet',
							'(Optional) Can be used to provide properties for the List View Command Set extension instance, is specified as stringified JSON'
						),
						type: 'string'
					}
				},
				required: [ 'verb', 'internalName', 'location', 'clientSideComponentId' ],
				additionalProperties: false
			}
		},
		SPContentTypeSubactions: {
			addSiteColumn: {
				type: 'object',
				title: getActionTitle('createContentType_addSiteColumn', 'Add a site column'),
				description: getActionDescription(
					'createContentType_addSiteColumn',
					'Add a site column to the Content Type'
				),
				properties: {
					verb: {
						enum: [ 'addSiteColumn' ]
					},
					internalName: {
						title: getPropertyTitle('internalName', 'createContentType_addSiteColumn', 'Internal Name'),
						description: getPropertyDescription(
							'internalName',
							'createContentType_addSiteColumn',
							'The internal name of the field to add'
						),
						type: 'string'
					}
				},
				required: [ 'verb', 'internalName' ],
				additionalProperties: false
			},
			removeSiteColumn: {
				type: 'object',
				title: getActionTitle('createContentType_removeSiteColumn', 'Remove a site column'),
				description: getActionDescription(
					'createContentType_removeSiteColumn',
					'Remove a column from the Content Type'
				),
				properties: {
					verb: {
						enum: [ 'removeSiteColumn' ]
					},
					internalName: {
						title: getPropertyTitle('internalName', 'createContentType_removeSiteColumn', 'Internal Name'),
						description: getPropertyDescription(
							'internalName',
							'createContentType_removeSiteColumn',
							'The internal name of the field to remove'
						),
						type: 'string'
					}
				},
				required: [ 'verb', 'internalName' ],
				additionalProperties: false
			}
		},
		createSiteColumn: {
			title: getActionTitle('createSiteColumn', 'Create Site Column'),
			description: getActionDescription('createSiteColumn', 'Create a new Site Column'),
			type: 'object',
			properties: {
				verb: {
					enum: [ 'createSiteColumn' ]
				},
				fieldType: {
					title: getPropertyTitle('fieldType', 'createSiteColumn', 'Field Type'),
					description: getPropertyDescription('fieldType', 'createSiteColumn', 'The type of the field'),
					enum: [ 'Text', 'Note', 'Number', 'Boolean', 'User', 'DateTime' ]
				},
				internalName: {
					title: getPropertyTitle('internalName ', 'createSiteColumn', 'Internal Name'),
					description: getPropertyDescription(
						'internalName ',
						'createSiteColumn',
						'The internal name of the field'
					),
					type: 'string'
				},
				displayName: {
					title: getPropertyTitle('displayName', 'createSiteColumn', 'Display Name'),
					description: getPropertyDescription(
						'displayName',
						'createSiteColumn',
						'The display name of the field'
					),
					type: 'string'
				},
				isRequired: {
					title: getPropertyTitle('isRequired', 'createSiteColumn', 'Is Required'),
					description: getPropertyDescription(
						'isRequired',
						'createSiteColumn',
						'Is this field required to contain information?'
					),
					type: 'boolean'
				},
				group: {
					title: getPropertyTitle('group', 'createSiteColumn', 'Group'),
					description: getPropertyDescription('group', 'createSiteColumn', 'The group of the field'),
					type: 'string'
				},
				enforceUnique: {
					title: getPropertyTitle('enforceUnique', 'createSiteColumn', 'Enforce Unique value'),
					description: getPropertyDescription(
						'enforceUnique',
						'createSiteColumn',
						'(Optional) Specifies wheter all values for this field must be unique'
					),
					type: 'boolean'
				}
			},
			required: [ 'verb', 'internalName', 'displayName' ],
			additionalProperties: false
		},
		createContentType: {
			title: getActionTitle('createContentType', 'Create Site Content Type'),
			description: getActionDescription('createContentType', 'Create a new Site Content Type'),
			type: 'object',
			properties: {
				verb: {
					enum: [ 'createContentType' ]
				},
				name: {
					title: getPropertyTitle('name', 'createContentType', 'Name'),
					description: getPropertyDescription('name', 'createContentType', 'The name of the Content Type'),
					type: 'string'
				},
				description: {
					title: getPropertyTitle('description', 'createContentType', 'Description'),
					description: getPropertyDescription(
						'description',
						'createContentType',
						'The name of the Content Type'
					),
					type: 'string'
				},
				parentName: {
					title: getPropertyTitle('parentName', 'createContentType', "Parent's Name"),
					description: getPropertyDescription(
						'parentName',
						'createContentType',
						'The name of the parent Content Type'
					),
					type: 'string'
				},
				parentId: {
					title: getPropertyTitle('parentId', 'createContentType', "Parent's ID"),
					description: getPropertyDescription(
						'parentId',
						'createContentType',
						'The ID of the parent Content Type'
					),
					type: 'string'
				},
				id: {
					title: getPropertyTitle('id', 'createContentType', 'Id'),
					description: getPropertyDescription('id', 'createContentType', 'The Id of the Content Type'),
					type: 'string'
				},
				hidden: {
					title: getPropertyTitle('hidden', 'createContentType', 'Hidden'),
					description: getPropertyDescription(
						'hidden',
						'createContentType',
						'Specifies whether the Content Type is hidden or not'
					),
					type: 'boolean'
				},
				subactions: {
					title: getPropertyTitle('subactions', 'createContentType', 'Sub actions'),
					description: getPropertyDescription(
						'subactions',
						'createContentType',
						'Define the sub actions of the Create Content Type action'
					),
					type: 'array',
					items: {
						anyOf: [
							{ type: 'object', $ref: '#/definitions/SPContentTypeSubactions/addSiteColumn' },
							{ type: 'object', $ref: '#/definitions/SPContentTypeSubactions/removeSiteColumn' }
						]
					}
				}
			},
			required: [ 'verb', 'name' ]
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
							{ type: 'object', $ref: '#/definitions/SPListSubactions/setTitle' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/setDescription' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/addSPField' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/deleteSPField' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/addSPFieldXml' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/addSPLookupFieldXml' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/addSPView' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/removeSPView' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/addContentType' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/removeContentType' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/setSPFieldCustomFormatter' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/associateFieldCustomizer' },
							{ type: 'object', $ref: '#/definitions/SPListSubactions/associateListViewCommandSet' }
						]
					}
				}
			},
			required: [ 'verb', 'listName', 'templateType' ],
			additionalProperties: false
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
		removeNavLink: {
			title: getActionTitle('removeNavLink ', 'Remove a Navigation Link'),
			description: getActionDescription('removeNavLink ', 'Removes a navigation link from the site'),
			type: 'object',
			properties: {
				verb: {
					enum: [ 'removeNavLink' ]
				},
				displayName: {
					title: getPropertyTitle('displayName', 'removeNavLink', "Link's text"),
					description: getPropertyDescription('displayName', 'addNavLink', 'The text of the navigation Link'),
					type: 'string'
				},
				url: {
					title: getPropertyTitle('url', 'removeNavLink', "Link's URL"),
					description: getPropertyDescription('url', 'removeNavLink', 'The URL of the navigation Link'),
					type: 'string'
				},
				isWebRelative: {
					title: getPropertyTitle('isWebRelative', 'removeNavLink', 'Is Web Relative'),
					description: getPropertyDescription(
						'isWebRelative',
						'removeNavLink',
						'Is the URL of the link web-relative ?'
					),
					type: 'boolean'
				}
			},
			required: [ 'verb', 'displayName', 'isWebRelative' ]
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
			description: getActionDescription(
				'setSiteLogo',
				'Set the logo of the site (Only works on Communication Sites)'
			),
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
				},
				name: {
					title: getPropertyTitle('name', 'joinHubSite', 'Name'),
					description: getPropertyDescription('name', 'joinHubSite', 'An optional name for the Hub Site'),
					type: 'string'
				}
			},
			required: [ 'verb', 'hubSiteId' ]
		},
		installSPFXSolution: {
			type: 'object',
			title: getActionTitle('installSPFXSolution', 'Install a SPFx Solution or Addin'),
			description: getActionDescription(
				'installSPFXSolution',
				'Install a SharePoint Framework solution (or add-in) to the site'
			),
			properties: {
				verb: {
					enum: [ 'installSPFXSolution' ]
				},
				id: {
					title: getPropertyTitle('id', 'installSPFXSolution', 'Id'),
					description: getPropertyDescription('id', 'installSPFXSolution', 'The identifier of the solution'),
					type: 'string'
				}
			},
			required: [ 'verb', 'id' ]
		},
		associateExtension: {
			type: 'object',
			title: getActionTitle('associateExtension', 'Associate Extension'),
			description: getActionDescription(
				'associateExtension',
				'Use the associateExtension action to register a deployed SharePoint Framework extension from the tenant app catalog'
			),
			properties: {
				verb: {
					enum: [ 'associateExtension' ]
				},
				title: {
					title: getPropertyTitle('title', 'associateExtension', 'Title'),
					description: getPropertyDescription(
						'title',
						'associateExtension',
						'The title of the extension in the app catalog'
					),
					type: 'string'
				},
				location: {
					title: getPropertyTitle('location', 'associateExtension', 'Location'),
					description: getPropertyDescription(
						'location',
						'associateExtension',
						'Used to specify the extension type. If it is used to create commands, then where the command would be displayed; otherwise this should be set to ClientSideExtension.ApplicationCustomizer'
					),
					type: 'string',
					enum: [ 'ContextMenu', 'CommandBar', 'ClientSideExtension.ApplicationCustomizer' ]
				},
				clientSideComponentId: {
					title: getPropertyTitle('clientSideComponentId', 'associateExtension', 'Client Side Component Id'),
					description: getPropertyDescription(
						'clientSideComponentId',
						'associateExtension',
						'The identifier (GUID) of the extension in the app catalog. This property value can be found in the manifest.json file or in the elements.xml file'
					),
					type: 'string'
				},
				clientSideComponentProperties: {
					title: getPropertyTitle(
						'clientSideComponentProperties',
						'associateExtension',
						'Client Side Component Properties'
					),
					description: getPropertyDescription(
						'clientSideComponentProperties',
						'associateExtension',
						'(Optional) Can be used to provide properties for the extension instance, is specified as stringified JSON'
					),
					type: 'string'
				},
				registrationId: {
					title: getPropertyTitle('registrationId', 'associateExtension', 'Registration Id'),
					description: getPropertyDescription(
						'registrationId',
						'associateExtension',
						'(Optional) Indicates the type of the list the extension is associated to (if it is a list extension)'
					),
					type: 'string'
				},
				registrationType: {
					title: getPropertyTitle('registrationType', 'associateExtension', 'Registration Type'),
					description: getPropertyDescription(
						'registrationType',
						'associateExtension',
						'(Optional) Should be specified if the extension is associated with a list'
					),
					type: 'string'
				},
				scope: {
					title: getPropertyTitle('scope', 'associateExtension', 'Scope'),
					description: getPropertyDescription(
						'scope',
						'associateExtension',
						'Indicates whether the extension is associated with a Web or a Site'
					),
					type: 'string',
					enum: [ 'Web', 'Site' ]
				}
			},
			required: [ 'verb', 'title', 'location', 'clientSideComponentId' ],
			additionalProperties: false
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
		setRegionalSettings: {
			type: 'object',
			title: getActionTitle('setRegionalSettings', 'Set regional settings'),
			description: getActionDescription('setRegionalSettings', 'Set the regional settings of the site'),
			properties: {
				verb: {
					enum: [ 'setRegionalSettings' ]
				},
				timeZone: {
					title: getPropertyTitle('timeZone', 'setRegionalSettings', 'Time Zone'),
					description: getPropertyDescription('timeZone', 'setRegionalSettings', 'Define the Time Zone'),
					type: 'number'
				},
				locale: {
					title: getPropertyTitle('locale', 'setRegionalSettings', 'Locale'),
					description: getPropertyDescription('locale', 'setRegionalSettings', 'Define the locale code'),
					type: 'number'
				},
				sortOrder: {
					title: getPropertyTitle('sortOrder', 'setRegionalSettings', 'Sort Order'),
					description: getPropertyDescription('sortOrder', 'setRegionalSettings', 'Define the sort order'),
					type: 'number'
				},
				hourFormat: {
					title: getPropertyTitle('sortOrder', 'setRegionalSettings', 'Hour Format'),
					description: getPropertyDescription('sortOrder', 'setRegionalSettings', 'Define the hour format'),
					type: 'string'
				}
			},
			required: [ 'verb', 'timeZone', 'locale', 'sortOrder', 'hourFormat' ]
		},
		addPrincipalToGroup: {
			type: 'object',
			title: getActionTitle('addPrincipalToGroup', 'Add Principal to Group'),
			description: getActionDescription(
				'addPrincipalToGroup',
				'Use the addPrincipalToGroup action to manage addition of users and groups to select default SharePoint groups. This action can be used for licensed users, security groups, and Office 365 Groups'
			),
			properties: {
				verb: {
					enum: [ 'addPrincipalToGroup' ]
				},
				principal: {
					title: getPropertyTitle('principal', 'addPrincipalToGroup', 'Principal'),
					description: getPropertyDescription(
						'principal',
						'addPrincipalToGroup',
						'A required parameter to specify the name of the principal (user or group) to add to the SharePoint group'
					),
					type: 'string'
				},
				group: {
					title: getPropertyTitle('group', 'addPrincipalToGroup', 'Group'),
					description: getPropertyDescription(
						'group',
						'addPrincipalToGroup',
						'A required parameter to specify the SharePoint group to add the principal to'
					),
					type: 'string'
				}
			},
			required: [ 'verb', 'principal', 'group' ]
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
					{ type: 'object', $ref: '#/definitions/createSiteColumn' },
					{ type: 'object', $ref: '#/definitions/createContentType' },
					{ type: 'object', $ref: '#/definitions/addNavLink' },
					{ type: 'object', $ref: '#/definitions/removeNavLink' },
					{ type: 'object', $ref: '#/definitions/applyTheme' },
					{ type: 'object', $ref: '#/definitions/setSiteLogo' },
					{ type: 'object', $ref: '#/definitions/joinHubSite' },
					{ type: 'object', $ref: '#/definitions/installSPFXSolution' },
					{ type: 'object', $ref: '#/definitions/associateExtension' },
					{ type: 'object', $ref: '#/definitions/triggerFlow' },
					{ type: 'object', $ref: '#/definitions/setRegionalSettings' },
					{ type: 'object', $ref: '#/definitions/addPrincipalToGroup' },
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
