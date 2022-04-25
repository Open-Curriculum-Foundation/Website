import React from "react";

export default function About() {
	return (
		<div className="container m-5 p-5">
			<div className="card m-3 p-5">
				<h3>Video Reference</h3>
				<center>
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/pGz1mg_t_M0"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</center>
			</div>
			<div className="card m-3 p-5">
				<h3>About Open Curriculum</h3>
				Open curriculum software lets anyone contribute to the curriculum. To
				have an open curriculum we use GitHub. We have a well equipped team of
				specialists who review the syllabus and merge it into the central repo
				if the contributions are valid. So, how does this help the education
				system? Open Curriculum allows universities to track the latest trends
				in the educational domain, allowing all universities across the country
				to have a uniform curriculum. Universities can manually create a
				curriculum or let us automatically generate a syllabus for them, based
				on parameters such as credits and duration. Open Curriculum also
				provides a feature to compare 2 syllabi to find out what was changed
				from the previous syllabus. We also provide a standard syllabus of the
				highest standard set by a specialist of a domain. The standard syllabus
				will keep updating frequently to meet the demands of the current job
				trends. Open Curriculum provides many free learning resources from other
				open source projects, so that learners can not only see the topics, but
				also learn about them from the same site. Open Curriculum is the all in
				one platform for universities to get their hands on 21st century
				curricula.
			</div>
			<div className="card m-3 p-5">
				<h3>Concept</h3>
				Prof. Gajendra Deshpande
			</div>
			<div className="card m-3 p-5">
				<h3>Developers</h3>
				<ul>
					<li>Shreehari Kulkarni</li>
					<li>Sandesh Hiremath</li>
					<li>Sanket Katti</li>
				</ul>
			</div>
			<div className="card m-3 p-5">
				<h3>Collaborators</h3>
				<ul>
					<li>Irfan Kamate</li>
					<li>Uma Galgale</li>
					<li>Kartik Rathod</li>
				</ul>
			</div>
		</div>
	);
}
