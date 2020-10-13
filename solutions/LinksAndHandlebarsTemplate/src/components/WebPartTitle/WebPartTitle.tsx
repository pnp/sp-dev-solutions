import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";

import isEqual from "lodash/isEqual";
import styles from './WebPartTitle.module.scss';

export interface IWebPartTitleProps {
  editMode: boolean;
  title: string;
  updateTitle: (title: string) => void;
}

export interface IWebPartTitleState {
}

export class WebPartTitleState implements IWebPartTitleState {
  constructor() { }
}

export default class WebPartTitle extends React.Component<IWebPartTitleProps, IWebPartTitleState> {
  private LOG_SOURCE: string = "WebPartTitle";

  constructor(props) {
    super(props);
    this.state = new WebPartTitleState();
  }

  public shouldComponentUpdate(nextProps: Readonly<IWebPartTitleProps>, nextState: Readonly<IWebPartTitleState>) {
    if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  private saveTitle = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();
    let title = (event.target as HTMLDivElement).innerText;
    this.props.updateTitle(title);
  }

  public render(): React.ReactElement<IWebPartTitleProps> {
    try {
      return (
        <div data-component={this.LOG_SOURCE} >
          <h3 role="heading" data-component={this.LOG_SOURCE} className={styles.wpheader}>
            <div
              contentEditable={this.props.editMode}
              suppressContentEditableWarning={true}
              onBlur={this.saveTitle}
              dangerouslySetInnerHTML={{ __html: this.props.title }}
            />
          </h3>
        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
      return null;
    }
  }
}