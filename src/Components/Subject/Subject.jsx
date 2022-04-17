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
	const saved = useSelector((state) => state.saved.value);
	// console.log(paramData);
	const [data, setData] = React.useState(paramData);
	//   console.log(paramData);
	const [selected, setSelected] = React.useState({});
	const { domain, branch, chapter, subject } = useParams();

	const dispatch = useDispatch();

	const toggle = (e, chapter) => {
		if (e.target.checked) {
			setSelected((p) => ({ ...p, [chapter.name]: chapter }));
		} else {
			// remove from list
			const temp = selected;
			if (temp) temp[chapter.name] = null;
			setSelected(temp);
		}
	};

	React.useEffect(() => {
		if (paramData) return;
		(async function () {
			const res = await fetch(
				`https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/main/data/${domain}/${branch}/${subject}.json`
			);
			const obj = await res.json();
			// console.log(obj);
			// let temp = null;
			// obj.subjects.forEach((sub) => {
			// 	if (sub.name === chapter) temp = sub;
			// });
			setData(obj);
		})();
	}, []);

	const save = () => {
		console.log(selected);
		// dispatch(
		// 	add({
		// 		[data?.name]: {
		// 			...selected,
		// 			objectives: data?.objectives,
		// 			outcomes: data?.outcomes,
		// 		},
		// 	})
		// );
		// alert("Successfully Saved!");
	};

	const toggleTopic = (e, chap, topic) => {
		if (e.target.checked) {
			if (selected[chap.name].topics.includes(topic)) return;
			setSelected((p) => ({
				...p,
				[chap.name]: { ...chap, topics: [...p[chap.name].topics, topic] },
			}));
		} else {
			// remove from list
			const temp = selected;
			if (temp[chap.name])
				temp[chap.name].topics.splice(temp[chap.name].topics.indexOf(topic), 1);
			setSelected(temp);
		}
	};

	return data ? (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-body ">
							<h5 className="card-title">{subject}</h5>
							<hr />
							<h3>Objective</h3>
							<p>{data?.objective}</p>
							<hr />
							<h3>Outcome</h3>
							<p>{data?.outcomes}</p>
							<hr />
							{/* <h3>Credits: {data?.credits}</h3> */}
							{data.units?.map((chap, index) => (
								<div key={index}>
									<div className="card-text d-flex flex-row ">
										<div className="row mt-5">
											<div className="col-md-9">
												<div className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														id="flexCheckDefault"
														onChange={(e) => toggle(e, chap)}
														checked={selected[chap.name]}
													/>
													<h1>{chap.name}</h1>
													<h5>Level: {chap.level}</h5>
												</div>
											</div>
											<div className="col-md-12 ms-4 mt-3">
												<h5>Description : {chap.description}</h5>
											</div>
											<div className="col-md-12 ms-4 mt-3">
												<h5>Topics:</h5>

												{chap.topics.map((topic) => (
													<div className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															id="flexCheckDefault"
															onChange={(e) => toggleTopic(e, chap, topic)}
														/>
														{topic.name} : {topic.duration}
													</div>
												))}
											</div>
										</div>
									</div>
									{chap.links.length !== 0 && (
										<h5 className="ms-4">Resources</h5>
									)}
									<div className="row ms-5">
										<ul>
											{chap.links &&
												chap.links.map((link, idx) => (
													<a
														href={link}
														target="_blank"
														rel="noreferrer"
														key={idx}
													>
														<li>{link}</li>
													</a>
												))}
										</ul>
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
