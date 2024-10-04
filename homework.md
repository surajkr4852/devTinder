-Create a repository
-Initialize the repository
-node_modules, package-lock.json,package.json
-install express
-create server
-listen to port
-write request handlers for- test, hello
-install nodemon and update scripts inside package.json
-what are dependencies
-what is the use of "-g" while npm install
-Difference between caret and tilde(^ vs ~)


-intialize git repo
-gitignore
-create remote repo on github
-push all code to remote origin
-play with reoutes 

-Install Postman App
-Create workspace 
-create collections
-Test API calls

-write logic to handle GET POST PATCH PUT DELETE and test them on Postman
-explore routing , use of ? * () * in the routes
-use of regex in routes /a/  /.*fly$/
-reading query params in the routes
-reading the dynamic routes


-next()
-next function and errors along with with res.send();
- what is middleware, Why do we need it?
- how express JS basically handles request behind the scene
-write a dummy auth middle for admin
-write a dummy auth middle for all user routes ,except user/login.
- Error handling - try catch, wildcard error handling


-episode 6
-install mongoose library- npm i mongoose.
- connect your application to DB using mongoose. => <"connectoonstring/DataBase Name">
- call the connectDB function and connect to database before starting application on 7777...

-create a user schema & User model
-create POST /signup api to add data into database.
-push some documents using api call from postman


- Javascript object vs JSON
-add the express.json() middleware to your app
-make your signup API dynamic to receive data from the end user
-API- Get user by Email
-API- Feed API- get all users from the database
-API get user by ID.
- Create a get user API
- create a delete user API.
-difference between PATCH and PUT
-API Update a user.
-Explore the mongoose documents for api Models.
- what are options in model.findOneAndUpdate method, explore more about it.
- API- Update the user with email Id;



- explore schematype option from the documentation
- add required,unique,lowercase,min,minlength,trim,default
- create a custom validate function
- improve the DB schema.- put all appropriate validation on each field in schema
- Add timestamps to the user Schema
- Add API level validation on patch request and signup post api.
- Add API level validation for each field.
- Install validator library
- Explore validator library functions and use validator func for password, email,photoUrl.
- Never Blindly trust res.body;



- EP 9
- Validate data in SignUp API-> Create helper function
- Install bcrypt package
- Create a password Hash using bcrypt.hash() and save the user with encrypted password.
- Create login API.
- Compare password and throw error if email or password is incorrect


- ep 10
- install cookie parser
- just send a dummy cookie to user
- create GET/profile API and check if you get the cookie back
- install jsonwebtoken
- in login API,after email and password validation create a JWT token and send it to user in cookie
- read the cookies inside your profile API and find the logged in user.
- user auth middleware
- add the userAuth middleware in  profile and a new sendConnectionRequest API.
- set the expiry of JWT token and cookies to 7 days
- create userSchema method to getJWT().
- create userSchema method to comparepassword

- Explore Tinder APIs
- Create List of all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing Express routers
- create authRouter,profileRouter,requestRouter
- Import these router in app.js
- use the routers.(import these router in app.js)


- Create ConnectionRequest Schema
- API => send connection request.
- proper validation of data
- think about corner cases and handle them
- Locical Query in mongoDB $or, $and
- schema.pre() function
- Read about compound index, indexing


- Write code with proper for POST /request/review/:status/:requestId
- read about ref and populate,,replacement for joins
- https://mongoosejs.com/docs/populate.html       
- create GET /request/requests/recieved      with all checks
- create GET /user/connections 

- logic for GET/feed  API
- explore the $and , $nin ,$ne   => logical and comparison query operators from mongodb docs.


/feed?page=1&limit=10 => 01-10      .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20      .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30      .skip(20) & .limit(10)

.skip() => how many documents you skip from starting 
.limit() => how many documents you want