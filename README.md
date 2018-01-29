# employer-portal

> Employer Portal to view and manage employees
# Toolchain
> Vue
> Material Design for Vue in Beta
> Express to serve the content

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test

# run build and serve
npm run serve
```

## Docker Image

### Build Container
NOTE: do not forget to increment tag number if you have multiple versions
NOTE: if you not running your custom repo, don't run steps 3 and 4, otherwise, replace  ```<custom-repo-url:5000>``` with your docker repo
``` bash
# 1. build container for web
docker build -t employee-portal:1 .
# 2. tag image with the latest tags
docker tag employee-portal:1 employee-portal:latest
# 3. tag image for the reop if you have any
docker tag employee-portal:1 <custom-repo-url:5000>/employee-portal:1
# 4. push image to the local repository
docker push <custom-repo-url:5000>/employee-portal:1
```
### Start Container
``` bash
docker run -d --restart=always -p 7777:9000 --name www employee-portal
```
now you'll be able to access application on ```http://localhost:7777```
