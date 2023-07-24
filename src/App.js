import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from "./components/WriteIcon";

// To start this:
// npx json-server --watch db.json
// npm start

function App() {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const userId = "ee30b12c-d953-47ec-946c-daa263dc64d0"; //Hardcoded, for now!
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(`http://localhost:3000/threads?thread_from=${userId}`);
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standaloneThreads = threads?.filter((thread) => thread.reply_to === null);
      setFilteredThreads(standaloneThreads);
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter((thread) => thread.reply_to !== null);
      setFilteredThreads(replyThreads);
    }
  };

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  console.log(filteredThreads);

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed user={user} setOpenPopUp={setOpenPopUp} filteredThreads={filteredThreads} />
          {openPopUp && <PopUp user={user} setOpenPopUp={setOpenPopUp} />}
          <div onClick={() => setOpenPopUp(true)}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
