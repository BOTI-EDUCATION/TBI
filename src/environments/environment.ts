import { Router } from '@angular/router';
export const environment = {
  production: true,

  // api: 'https://boti.education/p/',
  // apiVersion: '/botiapi/',
  api: '',
  apiVersion: 'https://boti.education/p/demo/botiapi/',
  appKey: 'fdfha8OWVugDS7FbHYPLNFfc4dL4ngl1fpHFNCX6anAM1gxMQErhdxwaJWdpwyTM',
  // this link for lms api web application (back office)
  // apiLms: 'https://boti.education/p/',
  // apiLmsVersion: '//lms_api',
  apiLms: '',
  apiLmsVersion: 'http://localhost/lms//lms_api',

  requestEncryption: 'none',
  useStaticApiKey: false,
  storagePassword: 'ShouldBeGenerated',
};
