export interface ITokenService {
    replaceQueryVariables(queryTemplate: string): Promise<string>;
}