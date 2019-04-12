export const MultilingualFields = {
  "LanguageVariant": {title: "LanguageVariant", id: "d7d58269-835a-4a04-8280-93fe7bdfc950", xml: "<Field Type=\"Text\" DisplayName=\"LanguageVariant\" InternalName=\"LanguageVariant\" Required=\"FALSE\" EnforceUniqueValues=\"FALSE\" Indexed=\"FALSE\" MaxLength=\"255\" Group=\"Multilingual\" ID=\"{d7d58269-835a-4a04-8280-93fe7bdfc950}\" StaticName=\"LanguageVariant\" Name=\"LanguageVariant\"></Field>" },
  "LastSynced": {title: "LastSynced", id: "13286c3b-25c3-4e5c-b4cc-febcb54d9228", xml: "<Field Type=\"DateTime\" DisplayName=\"LastSynced\" InternalName=\"LastSynced\" Required=\"FALSE\" EnforceUniqueValues=\"FALSE\" Indexed=\"FALSE\" Format=\"DateTime\" Group=\"Multilingual\" FriendlyDisplayFormat=\"Disabled\" ID=\"{13286c3b-25c3-4e5c-b4cc-febcb54d9228}\" StaticName=\"LastSynced\" Name=\"LastSynced\"></Field>" },
  "MasterTranslationPage": {title: "MasterTranslationPage", id: "b245685c-5bd3-4af4-b33b-0b9eadf94296", xml: "<Field Type=\"Text\" DisplayName=\"MasterTranslationPage\" InternalName=\"MasterTranslationPage\" Required=\"FALSE\" EnforceUniqueValues=\"FALSE\" Indexed=\"FALSE\" MaxLength=\"255\" Group=\"Multilingual\" ID=\"{b245685c-5bd3-4af4-b33b-0b9eadf94296}\" StaticName=\"MasterTranslationPage\" Name=\"MasterTranslationPage\"></Field>"},
  "LanguageFolder": {title: "LanguageFolder", id: "fe2ae783-398f-4b11-a8cf-8799c7a1d19a", xml: "<Field Type=\"Text\" DisplayName=\"LanguageFolder\" InternalName=\"LanguageFolder\" Required=\"FALSE\" EnforceUniqueValues=\"FALSE\" Indexed=\"FALSE\" MaxLength=\"255\" Group=\"Multilingual\" ID=\"{fe2ae783-398f-4b11-a8cf-8799c7a1d19a}\" StaticName=\"LanguageFolder\" Name=\"LanguageFolder\"></Field>"},
  "RedirectorPage": {title: "RedirectorPage", id: "37384a33-8e2d-4356-8349-c4b127252048", xml: "<Field Type=\"URL\" DisplayName=\"RedirectorPage\" InternalName=\"RedirectorPage\" Required=\"FALSE\" EnforceUniqueValues=\"FALSE\" Indexed=\"FALSE\" Format=\"Hyperlink\" MaxLength=\"255\" Group=\"Multilingual\" ID=\"{37384a33-8e2d-4356-8349-c4b127252048}\" StaticName=\"RedirectorPage\" Name=\"RedirectorPage\"></Field>"}
};

export interface ILanguages {
  languages: ILanguage[];
}

export interface ILanguage {
  code: string;
  description: string;
}

export class Language implements ILanguage {
  constructor (
    public code: string = "",
    public description: string = ""
  ){}
}

export interface IMap {
  routes: Array<IRoute>;
}
  
export interface IRoute {
  code: string;
  language: string;
  destination: string;
}

export class Route implements IRoute {
  constructor (
    public code: string = "",
    public language: string = "",
    public destination: string = ""
  ){}
}

export interface ICTContents {
  id: string; 
  title: string; 
  fields: {title: string}[];
}

export interface IPagePropertiesQuery{
  ID: string;
  FileLeafRef: string;
  LanguageVariant: string;
  LastSynced: string;
  MasterTranslationPage: string;
}

export interface IUrl{
  Description: string;
  Url: string;
}

export interface IPageProperties {
  Id: string;
  FileLeafRef: string;
  ContentType: string;
  LanguageFolder: string;
  LanguageVariant: string[];
  LastSynced: string;
  LastModified: string;
  ModifiedBy: string;
  DurationSinceSync: number;
  MasterTranslationPage: string;
  RedirectorPage: string;
  Url: string;
  Current: boolean;
  Version: number;
}

export class PageProperties implements IPageProperties {
  constructor(
    public Id: string = "",
    public FileLeafRef: string = "",
    public ContentType: string = "",
    public LanguageFolder: string = "",
    public LanguageVariant: string[] = [],
    public LastSynced: string = null,
    public LastModified: string = null,
    public ModifiedBy: string = null,
    public DurationSinceSync: number = 0,
    public MasterTranslationPage: string = "",
    public RedirectorPage: string = "",
    public Url: string = null,
    public Current: boolean = false,
    public Version: number = null
  ){}
}

export interface ITranslation {
  TranslationLanguage: ILanguage;
  Page: IPageProperties;
}

export class Translation implements ITranslation {
  constructor(
    public TranslationLanguage: ILanguage = null,
    public Page: IPageProperties = null
  ){}
}

export interface IPageVariants {
  variant: string;
  url: string;
}

export interface ILanguageSelectOption{
  key: string;
  text: string;
  selected: boolean;
  master: boolean;
}