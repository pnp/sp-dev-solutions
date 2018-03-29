import * as UIFabric from '@uifabric/styling/lib';
import * as strings from 'ColumnFormatterWebPartStrings';
import { ColumnActionsMode, DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as tslib from 'tslib';

import { LocalCustomFormatter, LocalHtmlEncoding } from '../../../../../CustomFormatter/LocalCustomFormatter';
import { IFormatterFieldInfo, LocalCustomFormatterStrings } from '../../../../../CustomFormatter/LocalFieldRendererFormat';
import { updateFormatterErrors } from '../../../state/Actions';
import { columnTypes, IApplicationState, IDataColumn } from '../../../state/State';
import styles from '../../ColumnFormatter.module.scss';

export interface IPreviewViewProps {
	columns?: Array<IDataColumn>;
	rows?: Array<Array<any>>;
	formatterString?: string;
	userEmail?: string;
	updateFormatterErrors?: (formatterErrors:Array<string>) => void;
}

interface IHTMLmarkupObject {
	__html: string;
}

class PreviewView_ extends React.Component<IPreviewViewProps, {}> {

	private _cfContainer: any = {};
	private _heContainer: any = {};

	private _formatterErrors: Array<string>;

	constructor(props:IPreviewViewProps){
		super(props);

		//Build the HTMLEncoding Object
		LocalHtmlEncoding(null,this._heContainer);
		//Build the CustomFormatter Object
		LocalCustomFormatter(null,this._cfContainer,tslib,LocalCustomFormatterStrings,null,this._heContainer,UIFabric);
	}

	public render(): React.ReactElement<IPreviewViewProps> {
		this._formatterErrors = new Array<string>();

		return (
			<div className={styles.previewView}>
			<DetailsList
			 items={this.buildItems()}
			 columns={this.buildColumns()}/>
			 </div>
		);
	}

	public componentDidMount(): void {
		this.evaluateFormatterErrors();
	}

	public componentDidUpdate(): void {
		this.evaluateFormatterErrors();
	}

	private evaluateFormatterErrors(): void {
		this.props.updateFormatterErrors(this._formatterErrors);
	}

	private buildItems(): Array<any> {
		let items:Array<any> = new Array<any>();
		for(var r = 0; r<this.props.rows.length; r++) {
			let item:any = {};
			for(var c = 0; c<this.props.columns.length; c++) {
				item[this.props.columns[c].name] = this.props.rows[r][c];
			}
			items.push(item);
		}
		return items;
	}

	private buildColumns(): Array<IColumn> {
		let columns:Array<IColumn> = new Array<IColumn>();
		//Formatted Column
		columns.push({
			key: this.props.columns[0].name,
			name: this.props.columns[0].name,
			fieldName: this.props.columns[0].name,
			minWidth: 130,
			maxWidth: 130,
			className: 'od-DetailsRow-cell--' + this.colTypeFromEnum(this.props.columns[0].type),
			onRender: (item?: any, index?: number) => {
				return this.formattedMarkup(index);
			}
		});
		//Any extra columns
		for(var c = 1; c<this.props.columns.length; c++) {
			let cIndex:number = c;
			columns.push({
				key: this.props.columns[c].name,
				name: this.props.columns[c].name,
				fieldName: this.props.columns[c].name,
				minWidth: 130,
				maxWidth: 130,
				className: 'od-DetailsRow-cell--' + this.colTypeFromEnum(this.props.columns[c].type),
				onRender: (item:any, index:number) => {
					return this.previewElement(this.props.rows[index][cIndex], index, cIndex);
				}
			});
		}
		//Final spacer (used normally for newcolumn commands, but also prevents huge widths for last column)
		columns.push({
			key: '__newColumnHeaderCommand',
			name: '',
			//iconName: 'Add',
			fieldName: '__newColumnHeaderCommand',
			minWidth: 1,
			maxWidth: 34,
			columnActionsMode: ColumnActionsMode.disabled
		});
		return columns;
	}

	private formattedMarkup(rIndex:number): JSX.Element {
		let formatterFieldInfo: IFormatterFieldInfo = this.getFormatterFieldInfo(rIndex);
		let formatter = new this._cfContainer.CustomFormatter(formatterFieldInfo);
		let htmlString:string = formatter.evaluate();
		let errorString:string = formatter.errors();
		if(errorString.length) {
			this._formatterErrors.push(strings.CFS_RowLabel + ' ' + rIndex.toString() + ': ' + errorString);
		}
		let innerHtml:IHTMLmarkupObject = {
			__html: htmlString
		};
		return (
			<div
			 className='od-FieldRenderer-customFormatter'
			 dangerouslySetInnerHTML={innerHtml}/>
		);
	}

	private previewElement(value:any, rIndex:number, cIndex:number): JSX.Element {
		//Standard Display for other fields
		switch (this.props.columns[cIndex].type) {
			case columnTypes.boolean:
				return (
					<div className='od-FieldRenderer-text'>
						<span>{value ? strings.BoolValueStringTrue : strings.BoolValueStringFalse}</span>
					</div>
				);
			case columnTypes.lookup:
				return (
					<div>
						<button
						 className={'ms-Link ' + styles.root + ' odFieldRender od-FieldRender-lookup'}
						 aria-label={this.props.columns[cIndex].name + ' column, ' + value.lookupValue}
						 tabIndex={-1}>{value.lookupValue}</button>
					</div>
				);
			case columnTypes.link:
				return (
					<a
					 className={'ms-Link ' + styles.root + ' od-FieldRender-display od-FieldRender-display--link ' + styles.isEnabled} 
					 href={value.URL}
					 title={value.desc}
					 target="_blank"
					 tabIndex={-1}>{value.desc}</a>
				);
			case columnTypes.picture:
				return (
					<div
					 className='od-FieldRender-image'
					 data-is-focusable='true'
					 tabIndex={0}>
						<img
						 src={value.URL}
						 title={value.desc}
						 className='od-FieldRender-imageDisplay'/>
					</div>
				);
			case columnTypes.person:
				return(
					<div>
						<div>
							<span
							 className='od-FieldRender od-FieldRender-nofill odFieldRender-person lpc-hoverTarget'
							 data-is-focusable="true"
							 role="button"
							 aria-label={"Person column, " + value.title}
							 tabIndex={0}>{value.title}</span>
						</div>
					</div>
				);
			case columnTypes.datetime:
				return (
					<div className="od-FieldRenderer-date">{value.toLocaleDateString()}</div>
				);
			default:
				return (
					<div className='od-FieldRenderer-text'>
						<span>{value}</span>
					</div>
				);
		}
	}

	private getFormatterFieldInfo(rIndex:number): IFormatterFieldInfo {
		//Apply Formatting
		let row = {
			ID: rIndex
		};
		let rowSchema = {};
		for(var i = 0; i < this.props.columns.length; i++) {
			switch (this.props.columns[i].type) {
				case columnTypes.boolean:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i] ? "Yes" : "No";
					row[this.props.columns[i].name + '.value'] = this.props.rows[rIndex][i] ? "1" : "0";
					break;
				case columnTypes.choice:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i];
					break;
				case columnTypes.datetime:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].toLocaleDateString();
					row[this.props.columns[i].name + '.'] = this.props.rows[rIndex][i].toISOString();
					break;
				case columnTypes.link:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].URL;
					row[this.props.columns[i].name+'.desc'] = this.props.rows[rIndex][i].desc;
					break;
				case columnTypes.lookup:
					row[this.props.columns[i].name] = [{
						...this.props.rows[rIndex][i],
						isSecretFieldValue: false
					}];
					break;
				case columnTypes.number:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].toPrecision(14);
					row[this.props.columns[i].name + '.'] = this.props.rows[rIndex][i];
					break;
				case columnTypes.person:
					row[this.props.columns[i].name] = [this.props.rows[rIndex][i]];
					break;
				case columnTypes.picture:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i].URL;
					row[this.props.columns[i].name+'.desc'] = this.props.rows[rIndex][i].desc;
					break;
				default:
					row[this.props.columns[i].name] = this.props.rows[rIndex][i];
			}
			rowSchema[this.props.columns[i].name] = this.colTypeFromEnum(this.props.columns[i].type);
		}
		
		return {
			currentFieldName: this.props.columns[0].name,
			fieldRendererFormat: this.props.formatterString,
			pageContextInfo: {
				userLoginName: this.props.userEmail
			},
			row: row,
			rowSchema: rowSchema
		};
	}

	private colTypeFromEnum(enumValue:columnTypes): string {
		switch (enumValue) {
			case columnTypes.boolean:
				return "Boolean";
			case columnTypes.choice:
				return "Choice";
			case columnTypes.datetime:
				return "DateTime";
			case columnTypes.link:
				return "Hyperlink";
			case columnTypes.lookup:
				return "Lookup";
			case columnTypes.number:
				return "Number";
			case columnTypes.person:
				return "User";
			case columnTypes.picture:
				return "Image";
			default:
				return "Text";
		}
	}
}

function mapStateToProps(state: IApplicationState): IPreviewViewProps{
	return {
		columns: state.data.columns,
		rows: state.data.rows,
		formatterString: state.code.formatterString,
		userEmail: state.context.user.email
	};
}

function mapDispatchToProps(dispatch: Dispatch<IPreviewViewProps>): IPreviewViewProps{
	return {
		updateFormatterErrors: (formatterErrors:Array<string>) => {
			dispatch(updateFormatterErrors(formatterErrors));
		}
    };
}

export const PreviewView = connect(mapStateToProps, mapDispatchToProps)(PreviewView_);