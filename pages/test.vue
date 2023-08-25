<template>
	<div class="main py-50">
		<h1>Cricket DLS <abbr>(Duckworth Lewis Stern)</abbr> method</h1>
		<section class="section-cases">
			<div class="team">
				<div class="header">
					<h6>team 1</h6>
					<input
						id="team1Delay"
						type="checkbox"
						value="0"
						v-model="teamOneDelay"
					/>
					<label for="team1Delay">delay</label>
				</div>
				<div class="content">
					<div>
						<label for="overs">Match start at overs</label>
						<input
							id="overs"
							placeholder="Match start overs"
							v-model="teamOneStartOver"
							:disabled="teamOneDelay"
						/>
					</div>
					<div>
						<label for="teamOneScore">Team 1 score</label>
						<input
							id="teamOneScore"
							placeholder="Team one score"
							v-model="teamOneScore"
						/>
					</div>

					<div v-for="(item, index) in teamOneDelayList" :key="index">
						<input
							placeholder="Complete over"
							v-model="teamOneDelayList[index].over"
							:disabled="index !== teamOneDelayList.length - 1"
						/>
						<input
							placeholder="Cut and final over"
							v-model="teamOneDelayList[index].finalOverKey"
							:disabled="index !== teamOneDelayList.length - 1"
						/>
						<input
							id="teamOneWickets"
							placeholder="Team one wicket"
							v-model="teamOneDelayList[index].wicketsFallKey"
							:disabled="index !== teamOneDelayList.length - 1"
						/>
					</div>
					<br />
					<button
						v-if="teamOneDelay === true"
						@click="increaseDelay((team = 1))"
					>
						v
					</button>
					<!-- <div>
						<label for="teamOneWickets">Team 1 wickets</label>
						<input id="teamOneWickets" placeholder="Team one wicket" />
					</div> -->
					<div>
						<label for="teamOneResource">Team 1 resource</label>
						<input
							id="teamOneResource"
							placeholder="Team one resource, R1"
							disabled
							v-model="teamOneFinalResource"
						/>
						<a @click="updateTeamOneResource">U</a>
					</div>
				</div>
			</div>
			<div class="team">
				<div class="header">
					<h6>
						team 2 <strong v-if="revisedScore">{{ revisedScore }}</strong>
						<button @click="calculateRevisedScore">R</button>
					</h6>
					<input
						id="team2Delay"
						type="checkbox"
						value="1"
						v-model="teamTwoDelay"
					/>
					<label for="team2Delay">delay</label>
				</div>
				<div class="content">
					<div>
						<label for="overs">Match start at overs</label>
						<input
							id="overs"
							placeholder="Match start overs"
							v-model="teamTwoStartOver"
						/>
					</div>
					<div class="content">
						<div v-for="(item, index) in teamTwoDelayList" :key="index">
							<input
								placeholder="Complete over"
								v-model="teamTwoDelayList[index].over"
								:disabled="index !== teamTwoDelayList.length - 1"
							/>
							<input
								placeholder="Cut and final over"
								v-model="teamTwoDelayList[index].finalOverKey"
								:disabled="index !== teamTwoDelayList.length - 1"
							/>
							<input
								id="teamOneWickets"
								placeholder="Team one wicket"
								v-model="teamTwoDelayList[index].wicketsFallKey"
								:disabled="index !== teamTwoDelayList.length - 1"
							/>
						</div>
						<br />
						<button
							v-if="teamTwoDelay === true"
							@click="increaseDelay((team = 2))"
						>
							v
						</button>
						<div>
							<label for="teamOneResource">Team 1 resource</label>
							<input
								id="teamOneResource"
								placeholder="Team one resource, R1"
								disabled
								v-model="teamTwoFinalResource"
							/>
							<a @click="updateTeamTwoResource">U</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import adjustedTable from "../utils/adjustedTable.json";
import { overLeft, isMidOver, getAdjustedTableType } from "../utils/utils";
const G50 = 245;

var teamOneDelay = ref(false);
// var totalDelayTeamOne = ref(0);
var teamOneDelayList = ref([]);
var teamOneScore = ref(0);
var teamOneStartOver = ref(50);
var teamOneFinalResource = ref(100);

var teamTwoDelay = ref(false);
// var totalDelayTeamTwo = ref(0);
var teamTwoDelayList = ref([]);
var teamTwoScore = ref(0);
var teamTwoStartOver = ref(0);
var teamTwoFinalResource = ref(100);

var revisedScore = ref(0);

const increaseDelay = (team) => {
	if (team === 1) {
		let delayObj = {
			over: 0,
			finalOverKey: 0,
			wicketsFallKey: 0,
		};
		teamOneDelayList.value.push(delayObj);
	} else if (team === 2) {
		let delayObj = {
			over: 0,
			finalOverKey: 0,
			wicketsFallKey: 0,
		};
		teamTwoDelayList.value.push(delayObj);
	}
};

const calculateRevisedScore = () => {
	// If R2 is less than R1
	if (teamTwoFinalResource.value < teamOneFinalResource.value) {
		var division =
			Number(teamTwoFinalResource.value) / Number(teamOneFinalResource.value);
		var T = Number(teamOneScore.value) * division + 1;
		revisedScore.value = T;
	}
	// If R2 is equal to R1,  no revision is needed
	if (teamTwoFinalResource.value === teamOneFinalResource.value) {
		var T = Number(teamOneScore.value) + 1;
		revisedScore.value = T;
	}
	// If R2 is greater than R1
	if (teamTwoFinalResource.value > teamOneFinalResource.value) {
		var diff =
			Number(teamTwoFinalResource.value) - Number(teamOneFinalResource.value);
		var modDiff = (G50 * diff) / 100;
		var T = Number(teamOneScore.value) + modDiff + 1;
		revisedScore.value = T;
	}
};

const updateTeamOneResource = () => {
	if (teamOneDelay.value) {
		var ln = teamOneDelayList.value.length;

		var table =
			adjustedTable[
				getAdjustedTableType(
					teamOneStartOver.value - teamOneDelayList.value[ln - 1].over
				)
			];
		var percentageObj = table.find(
			(el) =>
				el.overs ===
				overLeft(teamOneStartOver.value, teamOneDelayList.value[ln - 1].over)
		);
		var suspensionResource =
			percentageObj[String(teamOneDelayList.value[ln - 1].wicketsFallKey)];

		table =
			adjustedTable[
				getAdjustedTableType(
					teamOneDelayList.value[ln - 1].finalOverKey -
						teamOneDelayList.value[ln - 1].over
				)
			];
		percentageObj = table.find(
			(el) =>
				el.overs ===
				overLeft(
					teamOneDelayList.value[ln - 1].finalOverKey,
					teamOneDelayList.value[ln - 1].over
				)
		);
		var resumptionResource =
			percentageObj[teamOneDelayList.value[ln - 1].wicketsFallKey];

		var diff = suspensionResource - resumptionResource;
		console.log(
			"match start over equal,",
			diff,
			teamOneDelayList.value[ln - 1].finalOverKey,
			teamOneStartOver.value,
			teamOneDelayList.value[ln - 1].finalOverKey === teamOneStartOver.value,
			teamOneDelayList.value[ln - 1].finalOverKey == teamOneStartOver.value
		);
		if (
			Number(teamOneDelayList.value[ln - 1].finalOverKey) ===
			Number(teamOneStartOver.value)
		) {
			console.log("match start over equal to final cut over delay");
			diff = suspensionResource;
		}
		teamOneFinalResource.value = teamOneFinalResource.value - diff;
	}
};
const updateTeamTwoResource = () => {
	if (teamTwoDelay.value) {
		var ln = teamTwoDelayList.value.length;

		var table =
			adjustedTable[
				getAdjustedTableType(
					teamTwoStartOver.value - teamTwoDelayList.value[ln - 1].over
				)
			];
		var percentageObj = table.find(
			(el) =>
				el.overs ===
				teamTwoStartOver.value - teamTwoDelayList.value[ln - 1].over
		);
		var suspensionResource =
			percentageObj[String(teamTwoDelayList.value[ln - 1].wicketsFallKey)];
		var table =
			adjustedTable[
				getAdjustedTableType(
					teamTwoDelayList.value[ln - 1].finalOverKey -
						teamTwoDelayList.value[ln - 1].over
				)
			];
		var percentageObj = table.find(
			(el) =>
				el.overs ===
				teamTwoDelayList.value[ln - 1].finalOverKey -
					teamTwoDelayList.value[ln - 1].over
		);
		var resumptionResource =
			percentageObj[teamTwoDelayList.value[ln - 1].wicketsFallKey];

		var diff = suspensionResource - resumptionResource;
		teamTwoFinalResource.value = teamTwoFinalResource.value - diff;

		calculateRevisedScore();
	}
};

watch(
	() => teamOneDelay.value,
	(newVal, oldVal) => {
		if (newVal === false) {
			teamOneDelayList.value = [];
		}
	}
);
watch(
	() => teamTwoDelay.value,
	(newVal, oldVal) => {
		if (newVal === false) {
			teamTwoDelayList.value = [];
		}
	}
);

watch(
	() => teamOneDelayList.value,
	(newVal, oldVal) => {},
	{ deep: true }
);

watch(
	() => teamOneStartOver.value,
	(newVal, oldVal) => {
		// Get ICC adjusted table data
		var table = adjustedTable[getAdjustedTableType(teamOneStartOver.value)];
		var percentageObj = table.find(
			(el) => el.overs === Number(teamOneStartOver.value)
		);
		teamOneFinalResource.value = percentageObj["0"];
	}
);
watch(
	() => teamTwoStartOver.value,
	(newVal, oldVal) => {
		// Get ICC adjusted table data
		var table = adjustedTable[getAdjustedTableType(teamTwoStartOver.value)];
		var percentageObj = table.find(
			(el) => el.overs === Number(teamTwoStartOver.value)
		);
		teamTwoFinalResource.value = percentageObj["0"];
	}
);
onMounted(() => {
	// overLeft(47.1, 50);
});
</script>

<style scoped lang="scss">
.main {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.section-cases {
		.team {
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
}
</style>
