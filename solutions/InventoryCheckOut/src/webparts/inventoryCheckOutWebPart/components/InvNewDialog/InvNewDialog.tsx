// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as lodash from 'lodash';
import InvNewDialogProps from './InvNewDialogProps';
import { IInventoryItem } from "../../models/InventoryCheckOutModel";
import style from "./InvNewDialog.module.scss";
import {
  Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton,
  ChoiceGroup, TextField, Icon, autobind, Label, Dropdown
} from 'office-ui-fabric-react';

export default class InvNewDialog extends React.Component<InvNewDialogProps, any> {
  private _saveCallback: Function;
  private _validCallback: Function;
  private _locations: any;
  constructor(props: InvNewDialogProps) {
    super(props);
    this.state = {
      item: props.item ? props.item : { title: "", description: "", id: 0, location: "", totalQuantity: 1 },
      errorMessage: "",
      submitting: false
    };
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleDescriptionChange = this._handleDescriptionChange.bind(this);
    this._handleQuantityChange = this._handleQuantityChange.bind(this);
    this._handleImageUrlChange = this._handleImageUrlChange.bind(this);
    this._saveCallback = props.itemSaveOperationCallback;
    this._validCallback = props.itemValidOperationCallback;
    this._handleSelectChange = this._handleSelectChange.bind(this);
  }

  public componentWillReceiveProps(props: InvNewDialogProps) {
    if (props.isNew) {
      this.setState({
        item: { id: 0, title: "", description: "", totalQuantity: 1, location: "" }
      });
    } else {
      this.setState({
        item: props.item
      });
    }

    this._locations = lodash.split(props.location, "\n");

  }

  public render() {
    let submitting: boolean = this.state.submitting;
    let item: IInventoryItem = this.state.item;
    let errorMessage: string = this.state.errorMessage;
    let title = this.props.isNew? "New Item":item.title;
    
    return (
      <div className={style.invNewDialog}   >
        <Dialog
          isOpen={this.props.isOpen}
          type={DialogType.normal}
          isBlocking={true}
          title={title}
          containerClassName={style.invNewDialog}
        >
          <div>
            <div className={style.container}>
              <div className={style.leftcolumn}>Title:</div>
              <div className={style.rightcolumn}>
                <TextField value={item ? item.title : ""} name="title"
                  onChanged={this._handleTitleChange}
                />
              </div>
              <br />
            </div>
            <div className={style.container}>
              <div className={style.leftcolumn}>Description:</div>
              <div className={style.rightcolumn}>
                <TextField multiline={true} value={item ? item.description : ""} name="description"
                  onChanged={this._handleDescriptionChange}
                />
              </div>
              <br />
            </div>
            <div className={style.container}>
              <div className={style.leftcolumn}>Image Url:</div>
              <div className={style.rightcolumn}>
                <TextField value={item ? item.imageUrl : ""} name="image url"
                  onChanged={ this._handleImageUrlChange }
                />
              </div>
              <br />
            </div>
            <div className={style.container}>
              <div className={style.leftcolumn}>Location:</div>
              <div className={style.rightcolumn}>
                <Dropdown
                  selectedKey={item.location}
                  onChanged={this._handleSelectChange}
                  defaultSelectedKey={item.location}
                  options={this.getLocationsArray()}
                />
              </div>

              <br />
            </div>
            <div className={style.container}>
              <div className={style.leftcolumn}>Total Quantity:</div>
              <div className={style.rightcolumn}>
                <TextField value={item ? item.totalQuantity.toString() : ""} 
                    onChanged={this._handleQuantityChange}  
                    disabled={!this.props.isNew}/>
              </div>
              <br />
            </div>
          </div>
          <p className={style.error}>
            {errorMessage}
          </p>
          <DialogFooter>
            <PrimaryButton text='OK' onClick={this._saveChange.bind(this)} disabled={submitting} />
            <DefaultButton text='Cancel' onClick={this._closeDialog.bind(this)} disabled={submitting} />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _saveChange() {
    let error: string = "";
    let totalQuantity = this.state.item.totalQuantity;
    
    if (!this.isNumeric(totalQuantity) || totalQuantity < 1) {
      error = "Total Quantity must be 1 or higher.";
    }
    if (!this.state.item.title || lodash.isEmpty(this.state.item.title)) {
      error = "You can't leave title blank.";
    }
    if (error !== "") {
      this.setState({
        errorMessage: error,
        submitting: false
      });
      return;
    } else {
      this._saveCallback(this.state.item);
    }

  }

  private _closeDialog() {
    this.props.itemCancelOperationCallback();
  }

  private _handleTitleChange(newValue) {
    let item = this.state.item;

    item.title = newValue;

    this.setState({ item: item });
  }

  private _handleDescriptionChange(newValue) {
    let item = this.state.item;

    item.description = newValue;
    
    this.setState({ item: item });
  }
  
  private _handleQuantityChange(newValue) {
    let item = this.state.item;

    item.totalQuantity = newValue;
    
    this.setState({ item: item });
  }

  private _handleImageUrlChange(newValue) {
    let item = this.state.item;

    item.imageUrl = newValue;
    
    this.setState({ item: item });
  }

  private _handleSelectChange(event) {
    let item = this.state.item;
    item["location"] = event.text;
    this.setState({ item: item });
  }

  private isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  private getLocationsArray() {
    let locations = [];
    lodash.forEach(this._locations, (value) => {
      let loc = { key: value, text: value };
      locations.push(loc);
    });
    return locations;
  }
}

