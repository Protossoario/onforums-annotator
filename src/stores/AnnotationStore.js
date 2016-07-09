import alt from 'components/Dispatcher';
import AnnotationActions from '../actions/AnnotationActions';

export class AnnotationStore {
    constructor() {
        this.bindListeners({
            onGetAnnotation: AnnotationActions.getAnnotation,
            onPutAnnotation: AnnotationActions.putAnnotation
        });
        this.annotation = {
            "artId": "",
            "artIndex": 0,
            "artSentences": [],
            "comId": "",
            "comIndex": 0,
            "comSentences": []
        };
    }

    onGetAnnotation(data) {
        const { err, res } = data;
        if (err) {
            console.log(err);
        }
        else {
            this.annotation = res.body;
        }
    }

    onPutAnnotation(data) {
        const { err, res } = data;
        if (err) {
            console.log(err);
        }
        else {
            this.annotation = res.body;
        }
    }
}

export default alt.createStore(AnnotationStore, 'AnnotationStore');
