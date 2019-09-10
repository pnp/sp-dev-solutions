import * as React from                                                 'react';
import { IPreviewContainerProps, PreviewType } from './IPreviewContainerProps';
import IPreviewContainerState from './IPreviewContainerState';
import { Callout } from 'office-ui-fabric-react/lib/components/Callout';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import templateStyles from '../BaseTemplateService.module.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';

export interface IVideoPlayerProps {
    fileExtension: string;
    videoUrl: string;
    thumbnailSrc: string;
    isVideoPaused: boolean;
}

export class VideoPlayer extends React.Component<IVideoPlayerProps, {}> {

    private _videoPlayer: any;
    private _videoNode: any;

    public render() {
        return  <video ref={ node => this._videoNode = node } className={`video-js vjs-big-play-centered`}>
                    <source src={this.props.videoUrl} type={`video/${this.props.fileExtension}`}/>
                </video>;
    }

    public componentWillUnmount() {
        if (this._videoPlayer) {
            this._videoPlayer.dispose();
        }
    }

    public UNSAFE_componentWillReceiveProps(nextProps: IVideoPlayerProps) {

        if (nextProps.isVideoPaused) {
            if (!this._videoPlayer.paused()) {
                this._videoPlayer.pause();
            }
        }
    }

    public componentDidMount() {

        // Instantiate a new player with Video.js
        this._videoPlayer = new (window as any).searchVideoJS(this._videoNode, {
            controls: true,
            autoplay: false,
            preload: "metadata",
            fluid: true,
            poster: this.props.thumbnailSrc ? this.props.thumbnailSrc : null
        });
    }

}

export default class PreviewContainer extends React.Component<IPreviewContainerProps, IPreviewContainerState> {

    public constructor(props: IPreviewContainerProps) {
        super(props);
        this.state = {
            showCallout: false,
            isLoading: true,
            isVideoPaused: false
        };

        this._onCloseCallout = this._onCloseCallout.bind(this);
    }

    public render(): React.ReactElement<IPreviewContainerProps> {

        let renderPreview: JSX.Element = null;

        switch (this.props.previewType) {
            case PreviewType.Document:
                renderPreview = <div className={`${templateStyles.iframeContainer} ${this.state.isLoading ? templateStyles.hide : ''}`}>
                                    <iframe 
                                        src={this.props.elementUrl} frameBorder="0"
                                        allowFullScreen
                                        allowTransparency
                                        onLoad={() => { this.setState({ isLoading: false}); }}
                                    >
                                    </iframe>;
                                </div>;
            break;

            case PreviewType.Video:
                renderPreview = <VideoPlayer fileExtension={this.props.videoProps.fileExtension} thumbnailSrc={this.props.previewImageUrl} videoUrl={this.props.elementUrl} isVideoPaused={this.state.isVideoPaused}/>;
                break;

            default:
                break;
        }

        let renderLoading: JSX.Element = this.state.isLoading ? <Overlay isDarkThemed={false} className={templateStyles.overlay}><Spinner size={ SpinnerSize.large }/></Overlay>: null;
        let backgroundImage = this.state.isLoading ? `url('${this.props.previewImageUrl}')` : 'none';
 
        return  <Callout 
                    gapSpace={0} 
                    target={this.props.targetElement} 
                    hidden={false} 
                    className={`${!this.state.showCallout ? templateStyles.hide : ''} ${templateStyles.calloutContainer}`}
                    onDismiss={this.props.previewType === PreviewType.Document ? this._onCloseCallout: null}
                    setInitialFocus={true}
                    preventDismissOnScroll={true}
                    >
                    <div className={templateStyles.calloutHeader}>
                        <IconButton iconProps={{
                            iconName: 'ChromeClose',
                            onClick: this._onCloseCallout
                        }}></IconButton>
                    </div>
                    <div className={templateStyles.calloutContentContainer} style={{backgroundImage: backgroundImage}}>
                        {renderLoading}
                        {renderPreview}
                    </div>
                </Callout>;
    }

    public componentDidMount() {
        this.setState({
            showCallout: this.props.showPreview,
            isLoading: this.props.previewType === PreviewType.Video ? false : true
        });
    }   

    public UNSAFE_componentWillReceiveProps(nextProps: IPreviewContainerProps) {
        this.setState({
            showCallout: nextProps.showPreview,
            isVideoPaused: false
        });
    }

    private _onCloseCallout() {

        this.setState({
            showCallout: false,
            isVideoPaused: true
        });
    }
}
