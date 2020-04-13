export interface ILinkPickerChoice {
  name: string;
  url: string;
}

export interface ILinkPickerPanel {
  pickLink: () => Promise<ILinkPickerChoice>;
}