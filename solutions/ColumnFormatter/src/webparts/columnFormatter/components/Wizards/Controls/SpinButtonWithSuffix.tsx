import { ISpinButtonStyles, SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';

export interface ISpinButtonWithSuffixProps {
	label: string;
	initialValue?: number;
	step?: number;
	min?: number;
	max?: number;
	incrementIconName?: string;
	decrementIconName?: string;
	suffix?: string;
	decimalPlaces?: number;
	disabled?: boolean;
	labelPosition?: Position;
	title?: string;
	styles?: Partial<ISpinButtonStyles>;
	labelWidth?: number;
	onChanged: (value:number) => void;
}

export interface ISpinButtonWithSuffixState {

}

export class SpinButtonWithSuffix extends React.Component<ISpinButtonWithSuffixProps, ISpinButtonWithSuffixState> {

	private step:number;
	private svalue:number;

	constructor(props: ISpinButtonWithSuffixProps) {
		super(props);
		
		this.svalue = props.initialValue;
		this.step = props.step || 1;
	}

	public render(): React.ReactElement<ISpinButtonWithSuffixProps> {
		let styles: Partial<ISpinButtonStyles> = this.props.styles;
		if(typeof styles == "undefined" && typeof this.props.labelWidth != "undefined") {
			styles = {
				labelWrapper: {
					width: this.props.labelWidth.toString() + 'px'
				}
			};
		}
		return (
			<SpinButton
			 label={this.props.label}
			 labelPosition={this.props.labelPosition || Position.top}
			 value={this.formatValueString(this.svalue)}
			 onValidate={this.validate}
			 onIncrement={this.increment}
			 onDecrement={this.decrement}
			 disabled={this.props.disabled}
			 title={this.props.title}
			 styles={styles}
			 incrementButtonIcon={{iconName: this.props.incrementIconName || 'ChevronUpSmall'}}
			 decrementButtonIcon={{iconName: this.props.decrementIconName || 'ChevronDownSmall'}} />
		);
	}


	@autobind
	private validate(rawValue: string): string {
		let numValue: number = this.extractNumValue(rawValue);

		return this.validateNumber(numValue);
	}

	private validateNumber(numValue: number): string {
		//Check against max value
		if(typeof this.props.max !== "undefined" && numValue > this.props.max) {
			numValue = this.props.max;
		}
		//Check against min value
		if(typeof this.props.min !== "undefined" && numValue < this.props.min) {
			numValue = this.props.min;
		}
		//ensure matching rounding for decimals
		numValue = +numValue.toFixed(this.props.decimalPlaces);
		//Check for change and notify
		if(numValue !== this.svalue) {
			this.onValueChanged(numValue);
		}
		return this.formatValueString(numValue);
	}

	@autobind
	private increment(rawValue: string): string {
		let numValue: number = this.extractNumValue(rawValue);

		numValue += this.step;

		return this.validateNumber(numValue);
	}

	@autobind
	private decrement(rawValue: string): string {
		let numValue: number = this.extractNumValue(rawValue);
		
		numValue -= this.step;
		
		return this.validateNumber(numValue);
	}

	private extractNumValue(rawValue: string): number {
		let numValue: number;
		let baseValue: string = this.removeSuffix(rawValue);
		
		if(isNaN(+baseValue)){
			if(this.props.min) {
				numValue = Math.max(this.props.min,0);
			}
			else
			{
				numValue = 0;
			}
		}
		else
		{
			numValue = +baseValue;
		}

		return numValue;
	}

	private hasSuffix(rawValue: string): boolean {
		if(!this.props.suffix) {
			return false;
		}
		let subString: string = rawValue.substr(rawValue.length - this.props.suffix.length);
		return subString === this.props.suffix;
	}
	
	private removeSuffix(rawValue: string): string {
		if (!this.hasSuffix(rawValue)) {
			return rawValue;
		}

		return rawValue.substr(0, rawValue.length - this.props.suffix.length);
	}

	private formatValueString(numValue: number): string {
		return this.addSuffix(numValue.toFixed(this.props.decimalPlaces));
	}

	private addSuffix(stringValue: string): string {
		if(!this.props.suffix){
			return stringValue;
		}

		return stringValue + this.props.suffix;
	}

	private onValueChanged(newValue: number): void {
		if (newValue !== null) {
			this.props.onChanged(newValue);
			this.svalue = newValue;
		}
	}
}