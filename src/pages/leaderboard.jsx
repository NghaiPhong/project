import { db } from "../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"

function Leaderboard() {
  let leaderboard;
  const leaderboardItems = [];
  const fetchLeaderboard = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      leaderboardItems.push(doc.data());
    });
    leaderboardItems.sort((a, b) => b.xp - a.xp);
  }

  fetchLeaderboard();

  return (
    <>
      <main class="p-20">
        <p class="text-white text-4xl font-semibold text-center mt-4 md:mt-16">Xếp hạng</p>
        <ol className="text-white text-xl m-auto w-[90%] h-auto bg-primary border-2 border-accent mt-16 shadow">
          {leaderboardItems.length != 0 ? (
            leaderboardItems.map(person => {
              return <li>{person}</li>
            })
          ) : (
            <p>43256</p>
          )}
        </ol>
      </main>
    </>
  )
}

export default Leaderboard