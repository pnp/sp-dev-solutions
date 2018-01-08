import * as React from 'react';

import styles from '../../ColumnFormatter.module.scss';
import { PreviewHeader } from './PreviewHeader';
import { PreviewView } from './PreviewView';

export interface IColumnFormatterPreviewPanelProps {
}  

export class ColumnFormatterPreviewPanel extends React.Component<IColumnFormatterPreviewPanelProps, {}> {
	public render(): React.ReactElement<IColumnFormatterPreviewPanelProps> {
		return (
		  <div className={styles.panel}>
				<PreviewHeader/>
				<PreviewView/>
		  </div>
		);
	}
}