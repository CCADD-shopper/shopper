import React from 'react'
import { connect } from 'react-redux'
import { changeSearchParam, clearSearchParam } from '../store'

const SearchBar = (props) => (
  <div className="searchBar">
    <input onChange={props.handleChange} placeholder={`Search for ${props.placeholder}`} value={props.searchParam} />
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
