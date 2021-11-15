import { Link } from "react-router-dom";

const AboutLink = () => {
  return (
    <div className="text-xl sm:text-2xl text-pink-700">
      <Link to="/about">About</Link>
    </div>
  );
};

export default AboutLink;
