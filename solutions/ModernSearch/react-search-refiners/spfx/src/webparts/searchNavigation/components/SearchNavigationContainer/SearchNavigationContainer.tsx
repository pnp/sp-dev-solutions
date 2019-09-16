import * as React from 'react';
import styles from '../SearchNavigationWebPart.module.scss';
import { ISearchNavigationContainerProps } from './ISearchNavigationContainerProps';
import { ISearchNavigationContainerState } from './ISearchNavigationContainerState';
import { INavigationNodeProps } from '../../../../models/INavigationNodeProps';
import { QueryPathBehavior, PageOpenBehavior } from '../../../../helpers/UrlHelper';

export default class SearchNavigationContainer extends React.Component<ISearchNavigationContainerProps, ISearchNavigationContainerState> {

    constructor(props: ISearchNavigationContainerProps) {
        super(props);
        this.state = {
            hoverItemIndex: undefined,
        };
    }

    public render(): React.ReactElement<ISearchNavigationContainerProps> {
        if (this.props.nodes && this.props.nodes.length > 0) {
            return (
                <div className={styles.navigationNodes}>
                    <nav>
                        {this.props.nodes.map((node, idx) => {
                            return this.renderPivotElement(node, idx);
                        })}
                    </nav>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    private isNodeSelected(url: string) {
        return (this.props.currentPageUrl.toLocaleLowerCase().indexOf(encodeURI(url).toLocaleLowerCase()) > -1);
    }

    private renderPivotElement(node: INavigationNodeProps, idx: number) {
        const searchUrl = new URL(node.url);
        const openBehavior = this.props.openBehavior === PageOpenBehavior.NewTab ? '_blank' : '_self';

        if (this.props.passQuery && this.props.queryKeywords && this.props.queryKeywords.length > 0) {
            const urlEncodedQueryText = encodeURIComponent(this.props.queryKeywords);
            if (this.props.queryPathBehavior === QueryPathBehavior.URLFragment) {
              searchUrl.hash = urlEncodedQueryText;
            }
            else {
              searchUrl.searchParams.append(this.props.queryStringParameter, urlEncodedQueryText);
            }
        }

        const isSelected = this.isNodeSelected(node.url);

        if (this.props.useThemeColor) {
          return this.getThemeElement(node, searchUrl.href, openBehavior, isSelected, idx);
        } else {
          return this.getCustomElement(node, searchUrl.href, openBehavior, isSelected, idx);
        }
    }

    private getThemeElement(node: INavigationNodeProps, searchUrl: string, openBehavior: string, isSelected: boolean, idx: number) {
        const selectedStyle = isSelected ? styles.selected : styles.regular;
        return (
            <div className={` ${styles.nodeParent} ${selectedStyle}`} key={`node-${idx}`}>
                <a
                    className={`${styles.nodeText} `}
                    target={openBehavior}
                    data-interception="off"
                    href={searchUrl}>
                    {node.displayText}
                </a>
                <div className={styles.underline} />
            </div>
        );
    }

    private getCustomElement(node: INavigationNodeProps, searchUrl: string, openBehavior: string, isSelected: boolean, idx: number) {
        let selectedClass: string;
        let color = this.props.color ? this.props.color : '#ee0410';
        let colorStyle: React.CSSProperties;
        if (isSelected) {
            selectedClass = styles.selected;
            colorStyle = { color: color };
        } else {
            selectedClass = styles.regular;
            colorStyle = this.state.hoverItemIndex === idx ? { color: color } : {};
        }
        return (
            <div className={`${selectedClass} ${styles.nodeParent}`} key={`node-${idx}`}>
                <a
                    className={`${styles.nodeText}`}
                    href={searchUrl}
                    target={openBehavior}
                    data-interception="off"
                    style={colorStyle}
                    onMouseOver={() => this.setHover(idx)}
                    onMouseOut={() => this.setHover(undefined)}>
                    {node.displayText}
                </a>
                <div className={styles.underline} style={{ backgroundColor: color }} />
            </div>
        );
    }

    private setHover(elementIndex: number) {
        this.setState({
            hoverItemIndex: elementIndex
        });
    }
}
