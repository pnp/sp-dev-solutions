import * as React from 'react';
import ISearchResultProps from './ISearchResultProps';
import styles from './SearchResult.module.scss';
import * as moment from 'moment';
import { PersonaCoin }from 'office-ui-fabric-react/lib/PersonaCoin';
import {Icon} from 'office-ui-fabric-react/lib/Icon';


export default class SearchResult extends React.Component<ISearchResultProps, {}> {
    public render() {
        return(
            <div className="template_root">
                <ul className={styles.resultContainer}>
                {this.props.searchResults.RelevantResults.map(result => {
                    const pictureUrl = `${this.props.webServerRelativeUrl}/_layouts/15/UserPhoto.aspx?size=m&userName=${result.userName}&default=none`;
                    return (
                        <li className={styles.resultItem}>
                            <PersonaCoin className={styles.coin} imageUrl={pictureUrl} text={result.PreferredName} />
                            <div>
                                <h3><a href={result.Path}>{result.FirstName} {result.LastName}</a></h3>
                                <p>{result[this.props.secondaryTextField]}</p>
                                <p>{result[this.props.tertiaryTextField]}</p>
                            </div>
                            <div>
                                <a className={styles.mailContainer} href={`mailto:${result.WorkEmail}`}><Icon iconName="Mail" />{result.WorkEmail}</a>
                                <a href={`tel:${result.WorkPhone}`}><Icon iconName="Phone" />{result.WorkPhone}</a>
                            </div>
                        </li>
                        );
                })}
                </ul>
            </div>
        );
    }
}