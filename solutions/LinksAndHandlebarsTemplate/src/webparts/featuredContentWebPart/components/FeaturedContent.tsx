import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Logger, LogLevel } from "@pnp/logging";

import styles from './FeaturedContentWebPart.module.scss';
import * as strings from 'featuredContentWebPartStrings';
import { IFeaturedItem } from '../FeaturedContentWebPart';
import { FeaturedContentLayout } from './layouts/FeaturedContentFactory';
import FeaturedContentFactory from './layouts/FeaturedContentFactory';
import { LinkType } from "../../../components/LinkPickerPanel/ILinkPickerPanelProps";
import LinkPickerPanel from "../../../components/LinkPickerPanel/LinkPickerPanel";
import ElemUtil from "../../../utilities/element/elemUtil";
import { DisplayMode } from '@microsoft/sp-core-library';
import WebPartTitle from "../../../components/WebPartTitle/WebPartTitle";

export interface IFeaturedContentProps {
  featuredContentItems: IFeaturedItem[];
  links: any[];
  isEdit: boolean;
  usesListMode: boolean;
  title: string;
  setTitle: (title: string) => void;
  setUrl: (url: string, name?: string) => void;
  editItem: (index: number) => void;
  deleteItem: (index: number) => void;
  rearrangeItems: (newOrder: number[]) => void;
  resetActiveIndex: () => void;
  advancedCamlQuery: string;
  advancedCamlData: string;
  context: IWebPartContext;
  layoutMode: FeaturedContentLayout;
  displayMode: DisplayMode;
}

export interface IFeaturedContentState {
  isLinkPanelOpen: boolean;
  isSiteSelected: boolean;
  linkValid: boolean;
  linkEntered: string;
}

export default class FeaturedContent extends React.Component<IFeaturedContentProps, IFeaturedContentState> {
  private LOG_SOURCE = "FeaturedContent";

  constructor(props) {
    super(props);
    this.state = {
      isLinkPanelOpen: false,
      isSiteSelected: false,
      linkEntered: "",
      linkValid: false
    };
  }

  private _dragElement: any;
  public get dragElement(): any {
    return this._dragElement;
  }
  public set dragElement(v: any) {
    this._dragElement = v;
  }

  private _mouseTarget: any;
  public get mouseTarget(): any {
    return this._mouseTarget;
  }
  public set mouseTarget(v: any) {
    this._mouseTarget = v;
  }

  public setTitle(event) {
    this.props.setTitle(event.target.value);
  }

  public addBox(event) {
    this.setState(
      {
        isLinkPanelOpen: false,
        isSiteSelected: true,
        linkValid: false,
        linkEntered: ""
      }
    );
    this.props.editItem(-1);
  }

  public editBox(event) {
    try {
      event.stopPropagation();
      event.preventDefault();
      this.props.editItem(ElemUtil.closest(event.target, '[data-index]').getAttribute("data-index"));

    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (editBox)`, LogLevel.Error);
    }
    return false;
  }

  public deleteBox(event) {
    try {
      event.stopPropagation();
      event.preventDefault();
      if (confirm(strings.DeleteItemConfirmMessage))
        this.props.deleteItem(ElemUtil.closest(event.target, '[data-index]').getAttribute("data-index"));
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (deleteBox)`, LogLevel.Error);
    }
    return false;
  }

  public mouseDragDown(event) {
    this.mouseTarget = event.target;
  }

  public startDrag(event) {
    try {
      event.stopPropagation();
      if (event.currentTarget.querySelector('#drag-handle').contains(this.mouseTarget)) {
        this.dragElement = event.currentTarget;
        event.dataTransfer.eventAllowed = "move";
        event.dataTransfer.setData('text/plan', 'drag-handle');
      }
      else {
        event.preventDefault();
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (startDrag)`, LogLevel.Error);
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

  public endDrag(event) {
    try {
      const indexArr: number[] = [];
      const currentElements = ElemUtil.closest(event.currentTarget, '[data-reactroot]').querySelectorAll('[data-index]');
      currentElements.forEach((element) => { indexArr.push(parseInt(element.getAttribute('data-index'))); });
      this.props.rearrangeItems(indexArr);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (endDrag)`, LogLevel.Error);
    }
  }

  public moveItem(event) {
    try {
      if (this.isbefore(this.dragElement, ElemUtil.closest(event.target, '[data-index]'))) {
        ElemUtil.closest(event.target, '[data-index]').parentNode.insertBefore(this.dragElement, ElemUtil.closest(event.target, '[data-index]'));
      }
      else {
        if (!this.dragElement.contains(ElemUtil.closest(event.target, '[data-index]')))
          ElemUtil.closest(event.target, '[data-index]').parentNode.insertBefore(this.dragElement, ElemUtil.closest(event.target, '[data-index]').nextSibling);
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (moveItem)`, LogLevel.Error);
    }
  }

  public render(): React.ReactElement<IFeaturedContentProps> {
    let body = (this.props.usesListMode) ? this.renderAdvancedWebPart() : this.renderBasicWebPart();
    // Insert retired web part message
    return (
      <>
        {(this.props.displayMode == DisplayMode.Edit) &&
          <div className={styles.editMode}>{strings.RetiredMessage}</div>
        }
        {body}
      </>
    );
  }

  private linkPickerPanel: LinkPickerPanel;

  public openLinkPicker(event) {
    this.linkPickerPanel.pickLink().then(({ name, url }) => {
      this.props.setUrl(url, name);
    });
  }

  public createNewItemFromLink(event) {
    this.props.resetActiveIndex();
    this.openLinkPicker(event);
  }

  public renderBasicWebPart(): JSX.Element {
    try {
      return (
        <div data-component="FeaturedContent-Basic">
          <WebPartTitle editMode={this.props.isEdit} title={this.props.title} updateTitle={this.props.setTitle} />
          {this.props.isEdit &&
            <CommandButton className={styles["new-item"]} iconProps={{ iconName: 'Add' }} onClick={this.addBox.bind(this)}>{strings.AddNewButtonText}</CommandButton>
          }
          {FeaturedContentFactory.getLayout(this.props.layoutMode, false, this).render(this.props.featuredContentItems, this.props.isEdit)}
          {this.props.isEdit &&
            <LinkPickerPanel
              webPartContext={this.props.context}
              className={styles["link-picker"]}
              webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
              linkType={LinkType.any}
              ref={(ref) => { this.linkPickerPanel = ref; }} />
          }
        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (renderBasicWebPart)`, LogLevel.Error);
    }
  }

  public renderAdvancedWebPart(): JSX.Element {
    try {
      return (
        <div data-component="FeaturedContent-Advanced">
          <WebPartTitle editMode={this.props.isEdit} title={this.props.title} updateTitle={this.props.setTitle} />
          {FeaturedContentFactory.getLayout(this.props.layoutMode, true, this).render(this.props.links, this.props.isEdit)}
        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (renderAdvancedWebPart)`, LogLevel.Error);
    }
  }
}
