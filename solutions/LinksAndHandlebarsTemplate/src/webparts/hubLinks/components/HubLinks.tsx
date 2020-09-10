import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { CommandButton } from 'office-ui-fabric-react';
import { Logger, LogLevel } from "@pnp/logging";

import styles from './HubLinks.module.scss';
import * as strings from 'hubLinksStrings';
import { HubLinksLayout } from './layouts/HubLinksLayout';
import HubLinksFactory from './layouts/HubLinksFactory';
import LinkPickerPanel from '../../../components/LinkPickerPanel/LinkPickerPanel';
import { LinkType } from '../../../components/LinkPickerPanel/ILinkPickerPanelProps';
import ElemUtil from "../../../utilities/element/elemUtil";
import WebPartTitle from "../../../components/WebPartTitle/WebPartTitle";

export interface IHubLinksProps {
  defaultExpand: boolean;
  links: any[];
  title: string;
  setTitle: any;
  setUrl: Function;
  isEdit: boolean;
  hubLinksItems: any[];
  usesListMode: boolean;
  editItem: Function;
  deleteItem: Function;
  rearrangeItems: Function;
  setGroup: Function;
  resetActiveIndex: Function;
  advancedCamlData: string;
  context: IWebPartContext;
  layoutMode: HubLinksLayout;
  showDescription: boolean;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

export interface IHubLinksState {
}

export default class HubLinks extends React.Component<IHubLinksProps, IHubLinksState> {
  private LOG_SOURCE = "HubLinks";

  constructor(props) {
    super(props);
  }

  /* Manage drag and drop sorting feature */
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
    try {
      if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
          if (cur === b) {
            return true;
          }
        }
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (isbefore)`, LogLevel.Error);
    }
    return false;
  }

  public endDrag(event) {
    try {
      const indexArr: number[] = [];
      //If Grouped Layout, update GroupBy field if group has changed
      if (this.props.layoutMode == HubLinksLayout.GroupedListLayout) {
        const currentGroup = ElemUtil.closest(event.currentTarget, '[data-group]');
        const groupProp = currentGroup.getAttribute('data-group');
        if (groupProp.length > 0) {
          const group = groupProp.split("-")[1];
          if (group.length > 0)
            this.props.setGroup(event.currentTarget.getAttribute('data-index'), group);
        }
      }
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

  public toggleGroup(event) {
    try {
      if (event.target.tagName === 'A') return;
      event.stopPropagation();
      event.preventDefault();
      const element = ElemUtil.closest(event.target, "[data-group]");
      if (element.getAttributeNode('data-expanded')) {
        element.removeAttribute('data-expanded');
      } else {
        element.setAttribute('data-expanded', "");
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (toggleGroup)`, LogLevel.Error);
    }
  }

  public addBox(event) {
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

  // ** Event handlers for link picker **
  private linkPickerPanel: LinkPickerPanel;
  // Open the link picker - called from onClick of Change (link) button
  public openLinkPicker(event: any, currentUrl: string = "") {

    this.linkPickerPanel.pickLink(currentUrl).then(({ name, url }) => {
      this.props.setUrl(url, name);
    });

  }

  public render(): React.ReactElement<IHubLinksProps> {
    try {
      return this.props.usesListMode ? this.renderAdvancedWebPart() : this.renderBasicWebPart();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }

  public renderBasicWebPart(): JSX.Element {
    try {
      return (
        <div data-component="HubLinks-Basic" >
          <WebPartTitle editMode={this.props.isEdit} title={this.props.title} updateTitle={this.props.setTitle} />
          {this.props.isEdit &&
            <CommandButton iconProps={{ iconName: 'Add' }} onClick={this.addBox.bind(this)}>{strings.AddNewButtonText}</CommandButton>
          }
          {HubLinksFactory.getLayout(this.props.layoutMode, false, this).render(this.props.hubLinksItems, this.props.isEdit)}
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
      return null;
    }
  }

  public renderAdvancedWebPart(): JSX.Element {
    try {
      return (
        <div data-component="HubLinks-Advanced">
          <WebPartTitle editMode={this.props.isEdit} title={this.props.title} updateTitle={this.props.setTitle} />
          {HubLinksFactory.getLayout(this.props.layoutMode, true, this).render(this.props.links, this.props.isEdit)}
        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (renderAdvancedWebPart)`, LogLevel.Error);
      return null;
    }
  }
}