import * as React from 'react';
import { css, Label, PrimaryButton, CommandButton, FocusZone, FocusZoneDirection, List } from 'office-ui-fabric-react';
import RawHtml from "react-raw-html";
import IMyCRItemProps from './IMyCRItemProps';
import styles from './MyCRItem.module.scss';

export default class MyCRItem extends React.Component<IMyCRItemProps, any> {
    constructor(props: IMyCRItemProps) {
        super(props);
    }
    public render(): JSX.Element {
        const mycrcontentgridrow = css('ms-Grid-row', styles.mycrcontentgridrow);
        return (
            <div className={mycrcontentgridrow} onClick={this._handleEditClick.bind(this)}>
                <div className={`ms-Grid-col ${styles.mycritemidcell} ms-u-hiddenSm ms-u-hiddenMd ms-u-lg1`}>{this.props.item.id}</div>
                <div className={`ms-Grid-col ${styles.mycritemidcell} ms-u-sm-12 ms-u-md9 ms-u-lg9`}>
                    <div className={mycrcontentgridrow}>
                        {this.props.item.title}
                    </div>
                    <div className={mycrcontentgridrow}>
                        <RawHtml.div>{this.props.item.statusupdates}</RawHtml.div>
                    </div>
                </div>
                <div className={`ms-Grid-col ${styles.mycritemidcell} ms-u-sm-12 ms-u-md3 ms-u-lg2`}>{this.props.item.status}</div>
            </div >
        );
    }

    private _handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.itemEditIconClickCallback(this.props.item);
        event.preventDefault();
    }
}

