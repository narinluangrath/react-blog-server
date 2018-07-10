const { decriptToken } = require( '../utils' )
const { BlogPost } = require( '../models' )

function createRouting( app ) {

  console.log( 'About to add routing' )

  // Get all the posts
  app.get( '/', async ( req, res ) => {
    
    // Temporary, for debugging
    // BlogPost.find( {} ).where( 'userId' ).equals( '123' ).exec( ( err, result ) => res.send( result ) )

    const userInfo = await decriptToken( req.query.token )
    BlogPost.find( {} )
            .where( 'userId' )
            .equals( userInfo.sub )
            .exec( ( err, blogPosts ) => res.send( blogPosts ) )

  })

  // Create a post
  app.post( '/compose', async ( req, res ) => { 

    // Temporary, for debugging
    // const fakePost = { 
    //   userId : '123', 
    //   title : 'Fake Title', 
    //   body : 'Fake Body', 
    //   date : new Date() 
    // }
    // BlogPost.create( fakePost, ( err, _ ) => res.send( { status : err || 'good' } ) )

    const body = req.body
    const userInfo = await decriptToken( body.token )
    const newPost = { 
      userId : userInfo.sub || '', 
      title : body.title || '', 
      body : body.text || '', 
      date : new Date() 
    }
    BlogPost.create( newPost, ( err, _ ) => {
      if ( err ) { 
        console.error( err ) 
      } else { 
        console.log( res )
        res.send( { status : 'okay' } )
      }
    })

  })

  // Delete a post
  app.delete( '/post', ( req, res ) => {} )

  // Update a post
  app.put( '/post', ( req, res ) => {} )

}

module.exports = createRouting
