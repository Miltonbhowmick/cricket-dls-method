<template>
	<div v-if="props.modalOpen" class="modal" ref="modal" @click="close($event)">
		<div class="modal-content" ref="modalContent">
			<a @click="close" class="close">x</a>
			<div class="header">
				<h2>How to use?</h2>
			</div>
			<div class="info">
				<h4>About team 2 boxes</h4>
				<ul>
					<li><strong>Team 1</strong> is the first batting team of match.</li>
					<li>
						First of all enter the <strong>Match starts at overs</strong> for
						team 1.
					</li>
					<li>
						<strong>Match starts at overs</strong> is an input field where you
						have to set total over for team 1 to play from starting of their
						batting.
					</li>
					<li>
						ODI match starts with 50 overs (if rain or any problem happens,
						overs might be less 50 overs). Another, T20 match starts with 20
						overs.
					</li>
					<li>
						If there is any delay during <strong>team 1 batting</strong>, select
						the <strong>delay checkbox</strong> of team 1.
					</li>
				</ul>
				<hr />
				<h4>About team 2 boxes</h4>
				<ul>
					<li><strong>Team 2</strong> is the second batting team of match.</li>
					<li>
						First of all <strong>must </strong>enter the
						<strong>Match starts at overs</strong> for team 2.
					</li>
					<li>
						<strong>Match starts at overs</strong> is an input field where you
						have to set total over for team 2 to play from starting of their
						batting.
					</li>
					<li>
						ODI match starts with 50 overs (if rain or any problem happens,
						overs might be less 50 overs). Another, T20 match starts with 20
						overs.
					</li>
					<li>
						If there is any delay during <strong>team 2 batting</strong>, select
						the <strong>delay checkbox</strong> of team 2.
					</li>
				</ul>
				<hr />
				<h4>About delay input boxes read below</h4>
				<ul>
					<li>There are <strong>3 input boxes</strong>.</li>
					<li>
						1st input box is the over(10, 10.2, 10.3)
						<strong>when rain or any problem happend</strong>.
					</li>
					<li>
						2nd input box is the final over like 50 over match could be 43 over
						<strong> (depends the time lost by rain)</strong>.
					</li>
					<li>
						3rd input box is number of wickets fall
						<strong>when the rain or any delayed problem starts</strong>.
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modalOpen: null,
});
const emit = defineEmits();

const close = (event) => {
	if (
		event.srcElement.className === "modal" ||
		event.srcElement.className === "close"
	) {
		emit("hideModal");
	}
};
</script>

<style scoped lang="scss">
.modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	.modal-content {
		padding: 15px;
		width: 600px;
		max-height: 600px;
		background: white;
		border-radius: 4px;
		position: relative;
		overflow-y: auto;
		.close {
			position: absolute;
			top: 10px;
			right: 20px;
			font-size: 25px;
			color: black;
			cursor: pointer;
		}
		.info {
			ul {
				display: flex;
				flex-direction: column;
				gap: 10px;
				margin-left: 15px;
				li {
					list-style-type: square;
					font-size: 14px;
					font-weight: 400;
				}
			}
		}
		@media (max-width: 769px) {
			width: 450px;
			height: 500px;
		}
		@media (max-width: 576px) {
			margin: 10px;
			width: 100%;
			height: 400px;
		}
	}
}
</style>
