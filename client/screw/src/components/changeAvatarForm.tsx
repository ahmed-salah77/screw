import { useState, useEffect, ReactNode } from "react";
import "../../../css/profile.css";
const ChangeAvatarForm = () => {
  const [avatars, setAvatars] = useState<ReactNode[]>([]);
  const [avatarId, setAvatarId] = useState(0);
  const handleSubmit = () => {

  };
  const showAvatars = () => {
    (
      document.querySelector(".avatars-container") as HTMLElement
    ).style.display = "flex";
    console.log("here");
  };
  const handleChange = (avatar_idx: number) => {
    if (avatar_idx < 0 || avatar_idx > 135) return;
    setAvatarId(avatar_idx);
    (
      document.querySelector(".avatars-container") as HTMLElement
    ).style.display = "none";
    handleSubmit();
  };
  useEffect(() => {
    let getAvatars = [];
    for (let i = 0; i < 136; i++) {
      getAvatars.push(
        <div className="avatar-icon">
          <img
  
            onClick={() => handleChange(i)}
            src={"/assets/" + i + ".png"}
          ></img>
        </div>
      );
    }
    setAvatars(getAvatars);
  }, []);
  return (
    <>
      <div onClick={showAvatars} className="user-img user-img-hover">
        <img
          className="avatar-img"
          src={"/static/images/avatar icons/" + avatarId + ".png"}
        ></img>
        <div className="change-avatar">
          <i className="fa-regular fa-image"></i> change
        </div>
      </div>
      <div className="avatars-container">{avatars}</div>

      <form onSubmit={handleSubmit} style={{ display: "none" }}>
        <input name="avatar_id" type="text" value={avatarId}></input>
      </form>
    </>
  );
};

export default ChangeAvatarForm;
