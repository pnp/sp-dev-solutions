import { IMyChangeRequestItem } from '../../../../libraries/index';

interface IMyCRNewFormState {
    item?: IMyChangeRequestItem;
    isNewForm?: boolean;
    submitting?: boolean;
    errorMessage?: string;

    showHintDialog?: boolean;
}
export default IMyCRNewFormState;