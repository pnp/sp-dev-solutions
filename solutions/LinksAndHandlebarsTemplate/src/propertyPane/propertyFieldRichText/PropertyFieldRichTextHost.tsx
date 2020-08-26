import * as React from 'react';

import * as strings from 'propertyFieldStrings';
import RichEditor from './RichEditor';
import styles from "../PropertyFields.module.scss";
import { IconButton, PrimaryButton, Dialog, DialogType, DialogFooter, Pivot, PivotItem, DefaultButton } from 'office-ui-fabric-react';

export interface IPropertyFieldRichTextHostProps {
  onChange: (html: string) => void;
  currentValue: string;
  label: string;
  onRender: (elem: HTMLElement) => void;
}
export interface IPropertyFieldRichTextHostState {
  value: any;
  modalValue: any;
  selectedPivotKey: string;
  openModal: boolean;
  editHtml: boolean;
  modalHtml: string;
}

export default class PropertyFieldRichTextHost extends React.Component<IPropertyFieldRichTextHostProps, IPropertyFieldRichTextHostState> {
  public constructor(props: IPropertyFieldRichTextHostProps) {
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

  public componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.currentValue });
  }

  public onChange(value) {
    this.props.onChange(value);
    this.setState({ value: value });
  }

  public openModal() {
    this.setState({
      openModal: true,
      modalValue: this.state.value,
      modalHtml: this.state.value
    });
  }

  public saveCloseModal() {
    if (this.state.selectedPivotKey === "0") {
      this.setState({ value: this.state.modalValue });
    }
    else {
      this.setState({ value: this.state.modalHtml });
    }
    this.closeModal();
    this.props.onChange(this.state.value);
  }

  public closeModal() {
    this.setState({
      openModal: false,
      modalHtml: "",
      selectedPivotKey: "0",
      modalValue: ""
    });
  }

  public confirmCloseModal() {
    if (confirm("Do you want to save your changes to the Body before closing the modal?")) {
      this.saveCloseModal();
    }
    else {
      this.closeModal();
    }
  }

  public dialogPivotChanged(item: PivotItem) {
    if (item.props.itemKey === "0") {
      this.setState({ modalValue: this.state.modalHtml });
    }
    else {
      this.setState({ modalHtml: this.state.modalValue });
    }
    this.setState({ selectedPivotKey: item.props.itemKey });
  }

  public onModalHtmlEditorChange(event) {
    this.setState({ modalHtml: event.target.value });
  }

  public onModalRTEditorChange(value: string) {
    this.setState({ modalValue: value });
    this.setState({ modalHtml: value });
  }

  public render(): JSX.Element {
    return (
      <div className={styles["custom-rte"]} data-prop={this.props.label}>
        <label className="title-label">{this.props.label}</label>
        {true && //Discuss feature with Dave F. (modal flyout of editor)
          <IconButton className={styles["expand-button"]}
            title={strings.OpenModalTitle}
            onClick={this.openModal.bind(this)}
            ariaDescription={strings.OpenModalTitle}
            iconProps={{ iconName: "FullScreen" }} />
        }
        {true && //Discuss feature with Dave F. (modal flyout of editor)
          <Dialog isOpen={this.state.openModal}
            className={styles["modal-rte"]}
            onDismiss={this.confirmCloseModal.bind(this)}
            isBlocking={true}
            isDarkOverlay={true}
            containerClassName={styles["custom-rte"]}
            type={DialogType.close}>
            <Pivot onLinkClick={this.dialogPivotChanged.bind(this)} selectedKey={this.state.selectedPivotKey}>
              <PivotItem linkText={strings.RichTextModalRTEPivotLabel} itemKey="0">
                <RichEditor onChange={this.onModalRTEditorChange.bind(this)} value={this.state.modalValue} id={"modal"}></RichEditor>
              </PivotItem>
              <PivotItem linkText={strings.RichTextModalHTMLPivotLabel} itemKey="1">
                <textarea id="rte-html-editor" className={styles["modal-rte-html"]} value={this.state.modalHtml} onChange={this.onModalHtmlEditorChange.bind(this)} />
              </PivotItem>
            </Pivot>
            <DialogFooter>
              <PrimaryButton onClick={this.saveCloseModal.bind(this)} text={strings.RichTextModalSaveText} />
              <DefaultButton onClick={this.closeModal.bind(this)} text={strings.RichTextModalCancelText} />
            </DialogFooter>
          </Dialog>
        }
        <RichEditor onChange={this.onChange.bind(this)} value={this.props.currentValue} id={"default"}></RichEditor>
      </div>
    );
  }
}
