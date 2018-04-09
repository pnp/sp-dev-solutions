import * as React from 'react';
import { autobind, ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import styles from '../../SiteDesignsStudio.module.scss';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import * as strings from 'SiteDesignsStudioWebPartStrings';
import { ISiteScriptAction, ISiteScript } from '../../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../../ISiteDesignsStudioProps';
import { ThemeServiceKey } from '../../../services/themes/ThemesService';

export interface IThemeInputFieldProps extends IServiceConsumerComponentProps {
	value: string;
	label: string;
	onValueChanged: (value: string) => void;
}

export interface IThemeInputFieldState {
	isLoading: boolean;
	availableCustomThemes: string[];
}

const loadingOptionKey = 'loadingCustomThemes';
const noAvailableOptionKey = 'NoAvailableThenes';

export default class ThemeInputField extends React.Component<IThemeInputFieldProps, IThemeInputFieldState> {
	private textValueChanged: string = null;

	constructor(props: IThemeInputFieldProps) {
		super(props);

		this.state = {
			isLoading: true,
			availableCustomThemes: []
		};
	}

	public componentWillMount() {
		this._loadCustomThemes();
	}

	public render(): React.ReactElement<IThemeInputFieldProps> {
		return (
			<ComboBox
				label={this.props.label}
				allowFreeform={true}
				autoComplete="off"
				value={this.props.value}
				options={this._getThemes(this.state.availableCustomThemes)}
				onChanged={this._valueChanged}
				onBlur={this._onBlur}
			/>
		);
	}

	private _loadCustomThemes() {
		let themesServices = this.props.serviceScope.consume(ThemeServiceKey);
		themesServices.getCustomThemes().then((customThemes) => {
			this.setState({
				availableCustomThemes: customThemes.map((t) => t.name),
				isLoading: false
			});
		});
	}
	private _getThemes(customThemes: string[]): IComboBoxOption[] {
		let themes: IComboBoxOption[] = []
			.concat(
				this.state.isLoading
					? [ { key: loadingOptionKey, text: strings.LoadingLabel } ]
					: customThemes && customThemes.length > 0
						? (customThemes || []).map((t) => ({ key: t, text: t }))
						: [ { key: noAvailableOptionKey, text: strings.NoAvailableThemes } ]
			);

		return themes;
	}

	@autobind
	private _valueChanged(valueOption: IComboBoxOption, index: number, value: string) {
		if (this.props.onValueChanged) {
			if (valueOption) {
				if (valueOption.key != noAvailableOptionKey && valueOption.key != loadingOptionKey) {
					this.props.onValueChanged(valueOption.text);
				}
			} else {
				this.textValueChanged = value;
			}
		}
	}

	@autobind
	private _onBlur() {
		if (this.textValueChanged) {
			if (this.props.onValueChanged) {
				this.props.onValueChanged(this.textValueChanged);
			}
			this.textValueChanged = null;
		}
	}
}
