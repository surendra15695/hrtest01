// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: true,
  //local
  //apiurl: 'https://localhost:5001/api',
  //apppath: 'https://localhost:5001',
  //apiKey: "embee.co.in",

  //For UAT AppGateway
   apiurl: 'https://mrfconnectuat.mrfindia.net/api',
   apppath: 'https://mrfconnectuat.mrfindia.net:5001',
   apiKey: "embee.co.in",

  //campus link for UAT
  //campuslink: "https://mrfconnectuat.mrfindia.net",

  // UAT Email Link
  //emailLink: "https://mrfconnectuat.mrfindia.net/",

  // UAT EDMS Link
  //edmslink: "https://mrfedms-app.azurewebsites.net/"


  //For Production AppGateway
  // apiurl: 'https://mrfconnect.mrfindia.net/api',
  // apppath: 'https://mrfconnect.mrfindia.net:5001',
  // apiKey: "embee.co.in",

  //campuslink for PROD
  campuslink: "https://mrfconnect.mrfindia.net",

  // PROD Email Link
  emailLink: "https://mrfconnect.mrfindia.net/",

  // PROD EDMS Link
  edmslink: "https://edmsapp.azurewebsites.net/"

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
