import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../firebase/firebase"
import { ToastContainer, toast } from "react-toastify"

function Login() {
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Đăng nhập thành công!", {position: "bottom-right"});
      window.location.href = "/account";
    }
    catch (error){
      toast.error(error.message, {position: "bottom-right"});
    }
  }

  return (
    <>
      <main>
        <ToastContainer theme="dark" />
        <div className="flex bg-primary border-2 border-accent w-auto h-150 absolute top-[50%] right-[50%] shadow -translate-y-[50%] translate-x-[50%]">
          <form className="flex flex-col p-10 shadow w-100" onSubmit={handleLogin}>
            <h1 className="text-white text-4xl font-bold">Đăng nhập</h1>

            <label className="text-white text-xl mt-8">Email:</label>
            <input
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full shadow mt-2"
            />

            <label className="text-white text-xl mt-8">Mật khẩu:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full shadow mt-2"
            />

            <div className="flex mt-8">
              <input type="checkbox" className="accent-accent h-6 w-6 mr-4"/>
              <p className="text-white text-xl">Nhớ tài khoản của tôi</p>
            </div>
            <Link to="/signup" className="text-accent text-center">Chưa có tài khoản?</Link>
            <button className="mb-auto shadow w-full" type="submit">Đăng nhập</button>
          </form>
          <img src="/src/img/ohno.png" alt="" className="h-full w-auto" />
        </div>
      </main>
    </>
  )
}

export default Login