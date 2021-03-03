import React from 'react'
import axios from 'axios'
import { endpoint } from '../config/client'
import movieIconDark from '../images/movie_icon_dark.svg'
import movieIconLight from '../images/movie_icon_light.svg'
import searchIcon from '../images/search.svg'

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            defaultText: 'Enter movie name',
            defaultFailureText: 'No records found',
            displaySearch: false,
            isLoading: false,
            list: []
        };

        this.getMovieDataByQuery = this.getMovieDataByQuery.bind(this)
        this.handleMovieSelect = this.handleMovieSelect.bind(this)
    }

    handleSearchModal = () => {
        this.setState({
            displaySearch: true,
            defaultText: 'Enter movie name'
        })
    }

    getMovieDataByQuery(event) {
        let query = event.target.value

        if (query.length >= 3) {
            this.handleLoadingState()

            setTimeout(() => {
                axios
                    .get(endpoint.getDataByQuery(query))

                    .then((data) => {
                        this.handleLoadingState()
                        this.setState({
                            list: data.data.results
                        })
                    })
                    .catch((error) => {
                        return error
                    })
            }, 600)
        } else if (query.length === 0) {
            this.setState({
                displaySearch: false
            })
        } else {
            this.setState({
                list: []
            })
        }
    }

    handleLoadingState() {
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }));
    }

    getYearFromDateString(date) {
        return (new Date(date)).getFullYear()
    }

    handleMovieSelect(title) {
        this.setState({
            defaultText: title,
            displaySearch: false,
        })
    }

    render() {
        return (
            <div id="content_container">
                <div id="search_wrapper" onClick={ () => this.handleSearchModal() }>
                    <div id="search_bar">
                        <div id="search_bar__content">
                            <img src={ movieIconLight }  alt="movie icon" />
                            <p>{ this.state.defaultText }</p>
                        </div>
                    </div>
                    <div id="search_icon">
                        <img src={ searchIcon } alt="search icon" />
                    </div>
                </div>
                { this.state.displaySearch &&
                    <div id="search_content">
                        <div id="input_container">
                            <img src={ movieIconDark }  alt="movie icon" />
                            <div id="input_container__wrapper">
                                <input
                                    type="text"
                                    id="search"
                                    onChange={ this.getMovieDataByQuery }/>
                                <p className="input_container__wrapper_text">{ this.state.defaultText }</p>
                            </div>
                        </div>
                        <div id="movie_container">
                            <ul id="movie_container__ul">
                                { this.state.isLoading &&
                                    <li className="movie_container__li">
                                        <p>...Loading</p>
                                    </li>
                                }
                                { this.state.list.length > 0 &&
                                    !this.state.isLoading &&
                                    this.state.list.slice(0, 8).map((title) => (
                                        <li className="movie_container__li" key={ title.id } onClick={ () => this.handleMovieSelect(title.original_title) }>
                                        <p className="movie_container__li_bottom_title">{ title.original_title }</p>
                                        <p
                                            className="movie_container__li_bottom_text">
                                            { title.vote_average } Rating, { this.getYearFromDateString(title.release_date) }
                                        </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        );
    }
}