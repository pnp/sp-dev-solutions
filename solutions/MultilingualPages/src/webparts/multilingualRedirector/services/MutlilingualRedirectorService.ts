import {ILanguage} from '../../../common/models/Models';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface IMultilingualRedirectorService{
    getLanguages(): Promise<ILanguage[]>;
}

export class MultilingualRedirectorService implements IMultilingualRedirectorService {

    private context: WebPartContext;

    constructor(context:WebPartContext){
        this.context=context;
    }

    public async getLanguages(): Promise<ILanguage[]> {

        let data: any = [];
        try{
          let response: any = await this.context.spHttpClient.fetch(`${document.location.origin}/_api/web/GetStorageEntity('LanguageConfig')`, SPHttpClient.configurations.v1,{});
          let jsonValue: any = await response.json();
          if(jsonValue.Value != null){
            let languages = JSON.parse(jsonValue.Value);
            return languages.languages;
          }else{
            return null;
          }
        }
        catch(err){
          console.log(err.message);
          return null;
        }
    }
}

export class MockMultilingualRedirectorService implements IMultilingualRedirectorService {

  public async getLanguages(): Promise<ILanguage[]> {
      return [{"code": "en-US", "description": "English (United States)"}, {"code": "ja-JP", "description": "Japanese"}, {"code": "de-DE", "description": "German"}, {"code": "es-ES", "description": "Spanish"}, {"code": "fr-FR", "description": "French"}, {"code": "pt-PT", "description": "Portuguese"}, {"code": "ru-RU", "description": "Russian"}, {"code": "zh-Hans", "description": "Chinese (Simplified)"}];
    }
}