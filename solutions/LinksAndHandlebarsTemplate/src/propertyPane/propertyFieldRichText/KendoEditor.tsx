// import/require dependencies
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import deepDiff from 'deep-diff';
import 'jquery';
import * as kuiEditor from '@progress/kendo-ui/js/kendo.editor.js';

    // create a React component, that is a wrapper for a Kendo UI widget
export default class KendoEditor extends React.Component<any,any>{
    constructor(){
        super();
        SPComponentLoader.loadCss("https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.common.min.css");
        SPComponentLoader.loadCss("https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.default.min.css");
    }
    
    private _widgetInstance : any;
    public get widgetInstance() : any {
        return this._widgetInstance;
    }
    public set widgetInstance(v : any) {
        this._widgetInstance = v;
    }
    

    //component is in the DOM, so do stuff to it in this callback
    public componentDidMount() {
        //get, child element node for this component
        var elementNode = ReactDOM.findDOMNode(this);

        //determine if a selector was passed on which to invoke the KUI widget
        if (this.props.selector) {
            elementNode = elementNode.querySelector(this.props.selector);
        }

        //instantiate and save reference to the Kendo UI widget on elementNode
        //note I am not using jQuery plugin to instantiate, don't want to wait for namespace on $.fn
        this.widgetInstance = new kuiEditor.ui.Editor(elementNode, this.props.options);

        //if props are avaliable for events, triggers, unbind events, or methods make it happen now
        if(this.props.events) this.bindEventsToKendoWidget(this.props.events);
        if(this.props.methods) this.callKendoWidgetMethods(this.props.methods);
        if(this.props.triggerEvents) this.triggerKendoWidgetEvents(this.props.triggerEvents);
    }

    //instance methods for updating widget
    public triggerKendoWidgetEvents(events) {
        events.forEach((event) => { //loop over events, and trigger
            this.widgetInstance.trigger(event);
        }, this);
    }
    public bindEventsToKendoWidget(events) {
        Object.keys(events).forEach((event) => { //loop over events and bind
            this.widgetInstance.bind(event, events[event]);
        }, this);
    }
    public unbindEventsToKendoWidget(events) {
        events.forEach((event) => { //loop ove revents and unbind
            this.widgetInstance.unbind(event);
        }, this);
    }
    public callKendoWidgetMethods(methods) {
        Object.keys(methods).forEach((method) => { //loop over methods and call
            this.widgetInstance[method](...methods[method]);
        }, this);
    }

    //not called on inital render, but whenever parent state changes this is called
    public componentWillReceiveProps(nextProps) {
        //always update the widget with nextProp changes if avaliable
        if (nextProps["events"]) {
            this.bindEventsToKendoWidget(nextProps["events"]);
        }

        if (this.widgetInstance.setOptions) {
            if (nextProps["options"]) {
                this.widgetInstance.setOptions(nextProps["options"]);
            }
        }

        //try and determine if any of the nextProps have changed, and if so, update the widget
        if (nextProps["methods"]) {
            if (deepDiff(nextProps["methods"], this.props.methods)) {
                this.callKendoWidgetMethods(nextProps["methods"]);
            }
        }

        if (nextProps["unbindEvents"]) {
            if (deepDiff(nextProps["unbindEvents"], this.props.unbindEvents)) {
                this.unbindEventsToKendoWidget(nextProps["unbindEvents"]);
            }
        }

        if (nextProps["triggerEvents"]) {
            if (deepDiff(nextProps["triggerEvents"], this.props.triggerEvents)) {
                this.triggerKendoWidgetEvents(nextProps["triggerEvents"]);
            }
        }
    }

    //don't run render again, create widget once, then leave it alone
    public shouldComponentUpdate() { return false; }

    //destory it, when the component is unmouted
    public componentWillUnmount() {
        this.widgetInstance.destroy();
    }

    //use the passed in React nodes or a plain <div> if no React child nodes are defined
    public render(): JSX.Element {
        return this.props.children ? this.props.children : <div/> ;
    }
}