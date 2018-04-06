import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DialogContent, DialogFooter, DefaultButton, PrimaryButton, autobind } from 'office-ui-fabric-react';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';

interface IConfirmBoxProps {
	title: string;
	message: string;
	okLabel: string;
	cancelLabel: string;
	onConfirm: () => void;
	onCancel?: () => void;
}

class ConfirmBoxComponent extends React.Component<IConfirmBoxProps, {}> {
	public render(): React.ReactElement<IConfirmBoxProps> {
		return (
			<DialogContent
				title={this.props.title}
				subText={this.props.message}
				onDismiss={this._onCancel}
				showCloseButton={false}
			>
				<DialogFooter>
					<PrimaryButton text={this.props.okLabel} title={this.props.okLabel} onClick={this._onConfirm} />
					<DefaultButton
						text={this.props.cancelLabel}
						title={this.props.cancelLabel}
						onClick={this._onCancel}
					/>
				</DialogFooter>
			</DialogContent>
		);
	}

	@autobind
	private _onConfirm() {
		this.props.onConfirm();
	}

	@autobind
	private _onCancel() {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}
}

export class ConfirmDialog extends BaseDialog {
	public isConfirmed: boolean = false;

	constructor(
		public message: string = 'Are you sure ?',
		public title: string = 'Confirm',
		public okLabel: string = 'Ok',
		public cancelLabel: string = 'Cancel'
	) {
		super();
	}

	public render(): void {
		ReactDOM.render(
			<ConfirmBoxComponent
				onConfirm={this._confirm}
				onCancel={this._cancel}
				okLabel={this.okLabel}
				cancelLabel={this.cancelLabel}
				title={this.title}
				message={this.message}
			/>,
			this.domElement
		);
	}

	public getConfig(): IDialogConfiguration {
		return {
			isBlocking: false
		};
	}

	@autobind
	private _confirm(): void {
		this.isConfirmed = true;
		this.close();
	}

	@autobind
	private _cancel(): void {
		this.isConfirmed = false;
		this.close();
	}
}

export interface IConfirmOptions {
	message?: string;
	title?: string;
	okLabel?: string;
	cancelLabel?: string;
}

export class Confirm {
	public static show(options?: IConfirmOptions): Promise<void> {
		options = options || {};
		Confirm._setDefaultOptions(options);
		return new Promise((resolve, reject) => {
			const confirm: ConfirmDialog = new ConfirmDialog(
				options.message,
				options.title,
				options.okLabel,
				options.cancelLabel
			);

			confirm
				.show()
				.then(() => {
					if (confirm.isConfirmed) {
						resolve();
					} else {
						reject();
					}
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	private static _setDefaultOptions(options: IConfirmOptions) {
		// Set default values if needed
		options = options || {};
		options.message = options.message || 'Are you sure ?';
		options.title = options.title || 'Confirm';
		options.okLabel = options.okLabel || 'Ok';
		options.cancelLabel = options.cancelLabel || 'Cancel';
	}
}
