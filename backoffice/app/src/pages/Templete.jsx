import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import axios from "axios"
import config from "../config"
import Modal from '../components/Modal'

const Templete = (props) => {
    const [admin, setAdmin] = useState({})
    const navigate = useNavigate()

    const [usr, setUsr] = useState("")
    const [pwd, setPwd] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/admin/info", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setAdmin(res.data.result)
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

    const handleSignOut = () => {
        Swal.fire({
            title: "Sign Out",
            text: "คุณต้องการออกจากระบบใช่หรือไม่",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                localStorage.removeItem(config.token_name)
                navigate("/")
            }
        })
    }

    const handleChangeProfile = () => {
        Swal.fire({
            title: "เปลี่ยนข้อมูลส่วนตัว",
            text: "ยืนยันการเปลี่ยนข้อมูล",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                const payload = {
                    usr: usr,
                    id: admin.id
                }

                if (pwd !== "") {
                    payload.pwd = pwd
                }

                try {
                    await axios.post(config.api_path + "/admin/changeProfile", payload, config.headers()).then(res => {
                        if (res.data.message === "success") {
                            const btns = document.getElementsByClassName("btnClose")
                            for (let i = 0; i < btns.length; i++) btns[i].click()

                            Swal.fire({
                                title: "เปลี่ยนแปลงข้อมูล",
                                text: "บันทึกการเปลี่ยนข้อมูลเรียบร้อยแล้ว",
                                icon: "success",
                            }).then(res => {
                                localStorage.removeItem(config.token_name)
                                navigate("/")
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
        <div className='overflow-hidden'>
            <div className='row pe-2'>
                <div className='col-xxl-2 col-xl-3 col-lg-3 col-sm-4 ps-4 pt-3 bg-dark'
                    style={{
                        height: "100dvh",
                        position: "fixed",
                        top: 0,
                        width: "320px"
                    }}>
                    <div className='text-secondary p-3 pt-2'>
                        <div className='text-warning h4'>{admin.name} : {admin.level}</div>
                        <div>
                            <button onClick={e => setUsr(admin.usr)}
                                data-bs-toggle="modal"
                                data-bs-target="#modalMyInfo"
                                className='btn btn-warning rounded-0 mt-3 me-2'>
                                <i className='fa fa-pencil me-2'></i>
                                Edit
                            </button>
                            <button onClick={handleSignOut}
                                className='btn btn-outline-warning rounded-0 mt-3'>
                                <i className='fa fa-sign-out me-2'></i>
                                Sign Out
                            </button>
                        </div>
                    </div>

                    <hr className='text-white m-1' />

                    <div className='d-grid gap-3 mt-3'>
                        <Link to='/home' className='btn btn-default text-start text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-dashboard me-2'></i>
                            Dashboard
                        </Link>

                        <Link to='/reportMember' className='btn btn-default text-start text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-file-alt me-2'></i>
                            รายงานคนทึ่สมัครใช้บริการ
                        </Link>

                        <Link to='/reportChangePackage' className='text-start btn btn-default text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-file-alt me-2'></i>
                            รายงานการขอเปลี่ยนแพ็กเกจ
                        </Link>

                        <Link to='/reportSumSalePerDay' className='text-start btn btn-default text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-file-alt me-2'></i>
                            รายงานรายได้รายวัน
                        </Link>

                        <Link to='/reportSumSalePerMonth' className='text-start btn btn-default text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-file-alt me-2'></i>
                            รายงานรายได้รายเดือน
                        </Link>

                        <Link to='/reportSumSalePerYear' className='text-start btn btn-default text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-file-alt me-2'></i>
                            รายงานรายได้รายปี
                        </Link>

                        <Link to='/admin' className='text-start btn btn-default text-secondary my-menu rounded-0 ps-3 py-2'>
                            <i className='fa fa-user me-2'></i>
                            ผู้ใช้ระบบ
                        </Link>

                    </div>
                </div>

                <div className='col-xxl-10 col-xl-9 col-lg-9 col-sm-8 p-3'
                    style={{ marginLeft: "320px" }}
                >
                    {props.children}
                </div>
            </div>

            <Modal id="modalMyInfo" title="เปลี่ยนข้อมูลส่วนตัว">
                <div>
                    <label>Username</label>
                    <input value={usr}
                        onChange={e => setUsr(e.target.value)}
                        className='form-control rounded-0' />
                </div>
                <div className='mt-3'>
                    <label>Password</label>
                    <input onChange={e => setPwd(e.target.value)}
                        type='password' className='form-control rounded-0' />
                </div>
                <div className='mt-3'>
                    <button onClick={handleChangeProfile}
                        className='btn btn-primary rounded-0'>
                        <i className='fa fa-check me-2'></i>
                        บันทึก
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Templete