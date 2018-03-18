import { sp } from '@pnp/sp';
import * as strings from 'ColumnFormatterWebPartStrings';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { textForType, typeForTypeAsString } from '../helpers/ColumnTypeHelpers';
import { launchEditor, launchEditorWithCode } from '../state/Actions';
import { columnTypes, IApplicationState, IContext, ISaveDetails, saveMethod } from '../state/State';
import styles from './ColumnFormatter.module.scss';
import { FileUploader } from './FileUploader';
import { getWizardByName, getWizardsForColumnType, IWizard, standardWizardStartingCode } from './Wizards/WizardCommon';

export enum welcomeStage {
  start,
  new,
  open,
  upload,
  loadFromList,
  loadFromSiteColumn,
  loadFromLibrary
}

export interface IColumnFormatterWelcomeProps {
  context?: IContext;
  uiHeight?: number;
  launchEditor?: (wizardName:string, colType:columnTypes) => void;
  launchEditorWithCode?: (wizardName:string, colType:columnTypes, editorString:string, validationErrors:Array<string>, saveDetails: ISaveDetails) => void;
}


export interface IColumnFormatterWelcomeState {
  stage: welcomeStage;
  columnTypeForNew?: columnTypes;
  useWizardForNew: boolean;
  ChoosenWizardName?: string;
  loadChoiceForOpen?: string;
  columnTypeForOpen?: columnTypes;
  fileChoiceForOpen?: string;
  siteColumnsLoaded: boolean;
  siteColumns: Array<any>;
  selectedSiteColumnGroup?: string;
  selectedSiteColumn?: string;
  loadingFromSiteColumn: boolean;
  loadFromSiteColumnError?: string;
  listsLoaded: boolean;
  lists: Array<any>;
  selectedList?: string;
  selectedField?: string;
  loadingFromList: boolean;
  loadFromListError?: string;
  librariesLoaded: boolean;
  libraries: Array<any>;
  selectedLibraryUrl?: string;
  libraryFolderPath: string;
  libraryFileName: string;
  loadingFromLibrary: boolean;
  loadFromLibraryError?: string;
}

class ColumnFormatterWelcome_ extends React.Component<IColumnFormatterWelcomeProps, IColumnFormatterWelcomeState> {

  constructor(props:IColumnFormatterWelcomeProps) {
    super(props);

    this.state = {
      stage: welcomeStage.start,
      useWizardForNew: true,
      loadChoiceForOpen: 'list',
      listsLoaded: false,
      lists: new Array<any>(),
      loadingFromList: false,
      siteColumnsLoaded: false,
      siteColumns: new Array<any>(),
      loadingFromSiteColumn: false,
      librariesLoaded: false,
      libraries: new Array<any>(),
      libraryFolderPath: '',
      libraryFileName: strings.WizardDefaultField + '.json',
      loadingFromLibrary: false
    };
  }

  public render(): React.ReactElement<IColumnFormatterWelcomeProps> {

    //TEMP (helpful for testing and skipping the welcome altogether)
    //this.props.launchEditor(undefined,columnTypes.text);
    //this.props.launchEditor('Donut', columnTypes.number);
    //this.props.launchEditor('Severity', columnTypes.text);
    //this.props.launchEditor('Start Flow', columnTypes.text);

    return (
      <div className={styles.welcome} style={{height: this.props.uiHeight + 'px'}}>
        <div className={styles.welcomeBox}>

          {this.state.stage == welcomeStage.start && (
            <div>
              <div className={styles.header}>
                <h1>{strings.Welcome_Title}</h1>
                <span>{strings.Welcome_SubTitle}</span>
              </div>
              <div className={styles.startButtons}>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.new);}}>
                  <div className={styles.icon}>
                    <Icon iconName='Filters'/>
                  </div>
                  <div className={styles.words}>
                    <h2>{strings.Welcome_NewHeader}</h2>
                    <span>{strings.Welcome_NewDescription}</span>
                  </div>
                </div>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.open);}}>
                  <div className={styles.icon}>
                    <Icon iconName='OpenFolderHorizontal'/>
                  </div>
                  <div className={styles.words}>
                    <h2>{strings.Welcome_OpenHeader}</h2>
                    <span>{strings.Welcome_OpenDescription}</span>
                  </div>
                </div>
              </div>
            </div>
          )}


          {this.state.stage == welcomeStage.new && (
            <div className={styles.newForm}>
              <div className={styles.columnType}>
                <Label required={true}>{strings.Welcome_ColumnType}</Label>
                <Dropdown
                 selectedKey={this.state.columnTypeForNew}
                 onChanged={this.onChangeColumnTypeForNew}
                 options={[
                   {key: columnTypes.choice, text: textForType(columnTypes.choice)},
                   {key: columnTypes.datetime, text: textForType(columnTypes.datetime)},
                   {key: columnTypes.link, text: textForType(columnTypes.link)},
                   {key: columnTypes.lookup, text: textForType(columnTypes.lookup)},
                   {key: columnTypes.number, text: textForType(columnTypes.number)},
                   {key: columnTypes.person, text: textForType(columnTypes.person)},
                   {key: columnTypes.picture, text: textForType(columnTypes.picture)},
                   {key: columnTypes.text, text: textForType(columnTypes.text)},
                   {key: columnTypes.boolean, text: textForType(columnTypes.boolean)}
                 ]}/>
              </div>
              <ChoiceGroup
               disabled={this.state.columnTypeForNew == undefined}
               selectedKey={this.state.useWizardForNew ? 'wizard' : 'blank'}
               onChange={this.onNewStartWithChanged}
               options={[
                 {key:'wizard', text:strings.Welcome_NewWizardOption, onRenderField: (props, render) => {
                  return(
                    <div>
                      { render!(props) }
                      {this.wizardOptions()}
                    </div>
                  );
                 }},
                 {key:'blank', text:strings.Welcome_NewBlankOption}
               ]}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.Welcome_BackButton} onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.Welcome_OKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForNewClick}/>
                </div>
              </div>
            </div>
          )}


          {this.state.stage == welcomeStage.open && (
            <div className={styles.openForm}>
              <ChoiceGroup
               selectedKey={this.state.loadChoiceForOpen}
               onChange={this.onLoadChoiceForOpenChanged}
               options={[
                {key:'list', text: strings.Welcome_OpenLoadList},
                {key:'sitecolumn', text: strings.Welcome_OpenLoadSiteColumn},
                {key:'file', text: strings.Welcome_OpenLoadFile, onRenderField: (props, render) => {
                  return (
                    <div>
                      { render!(props) }
                      <div className={styles.columnType}>
                        <Label required={true}>{strings.Welcome_ColumnType}</Label>
                        <Dropdown
                         selectedKey={this.state.columnTypeForOpen}
                         onChanged={this.onChangeColumnTypeForOpen}
                         disabled={this.state.loadChoiceForOpen !== 'file'}
                         options={[
                          {key: columnTypes.choice, text: textForType(columnTypes.choice)},
                          {key: columnTypes.datetime, text: textForType(columnTypes.datetime)},
                          {key: columnTypes.link, text: textForType(columnTypes.link)},
                          {key: columnTypes.lookup, text: textForType(columnTypes.lookup)},
                          {key: columnTypes.number, text: textForType(columnTypes.number)},
                          {key: columnTypes.person, text: textForType(columnTypes.person)},
                          {key: columnTypes.picture, text: textForType(columnTypes.picture)},
                          {key: columnTypes.text, text: textForType(columnTypes.text)},
                          {key: columnTypes.boolean, text: textForType(columnTypes.boolean)}
                        ]}/>
                      </div>
                      <div className={styles.subChoice}>
                        <ChoiceGroup
                         selectedKey={this.state.fileChoiceForOpen}
                         onChange={this.onFileChoiceForOpenChanged}
                         disabled={this.state.loadChoiceForOpen !== 'file'}
                         options={[
                           {key:'library', text: strings.Welcome_OpenLoadFileLibrary},
                           {key:'upload', text: strings.Welcome_OpenLoadFileUpload}
                         ]}/>
                      </div>
                    </div>
                   );
                 }}
               ]}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.Welcome_BackButton} onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.Welcome_NextButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForOpenClick}/>
                </div>
              </div>
            </div>
          )}


          {this.state.stage == welcomeStage.upload && (
            <div>
              <FileUploader onTextLoaded={this.onFileTextReceived}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.Welcome_BackButton} onClick={() => {this.gotoStage(welcomeStage.open);}}/>
                </div>
              </div>
            </div>
          )}


          {this.state.stage == welcomeStage.loadFromList && (
            <div>
              {!this.props.context.isOnline && (
                <span>{strings.FeatureUnavailableFromLocalWorkbench}</span>
              )}
              {!this.state.listsLoaded && this.props.context.isOnline && !this.state.loadingFromList && this.state.loadFromListError == undefined && (
                <Spinner size={SpinnerSize.large} label={strings.ListField_LoadingLists}/>
              )}
              {this.state.listsLoaded && this.props.context.isOnline && !this.state.loadingFromList && this.state.loadFromListError == undefined && (
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
              {this.state.loadingFromList && this.state.loadFromListError == undefined &&(
                <Spinner size={SpinnerSize.large} label={strings.ListField_LoadingFromList}/>
              )}
              {this.state.loadFromListError !== undefined && (
                <span className={styles.errorMessage}>{this.state.loadFromListError}</span>
              )}
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.Welcome_BackButton} onClick={() => {this.gotoStage(welcomeStage.open);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.Welcome_OKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForLoadFromListClick}/>
                </div>
              </div>
            </div>
          )}


          {this.state.stage == welcomeStage.loadFromSiteColumn && (
            <div>
              {!this.props.context.isOnline && (
                <span>{strings.FeatureUnavailableFromLocalWorkbench}</span>
              )}
              {!this.state.siteColumnsLoaded && this.props.context.isOnline && !this.state.loadingFromSiteColumn && this.state.loadFromSiteColumnError == undefined && (
                <Spinner size={SpinnerSize.large} label={strings.SiteColumn_LoadingSiteColumns}/>
              )}
              {this.state.siteColumnsLoaded && this.props.context.isOnline && !this.state.loadingFromSiteColumn && this.state.loadFromSiteColumnError == undefined && (
                <div>
                  <Dropdown
                   label={strings.SiteColumn_Group}
                   selectedKey={this.state.selectedSiteColumnGroup}
                   onChanged={(item:IDropdownOption)=> {this.setState({selectedSiteColumnGroup: item.key.toString(), selectedSiteColumn: undefined});}}
                   required={true}
                   options={this.siteColumnGroupsToOptions()} />
                  <Dropdown
                   label={strings.SiteColumn_Field}
                   selectedKey={this.state.selectedSiteColumn}
                   disabled={this.state.selectedSiteColumnGroup == undefined}
                   onChanged={(item:IDropdownOption)=> {this.setState({selectedSiteColumn: item.key.toString()});}}
                   required={true}
                   options={this.siteColumnsToOptions()} />
                </div>
              )}
              {this.state.loadingFromSiteColumn && this.state.loadFromSiteColumnError == undefined &&(
                <Spinner size={SpinnerSize.large} label={strings.SiteColumn_LoadingFromSiteColumn}/>
              )}
              {this.state.loadFromSiteColumnError !== undefined && (
                <span className={styles.errorMessage}>{this.state.loadFromSiteColumnError}</span>
              )}
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.Welcome_BackButton} onClick={() => {this.gotoStage(welcomeStage.open);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.Welcome_OKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForLoadFromSiteColumnClick}/>
                </div>
              </div>
            </div>
          )}


          {this.state.stage == welcomeStage.loadFromLibrary && (
            <div>
              {!this.props.context.isOnline && (
                <span>{strings.FeatureUnavailableFromLocalWorkbench}</span>
              )}
              {!this.state.librariesLoaded && this.props.context.isOnline && !this.state.loadingFromLibrary && this.state.loadFromLibraryError == undefined && (
                <Spinner size={SpinnerSize.large} label={strings.Library_LoadingLibraries}/>
              )}
              {this.state.librariesLoaded && this.props.context.isOnline && !this.state.loadingFromLibrary && this.state.loadFromLibraryError == undefined && (
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
              {this.state.loadingFromLibrary && this.state.loadFromLibraryError == undefined &&(
                <Spinner size={SpinnerSize.large} label={strings.Library_LoadingFromLibrary}/>
              )}
              {this.state.loadFromLibraryError !== undefined && (
                <span className={styles.errorMessage}>{this.state.loadFromLibraryError}</span>
              )}
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.Welcome_BackButton} onClick={() => {this.gotoStage(welcomeStage.open);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.Welcome_OKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForLoadFromLibraryClick}/>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  @autobind
  private gotoStage(stage:welcomeStage): void {
    this.setState({
      stage
    });
  }

  private okButtonEnabled(): boolean {
    switch(this.state.stage) {
      case welcomeStage.new:
        return (
          this.state.columnTypeForNew !== undefined &&
          (!this.state.useWizardForNew || (this.state.useWizardForNew && this.state.ChoosenWizardName !== undefined))
        );
      case welcomeStage.open:
        return (
          this.state.loadChoiceForOpen == 'list' ||
          this.state.loadChoiceForOpen == 'sitecolumn' ||
          (this.state.loadChoiceForOpen == 'file' && this.state.columnTypeForOpen !== undefined && this.state.fileChoiceForOpen !== undefined)
        );
      case welcomeStage.loadFromList:
        return (
          this.props.context.isOnline && this.state.selectedList !== undefined &&
            this.state.selectedField !== undefined && this.state.loadFromListError == undefined
        );
      case welcomeStage.loadFromSiteColumn:
        return (
          this.props.context.isOnline && this.state.selectedSiteColumnGroup !== undefined &&
            this.state.selectedSiteColumn !== undefined && this.state.loadFromSiteColumnError == undefined
        );
      case welcomeStage.loadFromLibrary:
        return (
          this.props.context.isOnline && this.state.selectedLibraryUrl !== undefined &&
            this.state.libraryFileName.length > 0 && this.state.loadFromLibraryError == undefined
        );
      default:
        return false;
    }
  }

  @autobind
  private onChangeColumnTypeForNew(item: IDropdownOption): void {
    let selectedWizard: IWizard = getWizardByName(this.state.ChoosenWizardName);
    let wizardName:string = undefined;
    if(selectedWizard !== undefined && (selectedWizard.fieldTypes.length == 0 || selectedWizard.fieldTypes.indexOf(+item.key) >= 0)) {
      wizardName = selectedWizard.name;
    }
    this.setState({
      columnTypeForNew: +item.key,
      ChoosenWizardName: wizardName,
      useWizardForNew: (getWizardsForColumnType(+item.key).length > 0 && this.state.useWizardForNew)
    });
  }

  @autobind
	private onNewStartWithChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      useWizardForNew: option.key == 'wizard'
    });
	}

  private wizardOptions(): JSX.Element {

    let filteredWizards = getWizardsForColumnType(this.state.columnTypeForNew);

    let topRowItemCount:number = filteredWizards.length > 0 ? Math.ceil(filteredWizards.length/2) : 0;
    let choicesWidth:number = Math.max(topRowItemCount * 64 + topRowItemCount * 4, 204);

    return (
    <div className={styles.wizardChoiceSelection + (this.state.useWizardForNew && this.state.columnTypeForNew !== undefined ? '' : ' ' + styles.disabled)}>
      <div className={styles.wizardChoices} style={{width: choicesWidth.toString() + 'px'}}>
        {filteredWizards.map((value:IWizard, index: number) => {
          return (
            <div
             className={styles.wizardChoiceBox + (this.state.useWizardForNew && this.state.ChoosenWizardName == value.name ? ' ' + styles.choosenWizard : '')}
             title={this.state.useWizardForNew ? value.description : ''}
             onClick={()=>{this.onWizardClick(value.name);}}
             key={value.name}>
              <Icon iconName={value.iconName}/>
              <span>{value.name}</span>
            </div>
          );
        })}
        {filteredWizards.length == 0 && (
          <span className={styles.noWizards}>{strings.Welcome_NewNoTemplates}</span>
        )}
      </div>
    </div>
    );
  }

  @autobind
  private onWizardClick(wizardName:string){
    if(this.state.useWizardForNew){
      this.setState({
        ChoosenWizardName: wizardName
      });
    }
  }

  @autobind
  private onOkForNewClick(): void {
    this.props.launchEditor(this.state.useWizardForNew ? this.state.ChoosenWizardName : undefined, this.state.columnTypeForNew);
  }


  @autobind
	private onLoadChoiceForOpenChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      loadChoiceForOpen: option.key
    });
	}

  @autobind
  private onChangeColumnTypeForOpen(item: IDropdownOption): void {
    this.setState({
      columnTypeForOpen: +item.key
    });
  }

  @autobind
	private onFileChoiceForOpenChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      fileChoiceForOpen: option.key
    });
	}

  @autobind
  private onOkForOpenClick(): void {
    switch (this.state.loadChoiceForOpen) {
      case 'list':
        this.gotoLoadFromList();
        break;
      case 'sitecolumn':
        this.gotoLoadFromSiteColumn();
        break;
      default:
        if(this.state.fileChoiceForOpen == 'library'){
          this.gotoLoadFromLibrary();
        } else {
          this.gotoStage(welcomeStage.upload);
        }
        break;
    }
  }

  @autobind
	private onFileTextReceived(fileText:string) {
    this.launchEditorFromText(fileText, this.state.columnTypeForOpen || columnTypes.text);
  }

  private launchEditorFromText(text:string, type:columnTypes, loadMethod?:saveMethod): void {
    if(text == undefined || text.length == 0) {
      text = standardWizardStartingCode(type);
    }
    //TODO: Check for wizard details in file
    let validationErrors:Array<string> = new Array<string>();
    try {
      let curObj:any = JSON.parse(text);
    } catch (e) {
      validationErrors.push(e.message);
    }

    //provide details of loading (if applicable) to intialize saving
    // this makes it easier to save back to the list loaded from, etc.
    let saveDetails:ISaveDetails = {
      activeSaveMethod: loadMethod,
      libraryUrl: (loadMethod == saveMethod.Library ? this.state.selectedLibraryUrl : undefined),
      libraryFolderPath: (loadMethod == saveMethod.Library ? this.state.libraryFolderPath : ''),
      libraryFilename: (loadMethod == saveMethod.Library ? this.state.libraryFileName : ''),
      list: (loadMethod == saveMethod.ListField ? this.state.selectedList : undefined),
      field: (loadMethod == saveMethod.ListField ? this.state.selectedField : undefined),
      siteColumnGroup: (loadMethod == saveMethod.SiteColumn ? this.state.selectedSiteColumnGroup : undefined),
      siteColumn: (loadMethod == saveMethod.SiteColumn ? this.state.selectedSiteColumn : undefined)
    };
    this.props.launchEditorWithCode(undefined, type, text, validationErrors, saveDetails);
  }
  
  private gotoLoadFromList(): void {
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
              loadFromListError: strings.ListField_ListLoadError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
            });
          });
      }
    }
    this.gotoStage(welcomeStage.loadFromList);
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
          items.push({
            key: field.InternalName,
            text: field.Title + ' [' + textForType(field.Type) + ']'
          });
        }
        break;
      } 
    }
    return items;
  }

  @autobind
  private onOkForLoadFromListClick(): void {
    this.setState({
      loadingFromList: true,
      loadFromListError: undefined
    });
    sp.web.lists.getById(this.state.selectedList)
      .fields.getByInternalNameOrTitle(this.state.selectedField).select('CustomFormatter','TypeAsString','DisplayFormat').get()
      .then((data)=>{
        this.launchEditorFromText(data.CustomFormatter, typeForTypeAsString(data.TypeAsString, data.DisplayFormat), saveMethod.ListField);
        this.setState({
          loadingFromList: false,
        });
      })
      .catch((error:any) => {
        this.setState({
          loadingFromList: false,
          loadFromListError: strings.Welcome_LoadingError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
        });
      });
  }


  private gotoLoadFromSiteColumn(): void {
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
                  Type: ftype
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
              loadFromSiteColumnError: strings.SiteColumn_SiteColumnsLoadError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
            });
          });
      }
    }
    this.gotoStage(welcomeStage.loadFromSiteColumn);
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

  @autobind
  private onOkForLoadFromSiteColumnClick(): void {
    this.setState({
      loadingFromSiteColumn: true,
      loadFromSiteColumnError: undefined
    });
    sp.web.fields.getByInternalNameOrTitle(this.state.selectedSiteColumn).select('CustomFormatter','TypeAsString','DisplayFormat').get()
      .then((data)=>{
        this.launchEditorFromText(data.CustomFormatter, typeForTypeAsString(data.TypeAsString, data.DisplayFormat), saveMethod.SiteColumn);
        this.setState({
          loadingFromSiteColumn: false,
        });
      })
      .catch((error:any) => {
        this.setState({
          loadingFromSiteColumn: false,
          loadFromSiteColumnError: strings.Welcome_LoadingError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
        });
      });
  }


  private gotoLoadFromLibrary(): void {
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
              loadFromLibraryError: strings.Library_LibrariesLoadError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
            });
          });
      }
    }
    
    this.gotoStage(welcomeStage.loadFromLibrary);
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

  @autobind
  private onOkForLoadFromLibraryClick(): void {
    this.setState({
      loadingFromLibrary: true,
      loadFromLibraryError: undefined
    });
    sp.web.getFileByServerRelativeUrl(this.state.selectedLibraryUrl + (this.state.libraryFolderPath.length > 0 ? '/' + this.state.libraryFolderPath : '') + '/' + this.state.libraryFileName)
      .getText()
      .then((text:string)=>{
        this.launchEditorFromText(text, this.state.columnTypeForOpen, saveMethod.Library);
        this.setState({
          loadingFromLibrary: false
        });
      })
      .catch((error:any) => {
        this.setState({
          loadingFromLibrary: false,
          loadFromLibraryError: strings.Welcome_LoadingError + ' ' + strings.TechnicalDetailsErrorHeader + ': ' + error.message
        });
      });
  }

}

function mapStateToProps(state: IApplicationState): IColumnFormatterWelcomeProps{
	return {
    context: state.context,
    uiHeight: state.ui.height
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterWelcomeProps>): IColumnFormatterWelcomeProps{
	return {
    launchEditor: (wizardName:string, colType:columnTypes) => {
      dispatch(launchEditor(wizardName, colType));
    },
    launchEditorWithCode: (wizardName:string, colType:columnTypes, editorString:string, validationErrors:Array<string>, saveDetails:ISaveDetails) => {
      dispatch(launchEditorWithCode(wizardName, colType, editorString, validationErrors, saveDetails));
    }
	};
}

export const ColumnFormatterWelcome = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterWelcome_);