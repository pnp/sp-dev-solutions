import * as strings from "ColumnFormatterWebPartStrings";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { ColorPicker } from "office-ui-fabric-react/lib/ColorPicker";
import * as React from "react";

import styles from "../../ColumnFormatter.module.scss";

export interface INodePropColorPickerProps {
	value: string;
	onColorChanged: (newValue:string) => void;
}

export interface INodePropColorPickerState {
	colorPickerVisible: boolean;
}

export class NodePropColorPicker extends React.Component<INodePropColorPickerProps, INodePropColorPickerState> {

	private _container: HTMLElement;
	private _originalColor: string;
	
	public constructor(){
		super();

		this.state = {
			colorPickerVisible: false,
		};
	}

	public render(): React.ReactElement<INodePropColorPickerProps> {
		return (
			<div ref={(container) => this._container = container!}>
				<IconButton
				 iconProps={{iconName:"ColorSolid"}}
				 title={strings.TreeView_ColorPicker}
				 styles={{
					root: {
						width: "14px",
						height: "16px",
						padding: "0"
					},
					icon: {
						fontSize: "12px",
						lineHeight: "16px",
					}
				 }}
				 onClick={()=>{
					this.setState({
						colorPickerVisible: !this.state.colorPickerVisible,
					});
				 }}/>
				{this.state.colorPickerVisible && (
					<Callout
					 target={this._container}
					 onDismiss={() => {this.setState({colorPickerVisible: false});}}
					 directionalHint={DirectionalHint.topRightEdge}>
						<ColorPicker
						 color={this.props.value}
						 alphaSliderHidden={false}
						 onColorChanged={this.props.onColorChanged}/>
					</Callout>
				)}
			</div>
		);
	}
}