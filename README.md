# Step init project nodejs express typescript sequelize

# init project

1. npm init -y

# add dependencies

2. npm install --save-dev typescript ts-node @types/node @types/express nodemon

npm i pg sequelize sequelize-typescript reflect-metadata
npm i dotenv
npm i zod
npm i express
npm install --save-dev @types/amqplib
npm install amqplib
npm install nodemailer
npm i http-status

# add tsconfig

3. npx tsc --init

# tsconfig script must be uncomment

4. Update "outDir": "./build" in tsconfig.json

# add script

5. Update "scripts" section in package.json:
   "tsc:dev": "tsc && nodemon ./build/index.js"

# How to start

1. npm install
2. npm run start-dev
