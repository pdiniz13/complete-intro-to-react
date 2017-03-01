import React from 'react';
import { connect } from 'react-redux';
import { setSearchTerm } from './actionCreators';
import { Link } from 'react-router'

class Header extends React.Component {
    constructor(props){
        super(props);
        let self = this;
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    }
    handleSearchTermChange(event) {
        this.props.dispatch(setSearchTerm(event.target.value))
    }
    render () {
        let utilSpace;
        if (this.props.showSearch){
            utilSpace = <input value={this.props.searchTerm} onChange={this.handleSearchTermChange} type='text' placeholder='Search' />
        }
        else {
            utilSpace = (
                <h2>
                    <Link to='/search'>
                        Back
                    </Link>
                </h2>
            )
        }
        return (
            <header>
                <h1>
                    <Link to='/'>
                        svideo
                    </Link>
                </h1>
                {utilSpace}
            </header>
        )
    }
}

const {func, bool, string} = React.PropTypes;

Header.propTypes = {
    dispatch: func,
    showSearch: bool,
    searchTerm: string
};

const mapStateToProps = (state) => {
    return {
        searchTerm: state.searchTerm
    };
};

export default connect(mapStateToProps)(Header);