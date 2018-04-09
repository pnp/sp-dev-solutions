import * as React from 'react';
import {
	autobind,
	ComboBox,
	IComboBoxOption,
	SelectableOptionMenuItemType,
	IDropdownOption,
	Dropdown
} from 'office-ui-fabric-react';
import styles from '../../SiteDesignsStudio.module.scss';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import * as strings from 'SiteDesignsStudioWebPartStrings';
import { ISiteScriptAction, ISiteScript } from '../../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../../ISiteDesignsStudioProps';
import { ThemeServiceKey } from '../../../services/themes/ThemesService';

export interface IListTemplateInputFieldProps extends IServiceConsumerComponentProps {
	value: number;
	label: string;
	onValueChanged: (value: number) => void;
}

export interface IListTemplateInputFieldState {}

export default class ListTemplateInputField extends React.Component<
	IListTemplateInputFieldProps,
	IListTemplateInputFieldState
> {
	public render(): React.ReactElement<IListTemplateInputFieldProps> {
		return (
			<Dropdown
				label={this.props.label}
				selectedKey={this.props.value}
				options={this._getListTemplates()}
				onChanged={this._valueChanged}
			/>
		);
	}

	private _getListTemplates(): IComboBoxOption[] {
		return [
      { key: 100, text:'Custom List' },
      { key: 101, text:'Document Library' },
      { key: 102, text:'Survey' },
      { key: 103, text:'Links' },
      { key: 104, text:'Announcements' },
      { key: 105, text:'Contacts' },
      { key: 106, text:'Calendar' },
      { key: 107, text:'Tasks' },
      { key: 108, text:'Discussion Board' },
      { key: 109, text:'Picture Library' },
      { key: 110, text:'DataSources' },
      { key: 115, text:'Form Library' },
      { key: 117, text:'No Code Workflows' },
      { key: 118, text:'Custom Workflow Process' },
      { key: 119, text:'Wiki Page Library' },
      { key: 120, text:'CustomGrid' },
      { key: 122, text:'No Code Public Workflows<14>' },
      { key: 140, text:'Workflow History' },
      { key: 150, text:'Project Tasks' },
      { key: 600, text:'Public Workflows External List<15>' },
      { key: 1100, text:'Issues Tracking' }
    ];
	}

	@autobind
	private _valueChanged(valueOption: IDropdownOption) {
		if (this.props.onValueChanged && valueOption) {
			this.props.onValueChanged(valueOption.key as number);
		}
	}
}
