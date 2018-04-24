import React from 'react'
import { connect } from 'react-redux'
import { addNewCategoryThunkerator, deleteCategoryThunkerator } from '../../store';

const Categories = (props) => {
  return (
    <div>
    <form onSubmit={props.handleSubmit} >
      <label>Add category</label><input name="category" placeholder="Enter category name" />
      <button>Save</button>
    </form>
    <h4>Existing Categories</h4>
    {
      props.allCategories.map(category => <div key={category.id}>{category.name}<button onClick={props.handleDeleteCategory} value={category.id}>Delete</button></div>)
    }
    </div>
  )
}

const mapStateToProps = ({allCategories}) => ({allCategories})

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault()
      dispatch(addNewCategoryThunkerator(event.target.category.value))
    },
    handleDeleteCategory: (event) => {
      event.preventDefault()
      dispatch(deleteCategoryThunkerator(+event.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
