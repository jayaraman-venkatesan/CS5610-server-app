import { BlobServiceClient } from '@azure/storage-blob';

export const uploadImagesToAzure = async (file, folderName) => {
    const containerName = process.env.STORAGE_ACCOUNT_CONTAINER_NAME;
    // TODO add code to generate the token
    const sasToken = process.env.STORAGE_ACCOUNT_SAS_TOKEN;
    const storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/${sasToken}`
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.createIfNotExists({
        access: 'container',
    });
    // upload file
    const filename = `${folderName}/${file.originalname}`;
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(filename);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
    return getFileUrl(filename);
}

export const getFileUrl = (filename) => {
    const containerName = process.env.STORAGE_ACCOUNT_CONTAINER_NAME;
    const sasToken = process.env.STORAGE_ACCOUNT_SAS_TOKEN;
    const storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${filename}${sasToken}`
}