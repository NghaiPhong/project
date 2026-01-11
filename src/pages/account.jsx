import { auth, db } from "../../firebase/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"

function Account() {
  const [userDetails, setUserDetails] = useState()
  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
      else {
        window.location.href = "/login"
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleSignout() {
    try {
      await auth.signOut();
      toast.success("Đăng xuất thành công");
      window.location.href = "/login"
    } catch (error) {
      toast.error("Lỗi khi đăng xuất: " + error.message);
    }
  }

  return (
    <>
      <ToastContainer />
      {userDetails ? (
        <div className="bg-primary border-2 border-accent w-[80%] h-150 absolute top-[50%] right-[50%] shadow -translate-y-[50%] translate-x-[50%]">
          <h1 className="text-4xl text-white">Quản lý tài khoản</h1>
          <h3 className="text-white">Hello {userDetails.username}!</h3>
          <p className="text-white">Email: {userDetails.email}</p>
          <button className="shadow" onClick={handleSignout}>Signout</button>
        </div>
      ) : (
        <div className="flex bg-primary border-2 border-accent w-auto h-150 absolute top-[50%] right-[50%] shadow -translate-y-[50%] translate-x-[50%]">
          <p className="text-white">Loading...</p>
        </div>
      )}
    </>
  )
}

export default Account