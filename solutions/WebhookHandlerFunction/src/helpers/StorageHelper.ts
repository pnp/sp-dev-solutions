import * as azure  from 'azure-storage';

export class StorageHelper {

    private _tableService: azure.TableService;
    private _tableName: string;
    private _partitionKey: string;

    public constructor(connectionString: string, tableName: string, partitionKey: string) {
        this._tableService = azure.createTableService(connectionString);
        this._tableName = tableName;
        this._partitionKey = partitionKey;
    }

    /**
     * Gets a property value from an Azure table
     * @param propertyName the property name to retrieve
     */
    public async getPropertyValue(propertyName: string): Promise<string> {
        
        const p1 = new Promise<string>((resolve, reject) => {

            const requestOptions: azure.TableService.TableEntityRequestOptions = {
                autoResolveProperties: true,
            };

            this._tableService.retrieveEntity(this._tableName, this._partitionKey, propertyName, requestOptions, (error: Error, result: any, response)=>{
                if (error) {

                    if (response.statusCode === 404) {
                        resolve(null);
                    }

                    reject(error);
                } else {
                    resolve(result.Value._);
                }
            });
        });

        return p1;
    }

    /**
     * Sets a proeprty value in an Azure table
     * @param propertyName the property name to insert or replace
     * @param propertyValue the property value
     */
    public async setPropertyValue(propertyName: string, propertyValue: any): Promise<void> {
        
        const p1 = new Promise<void>((resolve, reject) => {
            
            const entity = {
                PartitionKey: this._partitionKey,
                RowKey: propertyName,
                Value: propertyValue
            };

            this._tableService.insertOrMergeEntity(this._tableName, entity, (error: Error, result, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        return p1;
    }
}