/**
 * Add your local configuration schema here so you can use manipulate it easily in your code per env
 */
export interface IFunctionLocalSettings {
    authSettings: {
        appId: string;
        tenant: string;
        resource: string;
        certificateThumbPrint: string;
        certificatePath: string;
    },
    sharePointSettings: {
        listId: string;
        webUrl: string;
    },
    webhookSettings: {
        subscriptionIdentifier: string;
        notificationUrl: string;
        targetEndpointUrl: string;
    },
    azureStorageSettings: {
        connectionString: string;
        azureTableName: string;
    }
}