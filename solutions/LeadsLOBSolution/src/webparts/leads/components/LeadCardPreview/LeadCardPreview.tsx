import * as React from 'react';
import { ILeadCardPreviewProps } from ".";
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import styles from './LeadCardPreview.module.scss';
import { IDocumentCardPreviewImage } from 'office-ui-fabric-react/lib/DocumentCard';

export class LeadCardPreview extends React.Component<ILeadCardPreviewProps, {}> {
  public render(): React.ReactElement<ILeadCardPreviewProps> {
    const { previewItems } = this.props;
    const preview: IDocumentCardPreviewImage[] = previewItems.slice(0, 3);
    return (
      <div className={css('ms-DocumentCardPreview', styles.preview, 'is-fileList ', styles.previewIsFileList)}>
        {
          preview.length > 0 &&
          <div>
            <ul className={css('ms-DocumentCardPreview-fileList', styles.fileList)}>
              {preview.map((img, i) => <li key={i}>
                <Image className={css('ms-DocumentCardPreview-fileListIcon', styles.fileListIcon)} src={img.iconSrc} width='16px' height='16px' alt='' />
                <a href={img.url}>{img.name}</a>
              </li>)}
            </ul>
            {
              preview.length < previewItems.length &&
              <span className={css('ms-DocumentCardPreview-fileListMore', styles.fileListMore)}>+{previewItems.length - 3} more</span>
            }
          </div>
        }
      </div>
    );
  }
}