import * as React from "react";
import { Shimmer, ShimmerElementType as ElemType, ShimmerElementsGroup } from 'office-ui-fabric-react/lib/Shimmer';

export interface IPersonaCardShimmersProps {

    /**
     * The persona image size
     */
    personaSize?: string;
}

export class PersonaCardShimmers extends React.Component<IPersonaCardShimmersProps, {}> {
    
    public render() {

        let personaSize: number;

        switch (parseInt(this.props.personaSize)) {
            case 11:
                personaSize = 32;
                break;
            case 12:
                personaSize = 40;
                break;
            case 13:
                personaSize = 48;
                break;
            case 14:
                personaSize = 72;
                break;
            case 15:
                personaSize = 100;
                break;
            default:
                personaSize = 48;
                break;
        }

        return this.getPersonaCardShimmers(personaSize);
    }

    private getPersonaCardShimmers(personaSize: number): JSX.Element {

        const shimmerContent = <div
                                    style={{ 
                                        display: 'flex' ,
                                        marginBottom: 15  
                                    }}
                                >
                                    <div style={{
                                        paddingTop: 8,
                                        paddingRight: 16,
                                        paddingBottom: 8,
                                        width: '100%'
                                    }}>   
                                        
                                        <Shimmer
                                            customElementsGroup={
                                            <div style={{ display: 'flex', marginTop: 10 }}>
                                                <ShimmerElementsGroup
                                                    shimmerElements={[{ type: ElemType.circle, height: personaSize}, { type: ElemType.gap, width: 10, height: personaSize }]}
                                                />
                                                <ShimmerElementsGroup
                                                flexWrap={true}
                                                width="100%"
                                                shimmerElements={[
                                                    { type: ElemType.line, width: '30%', height: 10, verticalAlign: 'center' },
                                                    { type: ElemType.gap, width: '70%', height: personaSize/2 },
                                                    { type: ElemType.line, width: '60%', height: 10, verticalAlign: 'top' },
                                                    { type: ElemType.gap, width: '40%', height: (personaSize/2) }
                                                ]}
                                                />
                                            </div>
                                        }/>
                                        
                                    </div>
                                </div>;

        return shimmerContent;
    }
}