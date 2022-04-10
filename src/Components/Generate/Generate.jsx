import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../redux/reducers/savedSlice";
import Loading from "../Loading/Loading";

export default function Generate() {
	const [data, setData] = useState();
	const [subjects, setSubjects] = useState();
	const [domain, setDomain] = useState();
	const [branch, setBranch] = useState();
	const [inputs, setInputs] = useState({ credits: 0, duration: 0 });
	const [subject, setSubject] = useState();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		(async function () {
			const data = await fetch(
				"https://raw.githubusercontent.com/ItsDEFAULT/SIH/master/paths.json"
			);
			const obj = await data.json();
			setData(obj);
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const data = await fetch(
				`https://raw.githubusercontent.com/ItsDEFAULT/SIH/master/${domain}/${branch}.json`
			);
			const obj = await data.json();
			setSubjects(obj);
		})();
	}, [branch]);

	const search = () => {
		let curCredits = 0,
			curDuration = 0;
		let obj = {};
		let i = subjects.subjects.filter((sub) => sub.name === subject)[0];
		curCredits += i.credits;

		for (let j of i.chapters) {
			curDuration += j.duration;
			obj = {
				[i.name]: {
					objectives: i.objectives,
					outcomes: i.outcomes,
					...obj[i.name],
					[j.name]: { ...j },
					credits: curCredits,
				},
			};

			if (
				curCredits >= parseInt(inputs.credits) &&
				curDuration >= parseInt(inputs.duration)
			) {
				dispatch(add(obj));
				navigate("/saved");
				return;
			}
		}

		// for (let i of subjects.subjects) {
		// 	if (!obj[i.name]) curCredits += parseInt(i.credits);
		// 	obj = {
		// 		...obj,
		// 		[i.name]: {
		// 			objectives: i.objectives,
		// 			outcomes: i.outcomes,
		// 			credits: parseInt(i.credits),
		// 		},
		// 	};
		// 	for (let j of i.chapters) {
		// 		curDuration += j.duration;

		// 		obj = {
		// 			[i.name]: {
		// 				...obj[i.name],
		// 				[j.name]: { ...j },
		// 			},
		// 		};

		// 		if (
		// 			curCredits >= parseInt(inputs.credits) &&
		// 			curDuration >= parseInt(inputs.duration)
		// 		) {
		// 			dispatch(add(obj));
		// 			navigate("/saved");
		// 			return;
		// 		}
		// 	}
		// }
		alert("The given constraints exceed the maximum stats for this subject");
	};

	return data ? (
		<div className="container flex-column m-5 d-flex justify-content-center align-items-center">
			<div className="row">
				<div className="col">
					<h4>Domain</h4>
					<select onChange={(e) => setDomain(e.target.value)}>
						<option value={null}>Select your domain</option>
						{Object.keys(data).map((k) => (
							<option value={k}>{k}</option>
						))}
					</select>
				</div>
				{domain && (
					<div className="col">
						<h4>Branch</h4>
						<select onChange={(e) => setBranch(e.target.value)}>
							<option value={null}>Select your branch</option>
							{domain &&
								Object.keys(data[domain]).map((k) => (
									<option value={data[domain][k]}>{data[domain][k]}</option>
								))}
						</select>
					</div>
				)}
			</div>

			<div className="row d-flex mt-5 flex-column justify-content-center align-items-center">
				{subjects && (
					<>
						<div className="row">
							<div className="col">
								<h4>Subject</h4>
								<select onChange={(e) => setSubject(e.target.value)}>
									<option value={null}>Select a subject</option>
									{subjects &&
										subjects.subjects.map((s) => (
											<option value={s.name}>{s.name}</option>
										))}
								</select>
							</div>
							<div className="col">
								<fieldset>
									<label htmlFor="credits">Min credits</label>&nbsp;
									<input
										type="number"
										id="credits"
										value={inputs.credits}
										onChange={(e) =>
											setInputs((p) => ({ ...p, credits: e.target.value }))
										}
										placeholder="Enter the target credits"
									/>
								</fieldset>

								<fieldset>
									<label htmlFor="duration">Min Duration</label>&nbsp;
									<input
										type="number"
										value={inputs.duration}
										id="duration"
										onChange={(e) =>
											setInputs((p) => ({ ...p, duration: e.target.value }))
										}
										placeholder="Enter the target duration"
									/>
								</fieldset>
							</div>
						</div>
						<button
							className="btn btn-primary mt-5 go rounded btn-lg"
							onClick={search}
						>
							Go
						</button>
					</>
				)}
			</div>
		</div>
	) : (
		<Loading />
	);
}
