import { auth, db } from "../../firebase/firebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import Loader from "../components/Loader"

function Account() {
  const [userDetails, setUserDetails] = useState();
  const [courses, setCourses] = useState();

  const changePage = async (page) => {
    window.location.href = page;
  }

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        window.location.href = "/login";
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      }
      else {
        window.location.href = "/login";
      }

      let coursesElement = [];
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "ownedCourses"));
      querySnapshot.forEach((doc) => {
        coursesElement.push(Object.assign(doc.data(), { id: doc.id }));
      });
      setCourses(coursesElement);
    })
  }

  useEffect(() => {
    fetchData();
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
      <div className="bg-primary border-2 border-accent w-[80%] h-180 absolute top-[50%] right-[50%] shadow -translate-y-[50%] translate-x-[50%]">
        {userDetails ? (
          <div className="flex h-full">
            <aside className="flex flex-col h-full w-50 bg-secondary border-2 border-accent shadow">
              <li><a className="flex text-white p-4 text-l border-b-2 border-b-dark-accent hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors">
                Thông tin cá nhân
              </a></li>
              <li><a className="flex text-white p-4 text-l border-b-2 border-b-dark-accent hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors">
                Khoá học
              </a></li>
              <li><a className="flex text-white p-4 text-l border-b-2 border-b-dark-accent hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors">
                Bảo mật
              </a></li>
              <li><a onClick={handleSignout} className="flex text-white p-4 text-l border-b-2 border-b-dark-accent hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors">
                Đăng xuất
              </a></li>
            </aside>
            <div className="p-5">
              <h1 className="text-6xl text-white">Quản lý tài khoản</h1>
              <h3 className="text-white text-2xl">Hello {userDetails.username}!</h3>
              <h3 className="text-white text-2xl">Thông tin cá nhân của bạn:</h3>
              <div className="bg-secondary border-2 border-dark-accent shadow p-2 m-5 w-100">
                <i className="text-white text-xl">Tên tài khoản: {userDetails.username}</i>
                <button className="w-6 h-6 shadow ml-2"></button>
                <br />
                <i className="text-white text-xl">Email: {userDetails.email}</i>
                <button className="w-6 h-6 shadow ml-2"></button>
              </div>
              <h1 className="text-4xl text-white mt-6 mb-4">Các khoá học của bạn</h1>
              <div className="flex gap-5 h-90">
                {courses ? (
                  courses.map((course) => (
                    <div className="flex flex-col bg-primary border-2 border-accent shadow w-50 h-full">
                      <img src="/src/img/ohno.png" alt="" className="w-50 h-50"/>
                      <p className="text-white text-2xl font-bold ml-5 mt-5 md-5">{course.name}</p>
                      <p className="ml-5 mb-5 text-white">Số bài học: {course.lessons}</p>
                      <button className="ml-5 mr-5 shadow" onClick={() => {changePage(`/learn/${course.id}`)}}>Học tiếp</button>
                    </div>
                  ))
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute top-[50%] right-[50%]">
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}

export default Account