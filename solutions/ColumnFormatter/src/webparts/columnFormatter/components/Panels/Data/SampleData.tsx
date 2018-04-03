import * as strings from 'ColumnFormatterWebPartStrings';
import { IButtonStyles, IconButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    addDataColumn,
    addDataRow,
    removeDataColumn,
    removeDataRow,
    updateDataColumnName,
    updateDataColumnType,
    updateDataRow,
} from '../../../state/Actions';
import {
    columnTypes,
    IApplicationState,
    IDataColumn,
    ILinkFieldValue,
    ILookupFieldValue,
    IPersonFieldValue,
} from '../../../state/State';
import styles from '../../ColumnFormatter.module.scss';
import { DataColumnHeader } from './DataColumnHeader';
import { SampleBoolean } from './SampleValues/SampleBoolean';
import { SampleDateTime } from './SampleValues/SampleDateTime';
import { SampleLink } from './SampleValues/SampleLink';
import { SampleLookup } from './SampleValues/SampleLookup';
import { SampleNumber } from './SampleValues/SampleNumber';
import { SamplePerson } from './SampleValues/SamplePerson';
import { SampleText } from './SampleValues/SampleText';

const buttonStyles: Partial<IButtonStyles> = {
	root: {
		width: "22px",
		height: "26px",
		padding: "0",
		paddingLeft: '3px'
	},
	icon: {
		margin: 0
	}
};

export interface ISampleDataProps {
	columns?: Array<IDataColumn>;
	rows?: Array<Array<any>>;
	updateRow?: (rowIndex:number, colIndex:number, value:any) => void;
	updateColumnName?: (colIndex:number, name:string) => void;
	updateColumnType?: (colIndex:number, colType:columnTypes) => void;
	addRow?: () => void;
	removeRow?: (rowIndex:number) => void;
	addColumn?: () => void;
	removeColumn?: (colIndex:number) => void;
}

class SampleData_ extends React.Component<ISampleDataProps, {}> {
	public render(): React.ReactElement<ISampleDataProps> {
		return (
		  <div>
				<table className={styles.dataTable} cellPadding={0} cellSpacing={0}>
					<thead>
						<tr>
							<td className={styles.removeButton}>&nbsp;</td>
							{this.props.columns.map((column:IDataColumn, index:number) => {
								return (
									<td key={index}>
										<DataColumnHeader
										 name={column.name}
										 type={column.type}
										 editable={index > 0}
										 onNameChanged={(newValue:string): void => {this.props.updateColumnName(index,newValue);}}
										 onTypeChanged={(newValue:columnTypes): void => {this.props.updateColumnType(index,newValue);}}/>
									</td>
								);
							})}
							<td className={styles.addButton}>
								<IconButton
								 iconProps={{iconName:'AddTo'}}
								 title={strings.DataColumn_AddColumn}
								 styles={buttonStyles}
								 onClick={() => {this.props.addColumn();}}/>
							</td>
						</tr>
					</thead>
					<tbody>
						{this.props.rows.map((row:Array<any>, rIndex:number) => {
							return (
								<tr key={rIndex}>
									{this.props.rows.length > 1 && (
										<td className={styles.removeButton}>
											<IconButton
											 iconProps={{iconName:'Blocked2'}}
											 title={strings.DataColumn_DeleteRow}
											 styles={buttonStyles}
											 onClick={() => {this.props.removeRow(rIndex);}}/>
										</td>
									)}
									{this.props.rows.length == 1 && (
										<td className={styles.removeButton}>&nbsp;</td>
									)}
									{row.map((value:any, cIndex:number) =>{
										return (
											<td key={cIndex}>
												{this.sampleElement(value, rIndex, cIndex)}
											</td>
										);
									})}
									<td className={styles.addButton}>&nbsp;</td>
								</tr>
							);
						})}
						<tr>
							<td className={styles.removeButton}>&nbsp;</td>
							{this.props.columns.map((column:IDataColumn, index:number) => {
								if(index == 0){
									return (
										<td key={index} className={styles.addButton}>
											<IconButton
											 iconProps={{iconName:'AddTo'}}
											 title={strings.DataColumn_AddRow}
											 styles={buttonStyles}
											 onClick={() => {this.props.addRow();}}/>
										</td>
									);
								}
								return (
									<td key={index} className={styles.removeButton}>
										<IconButton
										iconProps={{iconName:'Blocked2'}}
										title={strings.DataColumn_DeleteColumn}
										styles={buttonStyles}
										onClick={() => {this.props.removeColumn(index);}}/>
									</td>
								);
							})}
							<td className={styles.addButton}>&nbsp;</td>
						</tr>
					</tbody>
				</table>
		  </div>
		);
	}

	private sampleElement(value:any, rIndex:number, cIndex:number): JSX.Element {
		switch (this.props.columns[cIndex].type) {
			case columnTypes.boolean:
				return (<SampleBoolean value={value} onChanged={(newValue:any) => {this.props.updateRow(rIndex, cIndex, newValue);}}/> );
			case columnTypes.lookup:
				return (<SampleLookup value={value} onChanged={(newValue:ILookupFieldValue) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.link:
			case columnTypes.picture:
				return (<SampleLink value={value} onChanged={(newValue:ILinkFieldValue) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.number:
				return (<SampleNumber value={value} onChanged={(newValue:number) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.person:
				return (<SamplePerson value={value} onChanged={(newValue:IPersonFieldValue) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			case columnTypes.datetime:
				return (<SampleDateTime value={value} onChanged={(newValue:Date) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
			default:
				return (<SampleText value={value} onChanged={(newValue:string) => {this.props.updateRow(rIndex, cIndex, newValue);}}/>);
		}
	}
}

function mapStateToProps(state: IApplicationState): ISampleDataProps{
	return {
		columns: state.data.columns,
		rows: state.data.rows
	};
}

function mapDispatchToProps(dispatch: Dispatch<ISampleDataProps>): ISampleDataProps{
	return {
		updateRow: (rowIndex:number, colIndex:number, value: any) => {
			dispatch(updateDataRow(rowIndex, colIndex, value));
		},
		updateColumnName: (colIndex:number, name:string) => {
			dispatch(updateDataColumnName(colIndex, name));
		},
		updateColumnType: (colIndex:number, colType:columnTypes) => {
			dispatch(updateDataColumnType(colIndex, colType));
		},
		addRow: () => {
			dispatch(addDataRow());
		},
		removeRow: (rowIndex:number) => {
			dispatch(removeDataRow(rowIndex));
		},
		addColumn: () => {
			dispatch(addDataColumn());
		},
		removeColumn: (colIndex:number) => {
			dispatch(removeDataColumn(colIndex));
		}
	};
}

export const SampleData = connect(mapStateToProps, mapDispatchToProps)(SampleData_);