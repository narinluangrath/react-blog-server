const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema 

const BlogPostSchema = new Schema({
  userId : { type : String, required : true, unique : false },
  title : { type : String, required : true, unique : false },
  body : { type : String, required : true, unique : false },
  date : { type : Date, required : false, unique : false },
})

const BlogPost = mongoose.model( 'BlogPost', BlogPostSchema )

module.exports = BlogPost
