import * as React from 'react';
import * as Update from 'immutability-helper';
import { css, Label, PrimaryButton, CommandButton, FocusZone, FocusZoneDirection, List } from 'office-ui-fabric-react';
import IMyCRListProps from './IMyCRListProps';
import styles from './MyCRList.module.scss';
import { IMyChangeRequestItem } from '../../../../libraries/index';
import MyCRItem from '../Item/MyCRItem';

export default class MyCRList extends React.Component<IMyCRListProps, any> {
    constructor(props: IMyCRListProps) {
        super(props);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    public render(): JSX.Element {
        const mycrheadergrid = css('ms-Grid', styles.mycrheadergrid);
        return (
            <div className={styles.mychangerequestlist}>
                <div className={mycrheadergrid}>
                    <div className={`ms-Grid-row ${styles.mycrlistheader}`}>
                        <div className={`ms-Grid-col ${styles.mycrlistcol} ms-u-hiddenSm ms-u-hiddenMd ms-u-lg1`}>ID</div>
                        <div className={`ms-Grid-col ${styles.mycrlistcol} ms-u-sm12 ms-u-md9 ms-u-lg9`}>Title / Update</div>
                        <div className={`ms-Grid-col ${styles.mycrlistcolend} ms-u-hiddenSm ms-u-md3 ms-u-lg2`}>Status</div>
                    </div>
                    {
                        this.props.items.map( (item, i) =>
                        {
                            return <MyCRItem key={item.id}
                                    item={item}
                                   itemEditIconClickCallback={this.props.itemEditIconClickCallback} />;
       
                        })
                    }
                </div>
            </div>
        );
    }

    private _onRenderCell(item: IMyChangeRequestItem, index: number) {
        return (
            <MyCRItem key={item.id}
                item={item}
                itemEditIconClickCallback={this.props.itemEditIconClickCallback} />
        );
    }
}
