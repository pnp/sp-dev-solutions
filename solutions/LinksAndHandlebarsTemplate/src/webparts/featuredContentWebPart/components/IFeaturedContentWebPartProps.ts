import { IFeaturedItem } from './IFeaturedItem';
import { FeaturedContentLayout } from './layouts/FeatureContentLayout';

import{ IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IFeaturedContentWebPartProps {
  featuredContentItems: IFeaturedItem[];
  links: any[];
  isEdit:boolean;
  usesListMode:boolean;
  title:string;
  setTitle:(title: string) => void;
  setUrl: (url: string, name?: string) => void;
  editItem: (index: number) => void;
  deleteItem: (index: number) => void;
  rearrangeItems: (newOrder: number[]) => void;
  resetActiveIndex: () => void;
  advancedCamlQuery: string;
  advancedCamlData: string;
  context: IWebPartContext;
  layoutMode: FeaturedContentLayout;
}
