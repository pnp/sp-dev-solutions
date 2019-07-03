import * as React from "react";
import { IDocumentCardPreviewProps, DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity, DocumentCardType } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import PreviewContainer from '../PreviewContainer/PreviewContainer';
import { PreviewType } from '../PreviewContainer/IPreviewContainerProps';
import { Link } from 'office-ui-fabric-react/lib/Link';

/**
 * Document card props. These properties are retrieved from the web component attributes. They must be camel case.
 * (ex: a 'preview-image' HTML attribute becomes 'previewImage' prop, etc.)
 */
export interface IDocumentCardComponentProps {

    // Content properties
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
        
        if (this.state.showCallout && this.props.previewUrl && this.props.enablePreview) {

            renderPreviewCallout = <PreviewContainer
                elementUrl={this.props.previewUrl}
                previewImageUrl={this.props.previewImage}
                previewType={this.props.isVideo ? PreviewType.Video : PreviewType.Document}
                targetElement={this.documentCardPreviewRef.current}
                showPreview={this.state.showCallout}
                videoProps={{
                    fileExtension: this.props.fileExtension
                }}
            />;
        }
        
        const previewProps: IDocumentCardPreviewProps = {
            previewImages: [
              {
                name: this.props.title,
                previewImageSrc: this.props.previewImage,
                imageFit: ImageFit.cover,
                iconSrc: this.props.isVideo || !this.props.showFileIcon ? '' : this.props.iconSrc,
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
                        <Link href={this.props.href} target='_blank' styles={{
                            root: {
                                selectors: {
                                    ':hover': {
                                      textDecoration: 'underline'
                                    }
                                }
                            }
                        }}>
                            <DocumentCardTitle
                                title={this.props.title}
                                shouldTruncate={false}                
                            />                           
                        </Link>
                        <DocumentCardActivity
                        activity={this.props.date}
                        people={[{ name: this.props.author, profileImageSrc: this.props.profileImage}]}
                        />           
                    </DocumentCard>
                    {renderPreviewCallout}
                </div>;
    }
}