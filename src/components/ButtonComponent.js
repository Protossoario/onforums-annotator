'use strict';

import React from 'react';

require('styles//Button.sass');

class ButtonComponent extends React.Component {
    render() {
        const { color, submit } = this.props;
        return (
            <a className={ "button-component " + color } href="#" onClick={ submit }>
                { this.props.children }
            </a>
        );
    }
}

ButtonComponent.displayName = 'ButtonComponent';

ButtonComponent.propTypes = {
    color: React.PropTypes.string.isRequired,
    submit: React.PropTypes.func.isRequired
};
// ButtonComponent.defaultProps = {};

export default ButtonComponent;
