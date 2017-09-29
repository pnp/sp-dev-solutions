import { IFeaturedItem } from './components/IFeaturedItem';
import { FeaturedContentLayout } from './components/layouts/FeatureContentLayout';

export interface IFeaturedContentWebPartWebPartProps {
  featuredContentItems: IFeaturedItem[];
  title:string;
  usesListMode:boolean;
  advancedCamlQuery: string;
  advancedCamlData: string;
  layoutMode: FeaturedContentLayout;
}
