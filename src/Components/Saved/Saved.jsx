import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIt } from "../../redux/reducers/savedSlice";

export default function Saved({ setHide, hide }) {
	const data = useSelector((state) => state.saved.value);
	const dispatch = useDispatch();
	const [toPrint, setToPrint] = React.useState({});

	const calcDur = () => {
		let dur = 0;
		const keys = Object.keys(data);
		keys.forEach((k) => {
			const moreKeys = Object.keys(data[k]);
			const len = Object.keys(data[k]).length;
			moreKeys.forEach((k2, idx) => {
				if (k2 !== "objectives" && k2 !== "outcomes" && k2 !== "credits")
					dur += data[k][k2].duration;
			});
		});
		return dur;
	};

	const calcCredits = () => {
		let credits = 0;
		const keys = Object.keys(data);
		keys.forEach((k) => {
			credits += data[k].credits;
		});

		return credits;
	};

	const [totalDuration, setTotalDuration] = React.useState(calcDur());
	const [totalCredits, setTotalCredits] = React.useState(calcCredits());

	const save = (e) => {
		e.preventDefault();
		setHide(true);
		setTimeout(() => {
			// timeout since useState call is async
			window.print();
			setHide(false);
		}, 10);
	};

	const deleteSub = (name) => {
		let temp = { ...data };
		delete temp[name];
		//   localStorage.setItem("saved", JSON.stringify(temp));
		// setData(temp);
		dispatch(deleteIt(temp));
	};

	return (
		<div className="container">
			{data && Object.keys(data).length ? (
				<div>
					{Object.keys(data).map((k, idx) => (
						<div key={idx} className={`${!toPrint[k] && hide && "d-none"}`}>
							<div className="d-flex justify-content-between align-items-center">
								<span className="d-flex justify-content-between align-items-center">
									<input
										className={`form-check-input ${hide && "d-none"}`}
										type="checkbox"
										checked={toPrint[k]}
										onChange={(e) => {
											let a = toPrint;
											if (e.target.checked) {
												a = { ...a, [k]: true };
											} else {
												a = { ...a, [k]: false };
											}
											setToPrint(a);
										}}
									/>
									&emsp;
									<h1 className="text-center">{k}</h1>
								</span>

								<button
									className={`btn btn-danger btn-lg mt-3 ${hide && "d-none"}`}
									onClick={() => deleteSub(k)}
								>
									Delete
								</button>
							</div>
							<hr />
							<h3>Objective</h3>
							<p>{data[k].objectives}</p>
							<hr />
							<h3>Outcome</h3>
							<p>{data[k].outcomes}</p>
							<hr />
							<h3>Credits: {data[k].credits}</h3>
							<hr />
							<div>
								{Object.keys(data[k]).map(
									(chap, idx2) =>
										chap !== "objectives" &&
										chap !== "outcomes" &&
										chap !== "credits" && (
											<div key={idx2 * (idx + 1)}>
												<h4>{chap}</h4>
												<p>{data[k][chap].description}</p>
												<hr />
											</div>
										)
								)}
							</div>
						</div>
					))}
					<div className="d-flex justify-content-between m-5">
						<h3>Total Duration: {totalDuration}</h3>
						<h3>Total Credits: {totalCredits}</h3>
					</div>

					<button
						className={`btn btn-primary btn-lg mb-5  ${hide && "d-none"}`}
						onClick={save}
						disabled={Object.keys(toPrint).every((e) => toPrint[e] === false)}
					>
						Save as PDF
					</button>
				</div>
			) : (
				<h3 className="text-center mt-5">You have not saved any modules!</h3>
			)}
		</div>
	);
}
