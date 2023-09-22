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

To add a new account holder, click on the "**NUEVO CUENTAHABIENTE**" ("new account holder") button on the top-right corner of the table. Fill out the fields and then click on "**AGREGAR**" ("add"). The id has to be a number greater than 0 and unique. The name can be alphanumeric. The age has to be a 0 or greater number.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/60ee0c0f-7661-4870-b988-782e2acb2131)

If the account holder is created succefully, you'll get a confirmation message. If something went wrong with its creation, you'll get an error message stating the reason (for example: the id has to be unique, age can't be negative, etc.).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/14b98a81-85ea-4e92-baa6-06f95865740b)  
Message: "new guy was added successfully"

On the table's "**Acciones**" ("actions") column, you can modify or delete an account holder. Clicking the pencil button ![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/3197b47d-f881-4682-8df3-d6603b725892) will open up a window that allows you to modify the account holder's name and/or age.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/ec56f95d-e4c1-47a5-b84e-66c682469aff)

Clicking the trash button ![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/d00c06e0-8f53-4b27-b27b-f40477068434) will open up a deletion confirmation window. Click on the "**OK**" button to delete the account holder, or "**CANCELAR**" to cancel. Because all accounts need to be associated to at least one account holder, you can't delete an account holder that is the only association that an account has.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/7912f500-ae78-4201-8705-45e36581fa3d)  
Message: "Are you sure you wish to delete this account holder?"

#### Asociar cuenta (Associate account)

This subsection allows you to associate an account to an account holder. These associations are stored in the "**cuentahabientecuentas**" table of the MySQL database. In the "**Clave de cuentahabiente**" ("account holder id") field you input the id of an account holder, and in the "**Clave de cuenta a asociar**" ("account to associate id") field you input the id of the account that you want to associate to the previously inputted account holder. Press the "**ASOCIAR**" ("associate") button to perform the association. If the association was performed successfuly, you'll get a confirmation message. If the association couldn't be made, you'll get an error message explaining the reason (for example: the account or account holder you inputted doesn't exist, or they are already associated with each other).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/aac323fb-6f6d-43fb-a92f-af6ab660166a)

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/f1ea8f3a-7f12-4de6-9a54-3c0bc851e5fb)  
Message: "The account holder new guy was associated successfully to account 17"

#### Desasociar cuenta (Disassociate account)

This subsection allows you to disassociate an account from an account holder. In the "**Clave de cuentahabiente**" ("account holder id") field you input the id of an account holder, and in the "**Clave de cuenta a desasociar**" ("account to disassociate id") field you input the id of the account that you want to disassociate from the previously inputted account holder. Press the "**DESASOCIAR**" ("disassociate") button to perform the disassociation. If the disassociation was performed successfuly, you'll get a confirmation message. If the disassociation couldn't be made, you'll get an error message explaining the reason (for example: the account or account holder you inputted doesn't exist, or they are already disassociated).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/ef373aa1-e09b-4c73-9573-d47b07382a3e)

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/5c36ad4d-c18a-4000-8892-3f99d4a5b080)  
Message: "The account holder John Doe was disassociated successfully from account 25"

### Cuentas (Accounts)
Here you can see a table of all the registered accounts, which are stored in the "**cuenta**" table of the MySQL database. Above the table there are four subsections that you can open: [**Consultar saldos**](#consultar-saldos-check-balance) (check balance), [**Depositar**](#depositar-deposit) (deposit), [**Retirar**](#retirar-withdraw) (withdraw) and [**Transferir**](#transferir-transfer) (transfer).

The table lists each account's id (claveCuenta), balance (saldo) and associated account holders (cuentahabientes). Different accounts can share the same balance and associated account holders, but not the same id. You can sort the accounts by id or by balance. You can also choose the amount of accounts to list in the table per page.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/b8f1fd44-b4c7-4483-b66e-9babe4be24ca)

To add a new account, click on the "**NUEVA CUENTA**" ("new account") button on the top-right corner of the table. Fill out the fields and then click on "**AGREGAR**" ("add"). The id has to be a number greater than 0 and unique. The balance has to be at least 0 and it can be either a whole number or a decimal number; there is no limit to how many decimal places the balance you input can have, but the back-end will always round it up or down to 2 decimal places. The new account has to have at least one account holder associated to it, so you need to input at least 1 valid account holder id in the "**cuentahabientes**" field; if you want to associate more than one account holder, you can input multiple valid account holder ids by separating them with commas.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/62cfb3f2-60e4-415e-9368-2b4b9cf9d461)

If the account is created succefully, you'll get a confirmation message. If something went wrong with its creation, you'll get an error message stating the reason (for example: the id has to be unique, balance can't be negative, etc.).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/e97e5f1a-9f22-4ea0-a3bb-1e64800e01c1)  
Message: "The account of id 4 was added successfully"

On the table's "**Acciones**" ("actions") column, you can delete an account. Clicking the trash button ![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/d00c06e0-8f53-4b27-b27b-f40477068434) will open up a deletion confirmation window. Click on the "**OK**" button to delete the account, or "**CANCELAR**" to cancel. You can only delete accounts that have a balance of $0.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/0a7af1fb-3886-451e-917f-eede6ebe5b91)  
Message: "Are you sure you wish to delete this account?"

#### Consultar saldos (Check balance)

This subsection allows you to check the balance of a specific account. While this subsection is redundant because you can already check the balances of all the registered accounts in the accounts table, my professor asked for it as part of the assignment anyway for the sake of practice. The table of accounts disappearing when you enter this subsection is intentional, as it was also a request from my professor. In the "**Clave de cuenta**" ("account id") field, you select from a drop-down list the id of an account; once selected, that account's balance will automatically appear in the "**Saldo**" ("balance") field.

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/3a4f3d7c-9fe3-4c5f-89a0-d15559d7d9fb)

#### Depositar (Deposit)

This subsection allows you to deposit money into an account. In the "**Clave de cuenta en la que se depositará**" ("account id in which to deposit") field you input the id of an account, and in the "**Depósito**" ("deposit") field you input the amount of money you wish to deposit to that account. Press the "**DEPOSITAR**" ("deposit") button to perform the deposit. If the deposit was performed successfuly, you'll get a confirmation message. If the deposit couldn't be made, you'll get an error message explaining the reason (for example: the deposit can't be negative or 0).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/565d079b-1a5a-4f4c-9e03-95831cf87ab1)

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/3991cfd7-8809-4748-88a4-d9b0f3dc7047)  
Message: "Deposit successful"

#### Retirar (Withdraw)

This subsection allows you to withdraw money from an account. In the "**Clave de cuenta de la que se retirará**" ("account id from which to withdraw") field you input the id of an account, and in the "**Retiro**" ("withdrawal") field you input the amount of money you wish to withdraw from that account. Press the "**RETIRAR**" ("withdraw") button to perform the withdrawal. If the withdrawal was performed successfuly, you'll get a confirmation message. If the withdrawal couldn't be made, you'll get an error message explaining the reason (for example: the withdrawal can't be negative, 0 or greater than the account's present balance).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/84b9c10e-9561-4345-93b7-6243667ed8a0)

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/87da57b3-baff-48ec-9fb4-839a88b0ab1c)  
Message: "Withdrawal successful"

#### Transferir (Transfer)

This subsection allows you to transfer money from an account into another. In the "**Clave de cuenta fuente**" ("source account id") field you input the id of the account from which money will be transferred, in the "**Transferencia**" ("transfer") field you input the amount of money you wish to transfer, and in the "**Clave de cuenta destino**" ("destination account id") field you input the id of the account into which money will be transferred. Press the "**TRANSFERIR**" ("transfer") button to perform the transfer. If the transfer was performed successfuly, you'll get a confirmation message. If the transfer couldn't be made, you'll get an error message explaining the reason (for example: the transfer can't be negative, 0 or greater than the source account's present balance).

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/960545bf-b2cf-4ff5-9074-f3326635b88a)

![image](https://github.com/mareyna356/javascript-mock-bank-frontend/assets/116867368/790eb39d-d17a-43a5-92f2-822702bd8ace)  
Message: "Transfer successful"

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
