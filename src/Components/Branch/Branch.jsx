import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EduDomains } from "../../App";
import Loading from "../Loading/Loading";

export default function Branch() {
	const { domain, branch } = useParams();
	const [data, setData] = React.useState();
	const navigate = useNavigate();
	const { setSubject } = React.useContext(EduDomains);

	React.useEffect(() => {
		(async function () {
			const res = await fetch(
				`https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/main/data/${domain}/${branch}.json`
			);
			const obj = await res.json();
			setData(obj);
		})();
	}, []);

	return data ? (
		<div className="container mt-3">
			<h1 className="text-center">{branch}</h1>
			<hr />
			<div>
				{data.subjects.map((sub, idx) => (
					<h5
						key={idx}
						onClick={() => {
							setSubject(sub);
							navigate(`/subject/${branch}/${sub.name}.json`);
						}}
						className="branch-item"
					>
						{sub.name}
					</h5>
				))}
			</div>
		</div>
	) : (
		<Loading />
	);
}
