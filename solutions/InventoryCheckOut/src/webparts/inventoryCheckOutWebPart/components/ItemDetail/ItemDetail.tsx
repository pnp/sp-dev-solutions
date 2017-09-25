// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { css, Label, PrimaryButton, CommandButton, Button, ButtonType } from 'office-ui-fabric-react';
import IItemDetailProps from './IItemDetailProps';
import style from './ItemDetail.module.scss';

export default class ItemDetail extends React.Component<IItemDetailProps, any>{
    constructor(props: IItemDetailProps) {
        super(props);
    }

    private _handleBackClick() {
        this.props.onBackClickEvent(this.props.currentItem);
    }
    private _handleEditClick() {
        this.props.onEditClickEvent(this.props.currentItem);
    }
    private _handleDeleteClick() {
        this.props.onDeleteClickEvent(this.props.currentItem);
    }
    private _handleCreateCheckOutClickEvent() {
        this.props.onCreateCheckOutClickEvent(this.props.currentItem);
    }
    private _handleoCheckInClickEvent() {
        this.props.onCheckMyItemButtonClick(this.props.myOpenCheckOut);
    }
    public render(): JSX.Element {
        let currentItem = this.props.currentItem;
        
        return (
            <div className={style.itemdetail}>
                <div className={"ms-Grid"}>
                    <div className={"ms-Grid-row"}>
                        <div className={"ms-Grid-col  ms-u-lg8"}>
                            <Button
                                    buttonType={ButtonType.icon}
                                    icon='ChromeBack'
                                    className={style.backButton}
                                    onClick={this._handleBackClick.bind(this)}
                                />

                            <span className={style.title}>{currentItem ? currentItem.title : ""}</span>
                        </div>
                        <div className={"ms-Grid-col  ms-u-lg4"}>
                            <div className={style.control}>
                                <div className={style.buttonBar}>
                                    <Button
                                        buttonType={ButtonType.icon}
                                        icon='Delete'
                                        onClick={this._handleDeleteClick.bind(this)}
                                    />
                                    <Button
                                        buttonType={ButtonType.icon}
                                        icon='Edit'
                                        onClick={this._handleEditClick.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>

                <div className={style.details}>
                    <div className={style.desc}> {currentItem ? currentItem.description : ""}</div>

                    <div className={`ms-Grid`}>
                        <div className={`ms-Grid-row`}>
                            <div className={`ms-Grid-col ms-u-lg4`}>Location</div>
                            <div className={`ms-Grid-col ms-u-lg6`}>{currentItem ? currentItem.location : ""}</div>
                        </div>
                        <div className={`ms-Grid-row`}>
                            <div className={`ms-Grid-col ms-u-lg4`}>Total Quantity</div>
                            <div className={`ms-Grid-col ms-u-lg6`}>{currentItem ? currentItem.totalQuantity : ""}</div>
                        </div>
                        <div className={`ms-Grid-row`}>
                            <div className={`ms-Grid-col ms-u-lg4`}>Available</div>
                            <div className={`ms-Grid-col ms-u-lg6`}>{this.props.available}</div>
                        </div>
                    </div>
                   
                    <div className={style.btn}>
                        <div hidden={this.props.myOpenCheckOut == null} >
                            <Button
                                    buttonType={ButtonType.default}
                                    text="Check my item in"
                                    onClick={this._handleoCheckInClickEvent.bind(this)}
                                />
                        </div>
                        <div hidden={this.props.available==0}>
                            <Button
                                buttonType={ButtonType.default}
                                text="New check-out"
                                onClick={this._handleCreateCheckOutClickEvent.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}