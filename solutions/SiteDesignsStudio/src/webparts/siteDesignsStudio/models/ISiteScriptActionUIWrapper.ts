import { ISiteScriptAction } from './ISiteScript';

export interface ISiteScriptActionUIWrapper {
  key: string;
  action: ISiteScriptAction;
  subactions: ISiteScriptActionUIWrapper[];
  isExpanded: boolean;
  parentActionKey?: string;
}
