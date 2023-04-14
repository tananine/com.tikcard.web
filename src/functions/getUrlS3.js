import '@/config/aws.config';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

const getUrlS3 = (path) => {
  const params = {
    Bucket: 'tikcard-storage',
    Key: path,
    Expires: 3600,
  };

  const url = s3.getSignedUrl('getObject', params);

  return url;
};

export default getUrlS3;
