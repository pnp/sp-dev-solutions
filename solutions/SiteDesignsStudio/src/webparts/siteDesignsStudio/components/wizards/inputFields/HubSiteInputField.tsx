import * as React from 'react';
import { autobind, ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import styles from '../../SiteDesignsStudio.module.scss';
import { escape, assign } from '@microsoft/sp-lodash-subset';

import * as strings from 'SiteDesignsStudioWebPartStrings';
import { ISiteScriptAction, ISiteScript } from '../../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../../ISiteDesignsStudioProps';
import { ThemeServiceKey } from '../../../services/themes/ThemesService';
import { IHubSite } from '../../../models/IHubSite';
import { HubSitesServiceKey } from '../../../services/hubSites/HubSitesService';

export interface IHubSiteInputFieldProps extends IServiceConsumerComponentProps {
	value: string;
	label: string;
	onValueChanged: (value: string) => void;
}

export interface IHubSiteInputFieldState {
	isLoading: boolean;
	availableHubSites: IHubSite[];
}

const loadingOptionKey = 'loadingHubSites';
const noAvailableOptionKey = 'NoAvailableHubSites';

export default class HubSiteInputField extends React.Component<IHubSiteInputFieldProps, IHubSiteInputFieldState> {
	private textValueChanged: string = null;

	constructor(props: IHubSiteInputFieldProps) {
		super(props);

		this.state = {
			isLoading: true,
			availableHubSites: []
		};
	}

	public componentWillMount() {
		this._loadHubSites();
	}

	public render(): React.ReactElement<IHubSiteInputFieldProps> {
		return (
			<ComboBox
				label={this.props.label}
				allowFreeform={true}
        autoComplete="off"
        selectedKey={this.props.value}
				options={this._getHubSites()}
				onChanged={this._valueChanged}
				onBlur={this._onBlur}
			/>
		);
	}

	private _loadHubSites() {
		let service = this.props.serviceScope.consume(HubSitesServiceKey);
		service.getHubSites().then((hubSites) => {
			this.setState({
				availableHubSites: hubSites,
				isLoading: false
			});
		});
	}
	private _getHubSites(): IComboBoxOption[] {
    let {availableHubSites} = this.state;
		let hubSitesOptions: IComboBoxOption[] = []
			.concat(
				this.state.isLoading
					? [ { key: loadingOptionKey, text: strings.LoadingLabel } ]
					: availableHubSites && availableHubSites.length > 0
						? (availableHubSites || []).map((t) => ({ key: t.id, text: t.title }))
						: [ { key: noAvailableOptionKey, text: strings.NoAvailableHubSites } ]
			);

		return hubSitesOptions;
	}

	@autobind
	private _valueChanged(valueOption: IComboBoxOption, index: number, value: string) {
    console.log('value changed', arguments);
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
