<template>
	<div class="main py-50">
		<h1>Cricket DLS <abbr>(Duckworth Lewis Stern)</abbr> method</h1>
		<section class="section-cases">
			<div class="cases">
				<h2>Rain during Team 1</h2>
				<h3>overs: 50</h3>
				<div class="box">
					<div class="inputs">
						<div>
							<label>team1 score</label>
							<input v-model="caseData.teamOneScore" type="number" min="0" />
							<span> &#128551;</span>
						</div>
						<div>
							<label>team1 overs complete</label>
							<input
								v-model="caseData.teamOneOverComplete"
								type="number"
								step=".01"
								min="0"
							/>
							<span
								v-if="caseData.teamOneOverComplete > caseData.numberOfOvers"
							>
								&#128564;</span
							>
						</div>
						<div>
							<label>team1 overs left</label>
							<input
								disabled
								v-model="caseData.teamOneOverLeft"
								type="number"
								min="0"
							/>
						</div>
						<div>
							<label>team1 fall of wickets</label>
							<input
								v-model="caseData.teamOneWicketFall"
								type="number"
								min="0"
								max="10"
							/>
							<span v-if="caseData.teamOneWicketFall > 10">&#128564;</span>
						</div>
						<div>
							<label>team1 resource available</label>
							<input
								disabled
								v-model="caseData.teamOneResource"
								type="number"
								min="0"
							/>
						</div>
						<div>
							<label>Cut and final over</label>
							<input v-model="caseData.cutFinalOver" type="number" min="0" />
						</div>
						<div>
							<label>team2 resource available</label>
							<input
								disabled
								v-model="caseData.teamTwoResource"
								type="number"
								min="0"
							/>
						</div>
						<div>
							<label>team2 wicket fall</label>
							<input
								disabled
								v-model="caseData.teamTwoWicketFall"
								type="number"
								min="0"
							/>
						</div>
						<div>
							<label>team2 wicket available: </label>
							<span>{{ 10 - caseData.teamTwoWicketFall }}</span>
						</div>
						<hr />
					</div>
					<div class="answers" v-if="answers">{{ answers }}</div>
					<button @click="calculationDLS(0)">submit</button>
				</div>
			</div>
		</section>
	</div>
</template>
<script setup>
import adjustedTable from "../utils/adjustedTable.json";
const G50 = 245;

var caseData = reactive({
	numberOfOvers: 50,
	startResource: 100,
	teamOneScore: 0,
	teamOneOverComplete: 0,
	teamOneOverLeft: 0,
	teamOneWicketFall: 0,
	teamOneSuspensionResource: 0,
	teamOneResumptionResource: 0,
	teamOneLostResource: 0,
	teamOneResource: 0,
	teamTwoResource: 0,
	cutFinalOver: 0,
	teamTwoResource: 0,
	teamTwoWicketFall: 0,
});
var answers = reactive({});

const isMidOver = (over) => {
	if (over) {
		return over - parseInt(over) != 0 ? true : false;
	}
	return false;
};

const getAdjustedTableType = (over) => {
	if (isMidOver(over)) {
		if (40 <= over && over <= 50) return "fiftyToForty";
		else if (30 <= over && over <= 40) return "fortyToThirty";
		else if (20 <= over && over <= 30) return "thirtyToTwenty";
		else if (10 <= over && over <= 20) return "twentyToTen";
		else if (0 <= over && over <= 10) return "tenToZero";
	} else {
		return "fiftyToZero";
	}
};

const calculationDLS = (type) => {
	if (type === 0) {
		// Formula:
		// Revised Score = S + G50 * (R2/R1) + 1
		// Where, S is team one score, G50 is a standard score (245 total run) for a international criecket team
		var divison =
			(Number(caseData.teamTwoResource) - Number(caseData.teamOneResource)) /
			100;
		console.log("==a=sd=s=d", divison);
		var revisedScore = caseData.teamOneScore + G50 * divison + 1;
		answers["revised_score"] = revisedScore;
		return;
	}
};

watch(
	() => caseData.teamOneOverComplete,
	(newVal, oldVal) => {
		if (newVal && newVal >= 0) {
			if (caseData.teamOneOverComplete > caseData.numberOfOvers) return;
			if (isMidOver(caseData.teamOneOverComplete)) {
				// Calculating left over if complete over is in mid over
				// if complete over 46.3
				// then left over 3.3
				let decimal =
					caseData.teamOneOverComplete - parseInt(caseData.teamOneOverComplete);
				let leftDecimal = 0.6 - decimal;
				caseData.teamOneOverLeft =
					caseData.numberOfOvers -
					parseInt(caseData.teamOneOverComplete) -
					1 +
					parseFloat(leftDecimal.toFixed(1));
			} else {
				caseData.teamOneOverLeft =
					caseData.numberOfOvers - caseData.teamOneOverComplete;
			}

			// Get ICC adjusted table data
			var table = adjustedTable[getAdjustedTableType(caseData.teamOneOverLeft)];
			var percentageObj = table.find(
				(el) => el.overs === String(caseData.teamOneOverLeft)
			);
			// Suspension resource after distrubing moment
			caseData.teamOneSuspensionResource =
				percentageObj[String(caseData.teamOneWicketFall)];
		}
	}
);

watch(
	() => caseData.cutFinalOver,
	(newVal, oldVal) => {
		console.log("+++++DSD", newVal, oldVal);
		if (newVal && newVal >= 0) {
			// Get ICC adjusted table
			var bigTable = adjustedTable["fiftyToZero"];
			// Get team 2 resource, R2
			var percentageObj = bigTable.find(
				(el) => el.overs === String(caseData.cutFinalOver)
			);
			caseData.teamTwoResource = percentageObj["0"];
			// Get team 1 resumption resource
			var obj = bigTable.find(
				(el) =>
					el.overs ===
					String(caseData.cutFinalOver - caseData.teamOneOverComplete)
			);
			caseData.teamOneResumptionResource =
				obj[String(caseData.teamOneWicketFall)];

			caseData.teamOneLostResource =
				caseData.teamOneSuspensionResource - caseData.teamOneResumptionResource;

			caseData.teamOneResource =
				caseData.startResource - caseData.teamOneLostResource;
		}
	}
);

watch(
	() => caseData.teamOneWicketFall,
	(newVal, oldVal) => {
		if (newVal) {
			console.log(">>>>>", newVal);
			// Get ICC adjusted table data
			var table = adjustedTable[getAdjustedTableType(caseData.teamOneOverLeft)];
			var percentageObj = table.find(
				(el) => el.overs === String(caseData.teamOneOverLeft)
			);
			// Suspension resource after distrubing moment
			caseData.teamOneSuspensionResource =
				percentageObj[String(caseData.teamOneWicketFall)];

			if (caseData.cutFinalOver) {
				// Get team 1 resumption resource
				var bigTable = adjustedTable["fiftyToZero"];
				var obj = bigTable.find(
					(el) =>
						el.overs ===
						String(caseData.cutFinalOver - caseData.teamOneOverComplete)
				);
				caseData.teamOneResumptionResource =
					obj[String(caseData.teamOneWicketFall)];
			}

			caseData.teamOneLostResource =
				caseData.teamOneSuspensionResource - caseData.teamOneResumptionResource;

			caseData.teamOneResource =
				caseData.startResource - caseData.teamOneLostResource;
		}
	}
);

onMounted(() => {
	caseData.teamOneOverLeft =
		caseData.numberOfOvers - caseData.teamOneOverComplete;
});
</script>
<style scoped lang="scss">
.main {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.section-cases {
		.cases {
			display: flex;
			flex-direction: column;
			gap: 10px;
			.inputs {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				input {
					flex-basis: 48%;
				}
			}
		}
	}
}
</style>
