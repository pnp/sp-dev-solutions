import {
  ITag
} from '../data/ITag';

export interface ITagSet
{
    key : string;
    tags : ITag[];

    apply(newTag : ITag[], removeAndAdd : boolean);
}