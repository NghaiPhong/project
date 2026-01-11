import Course from "../components/course.jsx";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebase.js";

function Practice() {
  let data;
  const getCourse = () => {
    const coursesRef = ref(database, "courses");
    onValue(coursesRef, (snapshot) => {
      data = snapshot.val();
      console.log(data);
    });
  };

  getCourse();

  return (
    <>
      <main className="flex gap-10 p-20 pt-30">
        {data ? (
          Object.entries(data).map(([, value]) => (
            <Course title={value.info.name} content={value.info.desc} />
          )))
          : (
            <p className="text-white">Loading...</p>
          )}
      </main>
    </>
  )
}

export default Practice