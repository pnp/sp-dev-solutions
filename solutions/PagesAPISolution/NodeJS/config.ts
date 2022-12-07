export interface IConfig {
  appId: string;
  appSecret: string;
  tenantId: string;
  siteId: string;
}

const config: IConfig = {
  appId: '<enter app/client Id>',
  appSecret: '<enter app/client secret>',
  tenantId: '<enter tenant Id>',
  siteId: '<enter site Id>',
};

export default config;
