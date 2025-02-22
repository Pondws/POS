import React, { useEffect, useState } from 'react'
import axios from "axios"
import config from '../config'
import Modal from '../components/Modal'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'

const Package = () => {
  const [packages, setPackages] = useState([])
  const [yourPackage, setYourPackage] = useState({})
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [pass, setPass] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      axios.get(config.api_path + "/package/list").then(res => {
        setPackages(res.data.results)
      }).catch(err => {
        throw err.response.data
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  const choosePackage = (item) => {
    setYourPackage(item)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      Swal.fire({
        title: "ยืนยันการสมัคร",
        text: "โปรดยืนยันการสมัครใช้บริการ package ของเรา",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true
      }).then(res => {
        if (res.isConfirmed) {
          const payload = {
            packageId: yourPackage.id,
            name: name,
            phone: phone,
            pass: pass
          }
          axios.post(config.api_path + "/package/memberRegister", payload).then(res => {
            if (res.data.message === "success") {
              Swal.fire({
                title: "บันทึกข้อมูล",
                text: "บันทึกข้อมูลการสมัครแล้ว",
                icon: 'success',
                timer: 2000
              })
              document.getElementById("btnModalClose").click()

              navigate("/login")
            }
          }).catch(err => {
            throw err.response.data
          })
        }
      })
    } catch (e) {
      Swal.fire({
        title: "error",
        message: e.message,
        icon: "error"
      })
    }
  }

  return (
    <div>
      <div className="container mt-2">
        <div className="h2">POS : Point of Sales on Cloud</div>
        <div className="h5">Package for You</div>
        <div className='row'>
          {packages.map(item =>
            <div className='col-4' key={item.id}>
              <div className='card'>
                <div className="card-body text-center">
                  <div className='h4 text-success'>{item.name}</div>
                  <div className='h5'>
                    {parseInt(item.bill_amount).toLocaleString("th-TH")} บิลต่อเดือน
                  </div>
                  <div className='h5 text-secondary'>
                    {parseInt(item.price).toLocaleString("th-TH")} บาท
                  </div>
                  <div className='mt-3'>
                    <button onClick={e => choosePackage(item)} data-bs-toggle="modal" data-bs-target="#modalRegister" className='btn btn-primary'>สมัคร</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal id="modalRegister" title="สมัครใช้บริการ">
        <form onSubmit={handleRegister}>
          <div>
            <div className='alert alert-info'>{yourPackage.name} ราคา {yourPackage.price} ต่อเดือน</div>
          </div>
          <div>
            <label>ชื่อร้าน</label>
            <input className='form-control' onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label>เบอร์โทร</label>
            <input className='form-control' onChange={e => setPhone(e.target.value)} />
          </div>
          <div className='mt-3'>
            <label>รหัสผ่าน</label>
            <input type="password" className='form-control' onChange={e => setPass(e.target.value)} />
          </div>

          <div>
            <button className='btn btn-primary' onClick={handleRegister}>ยืนยันการสมัคร
              <i className='fa fa-arrow-right' style={{ marginLeft: 10 }}></i>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Package