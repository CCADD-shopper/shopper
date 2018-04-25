import React from 'react'
import { connect } from 'react-redux'
import { changeSearchParam, clearSearchParam } from '../store'

const SearchBar = (props) => (
  <div className="ui center aligned basic segment topShopSearchBar">
    <div className="ui left icon action input tsSearchWrapper">
        <i className="search icon" />
        <input onChange={props.handleChange} placeholder={`Search for ${props.placeholder}`} value={props.searchParam} />
      <div className="ui blue submit button">Search</div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    placeholder: 'Products',
    searchParam: state.searchParam,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event) => {
      dispatch(changeSearchParam(event.target.value));
    }
  }
}

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar)
export default SearchBarContainer
