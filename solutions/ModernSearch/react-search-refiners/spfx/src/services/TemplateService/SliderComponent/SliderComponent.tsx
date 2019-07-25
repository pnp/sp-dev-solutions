import * as React from 'react';
import Flickity from 'flickity';
import 'flickity/dist/flickity.min.css';
import * as ReactDOM from 'react-dom';
import * as Handlebars from 'handlebars';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface ISliderProps {
    options?: any;
}

export interface ISliderState {
    flickityReady: boolean;
}

// https://medium.com/yemeksepeti-teknoloji/using-flickity-with-react-a906649b11de
export default class Slider extends React.Component<ISliderProps, ISliderState> {

    private flickityNode: HTMLElement;
    private flickity: any;

    constructor(props) {
        super(props);

        this.state = {
            flickityReady: false,
        };

        this.refreshFlickity = this.refreshFlickity.bind(this);
    }

    public componentDidMount() {
        this.flickity = new Flickity(this.flickityNode, this.props.options || {});

        this.setState({
            flickityReady: true,
        });
    }

    private refreshFlickity() {
        this.flickity.reloadCells();
        this.flickity.resize();
        this.flickity.updateDraggable();
    }

    public componentWillUnmount() {
        this.flickity.destroy();
    }

    public componentDidUpdate(prevProps, prevState) {
        const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady;
        const childrenDidChange = prevProps.children !== this.props.children;

        if (flickityDidBecomeActive || childrenDidChange) {
            this.refreshFlickity();
        }
    }

    public renderPortal() {

        if (!this.flickityNode) {
            return null;
        }

        const mountNode = this.flickityNode.querySelector('.flickity-slider');

        if (mountNode) {
            return ReactDOM.createPortal(this.props.children, mountNode);
        }
    }

    public render() {
        return [
            <div className={'test'} key="flickityBase" ref={node => (this.flickityNode = node)} />,
            this.renderPortal(),
        ].filter(Boolean);
    }
}

export interface ISliderOptions {

    /**
     * The number of slides to display
     */
    numberOfSlides?: number;

    /**
     * Indicates if the slider should auto play
     */
    autoPlay?: boolean;

    /**
     * The auto play duration
     */
    autoPlayDuration?: number;

    /**
     * If pause on hover
     */
    pauseAutoPlayOnHover?: boolean;

    /**
     * Indicates if the slider should page dots
     */
    showPageDots?: boolean;
}

export interface ISliderComponentProps {

    /**
     * The slide content to display
     */
    template?: string;

    /**
     * Stringified items to render
     */
    items?: string;

    /**
     * Slider options
     */
    options?: string;
}

export interface ISliderComponentState {
}

export class SliderComponent extends React.Component<ISliderComponentProps, ISliderComponentState> {
    
    public render() {

        try {
        
            // Get item properties
            const items = this.props.items ? JSON.parse(this.props.items) : [];
            const sliderOptions = this.props.options ? JSON.parse(this.props.options) as ISliderOptions : {};

            let autoPlayValue: any = sliderOptions.autoPlay;

            if (sliderOptions.autoPlay) {
                // Check if a duration has been set
                if (sliderOptions.autoPlayDuration) {
                    autoPlayValue = sliderOptions.autoPlayDuration * 1000;
                }
            }
            
            return <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} />
                    <Slider
                        options={{
                            autoPlay: autoPlayValue,
                            pauseAutoPlayOnHover: sliderOptions.pauseAutoPlayOnHover,
                            wrapAround: true,
                            groupCells: sliderOptions.numberOfSlides,
                            adaptiveHeight: true,
                            pageDots: sliderOptions.showPageDots
                        }}
                        >
                        {items.map((item, index) => {
                            
                            // Create a temp context with the current so we can use global registered helpers on the current item
                            const tempTemplateContent = `{{#with item as |item|}}${this.props.template.trim()}{{/with}}`;
                            let template = Handlebars.compile(tempTemplateContent);

                            const templateContentValue = template({
                                item: item
                            });
                            
                            return  <div style={{ position: 'relative' }} key={index}>
                                        <div dangerouslySetInnerHTML={ { __html : templateContentValue}}></div>    
                                    </div>;               
                        }
                        )}
                    </Slider>
            </div>;
        } catch (error) {
            return <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
        }
    }
}