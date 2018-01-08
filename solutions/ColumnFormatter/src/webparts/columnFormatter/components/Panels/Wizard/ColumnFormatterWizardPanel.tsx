import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { updateEditorString } from '../../../state/Actions';
import { columnTypes, IApplicationState } from '../../../state/State';
import styles from '../../ColumnFormatter.module.scss';
import { getWizardByName, IWizard } from '../../Wizards/WizardCommon';

export interface IColumnFormatterWizardPanelProps {
	wizardName?:string;
	colType?:columnTypes;
	updateEditorString?: (editorString:string) => void;
}

export interface IColumnFormatterWizardPanelState {
	wizard: IWizard;
}

class ColumnFormatterWizardPanel_ extends React.Component<IColumnFormatterWizardPanelProps, IColumnFormatterWizardPanelState> {

	constructor(props:IColumnFormatterWizardPanelProps) {
		super(props);

		this.state = {
			wizard: getWizardByName(props.wizardName)
		};
	}

	public render(): React.ReactElement<IColumnFormatterWizardPanelProps> {

		return (
			<div className={styles.panel}>
				{this.state.wizard !== undefined && !this.state.wizard.isTemplate && (
					<div className={styles.wizardHeader} title={this.state.wizard.description}>
						<Icon iconName={this.state.wizard.iconName}/>
						<span>{this.state.wizard.name}</span>
					</div>
				)}
				<div className={styles.wizardControls}>
					{this.state.wizard !== undefined && !this.state.wizard.isTemplate && this.state.wizard.onWizardRender(this.props.updateEditorString, this.props.colType)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: IApplicationState): IColumnFormatterWizardPanelProps{
	return {
		wizardName: state.code.wizardName,
		colType: state.data.columns[0].type
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterWizardPanelProps>): IColumnFormatterWizardPanelProps{
	return {
		updateEditorString: (editorString) => {
			dispatch(updateEditorString(editorString, []));
		}
    };
}

export const ColumnFormatterWizardPanel = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterWizardPanel_);