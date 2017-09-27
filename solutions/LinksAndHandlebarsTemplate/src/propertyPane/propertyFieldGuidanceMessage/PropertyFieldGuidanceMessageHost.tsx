import * as React from 'react';
import { FormEvent } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IPropertyFieldGuidancePropsInternal } from './PropertyFieldGuidanceMessage';
import * as strings from 'propertyFieldStrings';

export interface IPropertyFieldGuidanceHostProps extends IPropertyFieldGuidancePropsInternal{}
export interface IPropertyFieldGuidanceHostState{}

export default class PropertyFieldGuidanceHost extends React.Component<IPropertyFieldGuidanceHostProps, IPropertyFieldGuidanceHostState> {
    public constructor(props: IPropertyFieldGuidanceHostProps){
        super(props);
    }
    
    public render(): JSX.Element {
        return (
            <div>
                <span>{strings.GuidanceMessageSegment1}</span>
                <Link target="_blank" href={this.props.url}>{strings.GuidanceMessageLink1Text}</Link>
                <span>{strings.GuidanceMessageSegment2}</span>
            </div>
        );
    }
}