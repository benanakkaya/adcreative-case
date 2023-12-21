"use client"
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from './store'

type PropTypes = {
    children: ReactNode
}

const StoreProvider = ({ children }: PropTypes) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProvider