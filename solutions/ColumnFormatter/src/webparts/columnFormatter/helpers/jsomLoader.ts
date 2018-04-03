import { SPComponentLoader } from '@microsoft/sp-loader';

const layouts: string = '/_layouts/15/';

export const loadJSOM = (): Promise<any> => {
	return SPComponentLoader.loadScript(layouts + 'init.js', {
		globalExportsName: '$_global_init'
	}).then((): Promise<any> => {
		return SPComponentLoader.loadScript(layouts + 'MicrosoftAjax.js', {
			globalExportsName: 'Sys'
		});
	}).then((): Promise<any> => {
		return SPComponentLoader.loadScript(layouts + 'SP.Runtime.js', {
			globalExportsName: 'SP'
		});
	}).then((): Promise<any> => {
		return SPComponentLoader.loadScript(layouts + 'SP.js', {
			globalExportsName: 'SP'
		});
	});
};