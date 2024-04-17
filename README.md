
# SDI-Z-PREFIX

This project builds a simple inventory management application based on several user stories. The purpose of this project is to provide proof that I am capable of developing a full CRUD application for my Z prefix.


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
  npm install nodemon react react-dom react-router-dom react-scripts web-vitals js-cookie
  npm start
```

