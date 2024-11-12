import { redirectTo } from "../../utils/helpers";

const ProfileSection = () => {
  return (
    <div style={{ width: "200px" }} onClick={() => redirectTo("/profile")}>
      <img src="/images/graphics/profileSection.png" alt="" />
    </div>
  );
};

export default ProfileSection;
