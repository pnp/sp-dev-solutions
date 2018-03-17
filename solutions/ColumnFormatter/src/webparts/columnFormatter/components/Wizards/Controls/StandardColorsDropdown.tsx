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
			 label={this.props.label}
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
			{key:'black', text:strings.ColorBlack},
			{key:'#0078d7', text:strings.ColorBlue},
			{key:'#002050', text:strings.ColorBlueDark},
			{key:'#00bcf2', text:strings.ColorBlueLight},
			{key:'#00188f', text:strings.ColorBlueMid},
			{key:'#107c10', text:strings.ColorGreen},
			{key:'#004b1c', text:strings.ColorGreenDark},
			{key:'#bad80a', text:strings.ColorGreenLight},
			{key:'#b4009e', text:strings.ColorMagenta},
			{key:'#5c005c', text:strings.ColorMagentaDark},
			{key:'#e3008c', text:strings.ColorMagentaLight},
			{key:'#212121', text:strings.ColorNeutralDark},
			{key:'#eaeaea', text:strings.ColorNeutralLight},
			{key:'#f4f4f4', text:strings.ColorNeutralLighter},
			{key:'#f8f8f8', text:strings.ColorNeutralLighterAlt},
			{key:'#333333', text:strings.ColorNeutralPrimary},
			{key:'#3c3c3c', text:strings.ColorNeutralPrimaryAlt},
			{key:'#666666', text:strings.ColorNeutralSecondary},
			{key:'#a6a6a6', text:strings.ColorNeutralTertiary},
			{key:'#c8c8c8', text:strings.ColorNeutralTertiaryAlt},
			{key:'#d83b01', text:strings.ColorOrange},
			{key:'#ea4300', text:strings.ColorOrangeLight},
			{key:'#ff8c00', text:strings.ColorOrangeLighter},
			{key:'#5c2d91', text:strings.ColorPurple},
			{key:'#32145a', text:strings.ColorPurpleDark},
			{key:'#b4a0ff', text:strings.ColorPurpleLight},
			{key:'#e81123', text:strings.ColorRed},
			{key:'#a80000', text:strings.ColorRedDark},
			{key:'#008272', text:strings.ColorTeal},
			{key:'#004b50', text:strings.ColorTealDark},
			{key:'#00b294', text:strings.ColorTealLight},
			{key:'transparent', text:strings.ColorTransparent},
			{key:'white', text:strings.ColorWhite},
			{key:'#ffb900', text:strings.ColorYellow},
			{key:'#fff100', text:strings.ColorYellowLight}
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