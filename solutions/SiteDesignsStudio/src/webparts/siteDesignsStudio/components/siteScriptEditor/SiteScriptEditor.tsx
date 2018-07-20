import * as React from 'react';
import {
  Button,
  Dropdown,
  TextField,
  IconButton,
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  CommandBar,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  DialogFooter,
  Pivot,
  PivotItem,
  CommandBarButton,
  IContextualMenuItem
} from 'office-ui-fabric-react';
import styles from '../SiteDesignsStudio.module.scss';
import { escape, assign, find } from '@microsoft/sp-lodash-subset';

import { ISiteScriptContent, ISiteScriptAction, ISiteScript, SiteScriptEntitySchema } from '../../models/ISiteScript';
import Schema from '../../schema/schema';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import {
  ISiteScriptSchemaService,
  SiteScriptSchemaServiceKey
} from '../../services/siteScriptSchema/SiteScriptSchemaService';
import ScriptActionAdder from '../scriptActionAdder/ScriptActionAdder';
import { SiteDesignsServiceKey, ISiteDesignsService } from '../../services/siteDesigns/SiteDesignsService';
import GenericObjectEditor from '../genericObjectEditor/GenericObjectEditor';
import { MonacoEditor } from '../monacoEditor/MonacoEditor';
import ScriptActionCollectionEditor from '../scriptActionEditor/ScriptActionCollectionEditor';
import { ISiteScriptActionUIWrapper } from '../../models/ISiteScriptActionUIWrapper';
import CreateListWizard from '../wizards/CreateListWizard';

const Ajv = require('ajv');
var ajv = new Ajv({ schemaId: 'auto' });

export enum EEditionMode {
  Design = 'design',
  Code = 'code',
  Split = 'split'
}

export interface ISiteScriptEditorState {
  script: ISiteScript;
  scriptContentJson: string;
  scriptActionUIs: ISiteScriptActionUIWrapper[];
  schema: any;
  isValidContent: boolean;
  isInvalidSchema: boolean;
  isNewScript: boolean;
  editMode: EEditionMode;
  isLoading: boolean;
  hasError: boolean;
  userMessage: string;
  isEditingProperties: boolean;
  isAddingAction: boolean;
  addingActionVerb: string;
  allExpanded: boolean;
  allCollapsed: boolean;
}

export interface ISiteScriptEditorProps extends IServiceConsumerComponentProps {
  script: ISiteScript;
  onScriptUpdated?: (script: ISiteScript) => void;
  useWizardActionGenerators: boolean;
  useWizardPropertyEditors: boolean;
}

export default class SiteScriptEditor extends React.Component<ISiteScriptEditorProps, ISiteScriptEditorState> {
  private siteScriptSchemaService: ISiteScriptSchemaService;
  private siteDesignsService: ISiteDesignsService;
  private stateHistory: ISiteScriptEditorState[];

  constructor(props: ISiteScriptEditorProps) {
    super(props);

    this.state = {
      script: null,
      scriptContentJson: '',
      scriptActionUIs: [],
      schema: null,
      isNewScript: false,
      isValidContent: true,
      isInvalidSchema: false,
      editMode: EEditionMode.Split,
      isLoading: true,
      hasError: false,
      userMessage: '',
      allExpanded: false,
      allCollapsed: true,
      isEditingProperties: false,
      isAddingAction: false,
      addingActionVerb: null
    };
  }

  public componentWillMount() {
    this.props.serviceScope.whenFinished(() => {
      this.siteScriptSchemaService = this.props.serviceScope.consume(SiteScriptSchemaServiceKey);
      this.siteDesignsService = this.props.serviceScope.consume(SiteDesignsServiceKey);

      this._loadScript().then((loadedScript) => {
        const schema = this.siteScriptSchemaService.getSiteScriptSchema();
        // If the script content is not loaded => ERROR
        if (!loadedScript.Content && loadedScript.Id) {
          this.setState({
            script: null,
            scriptContentJson: 'INVALID SCHEMA',
            schema: schema,
            isLoading: false,
            isValidContent: false,
            hasError: true,
            userMessage: 'The specified script is invalid'
          });
          return;
        }

        this.setState({
          script: loadedScript,
          schema: schema,
          scriptActionUIs: this._buildScriptActionUIs(loadedScript, true, false),
          isNewScript: loadedScript.Id ? false : true,
          isLoading: false,
          isInvalidSchema: false,
          scriptContentJson: JSON.stringify(loadedScript.Content, null, 2)
        });
      });
    });
  }

  public componentDidUpdate() {
    this._autoClearInfoMessages();
  }

  private _loadScript(): Promise<ISiteScript> {
    let { script } = this.props;

    // If existing script (The Id is known)
    if (script.Id) {
      // Load that script
      return this.siteDesignsService.getSiteScript(script.Id);
    } else {
      // If the argument is a new script
      // Initialize the content
      return this._initializeScriptContent(script);
    }
  }

  private _getActionKey(index: number, parentActionKey?: string): string {
    return `${parentActionKey ? parentActionKey + '_' : ''}ACT_${index}`;
  }

  private _buildScriptActionUIs(
    script: ISiteScript,
    allCollapsed?: boolean,
    allExpanded?: boolean,
    singleExpandedActionKey?: string
  ): ISiteScriptActionUIWrapper[] {
    let { scriptActionUIs } = this.state;
    const checkIsExpanded = (actionKey: string, parentActionKey: string) => {
      if (singleExpandedActionKey) {
        // The action or its parent is expanded
        const shouldExpand = singleExpandedActionKey.indexOf(actionKey) == 0;
        return shouldExpand;
      }

      if (allExpanded == true) {
        return true;
      }
      if (allCollapsed == true) {
        return false;
      }
      let foundAction = null;
      if (scriptActionUIs && scriptActionUIs.length) {
        if (parentActionKey) {
          let parentAction = find(scriptActionUIs, (sau) => sau.key == parentActionKey);
          if (parentAction && parentAction.subactions) {
            foundAction = find(parentAction.subactions, (sau) => sau.key == actionKey);
          }
        } else {
          foundAction = find(scriptActionUIs, (sau) => sau.key == actionKey);
        }

        return foundAction && foundAction.isExpanded;
      } else {
        return false;
      }
    };

    const mapper: (
      action: ISiteScriptAction,
      index: number,
      parentActionKey?: string
    ) => ISiteScriptActionUIWrapper = (action, index, parentActionKey) => {
      let actionKey = this._getActionKey(index, parentActionKey);
      return {
        key: actionKey,
        action: action,
        isExpanded: checkIsExpanded(actionKey, parentActionKey),
        parentActionKey: parentActionKey,
        subactions: !action.subactions
          ? null
          : action.subactions.map((subaction, subactionIndex) => mapper(subaction, subactionIndex, actionKey))
      };
    };

    return script.Content.actions.map((action, index) => mapper(action, index));
  }

  public render(): React.ReactElement<ISiteScriptEditorProps> {
    let { isLoading, isEditingProperties, script, isNewScript, hasError, userMessage, isAddingAction } = this.state;

    if (isLoading) {
      return (
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-smOffset3">
            <Spinner size={SpinnerSize.large} label="Loading..." />
          </div>
        </div>
      );
    }

    return (
      <div>
        {userMessage && (
          <MessageBar
            className={userMessage ? 'ms-fadeIn400' : 'ms-fadeOut400'}
            messageBarType={hasError ? MessageBarType.error : MessageBarType.success}
          >
            {userMessage}
          </MessageBar>
        )}

        {isAddingAction && (
          <Panel isOpen={true} type={PanelType.medium}>
            {this._renderNewActionWizard()}
          </Panel>
        )}
        {(isNewScript || isEditingProperties) && this._renderSiteScriptPropertiesEditor()}
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <CommandBar items={this._getCommands()} farItems={this._getFarCommands()} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <div className={styles.designWorkspace}>{this._renderEditor()}</div>
          </div>
        </div>
      </div>
    );
  }

  private editingSiteScriptProperties: ISiteScript = null;

  private _onSiteScriptPropertyChanged(propertyName: string, value: any) {
    if (!this.editingSiteScriptProperties) {
      this.editingSiteScriptProperties = {
        Id: '',
        Content: null,
        Description: '',
        Title: '',
        Version: 1
      };
    }

    if (propertyName == 'Version') {
      value = parseInt(value);
    }
    this.editingSiteScriptProperties[propertyName] = value;
  }

  private _renderSiteScriptPropertiesEditor() {
    if (!this.editingSiteScriptProperties) {
      let { script } = this.state;
      this.editingSiteScriptProperties = assign({}, script);
    }


    return (
      <Panel isOpen={true} type={PanelType.smallFixedFar} onDismiss={() => this._cancelScriptPropertiesEdition()}>
        {this.editingSiteScriptProperties.Id && <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <TextField value={this.editingSiteScriptProperties.Id} readOnly={true} label='Id' />
          </div>
        </div>}
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <TextField value={this.editingSiteScriptProperties.Title} label='Title' onChanged={v => this._onSiteScriptPropertyChanged('Title', v)} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <TextField multiline={true} rows={5} value={this.editingSiteScriptProperties.Description} label='Description' onChanged={v => this._onSiteScriptPropertyChanged('Description', v)} />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12">
            <TextField value={this.editingSiteScriptProperties.Version.toString()} label='Version' onChanged={v => this._onSiteScriptPropertyChanged('Version', v)} />
          </div>
        </div>

        <DialogFooter>
          <PrimaryButton text="Ok" onClick={() => this._applyPropertiesEdition()} />
          <DefaultButton text="Cancel" onClick={() => this._cancelScriptPropertiesEdition()} />
        </DialogFooter>
      </Panel>
    );
  }

  private _renderEditor() {
    let { script, scriptActionUIs, schema, scriptContentJson, isInvalidSchema, isValidContent } = this.state;

    const codeEditor = (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <div className={styles.codeEditorContainer}>
            <MonacoEditor
              schema={schema}
              value={scriptContentJson}
              onValueChange={(content, errors) => this._onCodeUpdated(content, errors)}
              readOnly={false}
            />
          </div>
        </div>
      </div>
    );

    const designerEditor = isValidContent && (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <div className="ms-Grid-row">
            <ScriptActionCollectionEditor
              serviceScope={this.props.serviceScope}
              actionUIs={scriptActionUIs}
              onActionRemoved={(actionKey) => this._removeScriptAction(actionKey)}
              onActionMoved={(actionKey, oldIndex, newIndex, parentActionKey) =>
                this._moveAction(actionKey, parentActionKey, oldIndex, newIndex)}
              onActionChanged={(actionKey, action) => this._onActionUpdated(actionKey, action)}
              onExpandChanged={(actionUI) => this._onExpandChanged(actionUI)}
              getActionSchema={(action) => this.siteScriptSchemaService.getActionSchema(action)}
              useWizardPropertyEditors={this.props.useWizardPropertyEditors}
            />
          </div>
          <div className="ms-Grid-row">
            <div>
              <ScriptActionAdder
                serviceScope={this.props.serviceScope}
                onActionAdded={(a) => this._addScriptAction(a)}
              />
            </div>
          </div>
        </div>
      </div>
    );

    switch (this.state.editMode) {
      case EEditionMode.Code:
        return codeEditor;
      case EEditionMode.Design:
        return designerEditor;
      case EEditionMode.Split:
      default:
        return (
          <div className={styles.splitWorkspace}>
            <div className={styles.splitPane}>{designerEditor}</div>
            <div className={styles.splitPane}>{codeEditor}</div>
          </div>
        );
    }
  }

  private _renderNewActionWizard() {
    let { addingActionVerb } = this.state;
    let wizard = null;
    let wizardTitle = null;
    switch (addingActionVerb) {
      case 'createSPList':
        wizardTitle = 'Create a List';
        wizard = (
          <CreateListWizard
            serviceScope={this.props.serviceScope}
            actionVerb={addingActionVerb}
            createEmptyDescription={'Create an empty Create List action'}
            createEmptyLabel={'Empty'}
            createMagicDescription={'Create from an existing list in this site'}
            createMagicLabel={'From existing'}
            onScriptActionGenerated={(action) => this._onActionAdded(action)}
            onCancel={() => this._cancelWizard()}
          />
        );
        break;
      default:
        break;
    }

    return (
      <Panel isOpen={true} hasCloseButton={false} type={PanelType.medium} headerText={wizardTitle}>
        {wizard}
      </Panel>
    );
  }

  private _initializeScriptContent(script: ISiteScript): Promise<ISiteScript> {
    script.Content = this.siteScriptSchemaService.getNewSiteScript();
    return Promise.resolve(script);
  }

  private _getCommands() {
    let { script, editMode, isValidContent, allExpanded, allCollapsed } = this.state;
    let actionsCount = script.Content.actions.length;
    const undoBtn: IContextualMenuItem = {
      key: 'undoBtn',
      text: 'Undo',
      title: 'Undo',
      disabled: !this._canUndo(),
      iconProps: { iconName: 'Undo' },
      onClick: () => this._undo()
    };
    const saveBtn: IContextualMenuItem = {
      key: 'saveBtn',
      text: 'Save',
      title: 'Save',
      iconProps: { iconName: 'Save' },
      onClick: () => this._saveSiteScript()
    };
    const editBtn: IContextualMenuItem = {
      key: 'btnEdit',
      text: 'Edit Properties',
      title: 'Edit Properties',
      iconProps: { iconName: 'Edit' },
      onClick: () => this._editProperties()
    };
    const expandAllBtn: IContextualMenuItem = {
      key: 'expandAllBtn',
      text: 'Expand All',
      title: 'Expand All',
      disabled: allExpanded,
      iconProps: { iconName: 'ExploreContent' },
      onClick: () => this._setAllExpanded(true)
    };
    const collapseAllBtn: IContextualMenuItem = {
      key: 'btnCollapseAll',
      text: 'Collapse All',
      title: 'Collapse All',
      disabled: allCollapsed,
      iconProps: { iconName: 'CollapseContent' },
      onClick: () => this._setAllExpanded(false)
    };

    let commands = [undoBtn];

    if (isValidContent) {
      commands = commands.concat(saveBtn, editBtn);

      if (editMode != EEditionMode.Code) {
        commands = commands.concat(expandAllBtn, collapseAllBtn);
      }
    }

    return commands;
  }

  private _getFarCommands() {
    let { script, editMode, isValidContent } = this.state;
    let actionsCount = script.Content.actions.length;

    const designModeButton: IContextualMenuItem = {
      key: 'designModeBtn',
      text: 'Design',
      title: 'Design',
      iconProps: { iconName: 'Design' },
      onClick: () => this._setEditionMode(EEditionMode.Design)
    };

    const codeModeButton: IContextualMenuItem = {
      key: 'codeModeBtn',
      text: 'Code',
      title: 'Code',
      iconProps: { iconName: 'Code' },
      onClick: () => this._setEditionMode(EEditionMode.Code)
    };

    const splitModeButton: IContextualMenuItem = {
      key: 'splitModeBtn',
      text: 'Split',
      title: 'Split',
      iconProps: { iconName: 'Split' },
      onClick: () => this._setEditionMode(EEditionMode.Split)
    };

    return [designModeButton, codeModeButton, splitModeButton];
  }

  private _setAllExpanded(isExpanded: boolean) {
    let { script } = this.state;
    let actions = script.Content.actions;
    this.setState({
      allExpanded: isExpanded,
      allCollapsed: !isExpanded,
      scriptActionUIs: this._buildScriptActionUIs(script, !isExpanded, isExpanded)
    });
  }

  private _setEditionMode(mode: EEditionMode) {
    this.setState({ editMode: mode });
  }

  private _editProperties() {
    this.setState({
      isEditingProperties: true
    });
  }

  private _onExpandChanged(actionUI: ISiteScriptActionUIWrapper) {
    let { scriptActionUIs } = this.state;

    let allExpanded = true;
    let allCollapsed = false;
    const mapper: (mapActionUI: ISiteScriptActionUIWrapper) => ISiteScriptActionUIWrapper = (mapActionUI) => {
      allExpanded = allExpanded && mapActionUI.isExpanded;
      allCollapsed = !allCollapsed && !mapActionUI.isExpanded;
      if (mapActionUI.key == actionUI.key) {
        return actionUI;
      } else {
        let newActionUI = assign({}, mapActionUI);
        if (mapActionUI.subactions && mapActionUI.subactions.length) {
          newActionUI.subactions = mapActionUI.subactions.map(mapper);
        }
        return newActionUI;
      }
    };

    let newActionUIs = scriptActionUIs.map(mapper);
    this.setState({
      scriptActionUIs: newActionUIs,
      allExpanded: allExpanded,
      allCollapsed: allCollapsed
    });
  }

  private _moveAction(actionKey: string, parentActionKey: string, oldIndex: number, newIndex: number) {
    let { script, scriptActionUIs } = this.state;

    let newActions: ISiteScriptActionUIWrapper[] = null;
    if (parentActionKey) {
      let parentActionUI = find(scriptActionUIs, (a) => a.key == parentActionKey);
      if (parentActionUI) {
        parentActionUI = assign({}, parentActionUI);
        let newSubActions = [].concat(parentActionUI.subactions) as ISiteScriptActionUIWrapper[];
        let actionToMove = find(newSubActions, (a) => a.key == actionKey);
        newSubActions.splice(oldIndex, 1);
        newSubActions.splice(newIndex, 0, actionToMove);
        parentActionUI.subactions = newSubActions;
        newActions = scriptActionUIs.map((sau) => (sau.key == parentActionKey ? parentActionUI : sau));
      }
    } else {
      newActions = [].concat(scriptActionUIs);
      let actionToMove = find(newActions, (a) => a.key == actionKey);
      newActions.splice(oldIndex, 1);
      newActions.splice(newIndex, 0, actionToMove);
    }

    const mapper: (mapActionUI: ISiteScriptActionUIWrapper) => ISiteScriptAction = (mapActionUI) => {
      let action = mapActionUI.action;
      if (mapActionUI.subactions && mapActionUI.subactions.length) {
        action.subactions = mapActionUI.subactions.map(mapper);
      }
      return action;
    };

    let newContent = assign({}, script.Content);
    newContent.actions = newActions.map(mapper);
    let newScript = assign({}, script);
    newScript.Content = newContent;

    const newActionKey = this._getActionKey(newIndex, parentActionKey);

    this._saveToStateHistory();
    this.setState({
      script: newScript,
      scriptActionUIs: this._buildScriptActionUIs(newScript, null, null, newActionKey),
      scriptContentJson: JSON.stringify(newScript.Content, null, 2)
    });
  }

  // Copy of the method in the GenericEditor
  // TODO Refactor this
  private _getPropertyDefaultValueFromSchema(schema: any, propertyName: string): any {
    let propSchema = schema.properties[propertyName];
    if (propSchema) {
      switch (propSchema.type) {
        case 'string':
          return '';
        case 'boolean':
          return false;
        case 'number':
          return 0;
        case 'object':
          return {};
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  private _getGenericScriptAction(verb: string): ISiteScriptAction {
    let newAction: ISiteScriptAction = {
      verb: verb
    };
    let actionSchema = this.siteScriptSchemaService.getActionSchema(newAction);

    // Add default values for properties of the action
    if (actionSchema && actionSchema.properties) {
      Object.keys(actionSchema.properties)
        .filter((p) => p != 'verb')
        .forEach((p) => (newAction[p] = this._getPropertyDefaultValueFromSchema(actionSchema, p)));
    }
    console.log('Action Added: ', newAction);
    return newAction;
  }

  private _hasWizard(verb: string): boolean {
    const availableWizardsForAction = ['createSPList'];
    return availableWizardsForAction.indexOf(verb) > -1;
  }

  private _cancelWizard() {
    this.setState({
      isAddingAction: false,
      addingActionVerb: null
    });
  }

  private _addScriptAction(verb: string) {
    if (this._hasWizard(verb) && this.props.useWizardActionGenerators) {
      this.setState({
        isAddingAction: true,
        addingActionVerb: verb
      });
    } else {
      this._onActionAdded(this._getGenericScriptAction(verb));
    }
  }

  private _onActionAdded(action: ISiteScriptAction) {
    let { script } = this.state;

    let newActionIndex = script.Content.actions.length;
    let newActionKey = this._getActionKey(newActionIndex);
    let newActionsArray = [].concat(script.Content.actions, action);
    let newScriptContent = assign({}, script.Content);
    newScriptContent.actions = newActionsArray;
    let newScript = assign({}, script);
    newScript.Content = newScriptContent;
    this._saveToStateHistory();
    this.setState({
      script: newScript,
      scriptActionUIs: this._buildScriptActionUIs(newScript, null, null, newActionKey),
      scriptContentJson: JSON.stringify(newScript.Content, null, 2),
      isAddingAction: false,
      addingActionVerb: null
    });
  }

  private _removeScriptAction(actionKey: string) {
    let { script, scriptActionUIs } = this.state;
    let newActionsArray = scriptActionUIs.filter((item) => item.key != actionKey).map((a) => a.action);
    let newScriptContent = assign({}, script.Content);
    newScriptContent.actions = newActionsArray;
    let newScript = assign({}, script);
    newScript.Content = newScriptContent;
    this._saveToStateHistory();
    this.setState({
      script: newScript,
      scriptActionUIs: this._buildScriptActionUIs(newScript),
      scriptContentJson: JSON.stringify(newScript.Content, null, 2)
    });
  }

  private _onActionUpdated(actionKey: string, action: ISiteScriptAction) {
    let { script, scriptActionUIs } = this.state;
    let newScript: ISiteScript = assign({}, script);
    let newScriptContent = assign({}, script.Content);

    // Check if the change is an added sub action
    // Get the action to update
    let previousAction = find(scriptActionUIs, (sau) => sau.key == actionKey);
    let previousSubActionsCount = previousAction.subactions && previousAction.subactions.length;
    let toExpandActionKey = null;
    if (previousSubActionsCount >= 0 && action.subactions && action.subactions.length > previousSubActionsCount) {
      // If a subaction is added, get the subaction key
      toExpandActionKey = this._getActionKey(previousSubActionsCount, actionKey);
    }

    newScriptContent.actions = [].concat(newScriptContent.actions);

    newScriptContent.actions = scriptActionUIs.map((sa) => (sa.key == actionKey ? action : sa.action));

    newScript.Content = newScriptContent;

    this._saveToStateHistory();
    this.setState({
      script: newScript,
      scriptActionUIs: this._buildScriptActionUIs(newScript, null, null, toExpandActionKey),
      scriptContentJson: JSON.stringify(newScript.Content, null, 2)
    });
  }

  private _onCodeUpdated(code: string, errors: any) {
    let { script, schema, scriptActionUIs } = this.state;

    let wereNoActions = scriptActionUIs.length == 0;
    // Validate the schema
    let parsedCode = JSON.parse(code);
    let valid = ajv.validate(schema, parsedCode);
    if (!valid) {
      console.error('Schema errors: ', ajv.errors);

      this.setState({
        scriptContentJson: code,
        isLoading: false,
        isValidContent: false,
        hasError: true,
        userMessage: 'Oops... The Site Script is invalid...'
      });
    } else {
      let newScript: ISiteScript = assign({}, script);

      let newScriptContent = parsedCode;

      newScript.Content = newScriptContent;

      this.setState({
        script: newScript,
        scriptActionUIs: this._buildScriptActionUIs(newScript, false, wereNoActions),
        scriptContentJson: JSON.stringify(newScript.Content, null, 2),
        isValidContent: true,
        hasError: false,
        userMessage: null
      });
    }
  }

  private _validateForSave(): string {
    let { schema, script } = this.state;

    if (!script.Title) {
      return 'The Site Script has no title';
    }

    if (!script.Content) {
      return 'The Site Script has no content';
    }

    // Check content schema validity
    let valid = ajv.validate(schema, script.Content);
    if (!valid) {
      return 'The Site Script is not valid against the Schena';
    }

    return null;
  }
  private _saveSiteScript() {
    let { script } = this.state;
    let invalidMessage = this._validateForSave();
    if (invalidMessage) {
      this.setState({
        hasError: true,
        userMessage: invalidMessage
      });
      return;
    }

    this.setState({ isLoading: true, isEditingProperties: false });
    this.siteDesignsService
      .saveSiteScript(script)
      .then(() => {
        this.setState({
          isEditingProperties: false,
          isNewScript: false,
          isLoading: false,
          hasError: false,
          userMessage: 'The site script have been properly saved'
        });
        this._clearStateHistory();
      })
      .catch((error) => {
        this.setState({
          isEditingProperties: false,
          hasError: true,
          isNewScript: false,
          isLoading: false,
          userMessage: 'The site script cannot be properly saved'
        });
      });
  }

  private _autoClearInfoMessages() {
    let { userMessage, hasError } = this.state;
    if (hasError) {
      return;
    }

    if (userMessage) {
      setTimeout(() => {
        this.setState({
          userMessage: null
        });
      }, 3000);
    }
  }

  private _applyPropertiesEdition() {
    if (!this.editingSiteScriptProperties) {
      return;
    }

    this.setState({
      script: this.editingSiteScriptProperties,
      // scriptContentJson: JSON.stringify(siteScript.Content, null, 2),
      isEditingProperties: false,
      isNewScript: false
    });

    if (this.props.onScriptUpdated) {
      this.props.onScriptUpdated(this.editingSiteScriptProperties);
    }

    this.editingSiteScriptProperties = null;
  }
  private _cancelScriptPropertiesEdition() {
    this.editingSiteScriptProperties = null;
    this.setState({
      isEditingProperties: false,
      isNewScript: false
    });
  }

  private _saveToStateHistory() {
    if (!this.stateHistory) {
      this.stateHistory = [];
    }

    if (this.stateHistory.length > 10) {
      this.stateHistory.splice(9, 1);
    }

    // Remove not relevant state properties
    let savedState = assign({}, this.state) as any;
    savedState.addingActionVerb = null;
    savedState.isAddingAction = false;
    savedState.isLoading = false;

    this.stateHistory.splice(0, 0, savedState);
  }

  private _clearStateHistory() {
    this.stateHistory = null;
  }

  private _undo() {
    if (!this.stateHistory || this.stateHistory.length == 0) {
      return;
    }

    let previousState = this.stateHistory[0];
    this.stateHistory.splice(0, 1);
    this.setState(previousState);
  }

  private _canUndo(): boolean {
    return this.stateHistory && this.stateHistory.length > 0;
  }
}
