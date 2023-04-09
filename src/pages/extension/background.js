// import axios from "axios";

// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//         console.log('hi')
//         // details.url contains the URL being requested
//         // send a POST request to the API with the URL in the request body
//         axios.post('https://efd8-136-232-1-174.ngrok-free.app/api/web_block/', { url: details.url })
//             .then(response => {
//                 console.log(response);
//                 // if (response.dat) {
//                     // URL is safe
//                 // } else {
//                     // URL is unsafe
//                 // }
//             });
//     },
//     {urls: ["<all_urls>"]}
// );

// // add a listener to copy the URL to clipboard
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action === "copy") {
//         const input = document.createElement('input');
//         input.value = request.url;
//         document.body.appendChild(input);
//         input.select();
//         document.execCommand('copy');
//         document.body.removeChild(input);
//         sendResponse({ message: "URL copied to clipboard" });
//     }
// });
