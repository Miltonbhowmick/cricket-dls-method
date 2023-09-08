<template>
	<div class="main">
		<h1 class="title">
			Cricket DLS <abbr>(Duckworth Lewis Stern)</abbr> method
		</h1>
		<p class="developer-signature">
			Design & Develop by
			<a href="https://github.com/Miltonbhowmick" target="_blank"
				>miltonbhowmick</a
			>
		</p>
		<button @click="openGuidelineModal" class="guideline-button">
			See guidelines
		</button>
		<section class="section-cases">
			<div class="match-type">
				<div class="type-box">
					<input
						id="fiftyOver"
						type="radio"
						:value="50"
						v-model="matchType"
					/><label for="fiftyOver">50 Over</label>
				</div>
				<div class="type-box">
					<input
						id="twentyTwenty"
						type="radio"
						:value="20"
						v-model="matchType"
					/><label for="twentyTwenty">T20 </label>
				</div>
			</div>
			<div class="match">
				<div class="team">
					<div class="header">
						<h2 class="team-no">Team 1</h2>
						<div class="delay-checkbox">
							<input
								id="team1Delay"
								type="checkbox"
								value="0"
								v-model="teamOneDelay"
							/>
							<label for="team1Delay">Any delay occured</label>
						</div>
					</div>
					<div class="content">
						<div class="input-group">
							<label for="overs" class="label">Match starts at overs</label>
							<input
								type="number"
								id="overs"
								placeholder="Match starts overs"
								v-model="teamOneStartOver"
								:disabled="teamOneDelay"
							/>
							<div class="emoticons">
								<span v-if="matchType === 0 && teamOneStartOver !== 50">
									&#129300;
								</span>
								<span v-else-if="matchType === 0 && teamOneStartOver > 50">
									&#128563;
								</span>
								<span v-else-if="matchType === 1 && teamOneStartOver !== 20">
									&#129300;
								</span>
								<span v-else-if="matchType === 1 && teamOneStartOver > 20">
									&#128563;
								</span>
							</div>
						</div>
						<div class="input-group">
							<label for="teamOneScore">Team 1 score</label>
							<input
								type="number"
								id="teamOneScore"
								placeholder="Team one score"
								v-model="teamOneScore"
							/>
						</div>

						<div class="multiple-input-group">
							<div v-if="teamOneDelayList.length > 0" class="delayed-labels">
								<span>Complete over</span>
								<span>New final over</span>
								<span>Wicket lost</span>
							</div>
							<div
								v-for="(item, index) in teamOneDelayList"
								:key="index"
								class="delayed-inputs"
							>
								<input
									type="number"
									placeholder="Complete over"
									v-model="teamOneDelayList[index].over"
									:disabled="item.appliedResource"
								/>
								<input
									type="number"
									placeholder="Cut and final over"
									v-model="teamOneDelayList[index].finalOverKey"
									:disabled="item.appliedResource"
								/>
								<input
									type="number"
									id="teamOneWickets"
									placeholder="Team one wicket"
									min="9"
									v-model="teamOneDelayList[index].wicketsFallKey"
									:disabled="item.appliedResource"
								/>
							</div>
						</div>
						<button
							v-if="teamOneDelay === true"
							@click="increaseDelay((team = 1))"
							class="mt-30 add-delay-button"
						>
							Add new delay
						</button>
						<!-- <div>
							<label for="teamOneWickets">Team 1 wickets</label>
							<input id="teamOneWickets" placeholder="Team one wicket" />
						</div> -->
						<div class="resource-box inline-input-group mt-10">
							<label for="teamOneResource">Team 1 resource</label>
							<input
								id="teamOneResource"
								placeholder="Team one resource, R1"
								disabled
								v-model="teamOneFinalResource"
							/>
							<button
								@click="updateTeamOneResource"
								class="resource-update"
								:class="{ active: isTeamOneUpdatedResource === true }"
							>
								Update
							</button>
						</div>
					</div>
				</div>
				<div class="team">
					<div class="header">
						<h2 class="team-no">Team 2</h2>
						<div class="delay-checkbox">
							<input
								id="team2Delay"
								type="checkbox"
								value="1"
								v-model="teamTwoDelay"
							/>
							<label for="team2Delay">Any delay occured</label>
						</div>
					</div>
					<div class="content">
						<div class="input-group">
							<label for="overs">Match starts at overs</label>
							<input
								type="number"
								id="overs"
								placeholder="Match starts overs"
								v-model="teamTwoStartOver"
								:disabled="teamTwoDelay"
							/>
						</div>
						<div class="input-group">
							<label class="label">Calculate revised target</label>
							<div class="revised-score-box">
								<button @click="calculateRevisedScore" class="revised-button">
									Generate
								</button>
								<span v-if="revisedScore" class="revised-score"
									>Target: {{ revisedScore }}</span
								>
							</div>
						</div>
						<div class="multiple-input-group">
							<div v-if="teamTwoDelayList.length > 0" class="delayed-labels">
								<span>Complete over</span>
								<span>New final over</span>
								<span>Wicket lost</span>
							</div>
							<div
								v-for="(item, index) in teamTwoDelayList"
								:key="index"
								class="delayed-inputs"
							>
								<input
									type="number"
									placeholder="Complete over"
									v-model="teamTwoDelayList[index].over"
									:disabled="item.appliedResource"
								/>
								<input
									type="number"
									placeholder="Cut and final over"
									v-model="teamTwoDelayList[index].finalOverKey"
									:disabled="item.appliedResource"
								/>
								<input
									type="number"
									id="teamOneWickets"
									placeholder="Team one wicket"
									min="9"
									v-model="teamTwoDelayList[index].wicketsFallKey"
									:disabled="item.appliedResource"
								/>
							</div>
						</div>
						<button
							v-if="teamTwoDelay === true"
							@click="increaseDelay((team = 2))"
							class="mt-30 add-delay-button"
						>
							Add new delay
						</button>
						<div class="resource-box inline-input-group mt-10">
							<label for="teamTwoResource">Team 2 resource</label>
							<input
								id="teamTwoResource"
								placeholder="Team Two resource, R1"
								disabled
								v-model="teamTwoFinalResource"
							/>
							<button
								@click="updateTeamTwoResource"
								class="resource-update"
								:class="{ active: isTeamTwoUpdatedResource === true }"
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<ErrorModal
			:modalOpen="showErrorModal"
			:errorText="helpText"
			@hideModal="hideErrorModal"
		/>
		<GuidelineModal
			:modalOpen="showGuidelineModal"
			@hideModal="hideGuidelineModal"
		/>
	</div>
</template>

<script setup>
import adjustedTable from "../utils/adjustedTable.json";
import { overLeft, isMidOver, getAdjustedTableType } from "../utils/utils";

const G50 = 245;

var helpText = ref("");
var matchType = ref(50);

var teamOneDelay = ref(false);
// var totalDelayTeamOne = ref(0);
var teamOneDelayList = ref([]);
var teamOneScore = ref(0);
var teamOneStartOver = ref(50);
var teamOneFinalResource = ref(100);
var isTeamOneUpdatedResource = ref(false);

var teamTwoDelay = ref(false);
// var totalDelayTeamTwo = ref(0);
var teamTwoDelayList = ref([]);
var teamTwoScore = ref(0);
var teamTwoStartOver = ref(0);
var teamTwoFinalResource = ref(100);
var isTeamTwoUpdatedResource = ref(false);

var revisedScore = ref(0);

var showErrorModal = ref(false);

var showGuidelineModal = ref(false);

const openGuidelineModal = () => {
	showGuidelineModal.value = true;
};
const hideGuidelineModal = () => {
	showGuidelineModal.value = false;
};

const hideErrorModal = (hideType) => {
	showErrorModal.value = false;
	if (hideType === "guideline") {
		openGuidelineModal();
	}
};
const openErrorModal = (text = null) => {
	if (text) {
		helpText.value = text;
	}
	showErrorModal.value = true;
};

const increaseDelay = (team) => {
	var delayObj = {
		over: 0,
		finalOverKey: 0,
		wicketsFallKey: 0,
		appliedResource: false,
	};
	if (team === 1) {
		var ln = teamOneDelayList.value.length;
		if (ln > 0 && teamOneDelayList.value[ln - 1].appliedResource === false) {
			openErrorModal("TEAM 1: Please update the current delay fields first!");
			return;
		}
		teamOneDelayList.value.push(delayObj);
		isTeamOneUpdatedResource.value = true;
	} else if (team === 2) {
		var ln = teamTwoDelayList.value.length;
		if (ln > 0 && teamTwoDelayList.value[ln - 1].appliedResource === false) {
			openErrorModal("TEAM 2: Please update the current delay fields first!");
			return;
		}
		teamTwoDelayList.value.push(delayObj);
		isTeamTwoUpdatedResource.value = true;
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

		if (
			teamOneDelayList.value[ln - 1].over === 0 &&
			teamOneDelayList.value[ln - 1].finalOverKey === 0 &&
			teamOneDelayList.value[ln - 1].wicketsFallKey === 0
		) {
			openErrorModal("TEAM 1: Please set delay inputs");
			return;
		}
		if (
			teamOneDelayList.value[ln - 1].over >= teamOneStartOver.value ||
			teamOneDelayList.value[ln - 1].finalOverKey > teamOneStartOver.value
		) {
			openErrorModal(
				"TEAM 1: Please set delay over under the match start over"
			);
			return;
		}
		if (
			teamOneDelayList.value[ln - 1].over >=
			teamOneDelayList.value[ln - 1].finalOverKey
		) {
			openErrorModal(
				"TEAM 1: complete over must be less than final over after disturbance(rain etc)"
			);
			return;
		}
		if (teamOneDelayList.value[ln - 1].appliedResource === true) {
			openErrorModal("TEAM 1: Last delay is already updated");
			return;
		}

		var appropriateOver = teamOneStartOver.value;
		if (teamOneDelayList.value.length > 1) {
			appropriateOver = teamOneDelayList.value[ln - 2].finalOverKey;
		}

		if (
			appropriateOver < teamOneDelayList.value[ln - 1].finalOverKey ||
			appropriateOver < teamOneDelayList.value[ln - 1].over
		) {
			openErrorModal(
				"TEAM 1: New delay final over must be under last delay final over"
			);
			return;
		}
		if (
			ln > 1 &&
			teamOneDelayList.value[ln - 1].wicketsFallKey <
				teamOneDelayList.value[ln - 2].wicketsFallKey
		) {
			openErrorModal(
				"TEAM 1: New delay wicket fall can not be less than the last delayed wicket fall"
			);
			return;
		}

		// Team 1 suspension percentage
		var table =
			adjustedTable[
				getAdjustedTableType(
					overLeft(appropriateOver, teamOneDelayList.value[ln - 1].over)
				)
			];
		var percentageObj = table.find(
			(el) =>
				el.overs ===
				overLeft(appropriateOver, teamOneDelayList.value[ln - 1].over)
		);
		var suspensionResource =
			percentageObj[String(teamOneDelayList.value[ln - 1].wicketsFallKey)];
		// Team 1 resumption percentage
		var resumptionResource = 0;
		if (appropriateOver !== teamOneDelayList.value[ln - 1].finalOverKey) {
			table =
				adjustedTable[
					getAdjustedTableType(
						overLeft(
							teamOneDelayList.value[ln - 1].finalOverKey,
							teamOneDelayList.value[ln - 1].over
						)
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
			resumptionResource =
				percentageObj[teamOneDelayList.value[ln - 1].wicketsFallKey];
		}
		var diff = suspensionResource - resumptionResource;

		teamOneFinalResource.value = teamOneFinalResource.value - diff;
		isTeamOneUpdatedResource.value = false;
		teamOneDelayList.value[ln - 1].appliedResource = true;
	}
};
const updateTeamTwoResource = () => {
	if (teamTwoDelay.value) {
		var ln = teamTwoDelayList.value.length;

		if (
			teamTwoDelayList.value[ln - 1].over === 0 &&
			teamTwoDelayList.value[ln - 1].finalOverKey === 0 &&
			teamTwoDelayList.value[ln - 1].wicketsFallKey === 0
		) {
			openErrorModal("TEAM 2: Please set delay inputs");
			return;
		}
		if (
			teamTwoDelayList.value[ln - 1].over >= teamTwoStartOver.value ||
			teamTwoDelayList.value[ln - 1].finalOverKey > teamTwoStartOver.value
		) {
			openErrorModal(
				"TEAM 2: Please set delay over under the match start over"
			);
			return;
		}

		if (
			teamTwoDelayList.value[ln - 1].over >=
			teamTwoDelayList.value[ln - 1].finalOverKey
		) {
			openErrorModal(
				"TEAM 2: complete over must be less than final over after disturbance(rain etc)"
			);
			return;
		}
		if (teamTwoDelayList.value[ln - 1].appliedResource === true) {
			openErrorModal("TEAM 2: Last delay is already updated");
			return;
		}

		var appropriateOver = teamTwoStartOver.value;
		if (teamTwoDelayList.value.length > 1) {
			appropriateOver = teamTwoDelayList.value[ln - 2].finalOverKey;
		}

		if (
			appropriateOver < teamTwoDelayList.value[ln - 1].finalOverKey ||
			appropriateOver < teamTwoDelayList.value[ln - 1].over
		) {
			openErrorModal(
				"TEAM 2:  New delay final over must be under last delay final over"
			);
			return;
		}
		if (
			ln > 1 &&
			teamTwoDelayList.value[ln - 1].wicketsFallKey <
				teamTwoDelayList.value[ln - 2].wicketsFallKey
		) {
			openErrorModal(
				"TEAM 2: New delay wicket fall can not be less than the last delayed wicket fall"
			);
			return;
		}

		// Team 2 suspension percentage
		var table =
			adjustedTable[
				getAdjustedTableType(
					overLeft(appropriateOver, teamTwoDelayList.value[ln - 1].over)
				)
			];
		var percentageObj = table.find(
			(el) =>
				el.overs ===
				overLeft(appropriateOver, teamTwoDelayList.value[ln - 1].over)
		);

		var suspensionResource =
			percentageObj[String(teamTwoDelayList.value[ln - 1].wicketsFallKey)];

		// Team 2 resumption percentage
		var resumptionResource = 0;
		if (appropriateOver !== teamTwoDelayList.value[ln - 1].finalOverKey) {
			table =
				adjustedTable[
					getAdjustedTableType(
						overLeft(
							teamTwoDelayList.value[ln - 1].finalOverKey,
							teamTwoDelayList.value[ln - 1].over
						)
					)
				];
			percentageObj = table.find(
				(el) =>
					el.overs ===
					overLeft(
						teamTwoDelayList.value[ln - 1].finalOverKey,
						teamTwoDelayList.value[ln - 1].over
					)
			);
			resumptionResource =
				percentageObj[teamTwoDelayList.value[ln - 1].wicketsFallKey];
		}
		var diff = suspensionResource - resumptionResource;

		teamTwoFinalResource.value = teamTwoFinalResource.value - diff;
		isTeamTwoUpdatedResource.value = false;
		teamTwoDelayList.value[ln - 1].appliedResource = true;

		calculateRevisedScore();
	}
};

watch(
	() => teamOneDelay.value,
	(newVal, oldVal) => {
		if (newVal === false) {
			teamOneDelayList.value = [];
			teamOneFinalResource.value = 100;
			teamOneStartOver.value = matchType.value;
			isTeamOneUpdatedResource.value = false;
		} else {
			isTeamOneUpdatedResource.value = true;
		}
	}
);
watch(
	() => teamTwoDelay.value,
	(newVal, oldVal) => {
		if (newVal === false) {
			teamTwoDelayList.value = [];
			teamTwoFinalResource.value = 100;
			teamTwoStartOver.value = matchType.value;
			isTeamTwoUpdatedResource.value = false;
		} else {
			isTeamTwoUpdatedResource.value = true;
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
watch(
	() => matchType.value,
	(newVal, oldVal) => {
		teamOneStartOver.value = newVal;
	}
);
onMounted(() => {
	// overLeft(47.1, 50);
});
</script>

<style scoped lang="scss">
.main {
	padding: 50px 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.title {
		margin: 0;
		font-size: 36px;
		font-weight: 600;
		@media (max-width: 769px) {
			text-align: center;
		}
		@media (max-width: 576px) {
			font-size: 24px;
			font-weight: 500;
		}
	}
	.developer-signature {
	}
	.guideline-button {
		margin-bottom: 30px;
		padding: 8px 15px;
		border: 1px solid var(--primary-color);
		border-radius: 4px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		&:hover {
			background: var(--pink-ball-color);
			color: #fff;
		}
	}
	.section-cases {
		width: 60%;
		.match-type {
			display: flex;
			justify-content: center;
			gap: 15px;
		}
		.match {
			display: flex;
			justify-content: space-between;
			gap: 50px;
			.team {
				width: 100%;
				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.team-no {
						font-size: 16px;
						font-weight: 400;
					}
				}
				.content {
					display: flex;
					flex-direction: column;
					gap: 10px;
					.input-group {
						display: flex;
						flex-direction: column;
						gap: 3px;
						.label {
							font-size: 16px;
							font-weight: 400;
						}
						input {
							width: 100%;
							padding: 8px;
							border: 1px solid var(--primary-color);
							border-radius: 4px;
							box-sizing: border-box;
						}
						.revised-score-box {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							gap: 5px;
							.revised-button {
								border: 1px solid var(--primary-color);
								border-radius: 4px;
								padding: 8px 10px;
								cursor: pointer;
							}
							.revised-score {
								font-size: 14px;
							}
						}
					}
					.multiple-input-group {
						display: flex;
						flex-direction: column;
						gap: 5px;
						.delayed-labels {
							display: flex;
							justify-content: space-between;
							gap: 4px;
							span {
								width: 100%;
								font-size: 12px;
								text-align: center;
							}
						}
						.delayed-inputs {
							display: flex;
							justify-content: space-between;
							gap: 4px;
							input {
								width: 100%;
								padding: 2px;
								text-align: center;
								border: 1px solid var(--primary-color);
								border-radius: 4px;
							}
							&.active {
								background: #222;
								color: #fff;
							}
						}
					}

					.inline-input-group {
						display: flex;
						justify-content: space-between;
						gap: 3px;
					}
					.add-delay-button {
						padding: 2px 0;
						border: 1px solid var(--primary-color);
						border-radius: 4px;
						cursor: pointer;
					}
					.resource-box {
						.resource-update {
							cursor: pointer;
							border: 1px solid var(--primary-color);
							border-radius: 4px;
							&.active {
								border-color: var(--pink-ball-color);
								box-shadow: 0px 0px 8px var(--pink-ball-color);
							}
						}
					}
				}
			}
			@media (max-width: 769px) {
				flex-direction: column;
				align-items: center;
				gap: 20px;
			}
		}
		@media (max-width: 769px) {
			width: 100%;
		}
	}
	@media (max-width: 769px) {
		padding: 15px;
	}
}
</style>
