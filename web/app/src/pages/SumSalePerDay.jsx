import React, { useEffect, useState } from 'react'
import Templete from '../components/Templete'
import config from '../config'
import Swal from 'sweetalert2'
import axios from 'axios'
import Modal from '../components/Modal'
import * as dayjs from "dayjs"

const SumSalePerDay = () => {
    const [currentYear, setCurrentYear] = useState(() => {
        let myDate = new Date()
        return myDate.getFullYear()
    })
    const [arrYear, setArrYear] = useState(() => {
        let arr = []
        let myDate = new Date()
        let currentYear = myDate.getFullYear()
        let beforeYear = currentYear - 5

        for (let i = beforeYear; i <= currentYear; i++) {
            arr.push(i)
        }
        return arr
    })

    const [currentMonth, setCurrentMonth] = useState(() => {
        let myDate = new Date()
        return myDate.getMonth() + 1
    })
    const [arrMonth, setArrMonth] = useState(() => {
        return [
            { value: 1, label: "มกราคม" },
            { value: 2, label: "กุมภาพันธ์" },
            { value: 3, label: "มีนาคม" },
            { value: 4, label: "เมษายน" },
            { value: 5, label: "พฤษภาคม" },
            { value: 6, label: "มิถุนายน" },
            { value: 7, label: "กรกฎาคม" },
            { value: 8, label: "สิงหาคม" },
            { value: 9, label: "กันยายน" },
            { value: 10, label: "ตุลาคม" },
            { value: 11, label: "พฤศจิกายน" },
            { value: 12, label: "ธันวาคม" }
        ];
    })

    const [billSales, setBillSale] = useState([])
    const [currentBillSale, setCurrentBillSale] = useState({})
    const [billSaleDetails, setBillSaleDetails] = useState({})

    useEffect(() => {
        handleShowReport()
    }, [])

    const handleShowReport = async () => {
        try {
            await axios.get(config.api_path + "/billSale/listByYearAndMonth/" + currentYear + "/" + currentMonth, config.headers()).then(res => {
                if (res.data.message === "success") {
                    setBillSale(res.data.results);
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

    return (
        <div>
            <Templete>
                <div className='card'>
                    <div className='card-header'>
                        <div className='card-title'>รายงานสรุปยอดขายรายวัน</div>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='input-group'>
                                    <span className='input-group-text'>ปี</span>
                                    <select onChange={e => setCurrentYear(e.target.value)} value={currentYear} className='form-control'>
                                        {arrYear.map(item =>
                                            <option value={item}>
                                                {item}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='input-group'>
                                    <span className='input-group-text'>เดือน</span>
                                    <select onChange={e => setCurrentMonth(e.target.value)} value={currentMonth} className='form-control'>
                                        {arrMonth.map(item =>
                                            <option value={item.value}>
                                                {item.label}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='col-6'>
                                <button onClick={handleShowReport}
                                    className='btn btn-primary'>
                                    <i className='fa fa-check me-2'></i>
                                    แสดงรายการ
                                </button>
                            </div>
                        </div>

                        <table className='table table-bordered mt-3'>
                            <thead>
                                <tr>
                                    <th width={180}></th>
                                    <th width={100}>วันที่</th>
                                    <th className='text-end'>ยอดขาย</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billSales.length > 0 ? billSales.map(item =>
                                    <tr>
                                        <td className='text-center'>
                                            <button onClick={e => setCurrentBillSale(item.results)}
                                                data-toggle="modal"
                                                data-target="#modalBillSale"
                                                className='btn btn-primary'>
                                                <i className='fa fa-file-alt me-2'></i>
                                                แสดงรายการ
                                            </button>
                                        </td>
                                        <td>{item.day}</td>
                                        <td className='text-end'>{item.sum.toLocaleString("th-TH")}</td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>

            <Modal id="modalBillSale" title="บิลขาย">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th width={180}></th>
                            <th width={90}>เลขบิล</th>
                            <th>วันที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBillSale.length > 0 ? currentBillSale.map(item =>
                            <tr>
                                <td className='text-center'>
                                    <button onClick={e => setBillSaleDetails(item.billSaleDetails)}
                                        data-toggle="modal"
                                        data-target="#modalBillSaleDetail"
                                        className='btn btn-primary'>
                                        <i className='fa fa-file-alt me-2'></i>
                                        แสดงรายการ
                                    </button>
                                </td>
                                <td>{item.id}</td>
                                <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
            </Modal>

            <Modal id="modalBillSaleDetail" title="รายละเอียดบิลขาย" modalSize="modal-lg">
                <table className='table table-bordered' >
                    <thead>
                        <tr>
                            <th>รายการ</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th>ยอดรวม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billSaleDetails.length > 0 ? billSaleDetails.map(item =>
                            <tr>
                                <td>{item.product.name}</td>
                                <td>{parseInt(item.price).toLocaleString("th-TH")}</td>
                                <td>{item.qty}</td>
                                <td>{(item.qty * item.price).toLocaleString("th-TH")}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default SumSalePerDay