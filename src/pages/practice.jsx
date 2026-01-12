import Course from "../components/course.jsx";
import { ref, get, child } from "firebase/database";
import { database } from "../../firebase/firebase.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Practice() {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `courses/`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCourses(snapshot.val());
        console.log(snapshot.val());
      }
    }).catch((error) => {
      toast.error(error);
    });
  }, []);

  return (
    <>
      <main className="flex gap-10 p-20 pt-30">
        <ToastContainer />
        {courses ? (
          Object.entries(courses).map(([, value]) => (
            <Course key={value.name} title={value.name} content={value.desc} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  )
}

export default Practice