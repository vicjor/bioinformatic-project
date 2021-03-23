import GoogleChart from "react-google-charts";

function Charts(props) {
	// TODO: Skrive passende tittel, header (data), samt andre endringer på grafen som du ser er nice. Selv om jeg personlig er fornøyd.

	const create_data_table = (key, seq_num) => {
		let minValue = 0;
		let title = `Resultat: Binding ${key} eksisterer i sekvens ${props.sequence}`;
		const data = [["header1", "Value"]];

		for (let i = 0; i < props.res[key].length; i++) {
			data.push([i, props.res[key][i][i][1]]);

			if (minValue > props.res[key][i][i][1]) {
				minValue = props.res[key][i][i][1] - 2;
			}
		}
		return (
			<GoogleChart
				chartType="BarChart"
				width="100%"
				height="400px"
				data={data}
				options={{
					title: title,
					chartArea: { width: "50%" },
					hAxis: { title: "Score", minValue: minValue },
					vAxis: { title: "Position", minValue: 0, maxValue: props.res[key].length - 1 },
				}}
				rootProps={{ "data-testid": "1" }}
			/>
		);
	};

	return (
		<div>
			{props.res &&
				Object.keys(props.res).map((key, index) => create_data_table(key, index + 1))}
		</div>
	);
}
export default Charts;
