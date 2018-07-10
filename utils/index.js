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

module.exports = { decriptToken }
