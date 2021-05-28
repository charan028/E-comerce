import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        console.groupCollapsed(this.props);
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto text-center text-title text-uppecase pt-5">
                            <h1 className="display-3">
                                404
                            </h1>
                            <h1>
                                page not found
                            </h1>
                            <h1>
                                error
                            </h1>
                            <h3> requested URL <span className="text-danger">
                                {this.props.location.pathname}
                                </span>
                                {""}
                                not Found</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
