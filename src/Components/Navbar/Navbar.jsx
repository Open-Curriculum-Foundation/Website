import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	const [active, setActive] = useState(0);
	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-expand-lg p-3 navbar-dark " id="nav">
			<div className="container">
				<a role="button" className="navbar-brand" onClick={() => navigate("/")}>
					Open Curriculum
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-lg-0 text-center">
						<li
							role="button"
							className="nav-item"
							onClick={() => {
								navigate("/");
								setActive(0);
							}}
						>
							<a
								className={`nav-link ${active === 0 && "active"}`}
								aria-current="page"
							>
								Home
							</a>
						</li>
						<li
							role="button"
							className="nav-item"
							onClick={() => {
								navigate("/curricula");
								setActive(1);
							}}
						>
							<a className={`nav-link ${active === 1 && "active"}`}>
								Curricula
							</a>
						</li>
						<li
							role="button"
							className="nav-item"
							onClick={() => {
								navigate("/saved");
								setActive(2);
							}}
						>
							<a className={`nav-link ${active === 2 && "active"}`}>Saved</a>
						</li>
						<li
							role="button"
							className="nav-item"
							onClick={() => {
								navigate("/generate");
								setActive(3);
							}}
						>
							<a className={`nav-link ${active === 3 && "active"}`}>Generate</a>
						</li>
						<li
							role="button"
							className="nav-item"
							onClick={() => {
								navigate("/about");
								setActive(4);
							}}
						>
							<a className={`nav-link ${active === 3 && "active"}`}>About</a>
						</li>
						{/* <li
              role="button"
              className="nav-item"
              onClick={() => {
                navigate("/standard");
                setActive(3);
              }}
            >
              <a className={`nav-link ${active === 3 && "active"}`}>Standard</a>
            </li> */}
						<li role="button" className="nav-item">
							<a
								className="nav-link"
								href="https://github.com/Open-Curriculum-Foundation/Website/blob/main/data/Readme.md#Open-Curriculum"
								target="_blank"
							>
								Contribute
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
