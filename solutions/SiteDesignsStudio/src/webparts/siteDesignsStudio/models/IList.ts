export interface IField {
	Id: string;
  Title: string;
  InternalName: string;
  Type: string;
  Group: string;
  CustomFormatter: any;
  Required: boolean;
  Xml: string;
}

export interface IContentType {
  Description: string;
  Group: string;
  Id: string;
  Name: string;
}

export interface IList {
	Id: string;
	Title: string;
	Description: string;
  BaseTemplate: number;
  IsLibrary: boolean;
}
