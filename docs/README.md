# Setup
`npm install` 

# Run
`node .`

# Postgresql
to use postgresql on looback
cd `/server`
run `node bin/create-lb-tables.js` and  `node bin/automigrate.js`

# Endpoints
`{api}/authUsers`

`{api}/domains`

`{api}/helloworlds` //test endpoint

# Users
## creation
endpoint `POST {api}/authUsers`
```{
     "superUser": true,
     "password" : "",
     "username": "",
     "email": ""
   }```

## auth
endpoint `POST {api}/authUsers/login`

`{ "username": "", "password": "" }`

returns id (access_token)


# Test
`npm test`

#Enviroments
By default (no enviroment) is runs default configs can switch between configs:
`export NODE_ENV=staging|production`

default (no NODE_ENV set) is set to `3000`
Staging port is set to `9000` 
Production port is set to `80` (http://stackoverflow.com/questions/23281895)

#Datasources
Change datasources.json for local setup

#Tracker Client static route
`{serverUrl}/lib/tracker/client.min.js`

#Update static routes for homepage
File `server/boot/routes.js` lines 55-70, you've got to create there new routes, 
in homepage.js and referrals.js depending on where those pages are located.

Use a function like this to register a new route, where 'index' is the name of the view file. and the object is context that gets populated.
 
```function index(req, res) {
    res.render('index', {
      referralId: req.query.ref
    });
}```

