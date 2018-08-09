import * as React from 'react';

export interface IContentEditableProps{
  html:string;
  id?: string;
  className?: string;
  style?: {};
  onChange: (event: any) => void;
}

export interface IContentEditableState{}

export default class ContentEditable extends React.Component<IContentEditableProps,IContentEditableState> {
  constructor(props) {
    super(props);
    this.emitChange = this.emitChange.bind(this);
  }

  public htmlEl: any;
  public lastHtml: string;

  public render() {
    this.htmlEl = React.createElement(
      'div',
      {
        onInput: this.emitChange,
        onBlur: this.emitChange,
        contentEditable: true,
        style: this.props.style,
        id: this.props.id,
        className: this.props.className,
        dangerouslySetInnerHTML: {__html: this.props.html}
      },
      this.props.children);
      return this.htmlEl;
  }

  public shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!document.getElementById(this.props.id)) {
      return true;
    }

    // ...or if html really changed... (programmatically, not by user edit)
    if (nextProps.html !== document.getElementById(this.props.id).innerHTML && nextProps.html !== this.props.html) {
      return true;
    }
  }

  public componentDidUpdate() {
    if ( this.state && this.props.html !== document.getElementById(this.props.id).innerHTML ) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      document.getElementById(this.props.id).innerHTML = this.props.html;
    }
  }

  public emitChange(evt) {
    if (!evt.target) return;
    const html = evt.target.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  }
}
