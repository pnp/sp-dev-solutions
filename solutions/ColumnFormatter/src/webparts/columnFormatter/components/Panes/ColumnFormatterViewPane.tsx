import * as strings from 'ColumnFormatterWebPartStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Dispatch } from 'redux';

import { resizePane, selectTab } from '../../state/Actions';
import { IApplicationState } from '../../state/State';
import styles from '../ColumnFormatter.module.scss';
import { ColumnFormatterCodePanel } from '../Panels/Code/ColumnFormatterCodePanel';
import { ColumnFormatterPreviewPanel } from '../Panels/Preview/ColumnFormatterPreviewPanel';

var SplitPane = require('react-split-pane');

export interface IColumnFormatterViewPaneProps {
	tabIndex?: number;
	selectTab?: (index:number) => void;
	paneResized?: (size:number) => void;
}

class ColumnFormatterViewPane_ extends React.Component<IColumnFormatterViewPaneProps, {}> {
	public render(): React.ReactElement<IColumnFormatterViewPaneProps> {
		return (
		  <Tabs
		   selectedIndex={this.props.tabIndex}
		   onSelect={this.onSelectTab}>
			  	<TabPanel>
					<ColumnFormatterPreviewPanel/>
				</TabPanel>
				<TabPanel>
					<ColumnFormatterCodePanel/>
				</TabPanel>
				<TabPanel>
					<SplitPane
					split="vertical"
					className={styles.SplitPaneInTab}
					size={209}
					minSize={100}
					maxSize={-100}
					onDragFinished={(size:number) => {this.props.paneResized(size);}}>
						<ColumnFormatterPreviewPanel/>
						<ColumnFormatterCodePanel/>
					</SplitPane>
				</TabPanel>
				<TabList style={{"textAlign":"right"}}>
					<Tab><Icon iconName='RedEye'/><span>{strings.Tab_Preview}</span></Tab>
					<Tab><Icon iconName='Embed'/><span>{strings.Tab_Code}</span></Tab>
					<Tab><Icon iconName='DoubleColumn'/><span>{strings.Tab_Split}</span></Tab>
				</TabList>
		  </Tabs>
		);
	}

	@autobind
	private onSelectTab(index:number): void {
		this.props.selectTab(index);
	}
}

function mapStateToProps(state: IApplicationState): IColumnFormatterViewPaneProps{
	return {
		tabIndex: state.ui.tabs.viewTab
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterViewPaneProps>): IColumnFormatterViewPaneProps{
	return {
		paneResized: (size:number) => {
			dispatch(resizePane('split', size));
		},
		selectTab: (index:number) => {
			dispatch(selectTab('view', index));
		}
	};
}

export const ColumnFormatterViewPane = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterViewPane_);