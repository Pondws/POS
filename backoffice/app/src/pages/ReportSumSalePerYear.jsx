import React, { useEffect, useState } from 'react'
import Templete from './Templete'
import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../config'
import Modal from "../components/Modal"
import * as dayjs from "dayjs"

const ReportSumSalePerYear = () => {
    const [results, setResults] = useState([])
    const [selectedResult, setSelectedResult] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/changePackage/reportSumSalePerYear", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setResults(res.data.results)
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
                <div className='card rounded-0'>
                    <div className='card-header'>
                        <div className='card-title mb-0 h4 py-2'><strong>รายงานสรุปยอดขายรายปี</strong></div>
                    </div>
                    <div className='card-body'>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th width={100}>ปี</th>
                                    <th className='text-end'>ยอดขาย</th>
                                    <th width={200}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.length > 0 ? results.map(item =>
                                    <tr>
                                        <td className='align-middle'>{item.year}</td>
                                        <td className='text-end align-middle'>{item.sum.toLocaleString("th-TH")}</td>
                                        <td className='text-center'>
                                            <button onClick={(e) => setSelectedResult(item)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalInfo"
                                                className='btn btn-success rounded-0'>
                                                <i className='fa fa-file-alt me-2'></i>
                                                แสดงรายการ
                                            </button>
                                        </td>
                                    </tr>
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Templete>

            <Modal id="modalInfo" title="รายการ" modalSize="modal-lg">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>วันที่สมัคร</th>
                            <th>วันที่ชำระเงิน</th>
                            <th>ผู้สมัคร</th>
                            <th>Package</th>
                            <th>ค่าบริการรายเดือน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedResult != {} &&
                            selectedResult.results != undefined &&
                            selectedResult.results.length > 0 ? selectedResult.results.map(item =>
                                <tr>
                                    <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                    <td>{dayjs(item.payDate).format("DD/MM/YYYY")} {item.payHour}:{item.payMinute}</td>
                                    <td>{item.member.name}</td>
                                    <td>{item.package.name}</td>
                                    <td>{parseInt(item.package.price).toLocaleString("th-TH")}</td>
                                </tr>
                            ) : ""}
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default ReportSumSalePerYear