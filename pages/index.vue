<template>
	<div class="main py-50">
		<h1>Cricket DLS <abbr>(Duckworth Lewis Stern)</abbr> method</h1>
		<section class="section-cases">
			<div class="cases">
				<div class="box">
					<div class="inputs">
						<input type="text" placeholder="team1 score" />
						<input type="text" placeholder="team1 score" />
						<input type="text" placeholder="team1 score" />
					</div>
					<button>submit</button>
				</div>
			</div>
		</section>
	</div>
</template>
<script setup></script>
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
				flex-wrap: wrap;
				input {
					flex-basis: 48%;
				}
			}
		}
	}
}
</style>
