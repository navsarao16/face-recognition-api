const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex'); // knexjs.org

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED =0 

const db = knex({ 			// initailizing the library
  client: 'pg',
  connection: {
  	    connectionString : process.env.DATABASE_URL,
  	
  	//  connectionString: process.env.DATABASE_URL,


  	 ssl: {	
  	 	rejectUnauthorized: false
  	  }
    // user : 'postgres',
    // password : 'Navneet',
    // database : 'smartbrain'
  }
});

// db.select('*').from ('users').then(data=>{
// 	console.log(data);
// });

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
	res.send ("it is working");
})


app.post('/signin' , (req, res)=>
  {signin.handleSignin(req,res,db,bcrypt)})


app.post('/register', (req, res) =>{register.handleRegister(req,res,db,bcrypt)}) 
app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req,res)=> { image.handleApiCall(req,res)})
app.listen (process.env.PORT || 3006, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})