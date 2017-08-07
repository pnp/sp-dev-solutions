import Clause, {ClauseTypeJoin, ClauseType} from './Clause';
import { ISPList } from './ISPList';
import SharePointUtility from './SharePointUtility';
import { FieldTypeKind } from './ISPField';

export type QueryCallback = (query: Query) => void;

export default class Query
{
    public clauses : Clause[];
    public onQueryChange? : QueryCallback;

    public constructor()
    {
        if (this.clauses == null)
        {
            this.clauses = new Array();
        }
    
        this._handleClauseChange = this._handleClauseChange.bind(this);
    }

    public static fromData(incomingQuery : Query) : Query
    {
        var newQuery = new Query();

        if (incomingQuery == null)
        {
            return newQuery;
        }

        if (incomingQuery.clauses == null)
        {
            incomingQuery.clauses = new Array();
        }

        for (var clause of incomingQuery.clauses)
        {
            var newClause = new Clause();
            
            newClause.clauseType = clause.clauseType;
            newClause.value = clause.value;
            newClause.fieldName = clause.fieldName;
            newClause.joiner = clause.joiner;

            newQuery.clauses.push(newClause);
        }

        return newQuery;
    }

    public matches(item : any) : boolean
    {
        if (this.clauses != null)
        {
            for (var clause of this.clauses)
            {
                if (!clause.matches(item))
                {
                    return false;
                }
            }
        }

        return true;
    }

    public getOdataQuery(list : ISPList) : string
    {
        var query : string = "";

        if (this.clauses == null)
        {
            return query;
        }

        for (var clause of this.clauses)
        {
            if (clause.fieldName != null && clause.value != null && clause.clauseType != null)
            {
                var field = SharePointUtility.getField(list, clause.fieldName);

                if (field != null)
                {
                    if (query.length > 0)
                    {
                        if (clause.joiner == ClauseTypeJoin.And)
                        {
                            query += " and ";
                        }
                        else
                        {
                            query += " or ";
                       }
                    }

                    if (clause.clauseType == ClauseType.Contains)
                    {
                        query += "substringof('" + clause.value + "', " + clause.fieldName  + ")";
                    }
                    else
                    {
                        query += clause.fieldName + " ";

                        switch (clause.clauseType)
                        {
                            case ClauseType.LessThan:
                                query += "lt";
                                break;

                            case ClauseType.LessThanOrEquals:
                                query += "le";
                                break;

                            case ClauseType.GreaterThanOrEquals:
                                query += "ge";
                                break;

                            case ClauseType.GreaterThan:
                                query += "gt";
                                break;

                            case ClauseType.Equals:
                                query += "eq";
                                break;

                            case ClauseType.NotEquals:
                                query += "ne";
                                break;
                        }

                        query += " ";

                        if (field.FieldTypeKind == FieldTypeKind.Text || field.FieldTypeKind == FieldTypeKind.Choice)
                        {
                            query += "'" +clause.value + "'";
                        }
                        else
                        {
                            query += clause.value;
                        }
                    }
                }
            }
        }

        return query;
    }

    public removeClause(clause : Clause)
    {
        var newClauses = new Array();

        for (var existingClause of this.clauses)
        {
            if (existingClause != clause)
            {
                newClauses.push(clause);
            }
        }
    }

    private _handleClauseChange() : void
    {
        if (this.onQueryChange != null)
        {
            this.onQueryChange(this);
        }
    }

    public addClause(clause : Clause)
    {
        clause.onClauseChange = this._handleClauseChange;

        this.clauses.push(clause);
    }
}