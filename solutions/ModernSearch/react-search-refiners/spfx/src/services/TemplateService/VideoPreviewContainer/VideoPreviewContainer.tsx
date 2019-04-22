import * as React from                                                 'react';
import { Callout } from 'office-ui-fabric-react/lib/components/Callout';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import IVideoPreviewContainerProps from './IVideoPreviewContainerProps';
import IVideoPreviewContainerState from './IVideoPreviewContainerState';
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
        return  <video ref={ node => this._videoNode = node } className={`${templateStyles.videoPreview} video-js vjs-big-play-centered`}>
                    <source src={this.props.videoUrl} type={`video/${this.props.fileExtension}`}/>
                </video>
    }

    public componentWillUnmount() {
        if (this._videoPlayer) {
            this._videoPlayer.dispose()
        }
    }

    public componentWillReceiveProps(nextProps: IVideoPlayerProps) {

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

export default class VideoPreviewContainer extends React.Component<IVideoPreviewContainerProps, IVideoPreviewContainerState> {

    public constructor(props: IVideoPreviewContainerProps) {
        super(props);
        this.state = {
            showCallout: false,
            isLoading: false,
            isVideoPaused: false
        };

        this._onCloseCallout = this._onCloseCallout.bind(this);
    }

    public render(): React.ReactElement<IVideoPreviewContainerProps> {

        let renderLoading: JSX.Element = this.state.isLoading ? <Overlay isDarkThemed={false} className={templateStyles.overlay}><Spinner size={ SpinnerSize.large }/></Overlay>: null;
        let backgroundImage = this.state.isLoading ? `url('${this.props.thumbnailSrc}')` : 'none';
 
        return  <Callout 
                    gapSpace={0} 
                    target={this.props.targetElement} 
                    hidden={false} 
                    className={`${!this.state.showCallout ? templateStyles.hide : ''} ${templateStyles.calloutContainer}`}
                    preventDismissOnScroll={true}
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
                        <VideoPlayer fileExtension={this.props.fileExtension} thumbnailSrc={this.props.thumbnailSrc} videoUrl={this.props.videoUrl} isVideoPaused={this.state.isVideoPaused}/>
                    </div>
                </Callout>;
    }

    public componentDidMount() {
        this.setState({
            showCallout: this.props.showPreview,
        });
    }

    public componentWillReceiveProps(nextProps: IVideoPreviewContainerProps) {
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
