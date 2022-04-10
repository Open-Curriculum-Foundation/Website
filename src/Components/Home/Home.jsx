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
				"https://raw.githubusercontent.com/ItsDEFAULT/SIH/master/home.json"
			);
			const data = await res.json();
			setRecent(data.recent);
			setTopContributors(data.top_contributors);
			setTrending(data.trending);
		})();
	}, []);

	return (
		<div className="container homeMain mt-3">
			<div className="card home-card m-2 d-flex">
				<h2 className="text-center">
					<i className="fa-solid fa-chart-line"></i> &nbsp; Trending
				</h2>
				<hr />
				{trending &&
					Object.keys(trending).map((key, idx) => (
						<div className="text-center">
							<span className="d-flex justify-content-center align-items-center">
								{idx === 0 && (
									<i className="fa-solid fa-screwdriver-wrench text-primary"></i>
								)}
								{idx === 1 && (
									<i className="fa-solid fa-user-doctor text-primary"></i>
								)}
								&emsp;
								<h2>{key}</h2>
							</span>
							{trending[key].map((sub) => (
								<p
									key={sub}
									className="branch-item"
									onClick={() => navigate(`/subject/${sub.path}/${sub.name}`)}
								>
									{sub.name}
								</p>
							))}
							<hr />
						</div>
					))}
			</div>
			<div className="col">
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
