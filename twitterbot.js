var TwitterPackage = require('twitter');

//Private Developer Codes From Twitter
var secret = {
  consumer_key: //secret key,
  consumer_secret: //secret key,
  access_token_key: //secret key,
  access_token_secret: //secret key
}

//Setting Up Twitter Package
var Twitter = new TwitterPackage(secret);

function compare(a1, a2){
  for(i=0;i<a1.length; i++){
    var match = false;
    for (j=0; j<a2.length; j++){
      {
        if (a1[i]===a2[j]){
          match = true;
          return a1[i];
          break;
        }
      }
    }
  }
}


//Search Twitter Function
Twitter.stream('statuses/filter', {track: '#'}, function(stream) {
  stream.on('data', function(tweet) {

    //If the User ID is NOT @therealcans
    if (tweet.user.id != /*keeping my ID Secret*/){

      //Log the Text of the given tweet
      console.log(tweet.text);

      //Create an array of every word in the tweet
      var arr = tweet.text.split(" ");

      //If the user mentiones one of the keywords in their tweet, respond with a message!
      var keywords = ['scales','yoyo','contest','recessintl','yoyofactory','yoyonews', '#yoyo'];
      var tweetword = compare(keywords,arr);
      var url = 'https://soundcloud.com/scales-collective/steve-wyyc';
      var statusObj = {status:  "@"+ tweet.user.screen_name+" just mentioned "+tweetword+" in a tweet! Check #scales podcast: "+ url};

      //post the new status as a tweet from @therealcans
      Twitter.post('statuses/update', statusObj, function(error, tweetReply, response){
        if(error){
          console.log(error);
        }
        console.log(tweetReply.text);
      });
  }
});

  stream.on('error', function(error) {
    console.log(error);
  })
})
