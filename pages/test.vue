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
						<input id="overs" placeholder="Match start overs" />
					</div>

					<div v-for="(item, index) in totalDelayTeamOne" :key="index">
						<input placeholder="Cut and final over" />
					</div>
					<br />
					<button v-if="teamOneDelay === true" @click="totalDelayTeamOne += 1">
						v
					</button>
					<div>
						<label for="teamOneScore">Team 1 score</label>
						<input id="teamOneScore" placeholder="Team one score" />
					</div>
					<div>
						<label for="teamOneWickets">Team 1 wickets</label>
						<input id="teamOneWickets" placeholder="Team one wicket" />
					</div>
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
						<input id="overs" placeholder="Match start overs" />
					</div>
					<div class="content">
						<div v-for="(item, index) in totalDelayTeamTwo" :key="index">
							<input placeholder="Cut and final over" />
							<input id="teamTwoWickets" placeholder="Team two wicket" />
						</div>
						<br />
						<button
							v-if="teamTwoDelay === true"
							@click="totalDelayTeamTwo += 1"
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
var teamTwoDelay = ref(false);

var totalDelayTeamOne = ref(0);
var totalDelayTeamTwo = ref(0);

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
