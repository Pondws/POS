import React, { useEffect, useState } from 'react'
import Templete from './Templete'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2"
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Home = () => {
  const myDate = new Date()
  const [year, setYear] = useState(myDate.getFullYear())
  const [arrYear, setArrYear] = useState(() => {
    let arr = []
    const y = myDate.getFullYear()
    const startYear = (y - 5)

    for (let i = startYear; i <= y; i++) {
      arr.push(i)
    }

    return arr
  })

  const [myData, setMyData] = useState([])
  const [options, setOptions] = useState(() => {
    return {
      response: true,
      plugin: {
        legend: {
          positon: "top"
        }
      }
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const url = config.api_path + "/changePackage/reportSumSalePerMonth"
      const payload = {
        year: year
      }
      await axios.post(url, payload, config.headers()).then(res => {
        if (res.data.message === "success") {
          const results = res.data.results
          let arr = []

          for (let i = 0; i < results.length; i++) {
            const item = results[i]
            arr.push(item.sum)
          }

          const labels = [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม"
          ]

          setMyData({
            labels,
            datasets: [
              {
                label: "ยอดขาย",
                data: arr,
                backgroundColor: "rgba(255,193,7)"
              }
            ]
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

  return (
    <div>
      <Templete>
        <div className='container mt-4'>
          <div className='h2'><strong>Dashboard</strong></div>
          <div className='row mt-3'>
            <div className='col-4'>
              <div className='input-group'>
                <span className='input-group-text rounded-0'>ปี</span>
                <select value={year}
                  onChange={e => setYear(e.target.value)}
                  className='form-control rounded-0'>
                  {arrYear.length > 0 ? arrYear.map(item =>
                    <option value={item}>{item}</option>
                  ) : ""}
                </select>
              </div>
            </div>
            <div className='col-4'>
              <button onClick={fetchData}
                className='btn btn-dark rounded-0'>
                <i className='fa fa-check me-2'></i>
                แสดงรายการ
              </button>
            </div>
          </div>

          <div className='text-center mt-3'>
            <div className='h4'>รายงานสรุปยอดขายรายเดือน ปี {year}</div>
            <div className='mt-3'>
              {myData.datasets != null ? (
                <Bar options={options} data={myData}>

                </Bar>
              ) : ""}
            </div>
          </div>
        </div>
      </Templete>
    </div>
  )
}

export default Home