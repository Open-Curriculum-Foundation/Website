import React from "react";
import { useNavigate } from "react-router-dom";

export default function Standard() {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		(async function () {
			let data = await fetch(
				"https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/main/data/standard.json"
			);
			data = await data.json();
			setData(data);
		})();
	}, []);

	return (
		<div className="container mt-3">
			{Object.keys(data).map((key, idx) => (
				<div className="accordion m-3" id={`accordion${idx}`} key={idx}>
					<div className="accordion-item">
						<h2 className="accordion-header" id={`heading${idx}`}>
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#collapse${idx}`}
								aria-expanded="false"
								aria-controls={`collapse${idx}`}
							>
								<h5>{key}</h5>
							</button>
						</h2>
						<div
							id={`collapse${idx}`}
							className="accordion-collapse collapse "
							aria-labelledby={`heading${idx}`}
							data-bs-parent={`#accordion${idx}`}
						>
							<div className="accordion-body">
								{data[key].map((k, idx2) => (
									<div key={idx2 * (idx + 1)} className="row branch-item">
										{k}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
