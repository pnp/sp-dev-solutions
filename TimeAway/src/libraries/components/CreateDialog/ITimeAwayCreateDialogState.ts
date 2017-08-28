import { IMyTimeAwayItem } from "../../models/timeAwayModel";

interface ITimeAwayCreateDialogState {
    showDialog: boolean;
    isNewForm: boolean;
    item: IMyTimeAwayItem;
    errorMessage: string;
    submitting: boolean;
}

export default ITimeAwayCreateDialogState;