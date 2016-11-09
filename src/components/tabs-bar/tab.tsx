import './tab.less';

import * as React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

export default class Tab extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    static PropTypes = {
        name: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired,
        isIndex: React.PropTypes.bool.isRequired,
    }

    render() {
        if (this.props.isIndex) {
            return (
                <IndexLink activeClassName="active" to={ this.props.to }>{ this.props.name }</IndexLink>
            )
        } else {
            return (
                <Link activeClassName="active" to={ this.props.to } >{ this.props.name }</Link>
            )
        }
    }


}