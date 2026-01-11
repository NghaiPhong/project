import { db } from "../../firebase/firebase"
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react";

function Leaderboard() {
  const [users, setUsers] = useState();

  useEffect(() => {
    // Listen to Firestore in real-time, sorted by score descending
    const q = query(collection(db, "users"), orderBy("xp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        username: doc.username,
        ...doc.data()
      }));
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  // todo: make the progress bar actually good

  return (
    <>
      <main className="p-20">
        <p className="text-white text-8xl font-semibold text-center mt-4 md:mt-16">Xếp hạng</p>
        <ol className="text-white text-xl m-auto w-[90%] h-auto bg-primary border-2 border-accent mt-16 shadow">
          {users ? (users.map((player, index) => (
            <li key={player.username} className="flex justify-between text-xl p-4">
              <div className="w-[30%]">
                <strong>{index + 1}. {player.username} - Level {Math.floor(Math.log2(player.xp/10+1)) + 1}</strong>
              </div>
              <div className="w-full bg-secondary rounded-md text-center border-2 border-dark-accent">
                <div className={`w-full h-full bg-accent rounded-md text-right pr-2`}>
                  {((((Math.log2(player.xp/10+1)) + 1) % 1) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="w-[20%] text-right">
                <i>{player.xp}xp</i>
              </div>
            </li>
          ))) : (
            <p>Loading...</p>
          )}
        </ol>
      </main>
    </>
  )
}

export default Leaderboard