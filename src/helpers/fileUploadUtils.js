// /**
//  * Created by oraricha on 16/03/2017.
//  */
// // import pkgcloud from 'pkgcloud';
// // import md5 from 'js-md5';
// // import 'whatwg-fetch'; // https://github.com/github/fetch
//
//
// // const rackspace = pkgcloud.storage.createClient({
// //   provider: 'rackspace', // required
// //   username: 'hasansa', // required
// //   apiKey: 'b86cc9ee0d054accb0a298a8729c0ace', // required
// //   region: 'IAD', // required, regions can be found at
// //   // http://www.rackspace.com/knowledge_center/article/about-regions
// //   useInternal: false // optional, use to talk to serviceNet from a Rackspace machine
// // });
//
// // const getMd5 = function(file) {
// //
// // }
//
// export const Uploader = {
//   auth: () => {
//     const url = 'https://identity.api.rackspacecloud.com/v2.0/tokens';
//     const authData = { "auth": { "RAX-KSKEY:apiKeyCredentials" : { "username": "hasansa", "apiKey": "b86cc9ee0d054accb0a298a8729c0ace" } } }; // eslint-disable-line
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Accept': 'application/json'
//       },
//       body: JSON.stringify(authData)
//     }).then(data => { // eslint-disable-line
//       console.log(data);
//     }).catch(error => {
//       console.error('request failed', error);
//     });
//   }
//   // upload: (file) => {
//   //   var writeStream = rackspace.upload({
//   //     container: 'videos',
//   //     remote: 'video' + Math.random(), // name of the new file
//   //     contentType: 'video/webm', // optional mime type for the file, will attempt to auto-detect based on remote name
//   //     size: 1234 // size of the file
//   //   });
//   //
//   //   writeStream.on('error', function(err) {
//   //     // handle your error case
//   //   });
//   //
//   //   writeStream.on('success', function(file) {
//   //     // success, file will be a File model
//   //   });
//   // }
// };
//
