var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onforums');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var annotationSchema = mongoose.Schema({
    'artId': String,
    'artIndex': Number,
    'artSentences': [ String ],
    'comId': String,
    'comIndex': Number,
    'comSentences': [ String ],
    'label': String
});
var Annotation = mongoose.model('annotation', annotationSchema);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/annotation', function(req, res) {
    // retrieve next annotation from mongodb in "annotations" collection
    Annotation.aggregate(
    [{
        $group: {
            _id: {
                artId: '$artId',
                comId: '$comId'
            },
            labels: {
                $addToSet: '$label'
            }
        }
    },
    {
        $match: {
            _id: {
                $ne: null
            },
            labels: {
                $size: 0
            }
        }
    },
    {
        $project: {
            pair: "$_id",
            _id: 0,
            labels: 1
        }
    }], function(err, results) {
        if (err) {
            res.status(403);
            res.send('DB Error: ' + err);
            return;
        }
        var result = results[0];
        Annotation.findOne({ artId: result.pair.artId, comId: result.pair.comId }, function(err, annotation) {
            if (err) {
                res.status(403);
                res.send('DB Error: ' + err);
                return;
            }
            res.json(annotation);
        });
    });
});

app.put('/annotation', function(req, res) {
    var artId = req.body.artId;
    var comId = req.body.comId;
    var label = req.body.label;
    if (!artId || !comId) {
        res.status(403);
        res.send('Error: missing fields');
        return;
    }
    Annotation.findOneAndUpdate({ artId, comId }, { '$set': { label } }, function(err, annotation) {
        if (err) {
            res.status(403);
            res.send('DB Error: ' + err);
            return;
        }
        Annotation.aggregate([{
            $group: {
                _id: {
                    artId: '$artId',
                    comId: '$comId'
                },
                labels: {
                    $addToSet: '$label'
                }
            }
        },
        {
            $match: {
                _id: {
                    $ne: null
                },
                labels: {
                    $size: 0
                }
            }
        },
        {
            $project: {
                pair: "$_id",
                _id: 0,
                labels: 1
            }
        }], function(err, results) {
            if (err) {
                res.status(403);
                res.send('DB Error: ' + err);
                return;
            }
            var result = results[0];
            Annotation.findOne({ artId: result.pair.artId, comId: result.pair.comId }, function(err, annotation) {
                if (err) {
                    res.status(403);
                    res.send('DB Error: ' + err);
                    return;
                }
                res.json(annotation);
            });
        });
    });
});

db.once('open', function() {
    app.listen(3000, function () {
        console.log('Server listening on port 3000');
    });
});
