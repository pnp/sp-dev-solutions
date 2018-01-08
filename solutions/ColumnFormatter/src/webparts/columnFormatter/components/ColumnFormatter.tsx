import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState, uiState } from '../state/State';
import styles from './ColumnFormatter.module.scss';
import { ColumnFormatterEditor } from './ColumnFormatterEditor';
import { ColumnFormatterWelcome } from './ColumnFormatterWelcome';

export interface IColumnFormatterProps {
  uistate?: uiState;
}

class ColumnFormatter_ extends React.Component<IColumnFormatterProps, {}> {
  public render(): React.ReactElement<IColumnFormatterProps> {
    return (
      <div className={styles.columnFormatter}>
        {this.props.uistate == uiState.welcome && (
          <ColumnFormatterWelcome/>
        )}
        {this.props.uistate == uiState.editing && (
          <ColumnFormatterEditor/>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterProps{
	return {
    uistate: state.ui.state
	};
}

export const ColumnFormatter = connect(mapStateToProps, null)(ColumnFormatter_);