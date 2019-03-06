import * as React from 'react';
import styles from './SearchNavigation.module.scss';
import { ISearchNavigationProps } from './ISearchNavigationProps';
import { INavigationNodeProps } from '../SearchNavigationWebPart';


export interface ISearchNavigationState {
    hoverItemIndex: number;
}
export default class SearchNavigation extends React.Component<ISearchNavigationProps, ISearchNavigationState> {

    constructor(props) {
        super(props);
        this.state = {
            hoverItemIndex: undefined,
        };
    }

    public render(): React.ReactElement<ISearchNavigationProps> {
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
        return (document.location.href.toLocaleLowerCase().indexOf(encodeURI(url).toLocaleLowerCase()) > -1);
    }


    private renderPivotElement(node: INavigationNodeProps, idx: number) {
        const queryParam = this.props.queryKeywords && this.props.queryKeywords.length > 0 ? `?q=${this.props.queryKeywords}` : '';
        const isSelected = this.isNodeSelected(node.url);
        if (this.props.useThemeColor) {
          return this.getThemeElement(node, queryParam, isSelected);
        } else {
          return this.getCustomElement(node, queryParam, isSelected, idx);
        }
    }

    private getThemeElement(node, queryParam, isSelected) {
        const selectedStyle = isSelected ? styles.selected : styles.regular;
        return (
            <div className={` ${styles.nodeParent} ${selectedStyle}`} >
                <a
                    className={`${styles.nodeText} `}
                    href={node.url + queryParam}>
                    {node.displayText}
                </a>
                <div className={styles.underline} />
            </div>
        );
    }

    private getCustomElement(node, queryParam, isSelected, idx ) {
        let selectedClass;
        let color = this.props.color ? this.props.color : '#ee0410';
        let colorStyle;
        if (isSelected) {
            selectedClass = styles.selected;
            colorStyle = { color: color };
        } else {
            selectedClass = styles.regular;
            colorStyle = this.state.hoverItemIndex === idx ? { color: color } : {};
        }
        return (
            <div className={`${selectedClass} ${styles.nodeParent}`} >
                <a
                    className={`${styles.nodeText}`}
                    href={node.url + queryParam}
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
