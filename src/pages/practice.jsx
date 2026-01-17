import { auth, database, db } from "../../firebase/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { child, get, ref } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../components/loader.jsx";

function Practice() {
  const [userDetails, setUserDetails] = useState();
  const [practice, setPractice] = useState();
  const { id, pid } = useParams();
  const [question, setQuestion] = useState(1);
  const [choice, setChoice] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [lessons, setLessons] = useState();

  const changePage = (page) => {
    window.location.href = `/practice/${page}`;
  }

  const returnHome = () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { xp: userDetails.xp + xpEarned }, {merge: true});
      window.location.href = `/practice/${id}`;
    })
  }

  const choose = (choice) => {
    if (practice[`q${question}`]["ans"] === choice){
      toast.success("Đúng!");
      setXpEarned(xpEarned + 30);
    }
    else {
      toast.error("Sai!");
    }
    setQuestion(question + 1);
    setChoice(0);
  }

  const practicePage = (practice) => {
    window.location.href = `/practice/${id}/${practice}`;
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
      }
      else {
        window.location.href = "/login";
      }
    })
  }

  useEffect(() => {
    fetchData();
    const dbRef = ref(database);
    if (id && !pid) {
      get(child(dbRef, `courses/${id}/practice`)).then((snapshot) => {
        if (snapshot.exists()) {
          setPractice(snapshot.val());
        } else {
          toast.error("error!");
        }
      }).catch((error) => {
        toast.error(error);
      });
    } else if (pid) {
      get(child(dbRef, `courses/${id}/practice/${pid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setPractice(snapshot.val());
        } else {
          toast.error("error!");
        }
      }).catch((error) => {
        toast.error(error);
      });
    } else {
      get(child(dbRef, `courses/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setLessons(snapshot.val());
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
      <ToastContainer theme="dark"/>
      <main className="p-20">
        <p className="text-white text-8xl font-semibold text-center mt-4 md:mt-16">Luyện tập</p>
        <div className="bg-primary border-2 border-accent mt-16 shadow">
          {id && !pid ? (
            <div className="p-5">
              <p className="text-white text-4xl">Các bài luyện tập</p>
              <div className="flex gap-5 flex-wrap">
                {practice ? (
                  Object.entries(practice).map(([key, value]) => (
                    <div className="bg-secondary border-2 border-dark-accent shadow p-5 mt-5 w-[45%]">
                      <h1 className="text-white text-2xl mb-5">{value.name}</h1>
                      <button className="text-black shadow w-full" onClick={() => {practicePage(key)}}>Luyện tập</button>
                    </div>
                  ))
                ) : <Loader />}
              </div>
            </div>
            ) : (
            <div className="p-5">
              {practice ? (
                <>
                {question < Object.entries(practice).length && <>
                  <p className="text-white text-4xl">Câu hỏi {question}: {practice[`q${question}`]["name"]}</p>
                  <div className="flex gap-5 flex-wrap">
                    <div className="bg-secondary border-2 border-dark-accent shadow p-5 mt-5 w-[45%]">
                      <h1 className="text-white text-2xl mb-5">1. {practice[`q${question}`]["c1"]}</h1>
                      <button className="text-black shadow w-full" onClick={() => {setChoice(1)}}>Lựa chọn</button>
                    </div>
                    <div className="bg-secondary border-2 border-dark-accent shadow p-5 mt-5 w-[45%]">
                      <h1 className="text-white text-2xl mb-5">2. {practice[`q${question}`]["c2"]}</h1>
                      <button className="text-black shadow w-full" onClick={() => {setChoice(2)}}>Lựa chọn</button>
                    </div>
                    <div className="bg-secondary border-2 border-dark-accent shadow p-5 mt-5 w-[45%]">
                      <h1 className="text-white text-2xl mb-5">3. {practice[`q${question}`]["c3"]}</h1>
                      <button className="text-black shadow w-full" onClick={() => {setChoice(3)}}>Lựa chọn</button>
                    </div>
                    <div className="bg-secondary border-2 border-dark-accent shadow p-5 mt-5 w-[45%]">
                      <h1 className="text-white text-2xl mb-5">4. {practice[`q${question}`]["c4"]}</h1>
                      <button className="text-black shadow w-full" onClick={() => {setChoice(4)}}>Lựa chọn</button>
                    </div>
                  </div>
                  <div className="flex gap-5 text-xl mt-10">
                    {choice > 0 && <>
                      <button className="shadow" onClick={() => {choose(choice)}}>Tiếp</button>
                      <p className="text-4xl text-white">Lựa chọn: {choice}</p>
                    </>}
                  </div>
                </>}
                  {question >= Object.entries(practice).length && <div className="flex flex-col items-center">
                    <p className="text-white text-4xl mb-5">Hoàn thành luyện tập!</p>
                    <p className="text-white text-2xl mb-5">Bạn nhận được {xpEarned}xp!</p>
                    <button className="shadow w-100" onClick={returnHome}>Về trang luyện tập</button>
                  </div>}
                </>
              ) : <div className="flex gap-5 flex-wrap">
                {lessons ? (Object.entries(lessons).map(([key, value]) => (
                  <div className="flex flex-col bg-primary border-2 border-accent shadow w-50 h-full">
                    <img src="/src/img/ohno.png" alt="" className="w-50 h-50"/>
                    <p className="text-white text-2xl font-bold ml-5 mt-5 md-5">{value.name}</p>
                    <button className="m-5 shadow" onClick={() => {changePage(key)}}>Luyện tập</button>
                  </div>
                ))) : <Loader />}
              </div>}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Practice