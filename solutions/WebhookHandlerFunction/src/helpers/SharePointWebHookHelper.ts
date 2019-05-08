import fetch from 'node-fetch';
import IWebhookSubcriptionData from "../models/IWebhookSubcriptionData";
import { IChangeQuery } from '../models/IChangeQuery';
import IChangeItem from '../models/IChangeItem';

export class SharePointWebHookHelper {

    // Default renewal period equals to 180 days
    private _expirationRenewalDays: number = 180;

    public get expirationRenewalDays(): number { 
        return this._expirationRenewalDays; 
    }

    public set expirationRenewalDays(value: number) {
        this._expirationRenewalDays = value; 
    }
        
    private _webUrl: string;
    private _token: string;

    public constructor(webUrl: string, token: string) {
        this._webUrl = webUrl;
        this._token = token;
    }

    /**
     * Ensures the subscription already exists or not. If does not exist, it will be created. If expired, it will be renewed automatically.
     * @param listId the list GUID
     * @param subscriptionData the subscription information
     */
    public async ensureWebhookSubscription(listId: string, subscriptionData: IWebhookSubcriptionData) {

        // Get the subscription by notification URL
        const response = await fetch(`${this._webUrl}/_api/web/lists('${listId}')/subscriptions?$filter=notificationUrl eq '${subscriptionData.notificationUrl}'&$top=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : `Bearer ${this._token}`
            }
        });

        if (response.status === 200) {

            const body = await response.json();
            if (body.value.length === 0) {

                // Create a new subscription if doesn't exist
               await this.createWebhookSubscription(listId, subscriptionData);

            } else {
                // Update the subscription if expired
                const subscription = body.value[0];
                const expirationDateTime = subscription.expirationDateTime;

                if (new Date(expirationDateTime) < new Date()) {
                    await this.updateWebhookSubscription(listId, subscription.id, subscriptionData);
                }
            }

        } else {
            const error = JSON.stringify(response);
            throw new Error(error);
        }
    }

    /**
     * Creates a new webhook subscription on a SharePoint list.
     * @param listId the list GUID
     * @param subscriptionData the subscription information
     */
    private async createWebhookSubscription(listId: string,subscriptionData: IWebhookSubcriptionData) {

        let expirationDateTime: Date = subscriptionData.expirationDateTime;

        if(!expirationDateTime) {
            expirationDateTime = new Date();
            expirationDateTime.setDate(expirationDateTime.getDate() + this._expirationRenewalDays);
        }

        const response = await fetch(`${this._webUrl}/_api/web/lists('${listId}')/subscriptions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization' : `Bearer ${this._token}`
            },
            body:   JSON.stringify({
                        resource: `${this._webUrl}/_api/web/lists('${listId}')`,
                        notificationUrl: subscriptionData.notificationUrl,
                        expirationDateTime: expirationDateTime.toISOString(),
                        clientState: subscriptionData.key
                    })            
        });
        
        if (response.status !== 201) {
            const error = JSON.stringify(response);
            throw new Error(error);
        }
    }

    /**
     * Updates a webhook subscription on a SharePoint list.
     * @param listId the list GUID
     * @param subscriptionData the subscription information
     */
    private async updateWebhookSubscription(listId: string, subscriptionId: string, subscriptionData: IWebhookSubcriptionData) {

        let expirationDateTime: Date = new Date();
        expirationDateTime.setDate(expirationDateTime.getDate() + this._expirationRenewalDays);

        const response = await fetch(`${this._webUrl}/_api/web/lists('${listId}')/subscriptions('${subscriptionId}')`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization' : `Bearer ${this._token}`
            },
            body:   JSON.stringify({
                        notificationUrl: subscriptionData.notificationUrl,
                        expirationDateTime: expirationDateTime.toISOString(),
                        clientState: subscriptionData.key
                    })            
        });
        
        if (response.status !== 204) {
            const error = JSON.stringify(response);
            throw new Error(error);
        }
    }

    /**
     * Gets the list changes since the last change token specified in the change query
     * @param listId the list GUID 
     * @param changeQuery the change query to use
     */
    public async getListItemChanges(listId: string, changeQuery: IChangeQuery): Promise<IChangeItem[]> {

        const response = await fetch(`${this._webUrl}/_api/web/lists('${listId}')/RootFolder/GetListItemChanges?$Expand=RelativeTime&$top=1000`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization' : `Bearer ${this._token}`
            },
            body:   JSON.stringify(changeQuery)            
        });

        if (response.status === 200) {

            const body = await response.json();
            const value = body.value as IChangeItem[];

           return value;

        } else {
            const error = JSON.stringify(response);
            throw new Error(error);
        }
    }
}