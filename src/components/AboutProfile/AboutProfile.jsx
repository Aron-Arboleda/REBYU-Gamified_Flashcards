import "./AboutProfile.css";
const AboutProfile = ({ imageUrl, name, label }) => {
  return (
    <div className="aboutProfile">
      <img src={imageUrl} alt={name} />
      <p className="member-name">{name}</p>
      <p>{label}</p>
    </div>
  );
};

export default AboutProfile;
