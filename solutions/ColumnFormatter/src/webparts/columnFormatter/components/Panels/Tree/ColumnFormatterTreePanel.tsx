import * as React from "react";

import styles from "../../ColumnFormatter.module.scss";
import { NodeProperties } from "./NodeProperties";
import { TreeView } from "./TreeView";

var SplitPane = require('react-split-pane');


export interface IColumnFormatterTreePanelProps {
}

export interface IColumnFormatterTreePanelState {
}

export class ColumnFormatterTreePanel extends React.Component<IColumnFormatterTreePanelProps, IColumnFormatterTreePanelState> {

	public render(): React.ReactElement<IColumnFormatterTreePanelProps> {
		return (
			<SplitPane
			 split="horizontal"
			 className={styles.SplitPaneInTab}
			 size={150}
			 minSize={60}
			 maxSize={-60}>
				<TreeView/>
				<NodeProperties/>
			</SplitPane>
		);
	}
}
