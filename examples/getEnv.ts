const manager = require('../index');

/**
 * Gets environment variables out of Azure Key Vault
 */

const getEnv = async () => {

    console.log('Getting ENV params from Azure Key Vault');
    const result = await manager.listAll();
    result.forEach(element => {

        console.log(element.name);
        
        if (element.tags) {

            console.log('\t', element.tags.environment);
            console.log('\t', element.tags.type);

        }

    });

};

getEnv().then((res) => console.log(res));
