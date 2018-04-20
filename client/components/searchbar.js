import React from 'react'
import { connect } from 'react-redux'

const SearchBar = (props) => (
  <div className="searchBar">
    <input onChange={props.handleChange} placeholder={props.placeholder} />
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
      console.log('change');
    }
  }
}

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps)(SearchBar)
export default SearchBarContainer
