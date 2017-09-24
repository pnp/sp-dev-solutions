import { IChangeRequestManagementItem } from '../../models/CRManagementModel';
import { ICRManagementDataProvider } from '../../dataProviders/ICRManagementDataProvider';
import { IPerson } from '../../../../libraries/index';

export interface ICRManagementListProps {
  dataProvider: ICRManagementDataProvider;
  isTriageTeamMember: boolean;
  items: IChangeRequestManagementItem[];
  itemClickCallback: any;
  selectedItem: IChangeRequestManagementItem;
  allUsers: IPerson[];
}