import * as React from "react";
import { IDocumentCardPreviewProps, DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity, DocumentCardType, DocumentCardLocation, DocumentCardDetails, IDocumentCardLocationStyleProps, IDocumentCardLocationStyles, IDocumentCardStyleProps, IDocumentCardStyles } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import PreviewContainer from '../PreviewContainer/PreviewContainer';
import { PreviewType } from '../PreviewContainer/IPreviewContainerProps';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TemplateService } from "../TemplateService";
import * as documentCardLocationGetStyles from 'office-ui-fabric-react/lib/components/DocumentCard/DocumentCardLocation.styles';
import { getTheme, mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { merge, trimStart, isEmpty } from '@microsoft/sp-lodash-subset';
import { getFileTypeIconProps, FileIconType } from '@uifabric/file-type-icons';
import { GlobalSettings } from 'office-ui-fabric-react/lib/Utilities';
let globalSettings = (window as any).__globalSettings__;

/**
 * Document card props. These properties are retrieved from the web component attributes. They must be camel case.
 * (ex: a 'preview-image' HTML attribute becomes 'previewImage' prop, etc.)
 */
export interface IDocumentCardComponentProps {

    // Item context
    item?: string;

    // Fields configuration object
    fieldsConfiguration?: string;

    // Individual content properties (i.e web component attributes)
    title?: string;
    location?: string;
    tags?: string;
    href?: string;
    previewImage?: string;
    date?: string;
    profileImage?: string;
    previewUrl?: string;
    author?: string;
    iconSrc?: string;
    iconExt?: string;
    fileExtension?: string;

    // Behavior properties
    enablePreview?: boolean;
    showFileIcon?: boolean;
    isVideo?: boolean;
    isCompact?: boolean;

    /**
     * The current theme settings
     */
    themeVariant?: IReadonlyTheme;
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
        let processedProps: IDocumentCardComponentProps = this.props;

        if (this.props.fieldsConfiguration && this.props.item) {
            processedProps = TemplateService.processFieldsConfiguration<IDocumentCardComponentProps>(this.props.fieldsConfiguration, this.props.item, this.props.themeVariant);
        }

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

        let iconProps;
        // same code as in IconComponent.tsx
        if (!isEmpty(processedProps.iconExt)) {
            if (processedProps.iconExt == "IsListItem") {
                iconProps = getFileTypeIconProps({ type: FileIconType.listItem, size: 16, imageFileType: 'png' });
            } else if (processedProps.iconExt == "IsContainer") {
                iconProps = getFileTypeIconProps({ type: FileIconType.folder, size: 16, imageFileType: 'png' });
            } else {                
                iconProps = getFileTypeIconProps({ extension: processedProps.iconExt, size: 16, imageFileType: 'png' });
            }
        } else {
            iconProps = getFileTypeIconProps({ extension: trimStart(processedProps.fileExtension.trim(), '.'), size: 16, imageFileType: 'png' });
        }

        let previewProps: IDocumentCardPreviewProps = {
            previewImages: [
                {
                    name: processedProps.title,
                    previewImageSrc: processedProps.previewImage,
                    imageFit: ImageFit.centerCover,
                    iconSrc: globalSettings.icons[iconProps.iconName].code.props.src,
                    width: 318,
                    height: 196,
                }
            ],
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

        // Get the current loaded theme
        const theme = merge(getTheme(), this.props.themeVariant);

        // DocumentCard Location styles
        const documentCardLocationProps: IDocumentCardLocationStyleProps = {
            theme: theme
        };

        const documentCardLocationStyles = mergeStyleSets(documentCardLocationGetStyles.getStyles(documentCardLocationProps));
        const documentCardLocationClassNames = classNamesFunction<IDocumentCardLocationStyleProps, IDocumentCardLocationStyles>()(documentCardLocationStyles);

        const documentCardStyles: IDocumentCardStyles = {
            root: {
                marginBottom: 15,
                minHeight: 301
            }
        };

        if (this.props.isCompact) {
            documentCardStyles.root["minHeight"] = '100%';
        }

        return <div>
            <DocumentCard
                onClick={() => {
                    this.setState({
                        showCallout: true
                    });
                }}
                styles={documentCardStyles}
                type={this.props.isCompact ? DocumentCardType.compact : DocumentCardType.normal}
            >
                <div ref={this.documentCardPreviewRef} style={{ position: 'relative', height: '100%' }}>
                    {this.props.isVideo ?
                        <div style={playButtonStyles}>
                            <i className="ms-Icon ms-Icon--Play ms-font-xl" aria-hidden="true"></i>
                        </div> : null
                    }
                    <DocumentCardPreview {...previewProps} />
                </div>
                <DocumentCardDetails>
                    {processedProps.location && !this.props.isCompact ?
                        <div className={documentCardLocationClassNames.root} dangerouslySetInnerHTML={{ __html: processedProps.location }}></div> : null
                    }
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
                    {processedProps.tags && !this.props.isCompact ?
                        <div className={documentCardLocationClassNames.root} dangerouslySetInnerHTML={{ __html: processedProps.tags }}></div> : null
                    }
                    {processedProps.author ?
                        <DocumentCardActivity
                            activity={processedProps.date}
                            people={[{ name: processedProps.author, profileImageSrc: processedProps.profileImage }]}
                        /> : null
                    }
                </DocumentCardDetails>
            </DocumentCard>
            {renderPreviewCallout}
        </div>;
    }
}