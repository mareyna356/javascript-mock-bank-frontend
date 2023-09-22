# javascript-mock-bank-frontend
My very first JavaScript front-end (made with [Vue.js](https://vuejs.org/), [Vuetify](https://v2.vuetifyjs.com/en/) and [Express.js](https://expressjs.com/)), made for my JavaScript course during my 6th semester at the Autonomous University of Baja California (February - May, 2021): a basic mock bank system UI. This UI will need the [back-end](https://github.com/mareyna356/javascript-mock-bank-backend/) running to be able to receive services through HTTP requests.

This UI utilizes HTTPS, so you require an SSL certificate and private key for it to execute. I utilized [OpenSSL](https://www.openssl.org/) to generate my self-signed certificate and private key. The certificate and private key must be named ***certificate.crt*** and ***private.key*** respectively, and both must be present on the same level as [***server.js***](server.js). The required names for the certificate and the private key can be changed, if you so wish, in [***server.js***](server.js). In case of a "**Cross-Origin Request Blocked**" error, which will only show up in your browser's developer tool's console and prevents the front-end from interacting with the back-end, you'll have to access the back-end through your browser and manually accept the self-signed certificate.

To run the front-end, execute `npm run serve`.

## Basic functions

This system allows you to log in and log out using a username and password. It allows you to register, modify and delete account holders (cuentahabientes) as well as accounts (cuentas). You can associate several account holders to several accounts (this being a many-to-many relationship) and disassociate accounts from account holders with the restriction that all accounts must be associated to at least one account holder. You can also check the balance of an account, deposit money into an account, withdraw money from an account and transfer money from one account to another, with the restriction that accounts can't have negative (<0) balances. An account must have a balance of $0 to be able to delete the account.

## How to use

### Navigation bar
By clicking on the ≡ button next to "Banco" in the top-left corner of the UI, you can open up the **navigation bar**.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/01758400-0b43-4c4d-88f0-befd9a9524b0)

The navigation bar allows you to navigate to the 4 main sections of the UI and it can be used in any of those sections. However, you're required to log into the system to be able to enter the [**Cuentahabientes**](#cuentahabientes-account-holders) and [**Cuentas**](#cuentas-accounts) sections; if you attempt to enter these sections without logging in first, you'll be automatically redirected to the [**Login**](#login) section.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/b5185064-a31a-46b3-8e99-06f1b81f8998)

### Home
The initial page is the **Home** page. This page simply explains what each route of the back-end API does, as well as what is required in the body of each POST, PUT and PATCH request.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/89e9bddc-e0d3-46f3-958b-b5a6ea4a32b2)

### Login
Here you can log in with a username and password. Users are stored in the "**users**" table of the MySQL database. To log in, simply input a username and password, and press the "**LOGIN**" button. If the login is successful, you'll get a confirmation message. If the login is unsuccessful, you'll get an error message. Once you're logged in, you'll be able to navigate to the [**Cuentahabientes**](#cuentahabientes-account-holders) and [**Cuentas**](#cuentas-accounts) sections.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/4c0607cf-b6d3-4052-a572-b26d0132fc8d)  
Message: "Login successful"

The inputted password text is hidden by default, but it can be made visible (and invisible again) by clicking on the eye button appended to the right of the text field.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/c0364a43-63c1-41f4-b3d0-1222ba03b980)


![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/06356e80-dff0-42d5-a29b-26a80957275a)

Once you're logged in, you can log out by clicking the "**LOGOUT**" button. If you try to log out without being logged in first, you'll get an error message informing you of this.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/d4adc098-12b3-4bb0-9f4f-e457a19f11b1)  
Message: "You are not logged in"

### Cuentahabientes (Account holders)
Here you can see a table of all the registered account holders, which are stored in the "**cuentahabientes**" table of the MySQL database. Above the table there are two subsections that you can open: [**Asociar cuenta**](#asociar-cuenta-associate-account) (associate account) and [**Desasociar cuenta**](#desasociar-cuenta-disassociate-account) (disassociate account).

The table lists each account holder's id (claveCuentahabiente), name (nombre), age (edad) and associated accounts (cuentas). Different account holders can share the same name, age and associated accounts, but not the same id. You can sort the account holders by id, by name or by age. You can also choose the amount of account holders to list in the table per page.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/16a0398d-c86b-4e4b-923c-69de9117031a)

To add a new account holder, click on the "**NUEVO CUENTAHABIENTE**" ("new account holder") button on the top-right of the table. Fill out the fields and then click on "**AGREGAR**" ("add"). The id has to be a number greater than 0 and unique. The name can be alphanumeric. The age has to be a 0 or greater number.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/60ee0c0f-7661-4870-b988-782e2acb2131)

If the account holder is created succefully, you'll get a confirmation message. If something went wrong with its creation, you'll get an error message stating the reason (id has to be unique, age can't be negative, etc.).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/14b98a81-85ea-4e92-baa6-06f95865740b)  
Message: "new guy was added successfully"

On the table's "**Acciones**" ("actions") column, you can modify or delete an account holder. Clicking the pencil button ![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/3197b47d-f881-4682-8df3-d6603b725892) will open up a window that allows you to modify the account holder's name and/or age.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/ec56f95d-e4c1-47a5-b84e-66c682469aff)

Clicking the trash button ![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/d00c06e0-8f53-4b27-b27b-f40477068434) will open up a deletion confirmation window. Click on the "**OK**" button to delete the account holder, or "**CANCELAR**" to cancel.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/7912f500-ae78-4201-8705-45e36581fa3d)  
Message: "Are you sure you wish to delete this account holder?"

#### Asociar cuenta (Associate account)

This subsection allows you to associate an account to an account holder. In the "**Clave de cuentahabiente**" ("account holder id") field you input the id of an account holder, and in the "**Clave de cuenta a asociar**" ("account to associate id") field you input the id of the account that you want to associate to the previously inputted account holder. Press the "**ASOCIAR**" ("associate") button to perform the association. If the association was performed successfuly, you'll get a confirmation message. If the association couldn't be made, you'll get an error message explaining the reason (for example, the account or account holder you inputted doesn't exist, or they are already associated with each other).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/aac323fb-6f6d-43fb-a92f-af6ab660166a)

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/f1ea8f3a-7f12-4de6-9a54-3c0bc851e5fb)  
Message: "The account holder new guy was associated successfully to account 17"

#### Desasociar cuenta (Disassociate account)



### Cuentas (Accounts)

cuentasfasfa

## Credits for the images, all royalty-free
- ***Home.jpg*** - by [Toa Heftiba](https://unsplash.com/@heftiba) on [Unsplash](https://unsplash.com/photos/LtnX7AhHenU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink).
- ***Cuentas.jpg*** - by [Andre Taissin](https://unsplash.com/@andretaissin) on [Unsplash](https://unsplash.com/photos/5OUMf1Mr5pU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink).
- ***Cuentahabientes.jpg*** - by [Austin Distel](https://unsplash.com/@austindistel) on [Unsplash](https://unsplash.com/photos/744oGeqpxPQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink).
- ***User.png*** - by [Pete Linforth](https://pixabay.com/users/thedigitalartist-202249/) from [Pixabay](https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/).

## In retrospect
Now that I have much more experience with JavaScript and UI design, re-visiting this old assignment allowed me to see how much my coding habits and skills have changed; if I were to remake this UI, there certainly is plenty of stuff I would do differently. For example, 

Some other changes I'd do are:
- In the **Login** section, instead of having a "**LOGIN**" button and a "**LOGOUT**" button, I can have just one button that serves both purposes: have it be a **LOGIN** button when a valid token is not stored, and have it be a **LOGOUT** button when a valid token is stored.
- 
