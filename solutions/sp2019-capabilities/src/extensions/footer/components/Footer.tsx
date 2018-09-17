import * as React from 'react';
import styles from './Footer.module.scss';
import { FooterProps } from '.';
import { CommandBar, ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react';

export class Footer extends React.Component<FooterProps, {}> {
  public render(): React.ReactElement<FooterProps> {
    const { label, links } = this.props;
    const menuItems: IContextualMenuItem[] = links.map(l => {
      return {
        key: l.title.replace(/\s/g, ''),
        name: l.title,
        iconProps: {
          iconName: l.icon
        },
        href: l.url
      };
    });
    if (label) {
      menuItems.push({
        key: "label",
        name: label,
        itemType: ContextualMenuItemType.Header,
        disabled: true,
        className: styles.label
      });
    }
    return (
      <div className={styles.footer}>
        <CommandBar
          className={styles.commandBar}
          items={menuItems}
        />
      </div>
    );
  }
}