import { client } from "./key-vault/index";

/**
 * Load all environment variables from key-vault.
 *
 * @param underscoreReplacedBy
 * @returns {Promise<void>}
 */
async function listAll () {


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