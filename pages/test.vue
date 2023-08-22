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
					<p>Match start at 50 overs</p>
					<input v-for="(item, index) in totalDelayTeamOne" :key="index" />
					<button v-if="teamOneDelay === true" @click="totalDelayTeamOne += 1">
						v
					</button>
					<p>Score: 212</p>
					<p>Wickets Fall: 3</p>
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
			</div>
		</section>
	</div>
</template>

<script setup>
var teamOneDelay = ref(false);
var teamTwoDelay = ref(false);

var totalDelayTeamOne = ref(0);
var totalDelayTeamTwo = ref(0);
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
