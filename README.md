
# SDI-Z-PREFIX

This projects builds a simple inventory management application based off several user stories. The purpose of this project is to provide proff that I am capable of developing a full CRUD app for my Z prefix.


## Run Locally

Clone the project

```
  git clone https://github.com/fudpucker1/sdi-z-prefix
```

Go to the project directory

```
  cd sdi-z-prefix
```

Spin up postgres docker container

```
docker-compose up
```

Go to the db_data directory, install dependencies, and populate db with data

```
  cd db_data
  npm install knex pg bcrypt
  npm start
```

Go to the api directory, install dependencies, and start express server (port 3000)

```
  cd ..
  cd api
  npm install bcrypt cors express knex nodemon pg
  npm start
```

Go to the ui directory, install dependencies, and start web application (port 8080)

```
  cd ..
  cd ui
  npx create-react-app .
  npm install js-cookie nodemon
  npm start
```

