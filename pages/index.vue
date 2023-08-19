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
							<input v-model="caseData.teamOneScore" type="number" />
							<span> &#128551;</span>
						</div>
						<div>
							<label>team1 overs complete</label>
							<input
								v-model="caseData.teamOneOverComplete"
								type="number"
								step=".01"
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
							/>
						</div>
						<div>
							<label>team1 fall of wickets</label>
							<input v-model="caseData.teamOneWicketFall" type="number" />
							<span v-if="caseData.teamOneWicketFall > 10">&#128564;</span>
						</div>
						<hr />
					</div>
					<div class="answers" v-if="answers"></div>
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
	teamOneScore: 0,
	teamOneOverComplete: 0,
	teamOneOverLeft: 0,
	teamOneWicketFall: 0,
	teamOneResource: 0,
	teamTwoResource: 0,
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
		var divison = caseData.teamOneResource / caseData.teamTwoResource;
		var revisedScore = caseData.teamOneScore + G50 * divison + 1;
		answers["revised_score"] = revisedScore;
		return;
	}
};

watchEffect(() => {
	if (caseData.teamOneOverComplete >= 0) {
		if (caseData.teamOneOverComplete > caseData.numberOfOvers) return;
		if (isMidOver(caseData.teamOneOverComplete)) {
			console.log("><<> mid");
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
		var table = adjustedTable[getAdjustedTableType(caseData.teamOneOverLeft)];
		var percentageObj = table.find(
			(el) => el.overs === String(caseData.teamOneOverLeft)
		);
		console.log(".....", percentageObj[String(caseData.teamOneWicketFall)]);
	}
});

watchEffect(() => {
	// if ((caseData.teamOneOverLeft, caseData.teamOneWicketFall))
	// 	console.log(
	// 		"===============aci",
	// 		adjustedTable["fiftyToZero"].filter((el) => parseInt(el.overs) === 49)
	// 	);
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
