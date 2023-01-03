import * as React from 'react';
import styles from './PagesApiWebPart.module.scss';
import { IPagesApiWebPartProps } from './IPagesApiWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';
import DropdownControlledExample from './DropdownControlled';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';

interface IPagesApiWebPartStates {
  pages: IPage[];
  searchQuery: {
    title: string;
    pageLayout: string;
    promotionKind: string;
  };
}

interface IPage {
  name: string;
  title: string;
}

export default class PagesApiWebPart extends React.Component<
  IPagesApiWebPartProps,
  {}
> {
  state: IPagesApiWebPartStates = {
    pages: [],
    searchQuery: {
      title: '',
      pageLayout: '',
      promotionKind: '',
    },
  };

  _columns: IColumn[] = [
    {
      key: 'title',
      name: 'Page title',
      fieldName: 'title',
      minWidth: 80,
      maxWidth: 150,
    },
    {
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      maxWidth: 150,
      minWidth: 80,
    },
    {
      key: 'pageLayout',
      name: 'Layout',
      fieldName: 'pageLayout',
      minWidth: 50,
      maxWidth: 80,
    },
    {
      key: 'promotionKind',
      name: 'Promotion kind',
      fieldName: 'promotionKind',
      maxWidth: 80,
      minWidth: 50,
    },
    {
      key: 'createdBy',
      name: 'Created By',
      fieldName: 'createdBy',
      onRender: (item?: any, index?: number, column?: IColumn) =>
        item.createdBy.user.displayName,
      minWidth: 80,
    },
  ];

  componentDidMount(): void {
    this.fetchPages();
  }

  fetchPages(): void {
    const { searchQuery } = this.state;

    let query = '';
    const queryParams: string[] = [];

    if (searchQuery.title !== '') {
      queryParams.push(`contains(title,'${searchQuery.title}')`);
    }

    if (searchQuery.pageLayout !== '') {
      queryParams.push(`pageLayout eq '${searchQuery.pageLayout}'`);
    }

    if (searchQuery.promotionKind !== '') {
      queryParams.push(`promotionKind eq '${searchQuery.promotionKind}'`);
    }

    if (queryParams.length) {
      query = '?$filter=' + queryParams.join(' and ');
    }

    const { siteId, msGraphClientFactory } = this.props;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    msGraphClientFactory
      .getClient('3')
      .then((client: MSGraphClientV3): void => {
        // get information about the current user from the Microsoft Graph
        client
          .api(`https://graph.microsoft.com/beta/sites/${siteId}/pages${query}`)
          .get((_error: any, response: any, _rawResponse?: any) => {
            this.setState({
              pages: response.value,
            });
          });
      });
  }

  public render(): React.ReactElement<IPagesApiWebPartProps> {
    const { hasTeamsContext, userDisplayName } = this.props;

    const layoutDropdownProps = {
      label: 'Page layout',
      selectItem: (p: string) => {
        this.setState({
          searchQuery: {
            ...this.state.searchQuery,
            pageLayout: p === 'all' ? '' : p,
          },
        });
      },
      options: [
        { key: 'all', text: 'All' },
        { key: 'article', text: 'Article' },
        { key: 'home', text: 'Home' },
        { key: 'microsoftReserved', text: 'Microsoft Reserved' },
      ],
    };

    const promotionKindDropdownProps = {
      label: 'Page promotion kind',
      selectItem: (p: string) => {
        this.setState({
          searchQuery: {
            ...this.state.searchQuery,
            promotionKind: p === 'all' ? '' : p,
          },
        });
      },
      options: [
        { key: 'all', text: 'All' },
        { key: 'page', text: 'Page' },
        { key: 'newsPost', text: 'News Post' },
        { key: 'microsoftReserved', text: 'Microsoft Reserved' },
      ],
    };

    const { pages } = this.state;

    return (
      <section
        className={`${styles.pagesApiWebPart} ${
          hasTeamsContext ? styles.teams : ''
        }`}
      >
        <div className={styles.welcome}>
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>
            This web part is calling{' '}
            <a href='https://learn.microsoft.com/en-us/graph/api/resources/sitepage?view=graph-rest-beta'>
              Pages API
            </a>{' '}
            to get you an overview of all pages list in current site.
          </div>
        </div>
        <Stack
          horizontal
          tokens={{
            childrenGap: 10,
            padding: 10,
          }}
          verticalAlign='end'
        >
          <TextField
            label='Page title'
            style={{ width: 150 }}
            value={this.state.searchQuery.title}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              this.setState({
                searchQuery: {
                  ...this.state.searchQuery,
                  title: newValue || '',
                },
              });
            }}
          />
          <DropdownControlledExample {...layoutDropdownProps} />
          <DropdownControlledExample {...promotionKindDropdownProps} />
          <PrimaryButton text='Search' onClick={() => this.fetchPages()} />
        </Stack>
        <DetailsList
          items={pages}
          columns={this._columns}
          setKey='set'
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
        />
      </section>
    );
  }
}
