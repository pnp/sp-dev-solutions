import * as React from 'react';
import styles from './GlobalFooter.module.scss';
import { GlobalFooterProps } from '.';
import { CommandBar, ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react';

export class GlobalFooter extends React.Component<GlobalFooterProps, {}> {
  public render(): React.ReactElement<GlobalFooterProps> {
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
      <div className={styles.globalFooter}>
        <CommandBar
          className={styles.commandBar}
          items={menuItems}
        />
      </div>
    );
  }
}