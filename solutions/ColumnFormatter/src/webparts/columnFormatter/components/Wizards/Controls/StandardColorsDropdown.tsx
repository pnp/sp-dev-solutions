import * as strings from 'ColumnFormatterWebPartStrings';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { DropdownSort } from '../../../helpers/Utilities';

export interface IStandardColorsDropdownProps {
	label: string;
	selectedKey?: string;
	onChanged: (color:string) => void;
}

export interface IStandardColorsDropdownState {
	
}

export class StandardColorsDropdown extends React.Component<IStandardColorsDropdownProps, IStandardColorsDropdownState> {

	constructor(props: IStandardColorsDropdownProps) {
		super(props);
	}

	public render(): React.ReactElement<IStandardColorsDropdownProps> {
		return (
			<Dropdown
			 label={this.props.label + ':'}
			 selectedKey={this.props.selectedKey}
			 options={this.colorOptions()}
			 onChanged={this.onChanged}
			 onRenderOption={this.onRenderOption}/>
		);
	}

	@autobind
	public onChanged(item: IDropdownOption) {
		this.props.onChanged(item.key.toString());
	}

	private colorOptions(): Array<IDropdownOption> {
		let items:Array<IDropdownOption> = [
			{key:'black', text:strings.StandardColorsDropdownBlack},
			{key:'#0078d7', text:strings.StandardColorsDropdownBlue},
			{key:'#002050', text:strings.StandardColorsDropdownBlueDark},
			{key:'#00bcf2', text:strings.StandardColorsDropdownBlueLight},
			{key:'#00188f', text:strings.StandardColorsDropdownBlueMid},
			{key:'#107c10', text:strings.StandardColorsDropdownGreen},
			{key:'#004b1c', text:strings.StandardColorsDropdownGreenDark},
			{key:'#bad80a', text:strings.StandardColorsDropdownGreenLight},
			{key:'#b4009e', text:strings.StandardColorsDropdownMagenta},
			{key:'#5c005c', text:strings.StandardColorsDropdownMagentaDark},
			{key:'#e3008c', text:strings.StandardColorsDropdownMagentaLight},
			{key:'#212121', text:strings.StandardColorsDropdownNeutralDark},
			{key:'#eaeaea', text:strings.StandardColorsDropdownNeutralLight},
			{key:'#f4f4f4', text:strings.StandardColorsDropdownNeutralLighter},
			{key:'#f8f8f8', text:strings.StandardColorsDropdownNeutralLighterAlt},
			{key:'#333333', text:strings.StandardColorsDropdownNeutralPrimary},
			{key:'#3c3c3c', text:strings.StandardColorsDropdownNeutralPrimaryAlt},
			{key:'#666666', text:strings.StandardColorsDropdownNeutralSecondary},
			{key:'#a6a6a6', text:strings.StandardColorsDropdownNeutralTertiary},
			{key:'#c8c8c8', text:strings.StandardColorsDropdownNeutralTertiaryAlt},
			{key:'#d83b01', text:strings.StandardColorsDropdownOrange},
			{key:'#ea4300', text:strings.StandardColorsDropdownOrangeLight},
			{key:'#ff8c00', text:strings.StandardColorsDropdownOrangeLighter},
			{key:'#5c2d91', text:strings.StandardColorsDropdownPurple},
			{key:'#32145a', text:strings.StandardColorsDropdownPurpleDark},
			{key:'#b4a0ff', text:strings.StandardColorsDropdownPurpleLight},
			{key:'#e81123', text:strings.StandardColorsDropdownRed},
			{key:'#a80000', text:strings.StandardColorsDropdownRedDark},
			{key:'#008272', text:strings.StandardColorsDropdownTeal},
			{key:'#004b50', text:strings.StandardColorsDropdownTealDark},
			{key:'#00b294', text:strings.StandardColorsDropdownTealLight},
			{key:'transparent', text:strings.StandardColorsDropdownTransparent},
			{key:'white', text:strings.StandardColorsDropdownWhite},
			{key:'#ffb900', text:strings.StandardColorsDropdownYellow},
			{key:'#fff100', text:strings.StandardColorsDropdownYellowLight}
		];
		return items.sort(DropdownSort);
	  }

	  @autobind
	  private onRenderOption(option:IDropdownOption): JSX.Element {
		  return (
			<div>
				<div style={{
					backgroundColor:option.key,
					width:'12px',
					height:'12px',
					display:'inline-block',
					marginRight:'6px'
				}}/>
				<span>{option.text}</span>
			</div>
		  );
	  }
}