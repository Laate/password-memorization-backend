# Memo-backend

API used to collect information from a [frontend](https://version.aalto.fi/gitlab/usability-stylometry/password-memorization) containing a memorisation game.    
The API is built using Node and Express and it connects to a PostgreSQL database.

## How to run

1. Make sure you have [Node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) and [Postgres](https://www.postgresql.org/download/) installed
2. Clone the repo and `cd` inside
3. `npm install`
4. Create a Postgres user profile (alternatively use the 'postgres' user) and create the database  
    * `sudo -u postgres createuser -s <username>`
    * `createdb` to be able to run `psql` without using the 'postgres' user
    * `psql -f createdb.sql` to run the sql script inside the repo creating the `memodb` database

    > If everything worked correctly, you can type `psql memodb` to connect to the database. Try `\d+ guesses;` to see the table definition.

5. You might need to change the PostgreSQL permissions to allow connecting to the database from localhost, if it is not allowed by default.     
   The [pg_hba_conf](https://www.postgresql.org/docs/current/static/auth-pg-hba-conf.html) file specifies the permissions, type `psql -t -c 'show hba_file'` to see where it's located.      
   Modify the pg_hba_conf file to suit your use case, e.g. to trust localhost:
    ```applescript
    # TYPE  DATABASE        USER            ADDRESS                 METHOD
    # IPv4 local connections:
    host    all             all             127.0.0.1/32            trust
    # IPv6 local connections:
    host    all             all             ::1/128                 trust
    ```
    Method 'trust' means anyone who can connect to the server is authorized to access the database. For further information about authentication consult the [documentation](https://www.postgresql.org/docs/9.6/static/auth-pg-hba-conf.html).   
    `psql -c 'select pg_reload_conf()'` to reload the configuration without restarting the database.    
    
    > To be safe, it's recommended that you read the documentation and understand what you're doing before changing the authentication settings.
    
6. The API can be run either in development or production mode:
    * `npm start` to start a http server and receive debug messages. Convenient when developing locally
    * `npm run production` or `NODE_ENV=production npm start` to start a https server and remove some debug messages. Used when deploying on a server
        
        > To start a https server you need to modify the placeholder paths in [index.js](src/index.js) with the paths to your ssl key and certificate 
        ```javascript
        const options = {
            key: fs.readFileSync('path/to/keys/placeholder-key.pem'),
            cert: fs.readFileSync('path/to/keys/placeholder-cert.pem'),
        };
        ```
    * To specify a port you need to set the `PORT` enviroment variable e.g. `PORT=8443 npm start`. 
      If a port is not specified the API defaults to port 5000


