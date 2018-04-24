import React from 'react'
import { CategorySelector } from '../components'

const LeftBar = (props) => (
  <div className="sidebar">
    <div className="leftBar categorySelector">
      <CategorySelector />
    </div>
  </div>
)

export default LeftBar
