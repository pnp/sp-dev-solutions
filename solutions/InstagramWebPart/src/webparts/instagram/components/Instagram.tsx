import * as React from 'react';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from "@microsoft/sp-core-library";
import { InstaList } from './InstaList';
import { IInstagramProps } from './IInstagramProps';
import styles from './Instagram.module.scss';

import * as strings from 'InstagramWebPartStrings';

export default class Instagram extends React.Component<IInstagramProps, {}> {
  public render(): React.ReactElement<IInstagramProps> {
    const { feed, containerWidth, authUrl }: IInstagramProps = this.props;

    return (
      <div className={styles.instagram}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} className={styles.title} />
        {
          this.props.needsConfiguration ?
            <Placeholder iconName='Edit'
              iconText={strings.WebPartToBeConfiguredTitle}
              description={strings.WebPartToBeConfiguredDescription}
              buttonLabel={strings.WebPartToBeConfiguredAction}
              hideButton={this.props.displayMode === DisplayMode.Read}
              onConfigure={this.props.configure} />
            :
            (feed && feed.data ? 
              (feed.data.length ?
                <InstaList
                  containerWidth={containerWidth}
                  items={feed.data}
                />
              :
                <div className={styles.noResults}>
                  <Label className={styles.label}>{strings.NoPostsFound}</Label>
                </div>
              )
              :
              <div className={styles.noResults}>
                <Link href={authUrl}>{strings.WebPartNeedsToLogin}</Link>
              </div>
            )
        }
      </div>
    );
  }
}
