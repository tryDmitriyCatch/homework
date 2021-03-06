import React from 'react'

export default class Helper extends React.Component {
    render() {
        return (
            <li className="movie_container__li">
                <p>{ this.props.message }</p>
            </li>
        )
    }
}