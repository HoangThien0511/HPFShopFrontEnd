import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const Products = (props: Props) => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default Products