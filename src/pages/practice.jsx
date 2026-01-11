import Course from "../components/course.jsx";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebase.js";
import { useEffect } from "react";

function Practice() {
  return (
    <>
      <main className="flex gap-10 p-20 pt-30">
        {Object.entries(data).map(([, value]) => (
          <Course title={value.info.name} content={value.info.desc} />
        ))}
      </main>
    </>
  )
}

export default Practice