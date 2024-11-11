import "./AboutProfile.css";
const AboutProfile = ({ imageUrl, name }) => {
  return (
    <div className="aboutProfile">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default AboutProfile;
