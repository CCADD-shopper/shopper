import React from 'react';
import { connect } from 'react-redux';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import store, { getCategories, getCategoriesFromServerThunkerator, clearCategories } from '../../store';

class CategorySelector extends React.Component {
  constructor () {
    super()
  }

  componentDidMount () {
    store.dispatch(getCategoriesFromServerThunkerator());
  }

  componentWillUnmount () {
    store.dispatch(clearCategories());
  }
  render () {
    const { allCategories, selectedCategories } = this.props;

    return (
      <div className="innerSidebar">
          <CheckboxGroup checkboxDepth={2} name="categories" onChange={this.props.handleCategoryChange} >
            {
              allCategories.map(category => <label key={category.id}><Checkbox value={category.id} />{category.name}</label>)
            }
          </CheckboxGroup>
        </div>
    );
  }
}

const mapStateToProps = ({ allCategories, selectedCategories }) => ({ allCategories, selectedCategories });

const mapDispatchToProps = () => {
  return {
    handleCategoryChange: (event) => {
      store.dispatch(getCategories(event));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
