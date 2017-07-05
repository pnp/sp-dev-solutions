// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import Query, { QueryCallback } from '../data/Query';
import Clause from '../data/Clause';
import { ISPList } from '../data/ISPList';
import ClauseEditor from './ClauseEditor';

import { Button } from 'office-ui-fabric-react';

export interface IQueryEditorProps {
  query: Query;
  list: ISPList;
  displayApplyButton: boolean;
  onApply?: QueryCallback;
}

export interface IQueryEditorState {
}

export default class QueryEditor extends React.Component<IQueryEditorProps, IQueryEditorState> {

  public constructor()
  {
    super();

    this._handleAddClause = this._handleAddClause.bind(this);
    this._handleApply = this._handleApply.bind(this);
  }

  private _handleAddClause()
  {
    this.props.query.addClause(new Clause());
    this.forceUpdate();
  }

  private _handleApply()
  {
    if (this.props.onApply != null)
    {
      this.props.onApply(this.props.query);
    }
  }

  public render(): JSX.Element 
  {
    if (this.props == null || this.props.query == null || this.props.query.clauses == null)
    {
      return <div>no query</div>;
    }

    var me = this;

    return (
      <div className={ styles.queryEditor }>
        <div className={ styles.clauseBin }>
          {
            this.props.query.clauses.map( (clause, i) =>
            {
                  return <div data-clauseId={ i } key={ "CL" + i }>
                            <ClauseEditor key={ "CE" + i } list={ me.props.list } clause={ clause } />
                         </div>;
            }) 
          }
        </div>
        <div className={styles.buttonArea} >
          <Button onClick={ this._handleAddClause }>Add</Button>
          {
            this.props.displayApplyButton ?
              <Button onClick={ this._handleApply }>Apply</Button> : <div></div>
          }
        </div>
      </div>
    );
  }
}
