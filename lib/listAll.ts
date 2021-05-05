import { client } from "./key-vault/index";


interface envResult {
    
    expiresOn: string,
    createdOn: Date,
    updatedOn: Date,
    id: string,
    tags: { environment: string, type: string },
    vaultUrl: string,
    name: string,
    version: number,
    enabled: boolean,
    recoverableDays: number,
    recoveryLevel: string,
    value: string
}
/**
 * Load all environment variables from key-vault.
 *
 * @param underscoreReplacedBy
 * @returns {Promise<void>}
 */
async function listAll (tagType: string = '', underscoreReplacedBy: string = '0x'): Promise<envResult[]> {

    let arrSecrets = [];

    
        return new Promise( async (resolve, reject) => {

            try {
                
                for await (let secretProperties of client.listPropertiesOfSecrets()) {

                const azureSecret = await client.getSecret(secretProperties.name);
                secretProperties.name = (secretProperties.name).split(underscoreReplacedBy).join('_');

                if (tagType !== '' && secretProperties.tags && secretProperties.tags.type === tagType) {
                    secretProperties['value'] = azureSecret.value;
                    arrSecrets.push(secretProperties);
                } 
                else if (tagType === '') {
                    secretProperties['value'] = azureSecret.value;
                    arrSecrets.push(secretProperties);
                }

            }

            resolve(arrSecrets);
    
    } catch (err: any) {

        console.log('Error: ', err);
        reject('Error: ' + err);

    }
});

}

export { listAll };