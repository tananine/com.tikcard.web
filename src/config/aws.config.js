import AWS from 'aws-sdk';

const credentials = new AWS.Credentials({
  accessKeyId: 'DO00NRH2CBLBVJGVKMDN',
  secretAccessKey: 'jM4EOAWoEP0UNAGDmYVu4VxjOwJ+oxDImX25XAPa4Ns',
});

AWS.config.update({
  credentials: credentials,
  endpoint: 'https://sgp1.digitaloceanspaces.com',
});
