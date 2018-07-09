const express = require( 'express' )
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var cors = require('cors')

const app = express()
app.use( cors() )

GOOGLE_CLIENT_ID = '529538039671-ia4lal2d2pj7tn88a15b3k9u45jk08bn.apps.googleusercontent.com'

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {

//     console.log( { accessToken, refreshToken, profile } )

//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     });
//   }
// ));
// app.use(passport.initialize());
// app.use(passport.session());

const { OAuth2Client } = require( 'google-auth-library' );
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
async function verify( token ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
// verify( token ).catch(console.error);

app.get('/', (req, res) => res.send('Hello World!'))

app.post( '/verify', ( req, res ) => {console.log( req ); res.send( 'Testing...' )} )

app.listen(3000, () => console.log('Example app listening on port 3000!'))