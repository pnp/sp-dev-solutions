import * as React from 'react';
import styles from './HubLinks.module.scss';
import * as strings from 'hubLinksStrings';
import { IHubLinksProps } from './IHubLinksProps';
import { IHubLinksState } from './IHubLinksState';
import { HubLinksLayout } from './layouts/HubLinksLayout';
import HubLinksFactory  from './layouts/HubLinksFactory';
import { CommandButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import LinkPickerPanel from '../../../components/LinkPickerPanel/LinkPickerPanel';
import { LinkType } from '../../../components/LinkPickerPanel/ILinkPickerPanelProps';
import ElemUtil from "../../../utilities/element/elemUtil";

export default class HubLinks extends React.Component<IHubLinksProps, IHubLinksState> {
  constructor(props){
    super(props);
  }

  /* Manage drag and drop sorting feature */
  private _dragElement : any;
  public get dragElement() : any {
    return this._dragElement;
  }
  public set dragElement(v : any) {
    this._dragElement = v;
  }
  
  private _mouseTarget : any;
  public get mouseTarget() : any {
    return this._mouseTarget;
  }
  public set mouseTarget(v : any) {
    this._mouseTarget = v;
  }

  public mouseDragDown(event){
    this.mouseTarget = event.target;
  }

  public startDrag(event){
    event.stopPropagation();
    if(event.currentTarget.querySelector('#drag-handle').contains(this.mouseTarget)){
      this.dragElement = event.currentTarget;
      event.dataTransfer.eventAllowed="move";
      event.dataTransfer.setData('text/plan','drag-handle');
    }
    else{
      event.preventDefault();
    }
  }

  public isbefore(a, b) {
    if (a.parentNode == b.parentNode) {
      for (var cur = a; cur; cur = cur.previousSibling) {
        if (cur === b) { 
          return true;
        }
      }
    }
    return false;
  } 

  public endDrag(event){
    const indexArr:number[] = [];
    //If Grouped Layout, update GroupBy field if group has changed
    if(this.props.layoutMode == HubLinksLayout.GroupedListLayout){
      const currentGroup = ElemUtil.closest(event.currentTarget,'[data-group]');
      const groupProp = currentGroup.getAttribute('data-group');
      if(groupProp.length > 0){
        const group = groupProp.split("-")[1];
        if(group.length > 0)
          this.props.setGroup(event.currentTarget.getAttribute('data-index'), group);
      }
    }
    const currentElements = ElemUtil.closest(event.currentTarget,'[data-reactroot]').querySelectorAll('[data-index]');
    currentElements.forEach((element)=>{indexArr.push(parseInt(element.getAttribute('data-index')));});
    this.props.rearrangeItems(indexArr);
  }

  public moveItem(event){
    if (this.isbefore(this.dragElement, ElemUtil.closest(event.target,'[data-index]'))) {
      ElemUtil.closest(event.target,'[data-index]').parentNode.insertBefore(this.dragElement, ElemUtil.closest(event.target,'[data-index]'));
    }
    else {
      if(!this.dragElement.contains(ElemUtil.closest(event.target,'[data-index]')))
        ElemUtil.closest(event.target,'[data-index]').parentNode.insertBefore(this.dragElement, ElemUtil.closest(event.target,'[data-index]').nextSibling);
    }
  }
  
  public toggleGroup(event){
    if(event.target.tagName === 'A') return;
    event.stopPropagation();
    event.preventDefault();
    const element = ElemUtil.closest(event.target,"[data-group]");
    if(element.getAttributeNode('data-expanded')){
      element.removeAttribute('data-expanded');
    }else{
      element.setAttribute('data-expanded', "");
    }
  }

  public setTitle(event){
    this.props.setTitle(event.target.value);
  }

  public addBox(event){
    this.props.editItem(-1);
  }

  public editBox(event){
    event.stopPropagation();
    event.preventDefault();
    this.props.editItem(ElemUtil.closest(event.target,'[data-index]').getAttribute("data-index"));
    return false;
  }

  public deleteBox(event){
    event.stopPropagation();
    event.preventDefault();
    if(confirm(strings.DeleteItemConfirmMessage))
      this.props.deleteItem(ElemUtil.closest(event.target,'[data-index]').getAttribute("data-index"));
    return false;
  }

  // ** Event handlers for link picker **
  private linkPickerPanel: LinkPickerPanel;
  // Open the link picker - called from onClick of Change (link) button
  public openLinkPicker(event: any, currentUrl: string = ""){

    this.linkPickerPanel.pickLink(currentUrl).then(({name, url}) => {
      this.props.setUrl(url, name);
    });

  }

  public render(): React.ReactElement<IHubLinksProps> {
    return this.props.usesListMode ? this.renderAdvancedWebPart() : this.renderBasicWebPart();
  }

  public renderBasicWebPart():JSX.Element{
    return (
      <div>
        <div className={styles["webpart-header"]}>
          { this.props.isEdit && <textarea onChange={this.setTitle.bind(this)} className={styles["edit"]} placeholder={strings.TitlePlaceholder} aria-label="Add a title">{this.props.title}</textarea> }
          { !this.props.isEdit && this.props.title && <span className={styles["view"]}>{this.props.title}</span> }          
        </div>
        { this.props.isEdit &&
          <CommandButton iconProps={{iconName:'Add'}} onClick={this.addBox.bind(this)}>{strings.AddNewButtonText}</CommandButton>
        }
        { HubLinksFactory.getLayout(this.props.layoutMode,false,this).render(this.props.hubLinksItems,this.props.isEdit) }
        { this.props.isEdit &&
        <LinkPickerPanel
            webPartContext={this.props.context}
            className={styles["link-picker"]}
            webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
            linkType={ LinkType.any }
            ref={ (ref) => { this.linkPickerPanel = ref; } } />
        }
      </div>
    );
  }

  public renderAdvancedWebPart():JSX.Element{
    return (
      <div>
        <div className={styles["webpart-header"]}>
          { this.props.isEdit && <textarea onChange={this.setTitle.bind(this)} className={styles["edit"]} placeholder={strings.TitlePlaceholder} aria-label="Add a title">{this.props.title}</textarea> }
          { !this.props.isEdit && this.props.title && <span className={styles["view"]}>{this.props.title}</span> }          
        </div>
        { HubLinksFactory.getLayout(this.props.layoutMode,true,this).render(this.props.links,this.props.isEdit) }
      </div>
    );
  }  
}