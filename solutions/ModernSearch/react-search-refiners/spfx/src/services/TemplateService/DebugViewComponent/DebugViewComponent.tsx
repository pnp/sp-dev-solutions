import * as React from 'react';
import { Suspense } from 'react';
const AceEditor = React.lazy(() => import('react-ace'));

export interface IDebugViewProps {

    /**
     * The debug content to display
     */
    content?: string;
}

export interface IDebugViewState {
}

export default class DebugViewComponent extends React.Component<IDebugViewProps, IDebugViewState> {
    
    public render() {
        return <Suspense fallback={""}><AceEditor
            width={ '100%' }
            mode={ 'json' }
            theme="textmate"
            enableLiveAutocompletion={ true }
            showPrintMargin={ false }
            showGutter= { true }            
            value={ this.props.content }
            highlightActiveLine={ true }
            readOnly={ true }
            editorProps={
                {
                    $blockScrolling: Infinity,
                }
            }					
            name="CodeView"
        /></Suspense> ;
    }
}