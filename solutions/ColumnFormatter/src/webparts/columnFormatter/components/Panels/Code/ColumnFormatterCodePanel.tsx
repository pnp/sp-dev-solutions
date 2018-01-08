import * as React from 'react';

import styles from '../../ColumnFormatter.module.scss';
import { CodeEditor } from './CodeEditor';

export interface IColumnFormatterCodePanelProps {
}

export class ColumnFormatterCodePanel extends React.Component<IColumnFormatterCodePanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterCodePanelProps> {
		return (
		  <div className={styles.panel + ' ' + styles.fullPanel}>
				<CodeEditor/>
		  </div>
		);
	}
}