import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import Swal from "sweetalert2"
import axios from "axios"
import config from "../config"
import { Link } from "react-router-dom"
import Modal from './Modal'
import "../App.css"

const Sidebar = forwardRef ((props, sidebarRef) => {
    const [memberName, setMemberName] = useState()
    const [packageName, setPackageName] = useState()
    const [packages, setPackages] = useState([])
    const [totalBill, setTotalBill] = useState(0)
    const [billAmount, setBillAmount] = useState(0)
    const [banks, setBanks] = useState([])
    const [choosePackage, setChoosePackage] = useState({})

    useEffect(() => {
        fetchData()
        fetchDataTotalBill()
    }, [])

    const fetchDataTotalBill = async () => {
        try {
            await axios.get(config.api_path + "/package/countBill", config.headers()).then(res => {
                if (res.data.totalBill != undefined) {
                    setTotalBill(res.data.totalBill)
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

    const fetchData = async () => {
        try {
            axios.get(config.api_path + "/member/info", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setMemberName(res.data.result.name)
                    setPackageName(res.data.result.package.name)
                    setBillAmount(res.data.result.package.bill_amount)
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

    const fetchPackage = async () => {
        try {
            await axios.get(config.api_path + "/package/list").then(res => {
                if (res.data.results.length > 0) {
                    setPackages(res.data.results)
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

    const renderButton = (item) => {
        if (packageName === item.name) {
            return (
                <button className='btn btn-primary w-100 disabled' disabled>
                    <i className='fa fa-check me-2'></i>
                    เลือกแพ็กเกจ
                </button>
            )
        } else {
            return (
                <button
                    data-toggle="modal"
                    data-target="#modalBank"
                    onClick={() => handleChoosePackage(item)}
                    className='btn btn-primary w-100'>
                    <i className='fa fa-check me-2'></i>
                    เลือกแพ็กเกจ
                </button>
            )
        }
    }

    const handleChoosePackage = (item) => {
        setChoosePackage(item)
        fetchDataBank()
    }

    const fetchDataBank = async () => {
        if (banks.length == 0) {
            try {
                await axios.get(config.api_path + "/bank/list", config.headers()).then(res => {
                    if (res.data.message === "success") {
                        setBanks(res.data.results)
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
    }

    const computePercen = (totalBill, billAmount) => {
        if (billAmount > 0) {
            return ((totalBill * 100) / billAmount)
        } else {
            return 0
        }
    }

    const handleChangePackage = async () => {
        try {
            await axios.get(config.api_path + "/package/changePackage/" + choosePackage.id, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: "ส่งข้อมูล",
                        text: "ส่งข้อมูลการขอเปลี่ยน แพ็กเกจ ของคุณแล้ว",
                        icon: "success"
                    })
                    const btns = document.getElementsByClassName("btnClose")
                    for (let i = 0; i < btns.length; i++) btns[i].click()
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

    useImperativeHandle(sidebarRef, () => ({
        refreshCountBill() {
            fetchDataTotalBill()
        }
    }))

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                    <span className="brand-text font-weight-light">POS on Cloud</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-2 pb-3 mb-3 d-flex">
                        <div className="info text-white w-100 mt-2">
                            <div className='row'>
                                <div className='col-3'>
                                    <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2 m-1" alt="User Image" />
                                </div>
                                <div className='col-9'>
                                    <div>{memberName}</div>
                                    <div>Package : {packageName}</div>
                                </div>
                            </div>

                            <div className='mt-2'>
                                <button onClick={fetchPackage}
                                    data-toggle="modal"
                                    data-target="#modalPackage"
                                    className='btn btn-warning font-weight-bold mt-2 w-100'>
                                    <i className='fa fa-arrow-up me-2'></i>
                                    Upgrade
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className='mb-3'>
                        <div className='mx-3 text-white'>
                            <div className='float-start'>
                                {totalBill} / {billAmount.toLocaleString("th-TH")}
                            </div>
                            <div className='float-end'>
                                {billAmount > 0 ? computePercen(totalBill, billAmount) : 0} %
                            </div>
                            <div className='clearfix'></div>
                        </div>
                        <div className="progress mx-3">
                            <div className="progress-bar" role="progressbar" style={{ width: computePercen(totalBill, billAmount) + "%" }} aria-valuenow aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <a href="/home" className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/sale" className="nav-link">
                                    <i className="nav-icon fas fa-dollar-sign"></i>
                                    <p>
                                        ขายสินค้า
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/product" className="nav-link">
                                    <i className="nav-icon fas fa-box"></i>
                                    <p>
                                        สินค้า
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user" className="nav-link">
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>
                                        ผู้ใช้งานระบบ
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/sumSalePerDay" className="nav-link">
                                    <i className="nav-icon fas fa-file-alt"></i>
                                    <p>
                                        สรุปยอดขายรายวัน
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/billSales" className="nav-link">
                                    <i className="nav-icon fas fa-list-alt"></i>
                                    <p>
                                        รายงายบิลขาย
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/stock" className="nav-link">
                                    <i className="nav-icon fas fa-home"></i>
                                    <p>
                                        รับสินค้าเข้า Stock
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/reportstock" className="nav-link">
                                    <i className="nav-icon fas fa-file"></i>
                                    <p>
                                        รายงาย Stock
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            <Modal id="modalPackage" title="เลือกแพ็กเกจที่ต้องการ" modalSize="modal-lg">
                <div className='row'>
                    {packages.length > 0 ? packages.map(item =>
                        <div className='col-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='h3 font-weight-bold'>{item.name}</div>
                                    <div className='mt-3 text-primary h4 font-weight-bold'>{parseInt(item.price).toLocaleString("th-TH")} .- / เดือน</div>
                                    <div className='mt-3'>
                                        จำนวนบิล
                                        <span className='font-weight-bold text-danger mx-2'>
                                            {parseInt(item.bill_amount).toLocaleString("th-TH")}
                                        </span>
                                        ต่อเดือน
                                    </div>
                                    <div className='mt-4 text-center'>
                                        {renderButton(item)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                </div>
            </Modal>

            <Modal id="modalBank" title="ช่องทางการชำระเงิน" modalSize="modal-lg">
                <div className='h4 text-secondary'>
                    Package ที่เลือกคือ
                    <span className='ms-1 text-primary font-weight-bold'>
                        {choosePackage.name}
                    </span>
                </div>

                <div className='mt-2 h5'>
                    ราคา
                    <span className='text-success font-weight-bold ms-2'>{parseInt(choosePackage.price).toLocaleString("th-TH")}</span> บาท/เดือน
                </div>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>ธนาคาร</th>
                            <th>เลขบัญชี</th>
                            <th>เจ้าของบัญชี</th>
                            <th>สาขา</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks.length > 0 ? banks.map(item =>
                            <tr>
                                <td>{item.bankType}</td>
                                <td>{item.bankCode}</td>
                                <td>{item.bankName}</td>
                                <td>{item.bankBranch}</td>
                            </tr>
                        ) : ""}
                    </tbody>
                </table>

                <div className='alert mt-3 alert-warning'>
                    <i className='fa fa-info-circle me-2'></i>
                    เมื่อชำระเงินแล้ว ให้แจ้งที่ Line ID: ?????
                </div>

                <div className='mt-3'>
                    <button onClick={handleChangePackage}
                        className='btn btn-primary'>
                        <i className='fa fa-check me-2'></i>
                        ยืนยันการสมัคร
                    </button>
                </div>
            </Modal>
        </div>
    )
})

export default Sidebar