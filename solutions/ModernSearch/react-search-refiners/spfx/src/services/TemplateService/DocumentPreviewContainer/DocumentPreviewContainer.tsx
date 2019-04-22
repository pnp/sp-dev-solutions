import * as React from                                                 'react';
import IDocumentPreviewContainerProps from './IDocumentPreviewContainerProps';
import IDocumentPreviewContainerState from './IDocumentPreviewContainerState';
import { Callout } from 'office-ui-fabric-react/lib/components/Callout';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import templateStyles from '../BaseTemplateService.module.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';

export default class DocumentPreviewContainer extends React.Component<IDocumentPreviewContainerProps, IDocumentPreviewContainerState> {

    public constructor(props: IDocumentPreviewContainerProps) {
        super(props);
        this.state = {
            showCallout: false,
            isLoading: true
        };

        this._onCloseCallout = this._onCloseCallout.bind(this);
    }

    public render(): React.ReactElement<IDocumentPreviewContainerProps> {

        let renderLoading: JSX.Element = this.state.isLoading ? <Overlay isDarkThemed={false} className={templateStyles.overlay}><Spinner size={ SpinnerSize.large }/></Overlay>: null;
        let backgroundImage = this.state.isLoading ? `url('${this.props.previewImageUrl}')` : 'none';
 
        return  <Callout 
                    gapSpace={0} 
                    target={this.props.targetElement} 
                    hidden={false} 
                    className={`${!this.state.showCallout ? templateStyles.hide : ''} ${templateStyles.calloutContainer}`}
                    preventDismissOnScroll={true}
                    onDismiss={this._onCloseCallout}
                    setInitialFocus={true}
                    >
                    <div className={templateStyles.calloutHeader}>
                        <IconButton iconProps={{
                            iconName: 'ChromeClose',
                            onClick: this._onCloseCallout
                        }}></IconButton>
                    </div>
                    <div className={templateStyles.calloutContentContainer} style={{backgroundImage: backgroundImage}}>
                        {renderLoading}
                        <div className={`${templateStyles.iframeContainer} ${this.state.isLoading ? templateStyles.hide : ''}`}>
                            <iframe 
                                src={this.props.iFrameUrl} frameBorder="0"
                                allowFullScreen
                                allowTransparency
                                onLoad={() => { this.setState({ isLoading: false}); }}
                            >
                            </iframe>;
                        </div>
                    </div>
                </Callout>;
    }

    public componentDidMount() {
        this.setState({
            showCallout: this.props.showPreview
        });
    }   

    public componentWillReceiveProps(nextProps: IDocumentPreviewContainerProps) {
        this.setState({
            showCallout: nextProps.showPreview
        });
    }

    private _onCloseCallout() {
        this.setState({
            showCallout: false
        });
    }
}
