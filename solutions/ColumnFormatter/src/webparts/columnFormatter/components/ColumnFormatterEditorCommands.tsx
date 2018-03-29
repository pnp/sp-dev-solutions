import { sp } from '@pnp/sp';
import * as strings from 'ColumnFormatterWebPartStrings';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { textForType, typeForTypeAsString } from '../helpers/ColumnTypeHelpers';
import { loadJSOM } from '../helpers/jsomLoader';
import { changeUIState, disconnectWizard, loadedJSOM } from '../state/Actions';
import { columnTypes, IApplicationState, IContext, ISaveDetails, saveMethod, uiState } from '../state/State';
import styles from './ColumnFormatter.module.scss';

var fileDownload = require('js-file-download');


export interface IColumnFormatterEditorCommandsProps {
  context?: IContext;
  changeUIState?: (state:uiState) => void;
  disconnectWizard?: () => void;
  wizardTabVisible?: boolean;
  editorString?: string;
  fieldName?: string;
  fieldType?: columnTypes;
  viewTab?: number;
  saveDetailsFromLoad?: ISaveDetails;
  jsomLoaded?: boolean;
  loadedJSOM?: (jsomLoaded:boolean) => void;
}

export interface IColumnFormatterEditorCommandsState {
  newConfirmationDialogVisible: boolean;
  customizeConfirmationDialogVisible: boolean;
  saveToLibraryDialogVisible: boolean;
  librariesLoaded: boolean;
  libraries: Array<any>;
  selectedLibraryUrl?: string;
  libraryFolderPath: string;
  libraryFileName: string;
  libraryIsSaving: boolean;
  librarySaveError?: string;
  applyToListDialogVisible: boolean;
  listsLoaded: boolean;
  lists: Array<any>;
  selectedList?: string;
  selectedField?: string;
  listIsApplying: boolean;
  listSaveError?: string;
  applyToSiteColumnDialogVisible: boolean;
  siteColumnsLoaded: boolean;
  siteColumns: Array<any>;
  selectedSiteColumnGroup?: string;
  selectedSiteColumn?: string;
  siteColumnIsApplying: boolean;
  siteColumnSaveError?: string;
  siteColumnPushToLists: boolean;
  activeSaveMethod?: saveMethod;
}

class ColumnFormatterEditorCommands_ extends React.Component<IColumnFormatterEditorCommandsProps, IColumnFormatterEditorCommandsState> {

  public constructor(props:IColumnFormatterEditorCommandsProps) {
    super(props);

    this.state = {
      newConfirmationDialogVisible: false,
      customizeConfirmationDialogVisible: false,
      saveToLibraryDialogVisible: false,
      librariesLoaded: false,
      libraries: new Array<any>(),
      selectedLibraryUrl: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.Library ? props.saveDetailsFromLoad.libraryUrl : undefined),
      libraryFolderPath: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.Library ? props.saveDetailsFromLoad.libraryFolderPath : ''),
      libraryFileName: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.Library ? props.saveDetailsFromLoad.libraryFilename : props.fieldName + '.json'),
      libraryIsSaving: false,
      applyToListDialogVisible: false,
      listsLoaded: false,
      lists: new Array<any>(),
      listIsApplying: false,
      selectedList: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.ListField ? props.saveDetailsFromLoad.list : undefined),
      selectedField: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.ListField ? props.saveDetailsFromLoad.field : undefined),
      applyToSiteColumnDialogVisible: false,
      siteColumnsLoaded: false,
      siteColumns: new Array<any>(),
      siteColumnIsApplying: false,
      siteColumnPushToLists: true,
      selectedSiteColumnGroup: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.SiteColumn ? props.saveDetailsFromLoad.siteColumnGroup : undefined),
      selectedSiteColumn: (props.saveDetailsFromLoad.activeSaveMethod == saveMethod.SiteColumn ? props.saveDetailsFromLoad.siteColumn : undefined),
      activeSaveMethod: props.saveDetailsFromLoad.activeSaveMethod
    };
  }

  public render(): React.ReactElement<IColumnFormatterEditorCommandsProps> {
    return (
      <div>

        <CommandBar
          items={this.getCommandBarItems()}
          farItems={this.getCommandBarFarItems()}
        />


        <Dialog
         hidden={!this.state.newConfirmationDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.normal,
           title: strings.NewConfirmationDialog_Title,
           subText: strings.NewConfirmationDialog_Text
         }}>
         <DialogFooter>
           <PrimaryButton text={strings.Dialog_Yes} onClick={this.onNewConfirmationClick}/>
           <DefaultButton text={strings.Dialog_Cancel} onClick={this.closeDialog}/>
         </DialogFooter>
        </Dialog>


        <Dialog
         hidden={!this.state.customizeConfirmationDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.normal,
           title: strings.CustomizeConfirmationDialog_Title,
           subText: strings.CustomizeConfirmationDialog_Text
         }}>
         <DialogFooter>
           <PrimaryButton text={strings.Dialog_Yes} onClick={this.onCustomizeConfirmationClick}/>
           <DefaultButton text={strings.Dialog_Cancel} onClick={this.closeDialog}/>
         </DialogFooter>
        </Dialog>


        <Dialog
         hidden={!this.state.saveToLibraryDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.largeHeader,
           title: strings.Library_SaveDialogTitle
         }}>
          {!this.props.context.isOnline && (
            <span>{strings.FeatureUnavailableFromLocalWorkbench}</span>
          )}
          {!this.state.librariesLoaded && this.props.context.isOnline && !this.state.libraryIsSaving && this.state.librarySaveError == undefined && (
            <Spinner size={SpinnerSize.large} label={strings.Library_LoadingLibraries}/>
          )}
          {this.state.librariesLoaded && this.props.context.isOnline && !this.state.libraryIsSaving && this.state.librarySaveError == undefined && (
            <div>
              <Dropdown
               label={strings.Library_Library}
               selectedKey={this.state.selectedLibraryUrl}
               onChanged={(item:IDropdownOption)=> {this.setState({selectedLibraryUrl: item.key.toString()});}}
               required={true}
               options={this.librariesToOptions()} />
              <TextField
               label={strings.Library_FolderPath}
               value={this.state.libraryFolderPath}
               onChanged={(value:string) => {this.setState({libraryFolderPath: value});}}/>
              <TextField
               label={strings.Library_Filename}
               required={true}
               value={this.state.libraryFileName}
               onChanged={(value:string) => {this.setState({libraryFileName: value});}}/>
            </div>
          )}
          {this.state.libraryIsSaving && this.state.librarySaveError == undefined &&(
            <Spinner size={SpinnerSize.large} label={strings.Library_Saving}/>
          )}
          {this.state.librarySaveError !== undefined && (
            <span className={styles.errorMessage}>{this.state.librarySaveError}</span>
          )}
          <DialogFooter>
            <PrimaryButton text={strings.Dialog_Save} disabled={!this.saveToLibrarySaveButtonEnabled()} onClick={this.onSaveToLibrarySaveButtonClick}/>
            <DefaultButton text={strings.Dialog_Cancel} onClick={this.closeDialog}/>
          </DialogFooter>
        </Dialog>


        <Dialog
         hidden={!this.state.applyToSiteColumnDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
          type: DialogType.largeHeader,
          title: strings.SiteColumn_SaveDialogTitle
        }}>
         {!this.props.context.isOnline && (
           <span>{strings.FeatureUnavailableFromLocalWorkbench}</span>
         )}
         {!this.state.siteColumnsLoaded && this.props.context.isOnline && !this.state.siteColumnIsApplying && this.state.siteColumnSaveError == undefined && (
           <Spinner size={SpinnerSize.large} label={strings.SiteColumn_LoadingSiteColumns}/>
         )}
         {this.state.siteColumnsLoaded && this.props.context.isOnline && !this.state.siteColumnIsApplying && this.state.siteColumnSaveError == undefined && (
           <div>
             <Dropdown
              label={strings.SiteColumn_Group}
              selectedKey={this.state.selectedSiteColumnGroup}
              onChanged={(item:IDropdownOption)=> {this.setState({selectedSiteColumnGroup: item.key.toString(),selectedSiteColumn: undefined});}}
              required={true}
              options={this.siteColumnGroupsToOptions()} />
             <Dropdown
              label={strings.SiteColumn_Field}
              selectedKey={this.state.selectedSiteColumn}
              disabled={this.state.selectedSiteColumnGroup == undefined}
              onChanged={(item:IDropdownOption)=> {this.setState({selectedSiteColumn: item.key.toString()});}}
              required={true}
              options={this.siteColumnsToOptions()} />
             <Toggle
              checked={this.state.siteColumnPushToLists}
              onChanged={()=> {this.setState({siteColumnPushToLists:!this.state.siteColumnPushToLists});}}
              onText={strings.SiteColumn_PushToListsOn}
              offText={strings.SiteColumn_PushToListsOff}
             />
           </div>
         )}
         {this.state.siteColumnIsApplying && this.state.siteColumnSaveError == undefined &&(
           <Spinner size={SpinnerSize.large} label={strings.SiteColumn_Saving}/>
         )}
         {this.state.siteColumnSaveError !== undefined && (
           <span className={styles.errorMessage}>{this.state.siteColumnSaveError}</span>
         )}
          <DialogFooter>
            <PrimaryButton text={strings.Dialog_Save} disabled={!this.applyToSiteColumnSaveButtonEnabled()} onClick={this.onApplyToSiteColumnSaveButtonClick}/>
            <DefaultButton text={strings.Dialog_Cancel} onClick={this.closeDialog}/>
          </DialogFooter>
        </Dialog>


        <Dialog
         hidden={!this.state.applyToListDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
          type: DialogType.largeHeader,
          title: strings.ListField_SaveDialogTitle
        }}>
         {!this.props.context.isOnline && (
           <span>{strings.FeatureUnavailableFromLocalWorkbench}</span>
         )}
         {!this.state.listsLoaded && this.props.context.isOnline && !this.state.listIsApplying && this.state.listSaveError == undefined && (
           <Spinner size={SpinnerSize.large} label={strings.ListField_LoadingLists}/>
         )}
         {this.state.listsLoaded && this.props.context.isOnline && !this.state.listIsApplying && this.state.listSaveError == undefined && (
           <div>
             <Dropdown
              label={strings.ListField_List}
              selectedKey={this.state.selectedList}
              onChanged={(item:IDropdownOption)=> {this.setState({selectedList: item.key.toString(),selectedField: undefined});}}
              required={true}
              options={this.listsToOptions()} />
             <Dropdown
              label={strings.ListField_Field}
              selectedKey={this.state.selectedField}
              disabled={this.state.selectedList == undefined}
              onChanged={(item:IDropdownOption)=> {this.setState({selectedField: item.key.toString()});}}
              required={true}
              options={this.fieldsToOptions()} />
           </div>
         )}
         {this.state.listIsApplying && this.state.listSaveError == undefined &&(
           <Spinner size={SpinnerSize.large} label={strings.ListField_Saving}/>
         )}
         {this.state.listSaveError !== undefined && (
           <span className={styles.errorMessage}>{this.state.listSaveError}</span>
         )}
          <DialogFooter>
            <PrimaryButton text={strings.Dialog_Save} disabled={!this.applyToListSaveButtonEnabled()} onClick={this.onApplyToListSaveButtonClick}/>
            <DefaultButton text={strings.Dialog_Cancel} onClick={this.closeDialog}/>
          </DialogFooter>
        </Dialog>

      </div>
    );
  }

  private getCommandBarItems(): Array<IContextualMenuItem> {
    let items:Array<IContextualMenuItem> = [
      {
        key: 'new',
        name: strings.Command_New,
        iconProps: {iconName: 'Add'},
        onClick: this.onNewClick
      }
    ];
    if(this.props.wizardTabVisible) {
      items.push({
        key: 'customize',
        name: strings.Command_Customize,
        iconProps: {iconName: 'Fingerprint'},
        onClick: this.onCustomizeClick
      });
    }
    return items;
  }

  private getCommandBarFarItems(): Array<IContextualMenuItem> {
    let items:Array<IContextualMenuItem> = [];
    items.push(
        {
          key: 'saveas',
          name: strings.Command_SaveAs,
          iconProps: {iconName: 'SaveAs'},
          subMenuProps: {
            items: [
              {
                key: 'saveas-download',
                name: this.saveMethodTitle(saveMethod.Download),
                iconProps: { iconName: this.saveMethodIcon(saveMethod.Download) },
                onClick: this.onDownloadClick
              },
              {
                key: 'saveas-copy',
                name: this.saveMethodTitle(saveMethod.Copy),
                iconProps: { iconName: this.saveMethodIcon(saveMethod.Copy) },
                onClick: this.onCopyClick
              },
              {
                key: 'saveas-library',
                name: this.saveMethodTitle(saveMethod.Library),
                iconProps: { iconName: this.saveMethodIcon(saveMethod.Library) },
                onClick: this.onSaveToLibraryClick
              },
              {
                key: 'saveas-sitecolumn',
                name: this.saveMethodTitle(saveMethod.SiteColumn),
                iconProps: { iconName: this.saveMethodIcon(saveMethod.SiteColumn) },
                onClick: this.onApplyToSiteColumnClick
              },
              {
                key: 'saveas-listfield',
                name: this.saveMethodTitle(saveMethod.ListField),
                iconProps: { iconName: this.saveMethodIcon(saveMethod.ListField) },
                onClick: this.onApplyToListClick
              }
            ]
          }
        }
    );
    if(this.state.activeSaveMethod !== undefined &&
      ((this.state.activeSaveMethod == saveMethod.Library && this.saveToLibrarySaveButtonEnabled()) || this.state.activeSaveMethod !== saveMethod.Library) &&
      ((this.state.activeSaveMethod == saveMethod.ListField && this.applyToListSaveButtonEnabled()) || this.state.activeSaveMethod !== saveMethod.ListField) &&
      ((this.state.activeSaveMethod == saveMethod.SiteColumn && this.applyToSiteColumnSaveButtonEnabled()) || this.state.activeSaveMethod !== saveMethod.SiteColumn)) {
      items.push({
        key: 'save',
        name: strings.Command_Save,
        iconProps: { iconName: this.saveMethodIcon(this.state.activeSaveMethod)},
        title: this.saveMethodTitle(this.state.activeSaveMethod),
        onClick: this.onSaveClick
      });
    }
    return items;
  }

  private saveMethodIcon(method:saveMethod): string {
    switch (method) {
      case saveMethod.Download:
        return 'CloudDownload';
      case saveMethod.Copy:
        return 'Copy';
      case saveMethod.Library:
        return 'DocLibrary';
      case saveMethod.SiteColumn:
        return 'Redeploy';
      case saveMethod.ListField:
        return 'Deploy';
      default:
        return 'Save';
    }
  }

  private saveMethodTitle(method:saveMethod): string {
    switch (method) {
      case saveMethod.Download:
        return strings.Command_Download;
      case saveMethod.Copy:
        return strings.Command_Copy;
      case saveMethod.Library:
        return strings.Command_SaveToLibrary;
      case saveMethod.SiteColumn:
        return strings.Command_ApplyToSiteColumn;
      case saveMethod.ListField:
        return strings.Command_ApplyToList;
      default:
        return strings.Command_Save;
    }
  }

  @autobind
  private onNewClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.setState({
      newConfirmationDialogVisible: true
    });
  }

  @autobind
  private onNewConfirmationClick(): void {
    this.props.changeUIState(uiState.welcome);
  }

  @autobind
  private onCustomizeClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.setState({
      customizeConfirmationDialogVisible: true
    });
  }

  @autobind
  private onCustomizeConfirmationClick(): void {
    this.props.disconnectWizard();
    this.setState({
      customizeConfirmationDialogVisible: false
    });
  }

  @autobind
  private closeDialog(): void {
    this.setState({
      newConfirmationDialogVisible: false,
      customizeConfirmationDialogVisible: false,
      saveToLibraryDialogVisible: false,
      librarySaveError: undefined,
      applyToListDialogVisible: false,
      applyToSiteColumnDialogVisible: false
    });
  }

  @autobind
  private onSaveClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    switch(this.state.activeSaveMethod) {
      case saveMethod.Download:
        this.onDownloadClick(ev, item);
        break;
      case saveMethod.Copy:
        this.onCopyClick(ev, item);
        break;
      case saveMethod.Library:
        this.onSaveToLibrarySaveButtonClick();
        break;
      case saveMethod.ListField:
        this.onApplyToListSaveButtonClick();
        break;
    }
  }

  @autobind
  private onDownloadClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    fileDownload(this.props.editorString, this.props.fieldName + '.json');
    this.setState({
      activeSaveMethod: saveMethod.Download
    });
  }

  @autobind
  private onCopyClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = this.props.editorString;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
    } catch (err) {
      if(window.console && window.console.log) {
        console.log(strings.CopyToClipboardError);
      }
    }
    document.body.removeChild(textArea);
    this.setState({
      activeSaveMethod: saveMethod.Copy
    });
  }


  @autobind
  private onSaveToLibraryClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    if(!this.state.librariesLoaded) {
      if(this.props.context.isOnline) {
        sp.site.getDocumentLibraries(this.props.context.webAbsoluteUrl)
          .then((data:any) => {
            this.setState({
              librariesLoaded: true,
              libraries: data
            });
          })
          .catch((error:any) => {
            this.setState({
              librarySaveError: strings.Library_LibrariesLoadError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
            });
          });
      }
    }
    this.setState({
      saveToLibraryDialogVisible: true
    });
  }

  private librariesToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var library of this.state.libraries) {
      items.push({
        key: library.ServerRelativeUrl,
        text: library.Title
      });
    }
    return items;
  }

  private saveToLibrarySaveButtonEnabled(): boolean{
    return (
      this.props.context.isOnline && this.state.selectedLibraryUrl !== undefined &&
        this.state.libraryFileName.length > 0 && this.state.librarySaveError == undefined
    );
  }

  @autobind
  private onSaveToLibrarySaveButtonClick(): void {
    this.setState({
      libraryIsSaving: true,
      librarySaveError: undefined,
      saveToLibraryDialogVisible: true
    });
    sp.web.getFolderByServerRelativeUrl(this.state.selectedLibraryUrl + (this.state.libraryFolderPath.length > 0 ? '/' + this.state.libraryFolderPath : ''))
      .files.add(this.state.libraryFileName, this.props.editorString, true)
      .then(()=>{
        this.setState({
          libraryIsSaving: false,
          saveToLibraryDialogVisible: false,
          activeSaveMethod: saveMethod.Library
        });
      })
      .catch((error:any) => {
        this.setState({
          libraryIsSaving: false,
          librarySaveError: strings.Library_SaveError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message,
          activeSaveMethod: undefined
        });
      });
  }


  @autobind
  private onApplyToSiteColumnClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    if(!this.state.siteColumnsLoaded) {
      if(this.props.context.isOnline) {
        sp.web.fields.filter('ReadOnlyField eq false and Hidden eq false').select('Id','Group','Title','InternalName','TypeAsString','DisplayFormat').orderBy('Group').get()
          .then((data:any) => {
            let groupdata:Array<any> = new Array<any>();
            var curGroupName:string;
            for(var i=0; i<data.length; i++){
              let ftype = typeForTypeAsString(data[i].TypeAsString, data[i].DisplayFormat);
              if(ftype !== undefined) {
                if(curGroupName != data[i].Group) {
                  groupdata.push({
                    Group: data[i].Group,
                    Fields: []
                  });
                  curGroupName = data[i].Group;
                }
                groupdata[groupdata.length-1].Fields.push({
                  Id: data[i].Id,
                  Title: data[i].Title,
                  InternalName: data[i].InternalName,
                  Type: ftype,
                  FieldType: data[i]["odata.type"]
                });
              }
            }

            this.setState({
              siteColumnsLoaded: true,
              siteColumns: groupdata
            });
          })
          .catch((error:any) => {
            this.setState({
              siteColumnSaveError: strings.SiteColumn_SiteColumnsLoadError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
            });
          });
      }
    }
    
    this.setState({
      applyToSiteColumnDialogVisible: true
    });
  }

  private siteColumnGroupsToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var group of this.state.siteColumns) {
      items.push({
        key: group.Group,
        text: group.Group
      });
    }
    return items;
  }

  private siteColumnsToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var group of this.state.siteColumns) {
      if(group.Group == this.state.selectedSiteColumnGroup) {
        for(var field of group.Fields) {
          items.push({
            key: field.InternalName,
            text: field.Title + ' [' + textForType(field.Type) + ']'
          });
        }
      } 
    }
    return items;
  }

  private applyToSiteColumnSaveButtonEnabled(): boolean{
    return (
      this.props.context.isOnline && this.state.selectedSiteColumnGroup !== undefined &&
        this.state.selectedSiteColumn !== undefined && this.state.siteColumnSaveError == undefined
    );
  }

  @autobind
  private onApplyToSiteColumnSaveButtonClick(): void {
    this.setState({
      siteColumnIsApplying: true,
      siteColumnSaveError: undefined,
      applyToSiteColumnDialogVisible: true
    });

    //Save to site column (no way to push changes to lists in REST directly)
    sp.web.fields.getByInternalNameOrTitle(this.state.selectedSiteColumn).update({
        CustomFormatter: this.props.editorString
    })
      .then(()=>{
        if(this.state.siteColumnPushToLists) {
          //if push to lists, then JSOM is used to just load the field (with the saves from above) and push it down
          if(!this.props.jsomLoaded) {
            loadJSOM().then(() => {
              this.props.loadedJSOM(true);
              return this.applyToSiteColumnAndPushChanges();
            });
          } else {
            return this.applyToSiteColumnAndPushChanges();
          }
        } else {
          return;
        }
      })
      .then(() => {
        this.setState({
          siteColumnIsApplying: false,
          applyToSiteColumnDialogVisible: false,
          activeSaveMethod: saveMethod.SiteColumn
        });
      })
      .catch((error:any) => {
        this.setState({
          siteColumnIsApplying: false,
          siteColumnSaveError: strings.SiteColumn_SaveError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message,
          activeSaveMethod: undefined
        });
      });
  }

  private applyToSiteColumnAndPushChanges(): Promise<any> {
    return new Promise<any>((resolve:() => void, reject: (error:any) => void): void => {
      let ctx: SP.ClientContext = SP.ClientContext.get_current();
      let web: SP.Web = ctx.get_web();
      let field = web.get_fields().getByInternalNameOrTitle(this.state.selectedSiteColumn);
      field.updateAndPushChanges(true);
      ctx.executeQueryAsync(():void => {
        resolve();
      }, (sender:any,args:SP.ClientRequestFailedEventArgs):void => {
        reject(args.get_errorValue());
      });
    });
  }


  @autobind
  private onApplyToListClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    if(!this.state.listsLoaded) {
      if(this.props.context.isOnline) {
        sp.web.lists.filter('Hidden eq false').select('Id','Title','Fields/InternalName','Fields/TypeAsString','Fields/Hidden','Fields/Title','Fields/DisplayFormat').expand('Fields').get()
          .then((data:any) => {
            let listdata:Array<any> = new Array<any>();
            for(var i=0; i<data.length; i++){
              listdata.push({
                Id: data[i].Id,
                Title: data[i].Title,
                Fields: data[i].Fields.map((field:any, index:number) => {
                  if(!field.Hidden) {
                    let ftype = typeForTypeAsString(field.TypeAsString, field.DisplayFormat);
                    if(ftype !== undefined) {
                      return {
                        Title: field.Title,
                        InternalName: field.InternalName,
                        Type: ftype
                      };
                    }
                  }
                }).filter((field:any, index:number) => {return field !== undefined;})
              });
            }

            this.setState({
              listsLoaded: true,
              lists: listdata
            });
          })
          .catch((error:any) => {
            this.setState({
              listSaveError: strings.ListField_ListLoadError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
            });
          });
      }
    }
    
    this.setState({
      applyToListDialogVisible: true
    });
  }

  private listsToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var list of this.state.lists) {
      items.push({
        key: list.Id,
        text: list.Title
      });
    }
    return items;
  }

  private fieldsToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var list of this.state.lists) {
      if(list.Id == this.state.selectedList) {
        for(var field of list.Fields) {
          if((this.props.fieldType == columnTypes.lookup && field.Type == columnTypes.lookup) ||
            (this.props.fieldType == columnTypes.person && field.Type == columnTypes.person) ||
            (this.props.fieldType !== columnTypes.person && field.Type !== columnTypes.person &&
             this.props.fieldType !== columnTypes.lookup && field.Type !== columnTypes.lookup)) {
               //formats for lookups can only be applied to lookups
               //formats for users can only be applied to users
               //the others are mostly interchangable (because @currentField works without subprops required)
            items.push({
                key: field.InternalName,
                text: field.Title + ' [' + textForType(field.Type) + ']'
              });    
          }
        }
        break;
      } 
    }
    return items;
  }

  private applyToListSaveButtonEnabled(): boolean{
    return (
      this.props.context.isOnline && this.state.selectedList !== undefined &&
        this.state.selectedField !== undefined && this.state.listSaveError == undefined
    );
  }

  @autobind
  private onApplyToListSaveButtonClick(): void {
    this.setState({
      listIsApplying: true,
      listSaveError: undefined,
      applyToListDialogVisible: true
    });
    sp.web.lists.getById(this.state.selectedList)
      .fields.getByInternalNameOrTitle(this.state.selectedField).update({
        CustomFormatter: this.props.editorString
      })
      .then(()=>{
        this.setState({
          listIsApplying: false,
          applyToListDialogVisible: false,
          activeSaveMethod: saveMethod.ListField
        });
      })
      .catch((error:any) => {
        this.setState({
          listIsApplying: false,
          listSaveError: strings.ListField_SaveError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message,
          activeSaveMethod: undefined
        });
      });
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterEditorCommandsProps{
	return {
    context: state.context,
    wizardTabVisible: state.ui.tabs.wizardTabVisible,
    editorString: state.code.editorString,
    fieldName: state.data.columns[0].name,
    fieldType: state.data.columns[0].type,
    viewTab: state.ui.tabs.viewTab,
    saveDetailsFromLoad: state.ui.saveDetails,
    jsomLoaded: state.context.jsomLoaded
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterEditorCommandsProps>): IColumnFormatterEditorCommandsProps{
	return {
    changeUIState: (state:uiState) => {
      dispatch(changeUIState(state));
    },
    disconnectWizard: () => {
      dispatch(disconnectWizard());
    },
    loadedJSOM: (jsomLoaded:boolean) => {
      dispatch(loadedJSOM(jsomLoaded));
    }
	};
}

export const ColumnFormatterEditorCommands = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterEditorCommands_);