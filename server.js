const express = require( 'express' )
const cors = require( 'cors' )
const bodyParser = require( 'body-parser' )
const BigQuery = require( '@google-cloud/bigquery' )

const createRouting = require( './routes' )
const { KEY_FILENAME, PROJECT_ID } = require( './config' )

// Create express app, load middleware, routing
const app = express()
app.use( cors() )
app.use( bodyParser({ limit : '50mb' }) )

// Add routing
const bq = new BigQuery({
  projectId : PROJECT_ID,
})
createRouting( app, bq )

// Start the server
const PORT = process.env.PORT || 8080
app.listen( PORT, () => console.log( 'Running on port 8080...' ) )
