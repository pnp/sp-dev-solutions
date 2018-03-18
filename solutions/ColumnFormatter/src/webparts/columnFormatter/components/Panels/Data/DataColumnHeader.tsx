import * as strings from 'ColumnFormatterWebPartStrings';
import { IButtonStyles, IconButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { iconForType, textForType } from '../../../helpers/ColumnTypeHelpers';
import { columnTypes } from '../../../state/State';
import styles from '../../ColumnFormatter.module.scss';

const iconStyles: Partial<IIconStyles> = {
	root: {
		width: "14px",
		height: "100%",
		padding: "0",
		fontSize: "12px",
		lineHeight: "21px",
		cursor: "default"
	}
};

const buttonStyles: Partial<IButtonStyles> = {
	root: {
		width: "14px",
		height: "24px",
		padding: "0"
	},
	icon: {
		fontSize: "12px",
		lineHeight: "21px"
	}
};

export interface IDataColumnHeaderProps {
	name: string;
	type: columnTypes;
	editable: boolean;
	onNameChanged: (newValue:string) => void;
	onTypeChanged: (newValue:columnTypes) => void;
}

export interface IDataColumnHeaderState {
	typeChooserVisible: boolean;
}

export class DataColumnHeader extends React.Component<IDataColumnHeaderProps, IDataColumnHeaderState> {

	private _container: HTMLElement;
	
	public constructor(){
		super();
		this.state = {
			typeChooserVisible: false
		};
	}

	public render(): React.ReactElement<IDataColumnHeaderProps> {
		return (
			<div className={styles.propAndButtonBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					{!this.props.editable && (
						<span>{this.props.name}</span>
					)}
					{this.props.editable && (
						<TextField
						 value={this.props.name}
						 onChanged={this.props.onNameChanged}
						 title={strings.DataColumn_ColumnNameChangeTooltip}/>
					)}
				</div>
				<div className={styles.buttonBox}>
					{!this.props.editable && (
						<Icon
						 iconName={iconForType(this.props.type)}
						 title={textForType(this.props.type)}
						 styles={iconStyles}/>
					)}
					{this.props.editable && (
						<IconButton
						 iconProps={{iconName:iconForType(this.props.type)}}
						 title={textForType(this.props.type) + '\n(' + strings.DataColumn_ColumnTypeChangeTooltip + ')'}
						 onClick={this.onTypeIconClick}
						 styles={buttonStyles}/>
					)}
				</div>
				{this.state.typeChooserVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline={strings.DataColumn_ColumnTypeHeadline}
					 onDismiss={this.onTypeIconClick}>
					 	<div className={styles.tbChoiceGroupOverride}>
							<ChoiceGroup
							 selectedKey={this.props.type.toString()}
							 onChange={this.onTypeChange}
							 options={[
								this.optionForType(columnTypes.choice),
								this.optionForType(columnTypes.datetime),
								this.optionForType(columnTypes.link),
								this.optionForType(columnTypes.lookup),
								this.optionForType(columnTypes.number),
								this.optionForType(columnTypes.person),
								this.optionForType(columnTypes.picture),
								this.optionForType(columnTypes.text),
								this.optionForType(columnTypes.boolean)
							]}/>
							<span>{strings.DataColumn_ColumnTypeMessage}</span>
						 </div>
					</TeachingBubble>
				)}
			</div>
		);
	}

	private optionForType(type:columnTypes): IChoiceGroupOption {
		return {
			key: type.toString(),
			text: textForType(type),
			iconProps: {
				iconName: iconForType(type)
			}
		};
	}

	@autobind
	private onTypeIconClick(): void {
		this.setState({
			typeChooserVisible: !this.state.typeChooserVisible
		});
	}

	@autobind
	private onTypeChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
	  this.props.onTypeChanged(+option.key);
	}
}