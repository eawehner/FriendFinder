// var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        console.log(friends);
        console.log(req.body);
        console.log(friends.length);
        var newFriend = req.body;

        var friendsLength = friends.length;
        console.log(friendsLength);

        var allDifferences = [];

        for (var i=0; i<friendsLength; i++) {
            console.log("i is: " + i);
            var currentFriend = friends[i];
            console.log("Current looping friend: " + currentFriend);
            var score1 = currentFriend.score;
            var score2 = newFriend.score;
            var differenceTotal = 0;
            var score1Length = score1.length;
            console.log("Score 1 Length: " + score1Length);

            for (var i=0; i<score1Length; i++) {
                var difference = parseInt(score1[i]) - parseInt(score2[i]);
                if (difference < 0) {
                    differenceTotal+= Math.abs(difference);
                } else {
                    differenceTotal+=difference;
                }
            };

            allDifferences.push(differenceTotal);
        };

        var friendID = Math.min(...allDifferences);
        var matchedFriend = friends[friendID];

        console.log(matchedFriend);
        
        res.json(matchedFriend);
        

        friends.push(newFriend);
    });
};