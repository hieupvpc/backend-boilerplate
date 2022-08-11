# Overview document of Backend-boilerplate

1. Technology

   - Node version: v16 (use `Express`)
   - Database: postgres v12
   - Cache/Queue: Redis last version to cache and use bull queue with redis
   - Typescript last version
   - `Awillix` to folow pattern: Dependency Injection to clean code and reuse/replace easy compoment
   - Swagger with autogen to gen document
   - Docker in env development local

2. Architecture

   - this project follow architecture: `monolithic`
   - This repo will layers:
     - caches: this layer will save func cache data all software
     - commands: this layer independence (not exist in iCradle). Only use when need run command on server, local
     - controllers: this layer will validate input, cache. Not use layer to handle logic
     - exceptions: this layer have code of exception
     - helpers: this layer have funcs can reuse at software. Ex: func change format date,...
     - middlware: this layer have func handle before request to controller. Ex: authentication, authorization
     - models: this layer declare table, releation with database
     - repositories: this layer have funcs call to database. Call to model and model will call to database, and call to 3rd services (external, internal)
     - routers: this layer declare enpoint, prefex routes
     - useCase: this layer will handle businness logic of software
     - queues: this layer handle with queue of software
     - sql: this layer at external. Folder have file sql if would declade table, function,.... When create file, create with pattern: "name member"\_"date".sql. Ex: dongnt_20210627.sql

3. Mindset when write code

   - When develop feature, ask yourself questions:
     - Where is layer i will write code at first?
   - At first, think to write to model and file sql
   - Step 2, write repostiory
   - Step 3, write useCase
   - Step 4, write controller
   - Step 5, write routes
   - Step 6, test code
   - Step 7, create merge request on gitlab

4. Start server when develop
   - start docker application
   - cd to src, run: `docker compose up` to restart 3rd service: database, cache,...
   - run: `yarn start` to start server to local
   - \*note: must config 3rd at file .env before start server
