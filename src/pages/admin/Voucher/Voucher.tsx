import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const Voucher = (props: Props) => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}

export default Voucher