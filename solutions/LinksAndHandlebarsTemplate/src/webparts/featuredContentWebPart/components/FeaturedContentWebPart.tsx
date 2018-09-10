import * as React from 'react';
import {
  CommandButton
} from 'office-ui-fabric-react/lib/Button';
import styles from './FeaturedContentWebPart.module.scss';
import * as strings from 'featuredContentWebPartStrings';
import { IFeaturedContentWebPartProps } from './IFeaturedContentWebPartProps';
import { IFeaturedContentState } from './IFeaturedContentState';
import FeaturedContentFactory from './layouts/FeaturedContentFactory';
import { LinkType } from "../../../components/LinkPickerPanel/ILinkPickerPanelProps";
import LinkPickerPanel from "../../../components/LinkPickerPanel/LinkPickerPanel";
import ElemUtil from "../../../utilities/element/elemUtil";

export default class FeaturedContentWebPart extends React.Component<IFeaturedContentWebPartProps, IFeaturedContentState> {
  constructor(props){
    super(props);
    this.state={
      isLinkPanelOpen: false,
      isSiteSelected: false,
      linkEntered: "",
      linkValid: false
    };
  }

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

  public setTitle(event){
    this.props.setTitle(event.target.value);
  }

  public addBox(event){
    this.setState(
      {
        isLinkPanelOpen:false,
        isSiteSelected: true, 
        linkValid:false,
        linkEntered: ""          
      }
    );
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

  public render(): React.ReactElement<IFeaturedContentWebPartProps> {
    return this.props.usesListMode ? this.renderAdvancedWebPart() : this.renderBasicWebPart();
  }

  private linkPickerPanel: LinkPickerPanel;

  public openLinkPicker(event){
    this.linkPickerPanel.pickLink().then(({name, url}) => {
      this.props.setUrl(url, name);
    });
  }

  public createNewItemFromLink(event){
    this.props.resetActiveIndex();
    this.openLinkPicker(event);
  }

  public renderBasicWebPart():JSX.Element{
    return (
      <div>
        <div className={styles["webpart-header"]}>
          { this.props.isEdit && <textarea onChange={this.setTitle.bind(this)} className={styles["edit"]} placeholder={strings.TitlePlaceholder} aria-label="Add a title">{this.props.title}</textarea> }
          { !this.props.isEdit && this.props.title && <span className={styles["view"]}>{this.props.title}</span> }          
        </div>
        { this.props.isEdit &&
          <CommandButton className={styles["new-item"]} iconProps={{iconName:'Add'}} onClick={this.addBox.bind(this)}>{strings.AddNewButtonText}</CommandButton>
         }
        { FeaturedContentFactory.getLayout(this.props.layoutMode,false,this).render(this.props.featuredContentItems,this.props.isEdit) }
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
        { FeaturedContentFactory.getLayout(this.props.layoutMode,true,this).render(this.props.links,this.props.isEdit) }
      </div>
    );
  }
}
