//Dependencies
const express         = require ( 'express' );
const mongoose        = require ( 'mongoose' );
const morgan          = require ( 'morgan' );
const app             = express();
const db              = mongoose.connection;
require( 'pretty-error' ).start();

//Environment Variables
const mongoURI        = process.env.MONGODB_URI || 'mongodb://localhost/decidr';
const PORT            = process.env.PORT || 3000;

//Set mongoose Promise Library
mongoose.Promise      = global.Promise;

// Connect to Mongo
mongoose.connect ( mongoURI );
// mongoose.connect ( mongoURI , { useMongoClient: true});

// Error / success
db.on( 'error', ( err ) => console.log( err.message + ' is Mongod not running?' ));
db.on( 'connected', () => console.log( 'mongo connected: ', mongoURI ));
db.on( 'disconnected', () => console.log( 'mongo disconnected' ));

// Open the connection to mongo
db.on( 'open' , ()=>{});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use morgan
app.use ( morgan ( 'tiny' ) );

app.use( express.static( 'public' ));


//Routes
const suggestionController = require( './controllers/suggestionController.js' );
app.use ( '/suggestions' , suggestionController );

app.listen( PORT , () =>{
  console.log( 'running on port' , PORT);
});
