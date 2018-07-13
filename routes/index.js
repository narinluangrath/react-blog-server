const uniqid = require( 'uniqid' )

const utils = require( '../utils' )

function createRouting( app, bq ) {

  // Get all the posts
  app.get( '/', async ( req, res ) => {

    try {
    
      const userInfo = await utils.decriptToken( req.query.token )
      const userId = userInfo && userInfo.sub
      const result = await utils.get( bq, userId )
      res.send( result )

    } catch ( e ) {
      
      console.error( 'Error on route / ', e )

    }

  })

  // Create a post
  app.post( '/compose', async ( req, res ) => { 

    try {

      const { title, body, image, token } = req.body
      const userInfo = await utils.decriptToken( token )
      const userId = userInfo.sub

      await utils.insert( bq, userId, uniqid(), title, body, image, Date.now() )
      res.send( { status : 'ok' } )

    } catch ( e ) {

      console.error( 'Error on route /compose ', e )

    }

  })

  // Delete a post
  app.delete( '/post', ( req, res ) => {} )

  // Update a post
  app.put( '/post', ( req, res ) => {} )

}

module.exports = createRouting
