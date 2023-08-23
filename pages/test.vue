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
							placeholder="Cut and final over"
							v-model="teamOneDelayList[index]"
						/>
						<input id="teamOneWickets" placeholder="Team one wicket" />
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
						/>
					</div>
				</div>
			</div>
			<div class="team">
				<div class="header">
					<h6>team 2</h6>
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
							<input placeholder="Cut and final over" />
							<input id="teamTwoWickets" placeholder="Team two wicket" />
						</div>
						<br />
						<button
							v-if="teamTwoDelay === true"
							@click="increaseDelay((team = 2))"
						>
							v
						</button>
						<div>
							<label for="teamTwoResource">Team 2 resource</label>
							<input
								id="teamTwoResource"
								placeholder="Team two resource, R2"
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
var teamOneDelay = ref(false);
// var totalDelayTeamOne = ref(0);
var teamOneDelayList = ref([]);
var teamOneScore = ref(0);
var teamOneStartOver = ref(0);

var teamTwoDelay = ref(false);
// var totalDelayTeamTwo = ref(0);
var teamTwoDelayList = ref([]);
var teamTwoScore = ref(0);
var teamTwoStartOver = ref(0);

const increaseDelay = (team) => {
	if (team === 1) {
		let delayObj = {
			finalOverKey: 0,
			wicketsFallKey: 0,
		};
		teamOneDelayList.value.push(delayObj);
	} else if (team === 2) {
		let delayObj = {
			finalOverKey: 0,
			wicketsFallKey: 0,
		};
		teamTwoDelayList.value.push(delayObj);
	}
};

watch(
	() => teamOneDelay.value,
	(newVal, oldVal) => {}
);
watch(
	() => teamTwoDelay.value,
	(newVal, oldVal) => {}
);
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
