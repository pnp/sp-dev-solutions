import * as React from 'react';
import styles from './Wizards.module.scss';
import { assign, find } from '@microsoft/sp-lodash-subset';
import { ISiteScriptAction } from '../../models/ISiteScript';
import { IServiceConsumerComponentProps } from '../ISiteDesignsStudioProps';
import {
	CompoundButton,
	DialogFooter,
	DefaultButton,
	PrimaryButton,
	autobind,
	Spinner,
	SpinnerType,
	Icon
} from 'office-ui-fabric-react';

export enum WizardStep {
	EmptyOrWizard,
	Wizard
}

export interface IScriptActionWizardState {
	wizardStep: WizardStep;
	isLoading: boolean;
}

export interface IScriptActionWizardProps extends IServiceConsumerComponentProps {
	actionVerb: string;
	createEmptyLabel?: string;
	createEmptyDescription?: string;
	createMagicLabel: string;
	createMagicDescription: string;
	onScriptActionGenerated: (action: ISiteScriptAction) => void;
	onCancel: () => void;
}

export default abstract class ScriptActionWizard<TProps, TState> extends React.Component<
	IScriptActionWizardProps | TProps,
	IScriptActionWizardState | TState
> {
	constructor(props: IScriptActionWizardProps) {
		super(props);

		this.initState();
	}

	protected initState() {
		this.state = {
			wizardStep: WizardStep.EmptyOrWizard,
			isLoading: false
		};
	}

	public render(): React.ReactElement<IScriptActionWizardProps> {
		let { onCancel, onScriptActionGenerated } = this.props as IScriptActionWizardProps;
		let { isLoading } = this.state as IScriptActionWizardState;
		return (
			<div className={styles.wizard}>
				{this._renderWizardStep()}
				<DialogFooter>
					{this.displayOkButton && <PrimaryButton text="Ok" onClick={this.onActionGenerationRequested} />}
					<DefaultButton text="Cancel" onClick={() => onCancel()} />
				</DialogFooter>
			</div>
		);
	}

	private _renderWizardStep(): JSX.Element {
		let { wizardStep } = this.state as IScriptActionWizardState;
		let { createEmptyLabel, createEmptyDescription, createMagicDescription, createMagicLabel } = this
			.props as IScriptActionWizardProps;
		switch (wizardStep) {
			case WizardStep.EmptyOrWizard:
				return (
					<div className="ms-Grid-row">
						<hr />
						<div className="ms-Grid-col ms-sm6">
							<CompoundButton
								description={createMagicDescription}
								onClick={() => this.goTo(WizardStep.Wizard)}
							>
								{createMagicLabel}
							</CompoundButton>
						</div>
						<div className="ms-Grid-col ms-sm6">
							<CompoundButton description={createEmptyDescription} onClick={this.onEmptyActionChosen}>
								{createEmptyLabel || 'Create empty'}
							</CompoundButton>
						</div>
					</div>
				);
			case WizardStep.Wizard:
				return this.renderSpecificWizard();
		}
	}

	protected goTo(step: WizardStep) {
		this.setState({ wizardStep: step } as any);
	}

	protected setLoading(isLoading: boolean) {
		this.setState({ isLoading: isLoading } as any);
	}

	@autobind
	protected onEmptyActionChosen() {
		let { actionVerb, onScriptActionGenerated } = this.props as IScriptActionWizardProps;
		let action = { verb: actionVerb };
		if (onScriptActionGenerated) {
			onScriptActionGenerated(action);
		}
	}

	@autobind
	protected onActionGenerationRequested() {
		let { actionVerb, onScriptActionGenerated } = this.props as IScriptActionWizardProps;
		this.setLoading(true);
		this.generateActionAsync()
			.then((action) => {
				if (onScriptActionGenerated) {
					onScriptActionGenerated(action);
				}
			})
			.catch((error) => {
				console.log('Error while generating action ', error);
			})
			.then(() => this.setLoading(false));
	}

	protected abstract renderSpecificWizard(): JSX.Element;

	protected abstract get displayOkButton(): boolean;

	protected abstract generateActionAsync(): Promise<ISiteScriptAction>;
}
