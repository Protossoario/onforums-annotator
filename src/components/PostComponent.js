'use strict';

import React from 'react';

require('styles//Post.sass');

class PostComponent extends React.Component {
    render() {
        const { index, sentences } = this.props;
        return (
            <div className="post-component">
                { sentences.map((s, ind) => {
                    return (<div><span className={ ind == index ? "highlight" : "normal" }>{ s }</span><br /></div>);
                }) }
            </div>
        );
    }
}

PostComponent.displayName = 'PostComponent';

PostComponent.propTypes = {
    index: React.PropTypes.number.isRequired,
    sentences: React.PropTypes.arrayOf(
        React.PropTypes.string
    ).isRequired
};
// PostComponent.defaultProps = {};

export default PostComponent;
