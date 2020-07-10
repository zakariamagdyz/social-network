import React, { Fragment } from "react";
import Moment from "react-moment";
import { deleteEducation } from "../../redux/actions/profile";
import { useDispatch } from "react-redux";

const Education = ({ educations }) => {
  const dispatch = useDispatch();
  const educationRows = educations.map((educ) => (
    <tr key={educ._id}>
      <td>{educ.school}</td>
      <td className="hide-sm">{educ.degree}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{educ.from}</Moment> -{" "}
        {educ.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{educ.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn bg-danger"
          onClick={() => {
            dispatch(deleteEducation(educ._id));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h1 className="my-2">Education Credentials</h1>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educationRows}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
