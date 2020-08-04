import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

////////////////////////////////////////////////////////////////
const profileVariants = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring" } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

//
const ProfileItem = ({
  user: { _id, name, avatar },
  status,
  company,
  skills,
  location,
}) => {
  return (
    <motion.div
      className="profile bg-light"
      variants={profileVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <img className="round-img" alt="" src={avatar}></img>
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProfileItem;
