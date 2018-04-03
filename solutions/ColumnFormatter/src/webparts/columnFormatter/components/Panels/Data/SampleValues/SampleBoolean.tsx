import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';

export interface ISampleBooleanProps {
	value: boolean;
	onChanged: (newValue:any) => void;
}

export class SampleBoolean extends React.Component<ISampleBooleanProps, {}> {
	public render(): React.ReactElement<ISampleBooleanProps> {
		return (
		  <div>
				<Toggle
				 defaultChecked={this.props.value}
				 onChanged={this.props.onChanged}/>
		  </div>
		);
	}
}