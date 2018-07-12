const { OAuth2Client } = require( 'google-auth-library' )

const { GOOGLE_CLIENT_ID } = require( '../config' )

const client = new OAuth2Client( GOOGLE_CLIENT_ID )

async function decriptToken( token ) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID, 
  })
  return ticket.getPayload()
}

// https://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
function decodeBase64Image( dataString, name ) {
  console.log( dataString )
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  var response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  const type = reponse.type.split( '/' )[1] 

  if ( !type ) {
    return new Error( 'No image type' )
  }

  const file = `${__dirname}/../public/${name}.${type}`
  fs.writeFileSync( file, response.data )
  return file;
}

module.exports = {
  decriptToken,
  decodeBase64Image, 
}
