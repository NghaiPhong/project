import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase/firebase"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"

function Signup() {
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ username, setUsername ] = useState()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: username,
        })
      }
      toast.success("Đăng ký thành công!", {position: "bottom-right"});
      window.location.href = "/account";
    }
    catch (error) {
      toast.error(error.message, {position: "bottom-right"});
    }
  }

  return (
    <>
      <main>
        <ToastContainer theme="dark" />
        <div className="flex bg-primary border-2 border-accent w-auto h-150 absolute top-[50%] right-[50%] shadow -translate-y-[50%] translate-x-[50%]">
          <form className="flex flex-col p-10 shadow w-100" onSubmit={handleSignup}>
            <h1 className="text-white text-4xl font-bold">Đăng ký</h1>

            <label className="text-white text-xl mt-8">Tên:</label>
            <input
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full shadow mt-2"
            />

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
            <Link to="/login" className="text-accent text-center">Đã có tài khoản?</Link>
            <button className="mb-auto shadow w-full" type="submit">Đăng ký</button>
          </form>
          <img src="/src/img/ohno.png" alt="" className="h-full w-auto" />
        </div>
      </main>
    </>
  )
}

export default Signup