const uniqid = require('uniqid');
var base64Img = require('base64-img');
const path = require('path')

const { decriptToken, decodeBase64Image } = require( '../utils' )
const { BlogPost } = require( '../models' )

function createRouting( app ) {

  // Get all the posts
  app.get( '/', async ( req, res ) => {

    const userInfo = await decriptToken( req.query.token )
    BlogPost.find( {} )
            .where( 'userId' )
            .equals( userInfo.sub )
            .exec( ( err, blogPosts ) => res.send( blogPosts ) )

  })

  // Create a post
  app.post( '/compose', async ( req, res ) => { 

    const body = req.body
    const userInfo = await decriptToken( body.token )
    const publicFolder = path.join( __dirname, '../public' )
    const name = uniqid()

    // hacky solution
    const data = body.image.split( ';' ) 
    const type = data[0].split( '/' )[1] == 'jpeg' ? 'jpg' : data[0].split( '/' )[1]
    const imageFile = base64Img.imgSync( data[0] + ';' + data[2], publicFolder, name )

    const newPost = { 
      userId : userInfo.sub || '', 
      title : body.title || '', 
      body : body.body || '', 
      image : name + '.' + type || '',
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
