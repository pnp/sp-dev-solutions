import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IHandlebarTemplateDisplayProps {
  isEdit: boolean;
  title: string;
  items: any[];
  templateUrl: string;
  template: string;
  cssUrl: string;
  jsUrl: string;
  context: IWebPartContext;
  containerClass: string;
  listIsSelected: boolean;
  setTitle: (title: string) => void;
  setTemplateUrl: (url: string, name?: string) => void;
  setStyleUrl: (url: string, name?: string) => void;
  setScriptUrl: (url: string, name?: string) => void;
}
