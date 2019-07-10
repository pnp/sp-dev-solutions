import * as React from 'react';
import { IMap } from '../../../common/models/Models';
import { IPropertyPaneAccessor } from '@microsoft/sp-webpart-base';
import { correctUrl, getQueryStringValue } from '../../../common/services/utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import styles from './MultilingualRedirector.module.scss';

export interface IMultilingualRedirectorProps {
  map: IMap;
  languageCode: string;
  propertyPane: IPropertyPaneAccessor;
}

export interface IMultilingualRedirectorState {
  redirectUrl: string;
  stayFlag: boolean;
  isInEditMode: boolean;
  isPaneOpen: boolean;
}

export default class MultilingualRedirector extends React.Component<IMultilingualRedirectorProps, IMultilingualRedirectorState> {

  constructor(props: IMultilingualRedirectorProps) {
    super(props);
    this.checkRedirectFlags = this.checkRedirectFlags.bind(this);
    this.createRedirectUrl = this.createRedirectUrl.bind(this);
    this.getState = this.getState.bind(this);
    this.state = {
      redirectUrl: this.createRedirectUrl(),
      stayFlag: getQueryStringValue("Stay") == undefined || getQueryStringValue("Stay") == "" ? false : true,
      isInEditMode: getQueryStringValue("Mode") != undefined && getQueryStringValue("Mode") == "Edit" ? true : false,
      isPaneOpen: this.props.propertyPane.isPropertyPaneOpen()
    };
  }

  public componentDidMount(): void {
    var that = this;
    window.setTimeout(that.checkRedirectFlags.bind(that), 100);
  }

  public render(): React.ReactElement<IMultilingualRedirectorProps> {

    if (this.state.redirectUrl == "") {
      return (<div>Unable to determine where to redirect. Please fill out the route map.</div>);
    }
    else {
      if (!this.state.stayFlag && !this.state.isInEditMode && !this.state.isPaneOpen) {
        return (
          <Layer>
            <div style={{
              lineHeight: "5000px",
              padding: "10px",
              color: "#000",
              backgroundColor: "#fff",
              display: "flex"
            }}>
              Redirecting to: {this.state.redirectUrl}
            </div>
          </Layer>);
      }
      else {
        return (
          <div className={styles.multilingualRedirector}>
            <p>I want to send you here: <a href={this.state.redirectUrl}>{this.state.redirectUrl}</a>, but I can't because one of these flags is set:</p>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "250px", textAlign: "left" }}>Flag</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>'Stay' Querystring Param</td>
                  <td>{this.state.stayFlag == true ? 'True' : 'False'}</td>
                </tr>
                <tr>
                  <td>Page in Edit Mode</td>
                  <td>{this.state.isInEditMode == true ? 'True' : 'False'}</td>
                </tr>
                <tr>
                  <td>Property Pane Open</td>
                  <td>{this.state.isPaneOpen == true ? 'True' : 'False'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }
  }

  private checkRedirectFlags() {
    var that = this;
    let redirectUrl: string = that.createRedirectUrl();
    let stayFlag: boolean = getQueryStringValue("Stay") == undefined || getQueryStringValue("Stay") == "" ? false : true;
    let isInEditMode: boolean = getQueryStringValue("Mode") != undefined && getQueryStringValue("Mode") == "Edit" ? true : false;
    let isPaneOpen: boolean = that.props.propertyPane.isPropertyPaneOpen();

    if (!stayFlag && !isInEditMode && !isPaneOpen) {
      window.location.replace(redirectUrl);
    }
    else {
      if (that.getState().redirectUrl != redirectUrl ||
        that.getState().stayFlag != stayFlag ||
        that.getState().isInEditMode != isInEditMode ||
        that.getState().isPaneOpen != isPaneOpen
      ) {
        that.setState({
          redirectUrl: redirectUrl,
          stayFlag: stayFlag,
          isInEditMode: isInEditMode,
          isPaneOpen: isPaneOpen
        });
      }
      window.setTimeout(that.checkRedirectFlags.bind(that), 100);
    }

  }

  private createRedirectUrl() {
    var route = this.props.map.routes.filter(r => r.code == this.props.languageCode);

    if (route == undefined ||
      route[0] == undefined ||
      route[0].destination == undefined ||
      route[0].destination == "") {
      return "";
    }
    else {
      return correctUrl(route[0].destination);
    }
  }

  private getState(): IMultilingualRedirectorState {
    return this.state;
  }
}
