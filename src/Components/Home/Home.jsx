import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [recent, setRecent] = useState([]);
	const [topContributors, setTopContributors] = useState([]);
	const [trending, setTrending] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const res = await fetch(
				"https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/main/data/home.json"
			);
			const data = await res.json();
			setRecent(data.recent);
			setTopContributors(data.top_contributors);
			setTrending(data.trending);
		})();
	}, []);

	return (
		<div className="container homeMain mt-3">
			<div className="row">
				<div className="card home-card m-2">
					<h2 className="text-center">
						<i className="fa-solid fa-hourglass-start"></i> &nbsp; Recently
						Added
					</h2>
					<hr />
					{recent.map((sub) => (
						<h6 key={sub}>{sub}</h6>
					))}
				</div>
				<div className="card home-card m-2  ">
					<h2 className="text-center">
						<i className="fa-solid fa-users"></i> &nbsp; Top Contributors
					</h2>
					<hr />
					{topContributors.map((top) => (
						<h6 key={top + Date.now()}>{top}</h6>
					))}
				</div>
			</div>
		</div>
	);
}
