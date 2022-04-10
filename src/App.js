import React from "react";
import { Route, Routes } from "react-router-dom";
import Branch from "./Components/Branch/Branch";
import Domains from "./Components/Domains/Domains";
import Subject from "./Components/Subject/Subject";
import Loading from "./Components/Loading/Loading";
import Saved from "./Components/Saved/Saved";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Standard from "./Components/Standard/Standard";
import ReactGA from "react-ga";
import Generate from "./Components/Generate/Generate";

export const EduDomains = React.createContext(null);

// G-H819E5MDX0

function App() {
	const [data, setData] = React.useState();
	const [subject, setSubject] = React.useState();
	const [hideForPrint, setHideForPrint] = React.useState(false);

	React.useEffect(() => {
		ReactGA.initialize("G-H819E5MDX0");
		(async function () {
			const data = await fetch(
				"https://raw.githubusercontent.com/Open-Curriculum-Foundation/Website/main/data/paths.json"
			);
			const obj = await data.json();
			setData(obj);
		})();
	}, []);

	return data ? (
		<EduDomains.Provider value={{ data, setSubject }}>
			<div className="App">
				{!hideForPrint && <Navbar />}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/curricula" element={<Domains />} />
					<Route path="/branch/:domain/:branch" element={<Branch />} />
					<Route
						path="/subject/:domain/:branch/:chapter"
						element={<Subject data={subject} />}
					/>
					<Route
						path="/subject/:domain/:branch"
						element={<Subject data={subject} />}
					/>
					<Route
						path="/saved"
						element={<Saved setHide={setHideForPrint} hide={hideForPrint} />}
					/>
					<Route path="/standard" element={<Standard />} />
					<Route path="/generate" element={<Generate />} />
				</Routes>
			</div>
		</EduDomains.Provider>
	) : (
		<Loading />
	);
}

export default App;
