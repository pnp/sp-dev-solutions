import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IHandlebarTemplateDisplayProps {
  isEdit: boolean;
  isSearch: boolean;
  title: string;
  items: any[];
  webUrl: string;
  serverRelativeUrl: string;
  instanceId: string;
  templateUrl: string;
  template: TemplateSpecification;
  isOptimized: boolean;
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
