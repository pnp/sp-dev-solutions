// import/require dependencies
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import deepDiff from 'deep-diff';

import styles from '../PropertyFields.module.scss';

import { IconButton } from 'office-ui-fabric-react/lib/Button';
import ContentEditable from './ContentEditable';

export interface IRichEditorProps {
  id?: string;
  value: string;
  onChange: (string) => void;
}

export interface IRichEditorState {
  value: string;
  hiddenDialog: boolean;
  link: string;
  formatting: IFormatIcon[];
}

export interface IFormatIcon {
  title: string;
  name: string;
  command: string;
  on: boolean;
}

export default class RichEditor extends React.Component<IRichEditorProps, IRichEditorState>{
  constructor(props: IRichEditorProps) {
    super(props);
    this.state = {
      value: this.props.value,
      hiddenDialog: true,
      link: '',
      formatting: [
        { title: "Bold", name: "Bold", command: "bold", on: false },
        { title: "Italic", name: "Italic", command: "italic", on: false },
        { title: "Underline", name: "Underline", command: "underline", on: false },
        { title: "Ordered List", name: "NumberedList", command: "insertorderedlist", on: false },
        { title: "Unordered List", name: "BulletedList", command: "insertunorderedlist", on: false },
        { title: "Indent", name: "IncreaseIndentLegacy", command: "indent", on: false },
        { title: "Outdent", name: "DecreaseIndentLegacy", command: "outdent", on: false },
        { title: "Link", name: "Link", command: "createLink", on: false },
        { title: "Unlink", name: "RemoveLink", command: "unlink", on: false },
      ]
    };

    document.addEventListener('selectionchange', (e) => {
      this.checkEnabledFormatting();
    });
  }

  public applyFormat = (command) => {
    if (command === 'createLink') {
      const url = prompt("Enter the URL:", "https://");
      document.execCommand(command, false, url);
    }
    else {
      document.execCommand(command, false, "");
    }
    const editor = document.querySelector('#rte-editor-' + this.props.id);
    if (editor) editor['focus']();
  }

  public onChange = (html) => {
    this.setState({ value: html });
    this.props.onChange(html);
    this.checkEnabledFormatting();
  }

  public checkEnabledFormatting = () => {
    const formatting = [...this.state.formatting];
    for (const format of formatting) {
      if (format.command === "unlink" || format.command === "createLink") continue;
      format.on = document.queryCommandState(format.command);
    }
    this.setState({ formatting: formatting });
  }

  public componentDidMount() {
    this.checkEnabledFormatting();
  }

  //use the passed in React nodes or a plain <div> if no React child nodes are defined
  public render(): JSX.Element {
    return (
      <div className={styles.rte}>
        {this.state.formatting.map((format, index) => {
          return (<IconButton className={"rte-button" + (format.on ? " " + styles.on : "")} iconProps={{ iconName: format.name }} onClick={() => this.applyFormat.call(this, format.command)} title={format.title}></IconButton>);
        })}
        <ContentEditable onChange={(e) => this.onChange.call(this, e)} html={this.state.value} id={"rte-editor-" + this.props.id} className={styles["rte-editor"]}></ContentEditable>
      </div>
    );
  }
}
