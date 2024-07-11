import React, { useEffect, useState } from 'react'
import Templete from '../components/Templete'
import Swal from 'sweetalert2'
import config from '../config'
import axios from 'axios'
import Modal from '../components/Modal'
import * as dayjs from "dayjs"

const BillSales = () => {
  const [billSales, setBillSales] = useState([])
  const [selectBill, setSelectBill] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      await axios.get(config.api_path + "/billSale/list", config.headers()).then(res => {
        if (res.data.message === "success") {
          setBillSales(res.data.result)
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
            <div className='card-title'>รายงานบิลขาย</div>
          </div>
          <div className='card-body'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th width={180}></th>
                  <th width={100}>เลขบิล</th>
                  <th>วันที่</th>
                </tr>
              </thead>
              <tbody>
                {billSales.length > 0 ? billSales.map(item =>
                  <tr>
                    <td className='text-center'>
                      <button onClick={e => setSelectBill(item)}
                        data-toggle="modal"
                        data-target="#modalBillSaleDetail"
                        className='btn btn-primary'>
                        <i className='fa fa-file-alt me-2'></i>
                        รายงานบิลขาย
                      </button>
                    </td>
                    <td>{item.id}</td>
                    <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                  </tr>
                ) : ""}
              </tbody>
            </table>
          </div>
        </div>
      </Templete>

      <Modal id="modalBillSaleDetail" title="รายการในบิล" modalSize="modal-lg">
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>รายการ</th>
              <th width={100} className='text-end'>ราคา</th>
              <th width={100} className='text-end'>จำนวน</th>
              <th width={100} className='text-end'>ยอดรวม</th>
            </tr>
          </thead>
          <tbody>
            {selectBill.length != {} && selectBill.billSaleDetails != null ? selectBill.billSaleDetails.map(item =>
              <tr>
                <td>{item.product.name}</td>
                <td className='text-end'>{parseInt(item.price).toLocaleString("th-TH")}</td>
                <td className='text-end'>{item.qty}</td>
                <td className='text-end'>{(item.qty * item.price).toLocaleString("th-TH")}</td>
              </tr>
            ) : ""}
          </tbody>
        </table>
      </Modal>
    </div>
  )
}

export default BillSales