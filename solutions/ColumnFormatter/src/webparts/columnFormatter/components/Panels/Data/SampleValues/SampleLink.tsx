import * as strings from 'ColumnFormatterWebPartStrings';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { ILinkFieldValue } from '../../../../state/State';
import styles from '../../../ColumnFormatter.module.scss';
import { SubPropsButton } from './SubPropsButton';

export interface ISampleLinkProps {
	value: ILinkFieldValue;
	onChanged: (newValue:ILinkFieldValue) => void;
}

export interface ISampleLinkState {
	subPropertiesVisible: boolean;
}

export class SampleLink extends React.Component<ISampleLinkProps, ISampleLinkState> {
	
	private _container: HTMLElement;

	public constructor(props:ISampleLinkProps){
		super(props);

		this.state = {
			subPropertiesVisible: false
		};
	}

	public render(): React.ReactElement<ISampleLinkProps> {
		return (
		  <div className={styles.propAndButtonBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					<TextField
					 value={this.props.value.URL}
					 onChanged={this.linkURLChanged}/>
				</div>
				<div className={styles.buttonBox}>
					<SubPropsButton
					 onClick={this.subPropertiesButtonClick}/>
				</div>
				{this.state.subPropertiesVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline={strings.DataColumn_SubPropertiesHeadline}
					 onDismiss={this.subPropertiesButtonClick}>
					 	<div className={styles.tbTextFieldOverride}>
							<TextField
							 value={this.props.value.desc}
							 onChanged={this.linkDescChanged}
							 label={strings.DataColumn_LinkDescriptionLabel + ':'}/>
						</div>
					</TeachingBubble>
				)}
		  </div>
		);
	}

	@autobind
	private linkURLChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			URL: newValue
		});
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private linkDescChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			desc: newValue
		});
	}
}