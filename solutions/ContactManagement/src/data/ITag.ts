import { ISharePointItem }  from '../data/ISharePointItem';

export interface ITagList {
    value: ITag[];
}

export interface ITag extends ISharePointItem
{
}