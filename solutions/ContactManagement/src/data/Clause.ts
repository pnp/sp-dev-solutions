// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export enum ClauseType
{
    Equals = 0,
    NotEquals = 1,
    GreaterThan = 2,
    GreaterThanOrEquals = 3,
    LessThan = 4,
    LessThanOrEquals = 5,
    Contains = 6,
    NotContains = 7
}

export enum ClauseTypeJoin
{
    And = 0,
    Or = 1
}

export type ClauseCallback = (clause: Clause) => void;

export default class Clause
{
    public joiner : ClauseTypeJoin;
    public fieldName : string;
    public clauseType : ClauseType;
    public value : any;

    public onClauseChange? : ClauseCallback;

    public setJoiner(newJoin : ClauseTypeJoin)
    {
        if (newJoin != this.joiner)
        {
            this.joiner = newJoin;

            if (this.onClauseChange != null)
            {
                this.onClauseChange(this);
            }
        }
    }

    public setFieldName(value : string) {
        if (value != this.fieldName)
        {
            this.fieldName = value;

            if (this.onClauseChange != null)
            {
                this.onClauseChange(this);
            }
        }
    }
    
    public setClauseType(value : ClauseType) {
        if (value != this.clauseType)
        {
            this.clauseType = value;

            if (this.onClauseChange != null)
            {
                this.onClauseChange(this);
            }
        }
    }

    public setValue(newValue : any) {
        if (newValue != this.value)
        {
            this.value = newValue;

            if (this.onClauseChange != null)
            {
                this.onClauseChange(this);
            }
        }
    }

    public matches(item : any) : boolean
    {
        if (this.fieldName == null)
        {
            return true;
        }

        if (this.clauseType == ClauseType.Equals)
        {
            if (item[this.fieldName] == null)
            {
                return this.value == "";
            }

            if (item[this.fieldName] != this.value)
            {
                return false;
            }
        }
        else if (this.clauseType == ClauseType.NotEquals)
        {
            if (item[this.fieldName] == null)
            {
                return this.value != "";
            }

            if (item[this.fieldName] == this.value)
            {
                return false;
            }
        }
        else if (this.clauseType == ClauseType.Contains)
        {
            if (item[this.fieldName] == null)
            {
                return false;
            }

            if (item[this.fieldName].indexOf(this.value) < 0)
            {
                return false;
            }
        }
        else if (this.clauseType == ClauseType.NotContains)
        {
            if (item[this.fieldName] == null)
            {
                return true;
            }

            if (item[this.fieldName].indexOf(this.value) >= 0)
            {
                return false;
            }
        }
        else if (this.clauseType == ClauseType.GreaterThan)
        {
            if (item[this.fieldName] == null)
            {
                return false;
            }

            if (item[this.fieldName] <= this.value)
            {
                return false;
            }
        }
        else if (this.clauseType == ClauseType.GreaterThanOrEquals)
        {
            if (item[this.fieldName] == null)
            {
                return false;
            }

            if (item[this.fieldName] < this.value)
            {
                return false;
            }
        }        
        else if (this.clauseType == ClauseType.LessThan)
        {
            if (item[this.fieldName] == null)
            {
                return false;
            }

            if (item[this.fieldName] >= this.value)
            {
                return false;
            }
        }
        else if (this.clauseType == ClauseType.LessThanOrEquals)
        {
            if (item[this.fieldName] == null)
            {
                return false;
            }

            if (item[this.fieldName] > this.value)
            {
                return false;
            }
        }

        return true;
    }
}