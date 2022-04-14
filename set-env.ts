const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
let environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiUrl: ${process.env.API_URL === "" ? undefined : `"${process.env.API_URL}"`},
   apiKey: "${process.env.API_KEY}"
};
`;

// write the content to the respective file
// @ts-ignore
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
