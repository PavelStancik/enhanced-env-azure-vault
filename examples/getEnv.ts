import * as manager from '../index';

/**
 * Gets environment variables out of Azure Key Vault
 */

const getEnv = async (tagType: string = '') => {

    console.log('Getting ENV params from Azure Key Vault');
    const result = await manager.listAll(tagType,'0x');
    result.forEach(element => {

        console.log(`${element.name}: ${element.value}`);
        
        if (element.tags) {

            console.log(' tag environment:', element.tags.environment);
            console.log(' tag type:', element.tags.type);

        }

    });

};

getEnv('backend').then((res) => console.log("Done."));
getEnv().then((res) => console.log("Done."));