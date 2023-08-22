import {
     S3Client,
   } from "@aws-sdk/client-s3";

import { CF_R2_ACCESS_KEY, CF_R2_ENDPOINT, CF_R2_SECRET_KEY } from "$env/static/private";

export const s3 = new S3Client({
     region: 'auto',
     endpoint: CF_R2_ENDPOINT,
     credentials: {
          accessKeyId: `${CF_R2_ACCESS_KEY}`,
          secretAccessKey: `${CF_R2_SECRET_KEY}`
     }
})