import React from "react";
import Moment from "react-moment";

function ProfileEducation({ educations }) {
  return educations.map(
    ({ _id, school, degree, current, from, to, description, fieldOfStudy }) => (
      <div key={_id}>
        <h3 className="text-dark">{school}</h3>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD"></Moment>}
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field of study: </strong>
          {fieldOfStudy}
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

export default ProfileEducation;
