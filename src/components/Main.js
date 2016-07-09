require('normalize.css');
require('styles/App.css');

import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import AnnotationActions from '../actions/AnnotationActions';
import AnnotationStore from '../stores/AnnotationStore';
import PostComponent from './PostComponent';
import ButtonComponent from './ButtonComponent';

var FaHandPeace = require('react-icons/lib/fa/hand-peace-o');
var FaHandPointer = require('react-icons/lib/fa/hand-pointer-o');
var FaHandPaper = require('react-icons/lib/fa/hand-paper-o');
var FaExclamation = require('react-icons/lib/fa/exclamation-triangle');

class AppComponent extends React.Component {
    static getStores() {
        return [ AnnotationStore ];
    }

    static getPropsFromStores() {
        return AnnotationStore.getState();
    }

    componentDidMount() {
        AnnotationActions.getAnnotation();
    }

    handleSubmit(label) {
        const { artId, comId } = this.props.annotation;
        AnnotationActions.putAnnotation(artId, comId, label);
    }

    render() {
        const { annotation } = this.props;
        return (
            <div className="index">
                <div className="buttons">
                    <ButtonComponent
                        color="blue"
                        submit={ this.handleSubmit.bind(this, 'in_favour') }><FaHandPeace color="#FFF" />In Favour</ButtonComponent>
                    <ButtonComponent
                        color="gray"
                        submit={ this.handleSubmit.bind(this, 'impartial') }><FaHandPointer color="#5A5A5A" />Impartial</ButtonComponent>
                    <ButtonComponent
                        color="red"
                        submit={ this.handleSubmit.bind(this, 'against') }><FaHandPaper color="#FFF" />Against</ButtonComponent>
                    <ButtonComponent
                        color="yellow"
                        submit={ this.handleSubmit.bind(this, 'none') }><FaExclamation color="#FFF" />Unrelated</ButtonComponent>
                </div>
                <div className="posts">
                    <PostComponent
                        sentences={ annotation.artSentences }
                        index={ annotation.artIndex } />
                    <PostComponent
                        sentences={ annotation.comSentences }
                        index={ annotation.comIndex } />
                </div>
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default connectToStores(AppComponent);
