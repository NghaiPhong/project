import { useParams } from "react-router-dom";
import { auth, database, db } from "../../firebase/firebase.js";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { toast } from "react-toastify";
import Loader from "../components/loader.jsx";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Lesson() {
  const { id, lid } = useParams();
  const [lesson, setLesson] = useState();
  const [slide, setSlide] = useState(1);
  const [userDetails, setUserDetails] = useState();

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid, "ownedCourses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
      else {
        window.location.href = "/login";
      }
    })
  }

  // save me

  const finishLesson = () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid, "ownedCourses", id);
      await setDoc(docRef, {lessons: userDetails.lessons + 1}, {merge: true});
      window.location.href = `/learn/${id}`;
    })
  }

  useEffect(() => {
    fetchData();
    const dbRef = ref(database);
    if (id !== undefined && lid !== undefined) {
      get(child(dbRef, `courses/${id}/${lid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setLesson(snapshot.val());
        } else {
          toast.error("error!");
        }
      }).catch((error) => {
        toast.error(error);
      });
    }
  })

  return (
    <>
      <div className="bg-primary border-2 border-accent w-[80%] h-180 absolute top-[50%] right-[50%] shadow -translate-y-[50%] translate-x-[50%]">
        {lesson ? (
          <div className="flex h-full">
            <aside className="flex flex-col h-full w-75 bg-secondary border-2 border-accent shadow">
              {Object.entries(lesson.slides).map(([, value]) => (
                <li><a className="flex text-white p-4 text-l border-b-2 border-b-dark-accent hover:border-b-2 hover:border-b-hover-accent hover:bg-secondary transition-colors">
                  {value.name}
                </a></li>
              ))}
            </aside>
            <div className="p-5 w-full">
              <p className="text-4xl text-white mb-5">{lesson["slides"][`slide${slide}`]["name"]}</p>
              <p className="text-xl text-pretty text-white">{lesson["slides"][`slide${slide}`]["content"]}</p>
              <div className="absolute bottom-5 right-5">
                {slide > 1 && <button className="w-30 shadow" onClick={() => {setSlide(slide - 1)}}>Quay lại</button>}
                {slide < Object.entries(lesson.slides).length && <button className="w-20 ml-5 shadow" onClick={() => {setSlide(slide + 1)}}>Tiếp</button>}
                {slide >= Object.entries(lesson.slides).length && <button className="w-50 ml-5 shadow" onClick={finishLesson}>Hoàn thành bài học</button>}
              </div>
            </div>
          </div>
        ) : (
          <Loader></Loader>
        )}
      </div>
    </>
  )
}

export default Lesson;