const express = require( 'express' )
const cors = require( 'cors' )
const mongoose = require( 'mongoose' )
const bodyParser = require( 'body-parser' )

const createRouting = require( './routes' )
const { MONGO_ENDPOINT } = require( './config' )

// Create MongoDB connection
mongoose.connect( MONGO_ENDPOINT )
const db = mongoose.connection
db.on( 'error', console.error.bind( console, 'connection error:' ) )
db.once( 'open', function() {

  // MongoDB is initialized, start application.

  // Create express app, load middleware, routing
  const app = express()
  app.use( cors() )
  app.use( bodyParser.json() )
  createRouting( app )

  // Start the server
  app.listen( 3000, () => console.log( 'Running on port 3000...' ) )

} )

