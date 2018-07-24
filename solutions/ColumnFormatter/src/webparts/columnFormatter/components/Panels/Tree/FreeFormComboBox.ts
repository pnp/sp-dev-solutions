import { ComboBox, IComboBox, IComboBoxOption, IComboBoxProps } from "office-ui-fabric-react/lib/ComboBox";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

export interface IFreeFormComboBoxState {
}

/**
 * This wrapper component exists because the actual ComboBox has a bug where it returns the value less one character
 * when someone types a full value in and presses enter.
 */
export class FreeFormComboBox extends React.Component<IComboBoxProps, IFreeFormComboBoxState> {

	private _component: IComboBox;

	public render(): React.ReactElement<IComboBoxProps> {
		const element: React.ReactElement<IComboBoxProps > = React.createElement(
			ComboBox,
			{
			  ...this.props,
			  componentRef: (component: IComboBox) => {
				  this._component = component;
			  },
			  onChanged: this.onChanged,
			}
		);
		return element;
	}

	@autobind
	private onChanged(option?: IComboBoxOption, index?: number, value?: string) {
		if(typeof this.props.onChanged !== "undefined") {
			let trueValue = value;
			if(typeof option == "undefined" && typeof this._component !== "undefined" && typeof (this._component as any).state !== "undefined" && typeof (this._component as any).state.suggestedDisplayValue !== "undefined") {
				trueValue = (this._component as any).state.suggestedDisplayValue;
			}
			this.props.onChanged(option, index, trueValue);
		}
	}
}