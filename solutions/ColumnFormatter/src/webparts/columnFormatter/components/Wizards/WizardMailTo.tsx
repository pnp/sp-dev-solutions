import * as strings from 'ColumnFormatterWebPartStrings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import * as React from 'react';

import { columnTypes, IDataColumn, IPersonFieldValue, IUserContext } from '../../state/State';
import { generatePerson, generateRowValue } from '../../state/ValueGeneration';
import styles from '../ColumnFormatter.module.scss';
import { IWizard, standardWizardStartingColumns } from './WizardCommon';

/*
Wizard Tab Rendering
*/

export interface IWizardMailToPanelProps {
	displayValue: string;
	iconLink: boolean;
	subject?: string;
	body?: string;
	bcc?: string;
	cc?: string;
	updateValues:(displayValue:string, iconLink:boolean, subject:string, body:string, cc:string, bcc:string) => void;
}

export interface IWizardMailToPanelState {
	displayValue: string;
	iconLink: boolean;
	subject: string;
	body: string;
	bcc: string;
	cc: string;
}

export class WizardMailToPanel extends React.Component<IWizardMailToPanelProps, IWizardMailToPanelState> {
	
	public constructor(props:IWizardMailToPanelProps){
		super(props);

		this.state = {
			displayValue: props.displayValue,
			iconLink: props.iconLink,
			subject: props.subject || '',
			body: props.body || '',
			bcc: props.bcc || '',
			cc: props.cc || ''
		};
	}

	public render(): React.ReactElement<IWizardMailToPanelProps> {
		return (
			<div>
				<span className={styles.wizardGroupLabel}>{strings.WizardMailToGroupParameters}</span>
				<TextField
				 label={strings.WizardMailToSubject + ':'}
				 value={this.state.subject}
				 onChanged={this.onSubjectChanged}/>
				<TextField
				 label={strings.WizardMailToBody + ':'}
				 value={this.state.body}
				 multiline
				 rows={4}
				 onChanged={this.onBodyChanged}/>
				<TextField
				 label={strings.WizardMailToCC + ':'}
				 value={this.state.cc}
				 iconProps={{iconName:'Mail'}}
				 onChanged={this.onCCChanged}/>
				<TextField
				 label={strings.WizardMailToBCC + ':'}
				 value={this.state.bcc}
				 iconProps={{iconName:'Mail'}}
				 onChanged={this.onBCCChanged}/>
				
				<span className={styles.wizardGroupLabel}>{strings.WizardMailToGroupDisplay}</span>
				<TextField
				 label={strings.WizardMailToDisplayValue + ':'}
				 value={this.state.displayValue}
				 onChanged={this.onDisplayValueChanged}/>
				<Toggle
				 checked={this.state.iconLink}
				 onChanged={this.onIconLinkChanged}
				 onText={strings.WizardMailToIconLink}
				 offText={strings.WizardMailToTextLink}/>
			</div>
		);
	}

	
	@autobind
	private onSubjectChanged(text: string) {
		this.setState({
			subject: text
		});
		this.props.updateValues(this.state.displayValue, this.state.iconLink, text, this.state.body, this.state.cc, this.state.bcc);
	}

	@autobind
	private onBodyChanged(text: string) {
		this.setState({
			body: text
		});
		this.props.updateValues(this.state.displayValue, this.state.iconLink, this.state.subject, text, this.state.cc, this.state.bcc);
	}

	@autobind
	private onCCChanged(text: string) {
		this.setState({
			cc: text
		});
		this.props.updateValues(this.state.displayValue, this.state.iconLink, this.state.subject, this.state.body, text, this.state.bcc);
	}

	@autobind
	private onBCCChanged(text: string) {
		this.setState({
			bcc: text
		});
		this.props.updateValues(this.state.displayValue, this.state.iconLink, this.state.subject, this.state.body, this.state.cc, text);
	}

	@autobind
	private onDisplayValueChanged(text: string) {
		this.setState({
			displayValue: text
		});
		this.props.updateValues(text, this.state.iconLink, this.state.subject, this.state.body, this.state.cc, this.state.bcc);
	}

	@autobind
	private onIconLinkChanged(checked: boolean): void {
		this.setState({ 
			iconLink: checked!
		});
		this.props.updateValues(this.state.displayValue, checked!, this.state.subject, this.state.body, this.state.cc, this.state.bcc);
	}
}


/*
	Wizard Definition
*/

const calculateCode = (colType:columnTypes, displayValue:string, iconLink:boolean, subject:string, body:string, cc:string, bcc:string): string => {
	let toAddress = '@currentField.email';
	if(colType == columnTypes.link) {
		toAddress = '@currentField';
	}


	let mailParams: Array<string> = [
		'            "mailto:",',
		'            "' + toAddress + '"' + ((subject.length || body.length || cc.length || bcc.length) ? ',' : '')
	];
	if(subject.length) {
		mailParams.push('            "?subject=' + encodeURIComponent(subject) + '"' + ((body.length | cc.length | bcc.length) ? ',' : ''));
	}
	if(body.length) {
		mailParams.push('            "' + (subject.length ? '&' : '?') + 'body=' + encodeURIComponent(body) + '"' + ((cc.length | bcc.length) ? ',' : ''));
	}
	if(cc.length) {
		mailParams.push('            "' + ((subject.length || body.length) ? '&' : '?') + 'cc=' + cc + '"' + (bcc.length ? ',' : ''));
	}
	if(bcc.length) {
		mailParams.push('            "' + ((subject.length || body.length || cc.length) ? '&' : '?') + 'bcc=' + bcc + '"');
	}
	
	let children:Array<string> = new Array<string>();
	if(iconLink) {
		children.push(...[
			'    {',
			'      "elmType": "span",',
			'      "style": {',
			'        "padding-right": "8px"',
			'      },',
			'      "txtContent": "' + displayValue + '"',
			'    },',
		]);
	}

	children.push(...[
		'    {',
		'      "elmType": "a",',
		'      "style": {',
		'        "text-decoration": "none"',
		'      },',
		'      "attributes": {',
		'        "href": {',
		'          "operator": "+",',
		'          "operands": [',
		...mailParams,
		'          ]',
		'        }' + (iconLink ? ',' : ''),
	]);
	if(iconLink) {
		children.push(...[
			'        "iconName": "Mail",',
			'        "class": "sp-field-quickActions"',
			'      }',
			'    }',
		]);
	} else {
		children.push(...[
			'      },',
			'      "txtContent": "' + displayValue + '"',
			'    }',
		]);
	}

	return [
		'{',
		'  "$schema": "http://columnformatting.sharepointpnp.com/columnFormattingSchema.json",',
		'  "debugMode": true,',
		'  "elmType": "div",',
		'  "children": [',
		...children,
		'  ]',
		'}'
	].join('\n');
};


export const WizardMailTo: IWizard = {
	name: strings.WizardMailToName,
	description: strings.WizardMailToDescription,
	iconName: 'Mail',
	fieldTypes: [
		columnTypes.person,
		columnTypes.link
	],
	isTemplate: false,
	startingColumns: (colType:columnTypes): Array<IDataColumn> => {return standardWizardStartingColumns(colType);},
	startingRows: (colType:columnTypes, user?:IUserContext): Array<Array<any>> => {
		if(colType == columnTypes.person) {
			return [
				[generateRowValue(colType)],
				[generateRowValue(colType)],
				[{
					title: user.displayName,
					id: 1,
					email: user.email,
					sip: user.email,
					picture: ''
				}],
				[generateRowValue(colType)]
			];
		}
		let link1:IPersonFieldValue = generatePerson();
		let link2:IPersonFieldValue = generatePerson();
		let link3:IPersonFieldValue = generatePerson();
		return [
			[{URL: link1.email, desc: link1.title}],
			[{URL: link2.email, desc: link2.title}],
			[{URL: user.email, desc: user.displayName}],
			[{URL: link3.email, desc: link3.title}]
		];
	},
	startingCode: (colType:columnTypes): string => {
		return calculateCode(colType, (colType == columnTypes.person ? '@currentField.title' : 'Send Mail'), true, 'Hello There!', 'Yo, what up?\r\nWelp, talk to you later!','','');
	},
	onWizardRender: (updateEditorString:(editorString:string) => void, colType:columnTypes): JSX.Element => {
		return (
			<WizardMailToPanel
			 displayValue={colType == columnTypes.person ? '@currentField.title' : 'Send Mail'}
			 iconLink={true}
			 subject='Hello There!'
			 body='Yo, what up?\r\nWelp, talk to you later!'
			 updateValues={(displayValue:string, iconLink:boolean, subject:string, body:string, cc:string, bcc:string) => {
				updateEditorString(calculateCode(colType, displayValue, iconLink, subject, body, cc, bcc));
			 }}/>
		);
	}
};