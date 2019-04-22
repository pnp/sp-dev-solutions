import BaseTemplateService from                    './BaseTemplateService';

class MockTemplateService extends BaseTemplateService {
    constructor(locale: string) {
        super();    
        this.CurrentLocale = locale;
    }

    private readonly _mockFileContent: string = require('./templates/layouts/mock.html');

    public getFileContent(fileUrl: string): Promise<string> {

        const p1 = new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(this._mockFileContent);
            }, 1000);
        });

        return p1;
    }

    public ensureFileResolves(fileUrl: string): Promise<void> {
        return Promise.resolve();
    }
}

export default MockTemplateService;