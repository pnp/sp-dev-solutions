import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'propertyFieldStrings';
import * as beautify from 'js-beautify';
import KendoEditor from './KendoEditor';
import styles from '../PropertyFields.module.scss';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IconButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { DefaultButton } from "office-ui-fabric-react/lib/components/Button";

export interface IPropertyFieldRichTextHostProps{
    onChange: (html: string) => void;
    currentValue: string;
    label: string;
    onRender: (elem: HTMLElement)=>void;
}
export interface IPropertyFieldRichTextHostState{
    value: any;
    modalValue: any;
    selectedPivotKey: string;
    openModal: boolean;
    editHtml: boolean;
    modalHtml: string;
}

export default class PropertyFieldRichTextHost extends React.Component<IPropertyFieldRichTextHostProps, IPropertyFieldRichTextHostState> {
    public constructor(props: IPropertyFieldRichTextHostProps){
        super(props);
        this.state = { 
            value: this.props.currentValue ? this.props.currentValue : "",
            modalValue: "",
            openModal: false,
            editHtml: false,
            selectedPivotKey: "0",
            modalHtml: ""
        };
    }

    public componentWillReceiveProps(nextProps){
        this.state.value = nextProps.currentValue;
        this.setState(this.state);

        // if(window["CKEDITOR"]){
        //     for(var i in CKEDITOR.instances){
        //         const instance = CKEDITOR.instances[i];
        //         if(instance.element.$.closest('[data-prop="'+this.props.label+'"]')){
        //             instance.setData(nextProps.currentValue);
        //         }
        //     }
        // }
    }

    public onChange(editor: any){
        this.props.onChange(editor.sender.value());
        this.state.value = editor.sender.value();     
        this.setState(this.state);        
    }

    public openModal(){
        this.state.openModal = true;
        this.state.modalValue = this.state.value;
        this.state.modalHtml = this.state.value;
        this.setState(this.state);
    }

    public saveCloseModal(){
        if(this.state.selectedPivotKey==="0"){
            this.state.value = this.state.modalValue;
        }
        else{
            this.state.value = this.state.modalHtml;
        }
        this.closeModal();
        this.props.onChange(this.state.value);        
    }

    public closeModal(){
        this.state.openModal = false;
        this.state.modalHtml = "";
        this.state.selectedPivotKey = "0";
        this.state.modalValue = "";
        this.setState(this.state);
    }

    public confirmCloseModal(){
        if(confirm("Do you want to save your changes to the Body before closing the modal?")){
            this.saveCloseModal();
        }
        else{
            this.closeModal();
        }
    }

    public dialogPivotChanged(item: PivotItem){
        if(item.props.itemKey==="0"){
            this.state.modalValue = this.state.modalHtml;
        }
        else{
            this.state.modalHtml = this.state.modalValue;
        }
        this.state.selectedPivotKey=item.props.itemKey;
        this.setState(this.state);
    }

    public onModalHtmlEditorChange(event){
        this.state.modalHtml = event.target.value;
        this.setState(this.state);
    }

    public onModalRTEditorChange(editor: any){
        this.state.modalValue = editor.sender.value();
        this.state.modalHtml = beautify.html(editor.sender.value());        
        this.setState(this.state);
    }
    
    public render(): JSX.Element {
        return (
            <div className={styles["custom-rte"]} data-prop={this.props.label}>
                <label className="title-label">{this.props.label}</label>
                { true && //Discuss feature with Dave F. (modal flyout of editor)
                <IconButton className={styles["expand-button"]} 
                            title={strings.OpenModalTitle}
                            onClick={this.openModal.bind(this)}
                            ariaDescription={strings.OpenModalTitle}
                            iconProps={{iconName:"FullScreen"}}/>
                }
                { true && //Discuss feature with Dave F. (modal flyout of editor)
                    <Dialog isOpen={this.state.openModal}
                            className={styles["modal-rte"]}
                            onDismiss={this.confirmCloseModal.bind(this)}
                            isBlocking={true}
                            isDarkOverlay={true}
                            containerClassName={styles["custom-rte"]}
                            type={DialogType.close}>
                        <Pivot onLinkClick={this.dialogPivotChanged.bind(this)} selectedKey={this.state.selectedPivotKey}>
                            <PivotItem linkText={strings.RichTextModalRTEPivotLabel} itemKey="0">
                                <KendoEditor 
                                    options={{
                                        height: "200px",
                                        tools: ["bold","italic","underline","insertUnorderedList","insertOrderedList","indent","outdent"],
                                        resizable: {contents: false, toolbar: false}
                                    }}
                                    events={{change: this.onModalRTEditorChange.bind(this)}}
                                    methods={{value: [this.props.currentValue]}}>
                                    <textarea/>
                                </KendoEditor>
                            </PivotItem>
                            <PivotItem linkText={strings.RichTextModalHTMLPivotLabel} itemKey="1">
                                <textarea id="rte-html-editor" className={styles["modal-rte-html"]} value={this.state.modalHtml} onChange={this.onModalHtmlEditorChange.bind(this)}/>                                
                            </PivotItem>
                        </Pivot>
                        <DialogFooter>
                            <PrimaryButton onClick={ this.saveCloseModal.bind(this) } text={strings.RichTextModalSaveText} />
                            <DefaultButton onClick={ this.closeModal.bind(this) } text={strings.RichTextModalCancelText} />
                        </DialogFooter>
                    </Dialog>
                }
                <KendoEditor 
                    options={{
                        height: "200px",
                        tools: ["bold","italic","underline","insertUnorderedList","insertOrderedList","indent","outdent","createLink","unlink"],
                        resizable: {contents: false, toolbar: false}
                    }}
                    events={{change: this.onChange.bind(this)}}
                    methods={{value: [this.props.currentValue]}}>                    
                </KendoEditor>
            </div>
        );
    }
}