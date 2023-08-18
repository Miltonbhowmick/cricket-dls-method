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
							<input type="text" v-model="caseData.teamOneScore" />
						</div>
						<div>
							<label>team1 overs left</label>
							<input type="text" v-model="caseData.teamOneResource" />
						</div>
						<div>
							<label>team1 fall of wickets</label>
							<input type="text" v-model="caseData.teamTwoResource" />
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
const G50 = 245;

var caseData = reactive({
	numberOfOvers: 50,
	teamOneScore: 0,
	teamOneResource: 0,
	teamTwoResource: 0,
});
var answers = reactive(null);
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
