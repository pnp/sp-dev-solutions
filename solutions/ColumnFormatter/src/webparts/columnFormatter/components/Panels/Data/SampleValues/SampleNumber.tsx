import { ISpinButtonStyles, SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import styles from '../../../ColumnFormatter.module.scss';

const spinStyles: Partial<ISpinButtonStyles> = {
	root: {
		minWidth: "46px",
		padding: "1px"
	},
	spinButtonWrapper: {
		minWidth: "46px",
		padding: "1px",
		height: "22px"
	},
	input:{
		minWidth: "32px",
		padding: "0 6px 0 6px"
	}
};

export interface ISampleNumberProps {
	value: number;
	onChanged: (newValue:number) => void;
}

export class SampleNumber extends React.Component<ISampleNumberProps, {}> {
	public render(): React.ReactElement<ISampleNumberProps> {
		return (
		  <div>
			<SpinButton
			  label=""
			  styles={spinStyles}
			  value={this.props.value.toString()}
			  onValidate={this.onValidate}
			  onIncrement={this.onIncrement}
			  onDecrement={this.onDecrement} />
		  </div>
		);
	}

	@autobind
	private onValidate(value:string): string {
		if(isNaN(+value)){
			this.props.onChanged(0);
			return "0";
		}
		this.props.onChanged(+value);
		return value;
	}

	@autobind
	private onIncrement(value:string): string {
		let newValue: number = +value + 1;
		this.props.onChanged(newValue);
		return newValue.toString();
	}

	@autobind
	private onDecrement(value:string): string {
		let newValue: number = +value - 1;
		this.props.onChanged(newValue);
		return newValue.toString();
	}
}