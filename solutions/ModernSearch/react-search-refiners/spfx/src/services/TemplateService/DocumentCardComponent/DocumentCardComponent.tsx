import * as React from "react";
import { IDocumentCardPreviewProps, DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity, DocumentCardType } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import PreviewContainer from '../PreviewContainer/PreviewContainer';
import { PreviewType } from '../PreviewContainer/IPreviewContainerProps';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IDocumentCardFieldsConfiguration } from "../BaseTemplateService";
import * as Handlebars from 'handlebars';

/**
 * Document card props. These properties are retrieved from the web component attributes. They must be camel case.
 * (ex: a 'preview-image' HTML attribute becomes 'previewImage' prop, etc.)
 */
export interface IDocumentCardComponentProps {

    // Context
    item?: string;

    // Fields configuration object
    fieldsConfiguration?: string;

    // Individual content properties
    title?: string; 
    href?: string; 
    previewImage? :string;
    date?: string;
    profileImage?: string;
    previewUrl?: string;
    author?: string;
    iconSrc?: string;
    fileExtension?: string;

    // Behavior properties
    enablePreview?: boolean;
    showFileIcon?: boolean;
    isVideo?: boolean;
}

export interface IDocumentCardComponentState {
    showCallout: boolean;
}

export class DocumentCardComponent extends React.Component<IDocumentCardComponentProps, IDocumentCardComponentState> {

    private documentCardPreviewRef = React.createRef<HTMLDivElement>();

    public constructor(props: IDocumentCardComponentProps) {
        super(props);

        this.state = {
            showCallout: false
        };
    }

    public render() {

        let renderPreviewCallout = null;
        let processedProps = this._processFieldsConfiguration();
        
        if (this.state.showCallout && processedProps.previewUrl && this.props.enablePreview) {

            renderPreviewCallout = <PreviewContainer
                elementUrl={processedProps.previewUrl}
                previewImageUrl={processedProps.previewImage}
                previewType={processedProps.isVideo ? PreviewType.Video : PreviewType.Document}
                targetElement={this.documentCardPreviewRef.current}
                showPreview={this.state.showCallout}
                videoProps={{
                    fileExtension: processedProps.fileExtension
                }}
            />;
        }
        
        const previewProps: IDocumentCardPreviewProps = {
            previewImages: [
              {
                name: processedProps.title,
                previewImageSrc: processedProps.previewImage,
                imageFit: ImageFit.cover,
                iconSrc: this.props.isVideo || !this.props.showFileIcon ? '' : processedProps.iconSrc,
                width: 318,
                height: 196
              }
            ]
        };

        const playButtonStyles: React.CSSProperties = {
            color: '#fff',
            padding: '15px',
            backgroundColor: 'gray',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            zIndex: 1,
            opacity: 0.9,
            borderRadius: '50%',
            borderColor: '#fff',
            borderWidth: 4,
            borderStyle: 'solid',
            display: 'flex',
        };
      
        return <div>
                    <DocumentCard 
                        onClick={() => {
                        this.setState({
                            showCallout: true
                        });
                    }}
                    styles={
                        {
                            root: {
                                marginBottom: 15,
                                display: 'block'
                            }
                        }
                    }
                    type={DocumentCardType.normal}
                    >
                        <div ref={this.documentCardPreviewRef} style={{ position: 'relative'}}>
                            { this.props.isVideo ? 
                                <div style={ playButtonStyles }>
                                    <i className="ms-Icon ms-Icon--Play ms-font-xl" aria-hidden="true"></i>
                                </div> : null
                            }
                            <DocumentCardPreview {...previewProps} />
                        </div>
                        <Link href={processedProps.href} target='_blank' styles={{
                            root: {
                                selectors: {
                                    ':hover': {
                                      textDecoration: 'underline'
                                    }
                                }
                            }
                        }}>
                            <DocumentCardTitle
                                title={processedProps.title}
                                shouldTruncate={false}                
                            />                           
                        </Link>
                        <DocumentCardActivity
                        activity={processedProps.date}
                        people={[{ name: processedProps.author, profileImageSrc: processedProps.profileImage}]}
                        />           
                    </DocumentCard>
                    {renderPreviewCallout}
                </div>;
    }

    private _processFieldsConfiguration(): IDocumentCardComponentProps {

        let processedProps: IDocumentCardComponentProps = {};

        if (this.props.fieldsConfiguration && this.props.item) {

            // Get item properties
            const item = JSON.parse(this.props.item);

            // Use configuration
            const configuration: IDocumentCardFieldsConfiguration[] = JSON.parse(this.props.fieldsConfiguration);
            configuration.map(configuration => { 
                
                let processedValue = item[configuration.value];
                
                if (configuration.useHandlebarsExpr ) {
                    
                    try {
                        // Create a temp context with the current so we cab use global registered helper on the current item
                        const tempTemplateContent = `{{#with item as |item|}}${configuration.value}{{/with}}`;
                        let template = Handlebars.compile(tempTemplateContent);

                        // Pass the current item as context
                        processedValue = template({
                            item: item
                        });

                        processedValue = processedValue ? processedValue.trim() : null;

                    } catch (error) {
                        processedValue = `###Error: ${error.message}###`;
                    }
                }

                processedProps[configuration.field] = processedValue;
            });

            return processedProps;
        } else {

            // Use inline attributes 
            processedProps = this.props;
        }

        return processedProps;
    }
}