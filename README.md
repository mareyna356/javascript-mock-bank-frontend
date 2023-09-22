# javascript-mock-bank-frontend
My very first JavaScript front-end (made with [Vue.js](https://vuejs.org/), [Vuetify](https://v2.vuetifyjs.com/en/) and [Express.js](https://expressjs.com/)), made for my JavaScript course during my 6th semester at the Autonomous University of Baja California (February - May, 2021): a basic mock bank system UI. This UI will need the [back-end](https://github.com/mareyna356/javascript-mock-bank-backend/) running to be able to receive services through HTTP requests.

This UI utilizes HTTPS, so you require an SSL certificate and private key for it to execute. I utilized [OpenSSL](https://www.openssl.org/) to generate my self-signed certificate and private key. The certificate and private key must be named ***certificate.crt*** and ***private.key*** respectively, and both must be present on the same level as [***server.js***](server.js). The required names for the certificate and the private key can be changed, if you so wish, in [***server.js***](server.js). In case of a "**Cross-Origin Request Blocked**" error, which will only show up in your browser's developer tool's console and prevents the front-end from interacting with the back-end, you'll have to access the back-end through your browser and manually accept the self-signed certificate.

To run the front-end, execute `npm run serve`.

## How to use

### Navigation bar
By clicking on the ≡ button next to "Banco" in the top-left corner of the UI, you can open up the **navigation bar**.  
![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/01758400-0b43-4c4d-88f0-befd9a9524b0)

The navigation bar allows you to navigate to the 4 main sections of the UI and it can be used in any of those sections.  
![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/b5185064-a31a-46b3-8e99-06f1b81f8998)

### Home
The initial page is the **Home** page. This page simply explains what each route of the back-end API does, as well as what is required in the body of each POST, PUT and PATCH request.  
![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/89e9bddc-e0d3-46f3-958b-b5a6ea4a32b2)

### Login
Here you can log in with a username and password
![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/3fd98870-e509-4037-b63a-6eaa7b47a617)


### Credits for the images, all royalty-free:
- ***Home.jpg*** - by [Toa Heftiba](https://unsplash.com/@heftiba) on [Unsplash](https://unsplash.com/photos/LtnX7AhHenU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink).
- ***Cuentas.jpg*** - by [Andre Taissin](https://unsplash.com/@andretaissin) on [Unsplash](https://unsplash.com/photos/5OUMf1Mr5pU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink).
- ***Cuentahabientes.jpg*** - by [Austin Distel](https://unsplash.com/@austindistel) on [Unsplash](https://unsplash.com/photos/744oGeqpxPQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink).
- ***User.png*** - by [Pete Linforth](https://pixabay.com/users/thedigitalartist-202249/) from [Pixabay](https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/).
