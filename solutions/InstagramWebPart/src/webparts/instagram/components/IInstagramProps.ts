import { DisplayMode } from "@microsoft/sp-core-library";
import { IFeedResponse } from "../IFeedResponse";

export interface IInstagramProps {
  accessToken?: string;
  authUrl?: string;
  containerWidth: number;
  feed?: IFeedResponse;
  needsConfiguration: boolean;
  displayMode: DisplayMode;
  title: string;
  updateProperty: (value: string) => void;
  configure: () => void;
}
