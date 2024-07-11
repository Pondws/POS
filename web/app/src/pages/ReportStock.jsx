import React, { useEffect, useState } from 'react'
import Templete from '../components/Templete'
import axios from 'axios'
import Modal from '../components/Modal'
import Swal from 'sweetalert2'
import config from '../config'
import * as dayjs from "dayjs"

const ReportStock = () => {
    const [stock, setStock] = useState([])
    const [currentStock, setCurrentStock] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/stock/report", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setStock(res.data.results)
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

    return (
        <div>
            <Templete>
                <div className='card'>
                    <div className='card-header'>
                        <div className='card-title'>รายงาย Stock</div>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>barcode</th>
                                    <th>รายการ</th>
                                    <th>รับเข้า</th>
                                    <th>ขายออก</th>
                                    <th>คงเหลือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stock.length > 0 ? stock.map(item =>
                                    <tr>
                                        <td>{item.result.barcode}</td>
                                        <td>{item.result.name}</td>
                                        <td>
                                            <a onClick={() => setCurrentStock(item)}
                                                data-toggle="modal"
                                                data-target="#modalStockIn"
                                                className='btn btn-link text-success d-flex'>
                                                {item.stockIn.toLocaleString("th-TH")}
                                            </a>
                                        </td>
                                        <td>
                                            <a onClick={() => setCurrentStock(item)}
                                            data-toggle="modal"
                                            data-target="#modalStockOut" 
                                            className='btn btn-link text-danger d-flex'>
                                                {item.stockOut.toLocaleString("th-TH")}
                                            </a>
                                        </td>
                                        <td>{item.stockIn - item.stockOut}</td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>

            <Modal id="modalStockIn" title="ข้อมูลการรับเข้าสต๊อก">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th width={70}>barcode</th>
                            <th>รายการ</th>
                            <th width={70}>จำนวน</th>
                            <th width={150}>วันที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStock.result != undefined ? currentStock.result.stocks.map(item =>
                            <tr>
                                <td>{item.product.barcode}</td>
                                <td>{item.product.name}</td>
                                <td>{item.qty}</td>
                                <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
            </Modal>

            <Modal id="modalStockOut" title="ข้อมูลการขาย">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th width={70}>barcode</th>
                            <th>รายการ</th>
                            <th width={70}>จำนวน</th>
                            <th width={150}>วันที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStock.result != undefined ? currentStock.result.billSaleDetails.map(item =>
                            <tr>
                                <td>{item.product.barcode}</td>
                                <td>{item.product.name}</td>
                                <td>{item.qty}</td>
                                <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default ReportStock