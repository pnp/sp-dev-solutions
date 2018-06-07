import * as strings from "ColumnFormatterWebPartStrings";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dialog, DialogFooter, DialogType } from "office-ui-fabric-react/lib/Dialog";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';

import styles from "../ColumnFormatter.module.scss";
import { IFSParseError, IFSParseResult } from "./FormatScript";
import { FormatScriptEditor } from "./FormatScriptEditor";

const iconStyles: Partial<IIconStyles> = {
	root: {
		width: "20px",
		height: "100%",
		padding: "0",
		fontSize: "20px",
		lineHeight: "20px",
		cursor: "default"
	}
};

export interface IFormatScriptEditorDialogProps {
	initialValue: string;
	theme: string;
	visible: boolean;
	dialogTitle: string;
	onSave: (result: any) => void;
	onCancel: () => void;
}

export interface IFormatScriptEditorDialogState {
	hasChanged: boolean;
	canSave: boolean;
	extraErrors?: Array<string>;
}

export class FormatScriptEditorDialog extends React.Component<IFormatScriptEditorDialogProps, IFormatScriptEditorDialogState> {

	private _container: HTMLElement;
	private _editor: any;
	private _resultObject: any;

	public constructor(props:IFormatScriptEditorDialogProps) {
		super(props);

		this.state = {
			hasChanged: false,
			canSave: true,
		};
	}
	/*<div className={styles.buttonBox + ' ' + (isValid ? styles.valid : styles.invalid)}>
				<Icon
				 iconName={isValid ? 'Emoji2' : 'EmojiDisappointed'}
				 title={isValid ? strings.PreviewValidation_Good : strings.PreviewValidation_Bad + '\n' + this.props.validationErrors.join('\n') + this.props.formatterErrors.join('\n')}
				 styles={iconStyles}/>
			</div>
			title={this.state.canSave ? strings.FormatScriptValidation_Good : strings.FormatScriptValidation_Bad + '\n' + this.state.extraErrors.join('\n')}
			<div class="ms-Button-flexContainer css-110"><i role="presentation" aria-hidden="true" data-icon-name="Emoji2" class="ms-Icon css-68 root-64 ms-Button-icon css-120"></i></div>*/

	public render(): React.ReactElement<IFormatScriptEditorDialogProps> {
		return (
			<Dialog
				 hidden={!this.props.visible}
				 dialogContentProps={{
					type: DialogType.normal,
					title: this.props.dialogTitle,
					topButtonsProps: [{
						uniqueId: "vsValidation",
						className: (this.state.canSave || !this.state.hasChanged) ? styles.valid : styles.invalid,
						styles: {
							root: {
								paddingRight: "24px",
								paddingTop: "12px",
								cursor: "default",
							},
						},
						onRenderIcon: ():JSX.Element => {
							return (
								<Icon
				 				 iconName={(this.state.canSave || !this.state.hasChanged) ? 'Emoji2' : 'EmojiDisappointed'}
				 				 title={this.state.canSave ? strings.FormatScriptValidation_Good : strings.FormatScriptValidation_Bad + '\n' + this.state.extraErrors.join('\n')}
				 				 styles={iconStyles}/>
							);
						},
					}],
				}}
				modalProps={{
					isBlocking: true,
					className: styles.formatScriptDialog
				}}>

				<FormatScriptEditor
				 initialValue={this.props.initialValue}
				 theme={this.props.theme}
				 onValueChanged={this.onValueChanged}/>

				<DialogFooter>
					<PrimaryButton
					 text={strings.Dialog_Save}
					 disabled={!(this.state.canSave && this.state.hasChanged)}
					 onClick={()=>{this.props.onSave(this._resultObject);}}/>
					<DefaultButton
					 text={strings.Dialog_Cancel}
					 onClick={()=>{this.props.onCancel();}}/>
				</DialogFooter>
			</Dialog>
		);
	}

	@autobind
	public onValueChanged(parseResult:IFSParseResult): void {
		if (parseResult.errors.length > 0) {
			this._resultObject = undefined;

			this.setState({
				hasChanged: true,
				canSave: false,
				extraErrors: parseResult.errors.filter((val:IFSParseError) => {
					return typeof val.loc == "undefined";
				}).map((error:IFSParseError) => {
					return error.message;
				})
			});
		} else {
			this._resultObject = parseResult.result;
			this.setState({
				hasChanged: true,
				canSave: true,
				extraErrors: undefined,
			});
		}
	}
}