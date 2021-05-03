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
    recoveryLevel: string
}
/**
 * Load all environment variables from key-vault.
 *
 * @param underscoreReplacedBy
 * @returns {Promise<void>}
 */
async function listAll (): Promise<envResult[]> {


    const underscoreReplacedBy = '0x';
    let arrSecrets = [];

    
        return new Promise( async (resolve, reject) => {

            try {
                
                for await (let secretProperties of client.listPropertiesOfSecrets()) {

                secretProperties.name = (secretProperties.name).split(underscoreReplacedBy).join('_');
                arrSecrets.push(secretProperties);

            }

            resolve(arrSecrets);
    
    } catch (err: any) {

        console.log('Error: ', err);
        reject('Error: ' + err);

    }
});

}

export { listAll };