# advanced-state-management-with-redux-toolkit-quest-template

Prepared template repository for Quest.

# To Run this work

Clone this Repository.

next, run the following commands to install the dependencies at the root directory of your project

nvm install --lts  # if using nvm
corepack enable
yarn set version stable
yarn install

Create .env in the packages/backend folder that matches the .env.local

# To run Frontend
yarn frontend:dev

# To run backend
yarn backend:serve

A short video of the various functionalities

https://github.com/user-attachments/assets/f772cdeb-fde6-4488-853b-1ce31d0e92cb

Features

Frontend

packages\frontend\src\services\auth\authSlice.ts

contains logic and state for handling authentication and user management

packages\frontend\src\services\product\productSlice.ts

contains logic and state for handling cart and product management

Backend

packages\backend\controllers\authentication

handles authentication

packages\backend\controllers\features\products

handles product create and get

packages\backend\controllers\features\user

handles user delete and create by admin


