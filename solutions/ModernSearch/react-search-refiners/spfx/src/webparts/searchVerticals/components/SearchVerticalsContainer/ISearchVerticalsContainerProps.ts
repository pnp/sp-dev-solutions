import { ISearchVertical } from "../../../../models/ISearchVertical";

interface ISearchVerticalsContainerProps {
  verticals: ISearchVertical[];
  onVerticalSelected: (itemKey: string) => void;
  showCounts: boolean;
}

export default ISearchVerticalsContainerProps;