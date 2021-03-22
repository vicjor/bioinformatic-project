import React, { useState, useEffect } from "react";

// NBNB: NOT IN USE ANYMORE, KEEP FOR NOW
let URL;
if (process.env.NODE_ENV === "development") {
	URL = process.env.REACT_APP_URL;
	console.log(URL);
} else {
	URL = "http://tfbs-backend.herokuapp.com/";
}
export default function Forms(props) {
	const [matrices, setMatrices] = useState(0);
	const [chosenMatrix, setChosenMatrix] = useState("no chosen matrix");
	const [pwm, setPwm] = useState(0);

	useEffect(() => {
		get_data(`${URL}matrices`, setMatrices);
	}, []);

	useEffect(() => {
		if (props.progress == 1) {
			getPwm();
		}
	}, [props.progress]);

	const getPwm = () => {
		if (chosenMatrix != "no chosen matrix") {
			get_data(`${URL}score/${chosenMatrix}`, setPwm);
		}
	};

	const get_data = (url, setResponse) => {
		fetch(url)
			.then((response) => response.json())
			.then((response) => {
				setResponse(response);
			});
	};

	const setProgress = (bool) => {
		if (bool && props.progress > 0) {
			props.setProgress(props.progress - 1);
		} else if (!bool && props.progress < 3) {
			props.setProgress(props.progress + 1);
		}
	};

	return (
		<div>
			<p>Progress Bar here {props.progress}, results at progress = 3</p>
			<p>chosen matrix: {chosenMatrix}</p>
			<button onClick={() => setProgress(true)}>Back</button>
			<button onClick={() => setProgress(false)}>Next</button>

			{props.progress === 0 ? (
				<div>
					{matrices !== 0 ? (
						matrices["matrices_ids"].map((key, index) => (
							<p onClick={() => setChosenMatrix(key)}>{key}</p>
						))
					) : (
						<p>Laster...</p>
					)}
				</div>
			) : props.progress === 1 ? (
				<div>
					<p>Her kommer egt "skriv inn DNA sekvens". Har bare denne midlertidig.</p>
					<br />
					{pwm !== 0 ? <h3>PWM matrix for {chosenMatrix}</h3> : null}
					{pwm !== 0 ? (
						Object.keys(pwm["pwm"]).map((key, index) => (
							<p>{pwm["pwm"][key].map((value, index) => value + ", ")}</p>
						))
					) : (
						<p>laster ...</p>
					)}
				</div>
			) : props.progress === 2 ? (
				<div>
					<p>Her kommer bakgrunnsfordeling</p>
				</div>
			) : null}
		</div>
	);
}
