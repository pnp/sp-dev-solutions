import * as strings from 'ColumnFormatterWebPartStrings';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ISpinButtonStyles, SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';

import { ILookupFieldValue } from '../../../../state/State';
import styles from '../../../ColumnFormatter.module.scss';
import { SubPropsButton } from './SubPropsButton';

const spinStyles: Partial<ISpinButtonStyles> = {
	label: {
		color: "white !important"
	}
};

const sbuttonStyles: Partial<IButtonStyles> = {
	root: {
		backgroundColor: "white"
	}
};

export interface ISampleLookupProps {
	value: ILookupFieldValue;
	onChanged: (newValue:ILookupFieldValue) => void;
}

export interface ISampleLookupState {
	subPropertiesVisible: boolean;
}

export class SampleLookup extends React.Component<ISampleLookupProps, ISampleLookupState> {
	
	private _container: HTMLElement;

	public constructor(){
		super();
		this.state = {
			subPropertiesVisible: false
		};
	}

	public render(): React.ReactElement<ISampleLookupProps> {
		return (
		  <div className={styles.propAndButtonBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					<TextField
					 value={this.props.value.lookupValue}
					 onChanged={this.lookupValueChanged}/>
				</div>
				<div className={styles.buttonBox}>
					<SubPropsButton
					 onClick={this.subPropertiesButtonClick}/>
				</div>
				{this.state.subPropertiesVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline={strings.DataColumn_SubPropertiesHeadline}
					 onDismiss={this.subPropertiesButtonClick}>
					 	<div className={styles.tbSpinButtonOverride}>
							<SpinButton
							value={this.props.value.lookupId.toString()}
							label={strings.DataColumn_LookupIdLabel + ':'}
							labelPosition={Position.top}
							onValidate={this.onLookupIdValidate}
							onIncrement={this.onLookupIdIncrement}
							onDecrement={this.onLookupIdDecrement}
							styles={spinStyles}
							upArrowButtonStyles={sbuttonStyles}
							downArrowButtonStyles={sbuttonStyles}/>
						 </div>
					</TeachingBubble>
				)}
		  </div>
		);
	}

	@autobind
	private lookupValueChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			lookupValue: newValue
		});
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private onLookupIdValidate(value:string): string {
		if(isNaN(+value)){
			this.props.onChanged({
				...this.props.value,
				lookupId: 1
			});
			return "1";
		}
		let numValue: number = +value;
		if(numValue < 1) {
			numValue = 1;
		}
		this.props.onChanged({
			...this.props.value,
			lookupId: numValue
		});
		return numValue.toString();
	}

	@autobind
	private onLookupIdIncrement(value:string): string {
		let newValue: number = +value + 1;
		return this.onLookupIdValidate(newValue.toString());
	}

	@autobind
	private onLookupIdDecrement(value:string): string {
		let newValue: number = +value - 1;
		return this.onLookupIdValidate(newValue.toString());
	}
}