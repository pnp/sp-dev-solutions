import * as strings from 'ColumnFormatterWebPartStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Dispatch } from 'redux';

import { selectTab } from '../../state/Actions';
import { IApplicationState } from '../../state/State';
import { ColumnFormatterDataPanel } from '../Panels/Data/ColumnFormatterDataPanel';
import { ColumnFormatterTreePanel } from '../Panels/Tree/ColumnFormatterTreePanel';
import { ColumnFormatterWizardPanel } from '../Panels/Wizard/ColumnFormatterWizardPanel';

export interface IColumnFormatterPropertyPaneProps {
	wizardTabVisible?: boolean;
	tabIndex?: number;
	selectTab?: (index:number) => void;
}

class ColumnFormatterPropertyPane_ extends React.Component<IColumnFormatterPropertyPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPropertyPaneProps> {
		return (
		  <Tabs
			 selectedIndex={this.props.tabIndex}
			 onSelect={this.onSelectTab}>
			 	{this.props.wizardTabVisible && (
					 <TabPanel forceRender={true}>
						<ColumnFormatterWizardPanel/>
					</TabPanel>
				)}
				<TabPanel>
					<ColumnFormatterDataPanel/>
				</TabPanel>
				<TabPanel>
					<ColumnFormatterTreePanel/>
				</TabPanel>
				<TabList>
					{this.props.wizardTabVisible && (
						<Tab><Icon iconName='LightningBolt'/><span>{strings.Tab_Wizard}</span></Tab>
					)}
					<Tab><Icon iconName='TextField'/><span>{strings.Tab_Data}</span></Tab>
					<Tab><Icon iconName='Bookmarks'/><span>{strings.Tab_Tree}</span></Tab>
				</TabList>
		  </Tabs>
		);
	}

	@autobind
	private onSelectTab(index:number): void {
		this.props.selectTab(index);
	}
}

function mapStateToProps(state: IApplicationState): IColumnFormatterPropertyPaneProps{
	return {
		tabIndex: state.ui.tabs.propertyTab,
		wizardTabVisible: state.ui.tabs.wizardTabVisible
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterPropertyPaneProps>): IColumnFormatterPropertyPaneProps{
	return {
		selectTab: (index:number) => {
			dispatch(selectTab('property', index));
		}
	};
}

export const ColumnFormatterPropertyPane = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterPropertyPane_);