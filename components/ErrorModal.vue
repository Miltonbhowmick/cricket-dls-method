<template>
	<div v-if="props.modalOpen" class="modal" ref="modal" @click="close($event)">
		<div class="modal-content" ref="modalContent">
			<a @click="close" class="close">x</a>
			<div class="info">
				<p class="error-text">{{ props.errorText }}</p>
				<button @click="close('guideline')" class="guideline-button">
					See guidelines
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modalOpen: null,
	errorText: null,
});
const emit = defineEmits();

const close = (event) => {
	if (
		event === "guideline" ||
		event.srcElement.className === "modal" ||
		event.srcElement.className === "close"
	) {
		emit("hideModal", event);
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
		padding: 25px 15px;
		width: 300px;
		min-height: 120px;
		background: white;
		border-radius: 4px;
		position: relative;
		.close {
			position: absolute;
			top: 10px;
			right: 20px;
			font-size: 25px;
			color: black;
			cursor: pointer;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			.error-text {
				font-size: 20px;
				font-weight: 600;
				text-align: start;
			}
			.guideline-button {
				border: 1px solid var(--primary-color);
				border-radius: 4px;
				padding: 8px 10px;
				cursor: pointer;
			}
		}
		@media (max-width: 769px) {
			width: 450px;
		}
		@media (max-width: 576px) {
			margin: 10px;
			width: 100%;
		}
	}
}
</style>
