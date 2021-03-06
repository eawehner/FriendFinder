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
        var friendID = 0;

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

                console.log(difference);
                if (difference < 0) {
                    differenceTotal+=Math.abs(difference);
                } else {
                    differenceTotal+=difference;
                }
            };

            allDifferences.push(differenceTotal);

            console.log("All Differences:" + allDifferences);

            for (var i=0; i<allDifferences.length; i++) {
                if (differenceTotal <= allDifferences[i]) {
                    friendID=i;
                    console.log(friendID);
                }
            }
        };

        var matchedFriend = friends[friendID];
        console.log(matchedFriend);

        friends.push(newFriend);

        res.json(matchedFriend);
    });
};