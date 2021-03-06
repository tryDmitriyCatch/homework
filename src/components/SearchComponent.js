import React from 'react'
import axios from 'axios'
import { debounce } from 'debounce'
import { endpoint } from '../config/client'
import { CONFIG } from '../config/config'
import movieIconDark from '../images/movie_icon_dark.svg'
import movieIconLight from '../images/movie_icon_light.svg'
import searchIcon from '../images/search.svg'
import Helper from './partials/Helper'
import { getYearFromDateString } from '../config/utils'

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            defaultText: 'Enter movie name',
            defaultFailureText: 'No records found',
            displaySearch: false,
            isLoading: false,
            isSuccess: true,
            list: []
        }

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

        if (query.length >= CONFIG.DEFAULT_MIN_CHARACTER_COUNT) {
            this.handleLoadingState()

            axios
                .get(endpoint.getDataByQuery(query))
                .then((data) => {
                    this.handleLoadingState()
                    this.setState({
                        list: data.data.results
                    })
                })
                .catch(() => {
                    this.handleLoadingState()

                    this.setState({
                        isSuccess: false,
                        list: []
                    })
                })
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
        }))
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
                                    onChange={ debounce(this.getMovieDataByQuery, CONFIG.DEFAULT_DEBOUNCE_DELAY) }/>
                                <p className="input_container__wrapper_text">{ this.state.defaultText }</p>
                            </div>
                        </div>
                        <div id="movie_container">
                            <ul id="movie_container__ul">
                                { this.state.isLoading &&
                                    <Helper message="...Loading"/>
                                }
                                { !this.state.isLoading && !this.state.isSuccess &&
                                    <Helper message="An error occured. Please try later"/>
                                }
                                { this.state.list.length > 0 &&
                                    !this.state.isLoading &&
                                    this.state.list.slice(0, CONFIG.DEFAULT_SEARCH_COUNT).map((title) => (
                                        <li className="movie_container__li" key={ title.id } onClick={ () => this.handleMovieSelect(title.original_title) }>
                                        <p className="movie_container__li_bottom_title">{ title.original_title }</p>
                                        <p
                                            className="movie_container__li_bottom_text">
                                            { title.vote_average } Rating, { getYearFromDateString(title.release_date) }
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