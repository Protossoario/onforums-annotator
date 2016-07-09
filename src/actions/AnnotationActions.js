var request = require('superagent');

import alt from 'components/Dispatcher';

class AnnotationActions {
    getAnnotation() {
        return ((dispatch) => {
            request.get('/annotation').end(function(err, res) {
                dispatch({ err, res });
            });
        });
    }

    putAnnotation(artId, comId, label) {
        return ((dispatch) => {
            request.put('/annotation').send({ artId, comId, label }).end(function(err, res) {
                dispatch({ err, res });
            });
        });
    }
}

export default alt.createActions(AnnotationActions);
