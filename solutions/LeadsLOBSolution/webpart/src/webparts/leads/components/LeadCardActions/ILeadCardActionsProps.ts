import { IButtonProps } from "office-ui-fabric-react/lib/Button";

export interface ILeadCardActionsProps {
    actions: IButtonProps[];
    percentComplete: number;
    change: number;
}
