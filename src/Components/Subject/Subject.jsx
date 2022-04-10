import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/reducers/savedSlice.js";

const verifiedSub = [
	"MOS Transistor Theory",
	"Characterization & performance Estimation",
];

export default function Subject({ data: paramData }) {
	/* 
export default function Subject({ data: paramData }) {
	/* 
    Data will contain
    {
        name: "subject name",
        links: [array of resources for the subject],
        chapters: [array of chapters]
    }

    each chapter will contain
    {
        name: "chapter name",
        links: [array of resources for the chapter],
        description: "string that describes the chapter (what the chapter contains, time required, etc"
    }

    */
	const saved = useSelector((state) => state.saved.value);

	const [data, setData] = React.useState(paramData);
	//   console.log(paramData);
	const [selected, setSelected] = React.useState([]);
	const { domain, branch, chapter } = useParams();

	const dispatch = useDispatch();

	const toggle = (e, chapter) => {
		if (e.target.checked) {
			setSelected((p) => ({ ...p, [chapter.name]: chapter }));
		} else {
			// remove from list
			const temp = selected;
			if (temp) delete temp[chapter.name];
			setSelected(temp);
		}
	};

	React.useEffect(() => {
		if (paramData) return;
		(async function () {
			const res = await fetch(
				`https://raw.githubusercontent.com/ItsDEFAULT/SIH/master/${domain}/${branch}`
			);
			const obj = await res.json();
			let temp = null;
			obj.subjects.forEach((sub) => {
				if (sub.name === chapter) temp = sub;
			});
			setData(temp);
		})();
	}, []);

	const save = () => {
		// if (saved !== {}) {
		//   //   saved = JSON.parse(saved);
		//   dispatch(add(selected));
		//   //   localStorage.setItem("saved", JSON.stringify(saved));
		// } else {
		//   dispatch(add({ [data.name]: selected }));
		//   //   localStorage.setItem("saved", JSON.stringify(temp));
		// }
		dispatch(
			add({
				[data.name]: {
					...selected,
					objectives: data.objectives,
					outcomes: data.outcomes,
					credits: data.credits,
				},
			})
		);
		alert("Successfully Saved!");
	};
	console.log(saved);
	return data ? (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-body ">
							<h5 className="card-title">{data.name}</h5>
							<hr />
							<h3>Objective</h3>
							<p>{data.objectives}</p>
							<hr />
							<h3>Outcome</h3>
							<p>{data.outcomes}</p>
							<hr />
							<h3>Credits: {data.credits}</h3>
							<hr />
							{data.chapters.map((chap, index) => (
								<div key={index}>
									<div
										className="card-text d-flex flex-row "
										onClick={(e) => toggle(e, chap)}
									>
										<div className="row mt-5">
											<div className="col-md-3">
												<div className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														id="flexCheckDefault"
													/>
													<h4>{chap.name}:</h4>
													<h6>Duration: {chap.duration}</h6>
													<h6>Level: {chap.level}</h6>
												</div>
											</div>
											<div className="col-md-9">{chap.description}</div>
										</div>
									</div>
									{chap.links.length !== 0 && <h5>Resources</h5>}
									<div className="row">
										{chap.links &&
											chap.links.map((link, idx) => (
												<a
													href={link}
													target="_blank"
													rel="noreferrer"
													key={idx}
												>
													{link}
												</a>
											))}
									</div>
								</div>
							))}

							<button
								type="button"
								className="btn btn-success btn-lg float-end"
								onClick={save}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Loading />
	);
}
