import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { ISearchResult } from '../../../models/ISearchResult';
import * as Handlebars from 'handlebars';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IconComponent } from '../IconComponent/IconComponent';

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px'
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden'
            }
        }
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px'
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});
const controlStyles = {
    root: {
        margin: '0 30px 20px 0',
        maxWidth: '300px'
    }
};

export interface IDetailsListColumnConfiguration {

    /**
     * The name of the column
     */
    name: string;

    /**
     * The value of the column
     */
    value: string;

    /**
     * Indicates if the value is an Handlebars expression
     */
    useHandlebarsExpr: boolean;

    /**
     * Column maximum width in px
     */
    maxWidth: string;

    /**
     * Column minimum width in px
     */
    minWidth: string;

    /**
     * Enable sorting on the column
     */
    enableSorting: boolean;

    /**
     * Enable column dynamic resize
     */
    isResizable: boolean;

    /**
     * Enable multiline column
     */
    isMultiline: boolean;

    /**
     * If true, the column value will be wrapped by the item link
     */
    isResultItemLink: boolean;
}

export interface DetailsListComponentProps {

    /**
     * Current items
     */
    items?: string;

    /**
     * The columns configuration
     */
    columnsConfiguration?: string;

    /**
     * Show the file icon or not in the first column
     */
    showFileIcon?: boolean;

    /**
     * Enble the filtering on the columns
     */
    enableFiltering?: boolean;

    /**
     * If true, the details list shimers are displayed
     */
    showShimmers?: boolean;

    /**
     * If the details lsit should be compact
     */
    isCompact?: boolean;

    /**
     * The current theme settings
     */
    themeVariant?: IReadonlyTheme;
}

export interface IDetailsListComponentState {
    columns: IColumn[];
    items: ISearchResult[];
}

export class DetailsListComponent extends React.Component<DetailsListComponentProps, IDetailsListComponentState> {

    private _allItems: ISearchResult[];

    constructor(props: DetailsListComponentProps) {
        super(props);

        this._allItems = this.props.items ? JSON.parse(this.props.items) : [];

        const columns: IColumn[] = [
        ];

        // Show file icon pption
        if (this.props.showFileIcon) {
            columns.push(
                {
                    key: 'column1',
                    name: 'File Type',
                    className: classNames.fileIconCell,
                    iconClassName: classNames.fileIconHeaderIcon,
                    ariaLabel: 'Column operations for File type, Press to sort on File type',
                    iconName: 'Page',
                    isIconOnly: true,
                    fieldName: 'IconExt',
                    minWidth: 16,
                    maxWidth: 16,
                    onColumnClick: this._onColumnClick,
                    onRender: (item: ISearchResult) => {
                        return (<IconComponent fileExtension={item.IconExt} imageUrl={item.SiteLogo} size={16} ></IconComponent>);
                    }
                }
            );
        }

        // Build columns dynamically
        if (this.props.columnsConfiguration) {
            JSON.parse(this.props.columnsConfiguration).map((column: IDetailsListColumnConfiguration) => {
                columns.push(
                    {
                        key: column.name,
                        name: column.name,
                        fieldName: column.value,
                        minWidth: parseInt(column.minWidth),
                        maxWidth: parseInt(column.maxWidth),
                        isRowHeader: true,
                        isResizable: column.isResizable === true,
                        isMultiline: column.isMultiline === true,
                        isSorted: column.enableSorting === true,
                        isSortedDescending: false,
                        sortAscendingAriaLabel: 'Sorted A to Z',
                        sortDescendingAriaLabel: 'Sorted Z to A',
                        onColumnClick: column.enableSorting ? this._onColumnClick : null,
                        data: 'string',
                        isPadded: true,
                        onRender: (item: ISearchResult) => {

                            let value: any = item[column.value];
                            let renderColumnValue: JSX.Element = null;
                            let hasError: boolean = false;

                            // Check if the value in an Handlebars expression
                            if (column.useHandlebarsExpr) {

                                try {

                                    // Create a temp context with the current so we can use global registered helper on the current item
                                    const tempTemplateContent = `{{#with item as |item|}}${column.value}{{/with}}`;

                                    let template = Handlebars.compile(tempTemplateContent);

                                    // Pass the current item as context
                                    value = template({ item: item }, { data: { themeVariant: this.props.themeVariant } });

                                    value = value ? value.trim() : null;

                                } catch (error) {
                                    hasError = true;
                                    value = `<span style="color:red;font-style: italic" title="${error.message}">${`Error: ${error.message}`}</span>`;
                                }
                            }

                            renderColumnValue = <span title={!hasError ? value : ''} dangerouslySetInnerHTML={{ __html: value }}></span>;

                            // Make the value clickable to the corresponding result item 
                            if (column.isResultItemLink) {
                                renderColumnValue = <a style={{ color: this.props.themeVariant.semanticColors.link }} href={item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path}>{renderColumnValue}</a>;
                            }

                            return renderColumnValue;
                        },
                    },
                );
            });
        }

        this.state = {
            items: this._allItems,
            columns: columns
        };
    }

    public render() {
        const { columns, items } = this.state;

        let renderFilter: JSX.Element = null;

        if (this.props.enableFiltering) {
            renderFilter = <div className={classNames.controlWrapper}>
                <TextField label="Filter by name:" onChange={this._onChangeText.bind(this)} styles={controlStyles} />;
      </div>;
        }

        return (
            <Fabric>
                {renderFilter}
                <ShimmeredDetailsList
                    items={items}
                    compact={this.props.isCompact}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    enableShimmer={this.props.showShimmers}
                    selectionPreservedOnEmptyClick={true}
                    enterModalSelectionOnTouch={true}
                />
            </Fabric>
        );
    }

    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        this.setState({
            items: text ? this._allItems.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this._allItems
        });
    }

    private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const { columns, items } = this.state;
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            items: newItems
        });
    }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}