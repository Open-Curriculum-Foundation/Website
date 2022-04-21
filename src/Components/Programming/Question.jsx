import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Question() {
	const { language } = useParams();
	const [data, setData] = useState();

	useEffect(() => {
		(async function () {
			const res = await fetch(
				`https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/main/data/Engineering/Programming/${language}.json`
			);
			const obj = await res.json();
			setData(obj);
		})();
	}, []);

	return ( data ?
		<div className="container">
			<center>
				<h1>{language}</h1>
			</center>
			<hr />
			{data.map((data) => (
				<div className="card m-3 p-3 ">
					<h3>{data.name}</h3>
					<p>{data.description}</p>
					<p>
						<strong>Objectives :</strong> {data.objectives}
					</p>
					<p>
						<strong>Outcomes : </strong>
						{data.outcomes}
					</p>
					<p>
						<strong>Input : </strong>
						{data.input}
					</p>
					<p>
						<strong>Output : </strong>
						{data.output}
					</p>
					<hr />
					<div>
						{data.testcases.map((test, index) => (
							<div>
								<h4>Example {index + 1}</h4>
								<p>
									<strong>Input : </strong>
									{test.input}
								</p>
								<p>
									<strong>Output : </strong>
									{test.output}
								</p>
							</div>
						))}
					</div>
					<hr />
					<div>
						<strong>Resources : </strong>
						{data.resources.map((res) => (
							<a href={res} target="_blank">
								{res}
							</a>
						))}
					</div>
				</div>
			))}
		</div> : <Loading />
	);
}
