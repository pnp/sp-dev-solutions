import * as React from "react";
import { IDocumentCardPreviewProps, DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity, DocumentCardType } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import PreviewContainer from '../PreviewContainer/PreviewContainer';
import { PreviewType } from '../PreviewContainer/IPreviewContainerProps';
import { Link } from 'office-ui-fabric-react/lib/Link';

export interface IDocumentCardItemProps {
    title?: string; 
    href?: string; 
    previewImage? :string;
    date?: string;
    profileImage?: string;
    previewUrl?: string;
    author?: string;
    iconSrc?: string;
}

export interface IDocumentCardItemState {
    showCallout: boolean;
}

export class DocumentCardItem extends React.Component<IDocumentCardItemProps, IDocumentCardItemState> {

    private documentCardPreviewRef = React.createRef<HTMLDivElement>();

    public constructor(props: IDocumentCardItemProps) {
        super(props);

        this.state = {
            showCallout: false
        };
    }

    public render() {

        let renderPreviewCallout = null;
        
        if(this.state.showCallout) {
            renderPreviewCallout = <PreviewContainer
                elementUrl={this.props.previewUrl}
                previewImageUrl={this.props.previewImage}
                previewType={PreviewType.Document}
                targetElement={this.documentCardPreviewRef.current}
                showPreview={this.state.showCallout}
            />;
        }
        
        const previewProps: IDocumentCardPreviewProps = {
            previewImages: [
              {
                name: this.props.title,
                previewImageSrc: this.props.previewImage,
                imageFit: ImageFit.center,
                iconSrc: this.props.iconSrc,
                width: 318,
                height: 196
              }
            ]
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
                        <div ref={this.documentCardPreviewRef}>
                            <DocumentCardPreview {...previewProps} />
                        </div>
                        <Link href={this.props.href} target='_blank'>
                            <DocumentCardTitle
                                title={this.props.title}
                                shouldTruncate={true}
                
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