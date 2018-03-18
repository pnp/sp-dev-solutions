import * as strings from 'ColumnFormatterWebPartStrings';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { ISpinButtonStyles, SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';

import { DatePickerStrings } from '../../../../helpers/DatePickerStrings';
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

export interface ISampleDateTimeProps {
	value: Date;
	onChanged: (newValue:Date|undefined) => void;
}

export interface ISampleDateTimeState {
	subPropertiesVisible: boolean;
}

export class SampleDateTime extends React.Component<ISampleDateTimeProps, ISampleDateTimeState> {
	
	private _container: HTMLElement;
	private year?: number;
	private month?: number;
	private day?: number;
	private hour: number = 0;
	private minute: number = 0;
	private second: number = 0;

	public constructor(props: ISampleDateTimeProps){
		super(props);
		
		this.state = {
			subPropertiesVisible: false
		};

		if(props.value && props.value !== undefined){
			this.year = props.value.getFullYear();
			this.month = props.value.getMonth();
			this.day = props.value.getDate();
			this.hour = props.value.getHours();
			this.minute = props.value.getMinutes();
			this.second = props.value.getSeconds();
		}
	}

	public render(): React.ReactElement<ISampleDateTimeProps> {
		return (
		  <div className={styles.propAndButtonBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					<DatePicker
					 value={this.props.value}
					 onSelectDate={this.onSelectDate}
					 allowTextInput={false}
					 formatDate={this.onFormatDate}
					 strings={DatePickerStrings}/>
				</div>
				<div className={styles.buttonBox}>
					<SubPropsButton
					 onClick={this.subPropertiesButtonClick}
					 tooltip={strings.DataColumn_TimeHeadline}
					 iconName='Clock'/>
				</div>
				{this.state.subPropertiesVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline={strings.DataColumn_TimeHeadline}
					 onDismiss={this.subPropertiesButtonClick}>
					 	<div className={styles.tbSpinButtonOverride}>
							<SpinButton
							 value={this.hour.toString()}
							 label={strings.DataColumn_HourLabel + ':'}
							 labelPosition={Position.top}
							 onValidate={this.onHourValidate}
							 onIncrement={this.onHourIncrement}
							 onDecrement={this.onHourDecrement}
							 styles={spinStyles}
							 upArrowButtonStyles={sbuttonStyles}
							 downArrowButtonStyles={sbuttonStyles}/>
							<SpinButton
							 value={this.minute.toString()}
							 label={strings.DataColumn_MinuteLabel + ':'}
							 labelPosition={Position.top}
							 onValidate={this.onMinuteValidate}
							 onIncrement={this.onMinuteIncrement}
							 onDecrement={this.onMinuteDecrement}
							 styles={spinStyles}
							 upArrowButtonStyles={sbuttonStyles}
							 downArrowButtonStyles={sbuttonStyles}/>
							<SpinButton
							 value={this.second.toString()}
							 label={strings.DataColumn_SecondsLabel + ':'}
							 labelPosition={Position.top}
							 onValidate={this.onSecondValidate}
							 onIncrement={this.onSecondIncrement}
							 onDecrement={this.onSecondDecrement}
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
	private onSelectDate(date: Date | null | undefined): void {
		if(date && date !== undefined){
			this.year = date.getFullYear();
			this.month = date.getMonth();
			this.day = date.getDate();
		} else {
			this.year = undefined;
			this.month = undefined;
			this.day = undefined;
		}
		this.props.onChanged(this.buildDate());
	}

	private buildDate(): Date | undefined {
		if(!this.year || this.year == undefined) {
			return undefined;
		}
		return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, 0);
	}

	@autobind
	private onFormatDate(date: Date): string {
	  return date.toLocaleDateString();
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private onHourValidate(value:string): string {
		if(!isNaN(+value)){
			this.hour = +value;
			if(this.hour > 23) {
				this.hour = 0;
			}
			if(this.hour < 0) {
				this.hour = 23;
			}
			this.props.onChanged(this.buildDate());
		}
		return this.hour.toString();
	}

	@autobind
	private onHourIncrement(value:string): string {
		let newValue: number = +value + 1;
		return this.onHourValidate(newValue.toString());
	}

	@autobind
	private onHourDecrement(value:string): string {
		let newValue: number = +value - 1;
		return this.onHourValidate(newValue.toString());
	}

	@autobind
	private onMinuteValidate(value:string): string {
		if(!isNaN(+value)){
			this.minute = +value;
			if(this.minute > 59) {
				this.minute = 0;
			}
			if(this.minute < 0) {
				this.minute = 59;
			}
			this.props.onChanged(this.buildDate());
		}
		return this.minute.toString();
	}

	@autobind
	private onMinuteIncrement(value:string): string {
		let newValue: number = +value + 1;
		return this.onMinuteValidate(newValue.toString());
	}

	@autobind
	private onMinuteDecrement(value:string): string {
		let newValue: number = +value - 1;
		return this.onMinuteValidate(newValue.toString());
	}

	@autobind
	private onSecondValidate(value:string): string {
		if(!isNaN(+value)){
			this.second = +value;
			if(this.second > 59) {
				this.second = 0;
			}
			if(this.second < 0) {
				this.second = 59;
			}
			this.props.onChanged(this.buildDate());
		}
		return this.second.toString();
	}

	@autobind
	private onSecondIncrement(value:string): string {
		let newValue: number = +value + 1;
		return this.onSecondValidate(newValue.toString());
	}

	@autobind
	private onSecondDecrement(value:string): string {
		let newValue: number = +value - 1;
		return this.onSecondValidate(newValue.toString());
	}
}