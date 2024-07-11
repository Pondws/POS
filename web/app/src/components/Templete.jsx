import React, { useRef } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { forwardRef, useImperativeHandle } from 'react'
import "../App.css"

const Templete = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        refreshCountBill() {
            if (templateRef.current) {
                templateRef.current.refreshCountBill()
            }
        }
    }))

    const templateRef = useRef()

    return (
        <div>
            <div className="wrapper">
                <Navbar />
                <Sidebar ref={templateRef} />
                <div className='content-wrapper pt-3' >
                    <section className='content'>
                        {props.children}
                    </section>
                </div>
            </div>
        </div>
    )
})

export default Templete