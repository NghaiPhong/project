import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { db, database, auth } from "../../firebase/firebase.js";
import { toast } from "react-toastify";
import Loader from "../components/loader.jsx";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Course() {
  const { id } = useParams();
  const [courses, setCourses] = useState();

  const buyCourse = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        window.location.href = "/login";
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(courses);
        await setDoc(doc(db, "users", user.uid, "ownedCourses", id), {"lessons": 0, "name": courses.name, "id": id});
      }
      else {
        window.location.href = "/login";
      }
    })
  }

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `courses/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCourses(snapshot.val());
      }
    }).catch((error) => {
      toast.error(error);
    });
  }, []);

  // I'm sorry
  // Whatever this code is

  return (
    <main className="p-20">
      {courses ? (
        <p className="text-white text-8xl font-semibold text-center mt-4 md:mt-8">Khoá học {courses.name}</p>
      ) : null}
      <div className="flex text-white text-xl m-auto w-[90%] h-150 bg-primary border-2 border-accent mt-16 shadow">

        {courses ? (<div className="flex flex-col h-full w-100 bg-secondary border-2 border-accent shadow p-5">
          <img src="/src/img/ohno.png" alt="" className="w-full h-auto"/>
          <button onClick={buyCourse}>Mua</button>
        </div>) : null}

        <div className="p-5">
          {courses ? (
            <>
              <i className="text-white text-4xl">Thông tin khoá học {courses.name}</i>
              <div className="bg-secondary border-2 border-dark-accent shadow p-2 m-5 w-100">
                <i>Số bài học: {courses.lessonAmount}</i>
                <br/>
                <i>Giá tiền: {courses.price}đ</i>
                <br/>
                <i>Mô tả: {courses.desc}</i>
              </div>
              <i className="text-white text-4xl">Các bài học của {courses.name}</i>
            </>
          ) : (
            <></>
          )}
          {courses ? (
            Object.entries(courses)
              .filter(([key]) => key !== "name" && key !== "desc" && key !== "price" && key !== "lessonAmount")
              .map(([key, value]) => (
                <div className="bg-secondary border-2 border-dark-accent shadow p-2 m-5 w-100">
                  <h1 className="text-white">{key}</h1>
                  <h1 className="text-white">{value.desc}</h1>
                </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </main>
  )
}

export default Course