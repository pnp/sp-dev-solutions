import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { TemplateService } from "../TemplateService";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Log } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

const LIVE_PERSONA_COMPONENT_ID: string = "914330ee-2df2-4f6e-a858-30c23a812408";

export interface IPersonaComponentProps {

    // WebPart context
    ctx: WebPartContext;

    // Item context
    item?: string;

    // Fields configuration object
    fieldsConfiguration?: string;

    // Individual content properties (i.e web component attributes)
    imageUrl?: string;
    text?: string;
    secondaryText?: string;
    tertiaryText?: string;
    optionalText?: string;
}

export interface IPersonaComponentState {

    /**
     * Indicates if the SFPFx component is loaded and ready to be used
     */
    isComponentLoaded: boolean;
}

export class PersonaComponent extends React.Component<IPersonaComponentProps, IPersonaComponentState> {

    private sharedLibrary: any;
    
    public constructor(props: IPersonaComponentProps) {
        super(props);

        this.state = {
            isComponentLoaded: false,
        };

        this.sharedLibrary = null;
    }

    public render() {

        let processedProps: IPersonaComponentProps = this.props;

        if (this.props.fieldsConfiguration && this.props.item) {
            processedProps = TemplateService.processFieldsConfiguration<IPersonaComponentProps>(this.props.fieldsConfiguration, this.props.item);
        }
        
        const persona: IPersonaSharedProps = {
            imageUrl: processedProps.imageUrl,
            text: processedProps.text,
            secondaryText: processedProps.secondaryText,
            tertiaryText: processedProps.tertiaryText,
            optionalText: processedProps.optionalText
        };

        let renderPersona: JSX.Element = null;

        if (this.state.isComponentLoaded) {
            renderPersona = React.createElement(this.sharedLibrary.LivePersonaCard, {
                className: 'livePersonaCard',
                clientScenario: "PeopleWebPart",
                disableHover: false,
                hostAppPersonaInfo: {
                  PersonaType: "User"
                },
                upn: processedProps.tertiaryText,
                serviceScope: this.props.ctx.serviceScope,
              }, <Persona {...persona} size={PersonaSize.large} />);
        } else {
            <Persona {...persona} size={PersonaSize.large} />;
        }

        return renderPersona;
    }

    public async componentDidMount() {
        await this._loadSpfxSharedLibrary();
    }

    private async _loadSpfxSharedLibrary() {

        if (!this.state.isComponentLoaded) {

            try {

                this.sharedLibrary = await SPComponentLoader.loadComponentById(LIVE_PERSONA_COMPONENT_ID);   

                this.setState({
                    isComponentLoaded: true
                });
    
            } catch (error) {
               // TODO
            }
        }        
    }
}