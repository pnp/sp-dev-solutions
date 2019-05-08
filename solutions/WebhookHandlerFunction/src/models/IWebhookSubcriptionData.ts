export default interface IWebhookSubcriptionData {
    
    /**
     * The service URL to send notifications to.
     */
    notificationUrl: string;

    /**
     * The expiration date
     */
    expirationDateTime: Date;

    /**
     * An unique identifier for this subscription
     */
    key?: string;
}