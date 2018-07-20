import * as React from 'react';
import { autobind, ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import styles from '../../SiteDesignsStudio.module.scss';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import * as strings from 'SiteDesignsStudioWebPartStrings';
import { ISiteScriptAction, ISiteScript } from '../../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../../ISiteDesignsStudioProps';
import { ThemeServiceKey } from '../../../services/themes/ThemesService';
import { IApp } from '../../../models/IApp';
import { AppsServiceKey } from '../../../services/apps/AppsService';

export interface IAppsInputFieldProps extends IServiceConsumerComponentProps {
	value: string;
	label: string;
	onValueChanged: (value: string) => void;
}

export interface IAppsInputFieldState {
	isLoading: boolean;
	availableApps: IApp[];
}

const loadingOptionKey = 'loadingApps';
const noAvailableOptionKey = 'NoAvailableApps';

export default class AppsInputField extends React.Component<IAppsInputFieldProps, IAppsInputFieldState> {
	private textValueChanged: string = null;

	constructor(props: IAppsInputFieldProps) {
		super(props);

		this.state = {
			isLoading: true,
			availableApps: []
		};
	}

	public componentWillMount() {
		this._loadApps();
	}

	public render(): React.ReactElement<IAppsInputFieldProps> {
		return (
			<ComboBox
				label={this.props.label}
				allowFreeform={true}
        autoComplete="off"
        selectedKey={this.props.value}
				options={this._getApps()}
				onChanged={this._valueChanged}
				onBlur={this._onBlur}
			/>
		);
	}

	private _loadApps() {
		let service = this.props.serviceScope.consume(AppsServiceKey);
		service.getAvailableApps().then((apps) => {
			this.setState({
				availableApps: apps,
				isLoading: false
			});
		});
	}
	private _getApps(): IComboBoxOption[] {
    let {availableApps} = this.state;
		let appsOptions: IComboBoxOption[] = []
			.concat(
				this.state.isLoading
					? [ { key: loadingOptionKey, text: strings.LoadingLabel } ]
					: availableApps && availableApps.length > 0
						? (availableApps || []).map((t) => ({ key: t.id, text: t.title }))
						: [ { key: noAvailableOptionKey, text: strings.NoAvailableHubSites } ]
			);

		return appsOptions;
	}

	@autobind
	private _valueChanged(valueOption: IComboBoxOption, index: number, value: string) {
		if (this.props.onValueChanged) {
			if (valueOption) {
				if (valueOption.key != noAvailableOptionKey && valueOption.key != loadingOptionKey) {
					this.props.onValueChanged(valueOption.key as string);
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
