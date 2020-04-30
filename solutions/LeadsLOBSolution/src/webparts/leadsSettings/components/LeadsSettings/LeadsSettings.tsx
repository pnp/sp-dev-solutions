import * as React from 'react';
import styles from './LeadsSettings.module.scss';
import { ILeadsSettingsProps, ILeadsSettingsState } from '.';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ILeadsSettings, LeadsSettings as SettingsManager } from '../../../../LeadsSettings';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export class LeadsSettings extends React.Component<ILeadsSettingsProps, ILeadsSettingsState> {
  private settings: ILeadsSettings;

  constructor(props: ILeadsSettingsProps) {
    super(props);

    this.state = {
      demo: true,
      needsConfiguration: false,
      quarterlyOnly: true
    };
  }

  private setDemoMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.settings.demo = checked;
    const newState: ILeadsSettingsState = {
      demo: checked,
      quarterlyOnly: this.state.quarterlyOnly,
      needsConfiguration: !checked
    };
    if (checked) {
      newState.connectionStatus = undefined;
    }
    else {
      if (this.state.apiUrl) {
        newState.connectionStatus = 'Test connection to apply settings';
      }
      else {
        newState.connectionStatus = 'Required tenant property LeadsApiUrl not set';
      }
    }
    this.setState(newState, (): void => {
      this.saveSettings();
    });
  }

  private setRegion = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    const newRegion: string | undefined = option.key === '' ? undefined : option.key.toString();
    this.settings.region = newRegion;
    this.setState({ region: newRegion }, (): void => {
      this.saveSettings();
    });
  }

  private setQuarterlyOnly = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.settings.quarterlyOnly = checked;
    this.setState({ quarterlyOnly: checked }, (): void => {
      this.saveSettings();
    });
  }

  private testConnection = (): void => {
    this.setState({
      connectionStatus: 'Connecting to the API...'
    });

    this.props.httpClient
      .get(this.state.apiUrl, HttpClient.configurations.v1)
      .then((res: HttpClientResponse): void => {
        if (res.ok) {
          this.setState({
            needsConfiguration: false,
            connectionStatus: 'Connection OK'
          }, (): void => {
            this.saveSettings();
          });
        }
        else {
          this.setState({
            needsConfiguration: true,
            connectionStatus: `Connection error: ${res.statusText}`
          });
        }
      }, (error: any): void => {
        this.setState({
          needsConfiguration: true,
          connectionStatus: `Connection error: ${error}`
        });
      });
  }

  private saveSettings(): void {
    if (!this.state.needsConfiguration) {
      SettingsManager.setSettings(this.settings);
    }
  }

  public componentWillMount(): void {
    this.settings = SettingsManager.getSettings();
    let leadsApiUrl: string;
    SettingsManager
      .getLeadsApiUrl(this.props.spHttpClient, this.props.webUrl)
      .then((_leadsApiUrl: string): Promise<void> => {
        leadsApiUrl = _leadsApiUrl;
        return Promise.resolve();
      }, () => Promise.resolve())
      .then((): void => {
        this.setState({
          apiUrl: leadsApiUrl,
          demo: this.settings.demo,
          quarterlyOnly: this.settings.quarterlyOnly,
          region: this.settings.region,
          needsConfiguration: !this.settings.demo && typeof leadsApiUrl !== 'undefined',
          connectionStatus: !this.settings.demo && typeof leadsApiUrl === 'undefined' ? 'Required tenant property LeadsApiUrl not set' : undefined
        });
      });
  }

  public render(): React.ReactElement<ILeadsSettingsProps> {
    const testConnectionButtonDisabled: boolean = this.state.demo || this.state.needsConfiguration === false || !this.state.apiUrl;
    const connectionLabelStyles = { display: this.state.demo ? 'none' : 'block' };
    return (
      <div className={css(styles.leadsSettings, 'ms-Fabric')}>
        <div className={styles.title}>Leads settings</div>
        <div className={styles.section}>
          <div className={styles.subTitle}>Data</div>
          <Toggle label="Demo mode" checked={this.state.demo} onText="On" offText="Off" onChange={this.setDemoMode} />
        </div>
        <div className={styles.section}>
          <div className={styles.subTitle}>Filtering options</div>
          <Dropdown
            label="Region"
            options={[
              { key: '', text: '' },
              { key: '1', text: 'America' },
              { key: '2', text: 'Europe' },
              { key: '3', text: 'Asia' },
              { key: '4', text: 'South Pole' }
            ]}
            defaultSelectedKey={this.state.region}
            onChange={this.setRegion} />
          <Toggle label="Only this quarter" checked={this.state.quarterlyOnly} onText="On" offText="Off" onChange={this.setQuarterlyOnly} />
        </div>
        <div className={styles.section}>
          <div className={styles.subTitle}>Connection Validation</div>
          <TextField label="LOB API URL" placeholder='Not configured' defaultValue={this.state.apiUrl} disabled={true} />
          <PrimaryButton onClick={this.testConnection} disabled={testConnectionButtonDisabled} className={styles.testConnection}>Test connection</PrimaryButton>
          <Label style={connectionLabelStyles}>{this.state.connectionStatus}</Label>
        </div>
      </div>
    );
  }
}
