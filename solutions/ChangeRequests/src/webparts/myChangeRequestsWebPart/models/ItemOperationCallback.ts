import { IMyChangeRequestItem} from '../../../libraries/index';

export type ItemSaveOperationCallback = (item: IMyChangeRequestItem) => Promise<any>;
export type ItemNormalOperationCallback = (item: IMyChangeRequestItem) => void;
export type ItemOperationCallback = () => void;

export type LoadingCallback = (open: boolean, message: string) => void;