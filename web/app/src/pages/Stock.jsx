import React, { useEffect, useState } from 'react'
import Templete from '../components/Templete'
import config from '../config'
import Swal from 'sweetalert2'
import axios from 'axios'
import Modal from '../components/Modal'
import * as dayjs from "dayjs"

const Stock = () => {
    const [products, setProducts] = useState([])
    const [productName, setProductName] = useState("")
    const [productId, setProductId] = useState(0)
    const [qty, setQty] = useState(0)
    const [stock, setStock] = useState([])

    useEffect(() => {
        fetchDataStock()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/product/list", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setProducts(res.data.results)
                }
            })
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }
    }

    const fetchDataStock = async () => {
        try {
            await axios.get(config.api_path + "/stock/list", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setStock(res.data.results)
                }
            }).catch(err => {
                throw err.response.data
            })
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }
    }

    const handleChooseProduct = (item) => {
        setProductName(item.name)
        setProductId(item.id)

        const btns = document.getElementsByClassName("btnClose")
        for (let i = 0; i < btns.length; i++) btns[i].click()
    }

    const handleSave = async () => {
        try {
            const payload = {
                qty: qty,
                productId: productId
            }

            await axios.post(config.api_path + "/stock/save", payload, config.headers()).then(res => {
                if (res.data.message === "success") {
                    fetchDataStock()
                    setQty(1)

                    Swal.fire({
                        title: "บันทึก",
                        text: "รับสินค้าเข้าสต๊อกแล้ว",
                        icon: "success"
                    })
                }
            }).catch(err => {
                throw err.response.data
            })
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e.message,
                icon: "error"
            })
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: "ลบรายการ",
            text: "ยืนยันการลบรายการ",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    await axios.delete(config.api_path + "/stock/delete/" + item.id, config.headers()).then(res => {
                        if (res.data.message === "success") {
                            fetchDataStock()

                            Swal.fire({
                                title: "ลบข้อมูล",
                                text: "ลบข้อมูลแล้ว",
                                icon: "success",
                            })
                        }
                    }).catch(err => {
                        throw err.response.data
                    })

                } catch (e) {
                    Swal.fire({
                        title: "error",
                        text: e.message,
                        icon: "error"
                    })
                }
            }
        })
    }

    return (
        <div>
            <Templete>
                <div className='card'>
                    <div className='card-header'>
                        <div className='card-title'>รับสินค้าเข้า Stock</div>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className="col-3">
                                <div className='input-group'>
                                    <span className='input-group-text'>สินค้า</span>
                                    <input className='form-control' disabled value={productName} />
                                    <button onClick={fetchData}
                                        data-toggle="modal"
                                        data-target="#modalProduct"
                                        className='btn btn-primary'>
                                        <i className='fa fa-search'></i>
                                    </button>
                                </div>
                            </div>
                            <div className='col-2'>
                                <div className='input-group'>
                                    <span className='input-group-text'>จำนวน</span>
                                    <input value={qty} onChange={e => setQty(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='col-6'>
                                <button onClick={handleSave}
                                    className='btn btn-primary'>
                                    <i className='fa fa-check me-2'></i>
                                    บันทึก
                                </button>
                            </div>
                        </div>

                        <table className='table table-bordered mt-3'>
                            <thead>
                                <tr>
                                    <th width={100}>barcode</th>
                                    <th>รายการ</th>
                                    <th width={100}>จำนวน</th>
                                    <th width={180}>วันที่</th>
                                    <th width={100}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {stock.length > 0 ? stock.map(item =>
                                    <tr>
                                        <td>{item.product.barcode}</td>
                                        <td>{item.product.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                        <td className='text-center'>
                                            <button onClick={() => handleDelete(item)}
                                                className='btn btn-danger'>
                                                <i className='fa fa-times me-2'></i>
                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>

            <Modal id="modalProduct" title="เลือกสินค้า" modalSize="modal-lg">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th width={180}></th>
                            <th width={150}>barcode</th>
                            <th>รายการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map(item =>
                            <tr>
                                <td className='text-center'>
                                    <button onClick={e => handleChooseProduct(item)}
                                        className='btn btn-primary'>
                                        <i className='fa fa-check me-2'></i>
                                        เลือกรายการ
                                    </button>
                                </td>
                                <td>{item.barcode}</td>
                                <td>{item.name}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default Stock