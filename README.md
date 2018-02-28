# Memo-backend

API used to collect information from a [frontend](https://github.com/Laate/password-memorization) containing a memorisation game.    
The API is built using Node and Express and it connects to a PostgreSQL database.   
Uses [pg-promise](https://github.com/vitaly-t/pg-promise) to interface with Postgres.

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
    Method 'trust' means anyone who can connect to the server is authorized to access the database. For further information about authentication, consult the [documentation](https://www.postgresql.org/docs/current/static/auth-pg-hba-conf.html).   
    `psql -c 'select pg_reload_conf()'` to reload the configuration without restarting the database.    
    
    > To be safe, it's recommended that you read the documentation and understand what you're doing before changing the authentication settings.
    
6. The API can be run either in development or production mode. Production mode removes some log messages and makes Express faster.
    * `npm start` to start in development mode
    * `npm run production` or `NODE_ENV=production npm start` to start in production mode
    * To specify a port you need to set the `PORT` environment variable e.g. `PORT=8443 npm start`. 
      If a port is not specified the API defaults to port 5000

        > If you want to run the API on a privileged port (i.e. port < 1024), it's not recommended to start it as root.     
        > Instead use some other solution e.g. iptables, setcap or nginx. See this [Stack Overflow post](https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode/23281401) for more information.
    * To start a https server you need to set the `HTTPS` environment variable to `enabled` e.g. `HTTPS=enabled npm start`.    
     You also need to modify the placeholder paths in [index.js](src/index.js) with the paths to your ssl key and certificate:

        ```javascript
        const options = {
            key: fs.readFileSync('/path/to/keys/placeholder-key.key'),
            cert: fs.readFileSync('/path/to/keys/placeholder-cert.crt'),
        };
        ```
    > Another good solution for production deployments is to start the API without https, and then configure nginx with https, to act as a reverse proxy connecting to the http API.