import PopUpThread from "./PopUpThread";
import ThreadInput from "./ThreadInput";

function PopUp({ user, setOpenPopUp }) {
  return (
    <div className="popup">
      <p onClick={() => setOpenPopUp(false)}>X</p>
      <PopUpThread />
      <ThreadInput />
    </div>
  );
}

export default PopUp;
