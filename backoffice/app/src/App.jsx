import { useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"
import config from './config'
import { useNavigate } from "react-router-dom"

function App() {
  const [usr, setUsr] = useState("")
  const [pwd, setPwd] = useState("")
  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const payload = {
        usr: usr,
        pwd: pwd
      }

      await axios.post(config.api_path + "/admin/signin", payload).then(res => {
        if (res.data.message === "success") {
          localStorage.setItem(config.token_name, res.data.token)
          navigate("/home")
        }
      }).catch(err => {
        throw err.response.data
      })
    } catch (e) {
      if (e.response != undefined && e.response.status != undefined) {
        if (e.response.status == 401) {
          Swal.fire({
            title: "Sign In",
            text: "Username or Password is not correct",
            icon: "error"
          })
        }
      } else {
        Swal.fire({
          title: "Sign In",
          text: "Username or Password is not correct",
          icon: "error"
        })
      }
    }
  }

  return (
    <div className='container position-absolute top-50 start-50 translate-middle w-25 p-3'>
      <div className='card rounded-0'>
        <div className='card-header py-3'>
          <div className='h2 mb-0 text-center'><strong>Sign In to BackOffice</strong></div>
        </div>

        <div className='card-body p-4'>
          <div>Username</div>
          <div>
            <input onChange={e => setUsr(e.target.value)}
              className='form-control rounded-0 mt-1 form-control-lg' />
          </div>

          <div className='mt-3'>
            <div>Password</div>
            <div>
              <input onChange={e => setPwd(e.target.value)}
                className='form-control rounded-0 mt-1 form-control-lg' type='password' />
            </div>
          </div>

          <div>
            <button onClick={handleSignIn}
              className='btn btn-primary mt-4 w-100 rounded-0 btn-lg'>
              <strong>Sign In</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
