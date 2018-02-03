Url: https://dry-temple-99897.herokuapp.com

Search itunes apps

eg. 
https://dry-temple-99897.herokuapp.com/api/search?media=ebook&term=abc


Pass authorization header for all post requests

Favorites

https://dry-temple-99897.herokuapp.com/api/favorite (POST & GET)

Post example is given below. 

{
	"artistName": "Miles Kelly",
    "artistViewUrl": "https://itunes.apple.com/us/artist/miles-kelly/395144389?mt=11&uo=4",
     "artworkUrl60": "http://is5.mzstatic.com/image/thumb/Publication/v4/81/0d/84/810d84fb-9657-9c25-2cff-bdf0711c8885/source/60x60bb.jpg",
     "artworkUrl100": "http://is5.mzstatic.com/image/thumb/Publication/v4/81/0d/84/810d84fb-9657-9c25-2cff-bdf0711c8885/source/100x100bb.jpg",
     "description": "Younger children will love this new series, which provides a first fun introduction to the alphabet, animals, nursery rhymes and stories. The cheerful design engages children as they follow and read along with parents.<br /><br />↵• Engaging illustrations and photographs<br />↵• Bold, colourful design",
     "kind": "ebook",
     "genres": ["Chapter Books", "Books", "Kids", "Learning to Read"]
}




Account (Just need to pass email and password)

/accounts/login

/accounts/signup



