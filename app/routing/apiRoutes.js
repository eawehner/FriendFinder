var path = require("path");
var friends = require("../data/friends");

module.exports = function(app) {

    // SO WHAT WE NEED TO DO IS:
    // HAVE AN EMPTY ARRAY OF SCORE DIFFERENCES TO PUSH INTO
    // LOOP THROUGH ALL THE SCORES OF EACH FRIENDS SCORE AND PUSH THOSE DIFFERENCES IN
    // THEN COMPARE FOR THE ENTIRE ARRAY

    function friendMatch(friends, newFriend, cb) {
        var allDifferences = [];

        for (i=0; i<friends.length; i++) {
            var score1 = friends[i].score;
            var score2 = newFriend.score;
            var differenceTotal = 0;

            for (var i=0; i<score1.length; i++) {
                var difference = score1[i] - score2[i];
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

        return matchedFriend;
    };

    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;

        //using a callback to post results of friend matching
        friendMatch(friends, newFriend, function(res) {
            res.json(matchedFriend);
        });

        friends.push(req.body);
    });
};