import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EduDomains } from "../../App";
import Loading from "../Loading/Loading";

export default function Branch() {
  const { domain, branch } = useParams();
  const [subs, setSubs] = React.useState([]);
  const navigate = useNavigate();
  const { setSubject, data } = React.useContext(EduDomains);

  React.useEffect(() => {
    (function () {
      data[domain][branch].map(async (sub) => {
        let res = await fetch(
          `https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/modify-paths/data/${domain}/${branch}/${sub}.json`
        );
        let obj = await res.json();
        setSubs((old) => [...old, obj]);
      });
    })();
  }, []);

  // console.log(data[domain][branch]);
  console.log(subs);

  return data ? (
    <div className="container mt-3">
      <h1 className="text-center">{branch}</h1>
      <hr />
      <div>
        {data[domain][branch].map((sub, idx) => (
          <h5
            key={idx}
            onClick={() => {
              setSubject(sub);
              navigate(`/subject/${domain}/${branch}/${sub}`);
            }}
            className="branch-item"
          >
            {sub}
          </h5>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
