import React, { Fragment } from "react";
import Moment from "react-moment";

function ProfileExperience({ experiences }) {
  return experiences.map(
    ({ _id, company, title, current, from, to, description, location }) => (
      <div key={_id}>
        <h3 className="text-dark">{company}</h3>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD"></Moment>}
        <p>
          <strong>Position: </strong>
          {title}
        </p>
        {description && (
          <p>
            <strong>Description: </strong>
            {description}
          </p>
        )}
      </div>
    )
  );
}

export default ProfileExperience;
