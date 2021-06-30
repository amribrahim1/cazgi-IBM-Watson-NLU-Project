import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    state= {
		analyze: "sentiment"
	}

	changeAnalyze = value => this.setState({analyze: value});

    render() {
		// console.log(this.props)
		return (  
			<div className="mt-5">
				<div>
					<button type="button" className="btn-primary" onClick={() => this.changeAnalyze("sentiment")}>Analyze Sentiment</button>
					<button type="button" className="btn-primary" onClick={() => this.changeAnalyze("emotion")}>Analyze Emotion</button>
				</div>
				<div className="mb-5 ml-5 mr-5">
					{/*You can remove this line and the line below. */}
					<div className="p-2 m-4" style={{backgroundColor: "rgba(0,0,0,0.1)"}}>{JSON.stringify(this.props.analytics)}</div>
					{this.state.analyze === "sentiment"
						? (
							<table className="table table-bordered mt-4">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Text</th>
										<th scope="col">Label</th>
										<th scope="col">score</th>
									</tr>
								</thead>
								<tbody>
								{
									this.props.analytics.map((mapentry, i) => {
										return (
											<tr key={i}>
												<td>{i+1}</td>
												<td>{mapentry.text}</td>
												{mapentry.sentiment && ( <>
													<td>{mapentry.sentiment.label}</td>
													<td>{mapentry.sentiment.score*100} %</td>
												</>)}
											</tr>
										)
									})
								}
								</tbody>
							</table>
						) : (
							<table className="table table-bordered mt-4">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Text</th>
										<th scope="col">Anger</th>
										<th scope="col">Disgust</th>
										<th scope="col">Fear</th>
										<th scope="col">Joy</th>
										<th scope="col">Sadness</th>
									</tr>
								</thead>
								<tbody>
								{
									this.props.analytics.map((mapentry, i) => {
										return (
											<tr key={i}>
												<td>{i+1}</td>
												<td>{mapentry.text}</td>
												{mapentry.emotion && ( <>
													<td>{mapentry.emotion.anger*100} %</td>
													<td>{mapentry.emotion.disgust*100} %</td>
													<td>{mapentry.emotion.fear*100} %</td>
													<td>{mapentry.emotion.joy*100} %</td>
													<td>{mapentry.emotion.sadness*100} %</td>
												</> ) }
											</tr>
										)
									})
								}
								</tbody>
							</table>
						)
					}
				</div>
			</div>
        );
    } 
}
export default EmotionTable;
