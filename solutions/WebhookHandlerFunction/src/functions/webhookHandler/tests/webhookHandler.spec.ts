import { Context, HttpMethod, HttpRequest, HttpStatusCode } from 'azure-functions-ts-essentials';
import { run } from '../webhookHandler';
import * as $ from '../../../../tools/build/helpers';
import * as fs from 'fs';

// Build the process.env object according to Azure Function Application Settings
const localSettingsFile = $.root('./src/local.settings.json');
const settings = JSON.parse(fs.readFileSync(localSettingsFile, { encoding: 'utf8' })
                    .toString()).Values;

// Get all Azure Function settings so we can use them in tests
Object.keys(settings)
    .map(key => {
        process.env[key] = settings[key];
});

describe('POST /api/webhookHandler', () => {

    it('should reply with the same validation token', async () => {

        const validationToken = '9f78e435-a29c-44b8-8121-6e4d325daf84';

        const mockContext: Context = {
            done: (err, response) => {
                expect(err).toBeUndefined();
                expect(response.status).toEqual(HttpStatusCode.OK);
                expect(response.body).toBe(validationToken);
            }
          };

        const mockRequest: HttpRequest = {
            method: HttpMethod.Post,
            headers: { 'content-type': 'application/json' },
            body: {
                validationToken: validationToken
            }
        };

        try {
            await run(mockContext, mockRequest);
        } catch (e) {
            fail(e);
        }
    });
});
