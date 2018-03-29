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
			{key:'black', text:strings.Color_Black},
			{key:'#0078d7', text:strings.Color_Blue},
			{key:'#002050', text:strings.Color_BlueDark},
			{key:'#00bcf2', text:strings.Color_BlueLight},
			{key:'#00188f', text:strings.Color_BlueMid},
			{key:'#107c10', text:strings.Color_Green},
			{key:'#004b1c', text:strings.Color_GreenDark},
			{key:'#bad80a', text:strings.Color_GreenLight},
			{key:'#b4009e', text:strings.Color_Magenta},
			{key:'#5c005c', text:strings.Color_MagentaDark},
			{key:'#e3008c', text:strings.Color_MagentaLight},
			{key:'#212121', text:strings.Color_NeutralDark},
			{key:'#eaeaea', text:strings.Color_NeutralLight},
			{key:'#f4f4f4', text:strings.Color_NeutralLighter},
			{key:'#f8f8f8', text:strings.Color_NeutralLighterAlt},
			{key:'#333333', text:strings.Color_NeutralPrimary},
			{key:'#3c3c3c', text:strings.Color_NeutralPrimaryAlt},
			{key:'#666666', text:strings.Color_NeutralSecondary},
			{key:'#a6a6a6', text:strings.Color_NeutralTertiary},
			{key:'#c8c8c8', text:strings.Color_NeutralTertiaryAlt},
			{key:'#d83b01', text:strings.Color_Orange},
			{key:'#ea4300', text:strings.Color_OrangeLight},
			{key:'#ff8c00', text:strings.Color_OrangeLighter},
			{key:'#5c2d91', text:strings.Color_Purple},
			{key:'#32145a', text:strings.Color_PurpleDark},
			{key:'#b4a0ff', text:strings.Color_PurpleLight},
			{key:'#e81123', text:strings.Color_Red},
			{key:'#a80000', text:strings.Color_RedDark},
			{key:'#008272', text:strings.Color_Teal},
			{key:'#004b50', text:strings.Color_TealDark},
			{key:'#00b294', text:strings.Color_TealLight},
			{key:'transparent', text:strings.Color_Transparent},
			{key:'white', text:strings.Color_White},
			{key:'#ffb900', text:strings.Color_Yellow},
			{key:'#fff100', text:strings.Color_YellowLight}
		];
		return items.sort(DropdownSort);
	  }

	  @autobind
	  private onRenderOption(option:IDropdownOption): JSX.Element {
		  return (
			<div style={{
				whiteSpace: 'nowrap'
			}}>
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