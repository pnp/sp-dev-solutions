import * as strings from 'ColumnFormatterWebPartStrings';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';

import styles from '../../../ColumnFormatter.module.scss';

const propButtonStyles: Partial<IButtonStyles> = {
	root: {
		width: "14px",
		height: "24px",
		padding: "0"
	},
	icon: {
		fontSize: "12px",
		lineHeight: "21px"
	}
};

export interface ISubPropsButtonProps {
	iconName?:string;
	tooltip?:string;
	onClick: () => void;
}

export class SubPropsButton extends React.Component<ISubPropsButtonProps, {}> {
	public render(): React.ReactElement<ISubPropsButtonProps> {
		return (
			<IconButton
			 iconProps={{iconName: this.props.iconName || 'CustomList'}}
			 title={this.props.tooltip || strings.DataColumn_SubPropertiesHeadline}
			 onClick={this.props.onClick}
			 styles={propButtonStyles}/>
		);
	}
}