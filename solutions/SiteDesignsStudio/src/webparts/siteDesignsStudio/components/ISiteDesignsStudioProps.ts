import ServiceScope from '@microsoft/sp-core-library/lib/serviceScope/ServiceScope';

export interface IServiceConsumerComponentProps {
	serviceScope: ServiceScope;
}

export interface ISiteDesignsStudioProps extends IServiceConsumerComponentProps {
  useWizardActionGenerators: boolean;
  useWizardPropertyEditors: boolean;
}
