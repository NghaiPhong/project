import CoursePage from "../components/coursePage.jsx";
import Loader from "../components/loader.jsx";
import { ref, get, child } from "firebase/database";
import {auth, database, db} from "../../firebase/firebase.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

function Learn() {
  const [courses, setCourses] = useState();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();

  const lesson = ((key) => {
    window.location.href = `/lesson/${id}/${key}`;
  })

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid, "ownedCourses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
      else {
        window.location.href = "/learn";
      }
    })
  }

  useEffect(() => {
    fetchData();
    const dbRef = ref(database);
    if (!id) {
      get(child(dbRef, `courses/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setCourses(snapshot.val());
        } else {
          toast.error("error!");
        }
      }).catch((error) => {
        toast.error(error);
      });
    }
    else {
      get(child(dbRef, `courses/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setCourses(snapshot.val());
        } else {
          toast.error("error!");
        }
      }).catch((error) => {
        toast.error(error);
      });
    }
  });

  return (
    <>
      <main className="p-20">
        <ToastContainer />
        <p className="text-white text-8xl font-semibold text-center mt-4 md:mt-16">Khoá học</p>
        {id ? (
          <div className="flex justify-between text-white m-auto w-[90%] bg-primary border-2 border-accent mt-16 shadow">
            <div className="p-5">
              <p className="text-4xl">Các bài học</p>
              {courses ? (Object.entries(courses)
              .filter(([key]) => key !== "name" && key !== "desc" && key !== "price" && key !== "lessonAmount")
              .map(([key, value]) => (
                <div className="bg-secondary border-2 border-dark-accent shadow p-5 mt-5 w-150">
                  <h1 className="text-white text-2xl">{value.name}</h1>
                  <h1 className="text-white text-xl mb-5">Mô tả: {value.desc}</h1>
                  <button className="text-black shadow w-full" onClick={() => {lesson(key)}}>Học</button>
                </div>
              ))
            ) : <Loader />}
            </div>
            <div className="h-full w-100 p-5">
              {courses ? (
                <>
                  <img src="/src/img/ohno.png" alt=""/>
                  <p className="mt-5 text-4xl">Khoá học {courses.name}</p>
                  <p className="text-xl">Tổng số bài học: {courses.lessonAmount}</p>
                </>
              ) : (
                <Loader />
            )}
            </div>
          </div>
        ) : (
          <div className="flex gap-10 p-20 pt-30">
          {courses ? (
            Object.entries(courses).map(([key, value]) => (
              <CoursePage key={value.name} title={value.name} content={value.desc} id={key}/>
            ))
          ) : (
            <Loader />
          )}
        </div>)}
      </main>
    </>
  )
}

export default Learn