import * as React from 'react';
import { PrimaryButton, ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';
import { IPropertyFieldImageSelectorPropsInternal, ImageDisplayType } from './PropertyFieldImageSelector';
import * as strings from 'propertyFieldStrings';
import styles from "../PropertyFields.module.scss";
import { LinkType } from "../../components/LinkPickerPanel/ILinkPickerPanelProps";
import LinkPickerPanel from "../../components/LinkPickerPanel/LinkPickerPanel";

export interface IPropertyFieldImageSelectorHostProps extends IPropertyFieldImageSelectorPropsInternal { }
export interface IPropertyFieldImageSelectorHostState {
  imageMode: ImageDisplayType;
}

export default class PropertyFieldImageSelectorHost extends React.Component<IPropertyFieldImageSelectorHostProps, IPropertyFieldImageSelectorHostState> {
  public constructor(props: IPropertyFieldImageSelectorHostProps) {
    super(props);
    this.state = {
      imageMode: this.props.imageMode ? this.props.imageMode : ImageDisplayType.Custom,
    };
  }

  public getIcon(imageMode: string) {
    switch (ImageDisplayType[imageMode]) {
      case ImageDisplayType.Auto: return "Photo2";
      case ImageDisplayType.Custom: return "Photo2Add";
    }
  }

  public getChoiceLabelText(imageMode: string) {
    switch (ImageDisplayType[imageMode]) {
      case ImageDisplayType.Auto: return strings.ImageSelectorTypeAuto;
      case ImageDisplayType.Custom: return strings.ImageSelectorTypeCustom;
    }
  }

  public changeImageType(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
    this.props.changeImageMode(Number(option.key) as ImageDisplayType);
    this.setState({ imageMode: Number(option.key) as ImageDisplayType });
  }

  public getPropertyByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  private linkPickerPanel: LinkPickerPanel;

  public openLinkPicker(event) {
    this.linkPickerPanel.pickLink().then(({ name, url }) => {
      this.props.changeImage(url, name);
      this.render();
    });
  }

  public render(): JSX.Element {
    return (
      <div className={styles["image-selector"]}>
        <ChoiceGroup className={styles["root"]}
          onChange={this.changeImageType.bind(this)}
          selectedKey={this.state.imageMode.toString()}
          options={[
            {
              key: ImageDisplayType.Auto.toString(),
              iconProps: { iconName: 'Photo2' },
              text: strings.ImageSelectorTypeAuto
            },
            {
              key: ImageDisplayType.Custom.toString(),
              iconProps: { iconName: 'Photo2Add' },
              text: strings.ImageSelectorTypeCustom
            }
          ]}
        />
        <div className={styles["preview"]}>
          <label className="title-label">{this.props.label}</label>
          {(this.state.imageMode != ImageDisplayType.Auto || this.getPropertyByString(this.props.properties.properties, this.props.targetProperty)) &&
            <img src={this.getPropertyByString(this.props.properties.properties, this.props.targetProperty)} role="presentation" width="150px" height="119px" alt="" />
          }
          {this.state.imageMode == ImageDisplayType.Auto && !this.getPropertyByString(this.props.properties.properties, this.props.targetProperty) &&
            <div>{strings.NoPreviewText}</div>
          }
          <PrimaryButton hidden={this.state.imageMode == ImageDisplayType.Auto} onClick={this.openLinkPicker.bind(this)}>{strings.ChangeImageButtonText}</PrimaryButton>
        </div>
        <LinkPickerPanel
          webPartContext={this.props.context}
          className={styles["link-picker"]}
          webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
          linkType={LinkType.image | LinkType.folder}
          ref={(ref) => { this.linkPickerPanel = ref; }} />
      </div>
    );
  }
}