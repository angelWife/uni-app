<template>
	<view class="l-barrage">
		<block v-for="(item,index) in items" :key="index">
			<!-- #ifdef H5 -->
			<text v-if="item.display" class="aon" :style="{top: `${item.top}%`,color: item.color}">
				{{item.text}}
			</text>
			<!-- #endif -->

			<!-- #ifndef H5 -->
			<text v-if="item.display" class="aon" :style="{top: `${item.top}%`,color: item.color,
				  animation: `mymove ${Number(item.time)}s linear forwards`
				  }">
				{{item.text}}
			</text>
			<!-- #endif -->

		</block>
	</view>
</template>

<script>
	let cycle;

	// 弹幕字体颜色
	function getRandomColor() {
		let rgb = []
		for (let i = 0; i < 3; ++i) {
			let color = Math.floor(Math.random() * 256).toString(16)
			color = color.length == 1 ? '0' + color : color
			rgb.push(color)
		}
		return '#' + rgb.join('')
	}

	export default {
		name: 'l-barrage',
		props: {
			minTime: {
				type: Number,
				default: 10
			},
			maxTime: {
				type: Number,
				default: 15
			},
			minTop: {
				type: Number,
				default: 0
			},
			maxTop: {
				type: Number,
				default: 30
			}
		},
		data() {
			return {
				items: [],
			}
		},
		methods: {
			add(text = '', time = Math.ceil(Math.floor(Math.random() * (this.maxTime - this.minTime + 1) + this.minTime))) {
				this.items.push({
					text,
					time,
					top: Math.ceil(Math.random() * (this.maxTop - this.minTop + 1) + this.minTop),
					color: getRandomColor(),
					display: 1,
				});
			},
			start(items = []) {
				this.items = [];
				cycle && (clearInterval(cycle));
				let i = 0,
					len = items.length;

				cycle = setInterval(() => {
					let time = 5;
					// #ifndef H5
					time = Math.ceil(Math.floor(Math.random() * (this.maxTime - this.minTime + 1) + this.minTime));
					// #endif

					if (i < len) {
						this.add(items[i], time);
						i++;
					} else {
						clearInterval(cycle);
						setTimeout(() => {
							this.$emit("end", {});
						}, time * 400 * len)
					}
				}, 500)
			},
			over(){
				clearInterval(cycle);
			}
		}
	}
</script>

<style>
	.aon {
		position: fixed;
		white-space: nowrap;

		animation: mymove 5s linear forwards;
		animation-timing-function: linear;
		-webkit-animation-timing-function: linear;
		animation-fill-mode: forwards;
		background: rgba(0,0,0,0.5);
		padding: 8rpx 40rpx;
		border-radius: 60rpx;
		color: #fff !important;
	}

	.l-barrage {
		z-index: 3;
		width: 100%;
		position: fixed;
	}

	@keyframes mymove {
		from {
			left: 100%;
		}

		to {
			left: -200%;
		}
	}

	@-moz-keyframes mymove

	/* Firefox */
		{
		from {
			left: 100%;
		}

		to {
			left: -200%;
		}
	}

	@-webkit-keyframes mymove

	/* Safari and Chrome */
		{
		from {
			left: 100%;
		}

		to {
			left: -200%;
		}
	}

	@-o-keyframes mymove

	/* Opera */
		{
		from {
			left: 100%;
		}

		to {
			left: -200%;
		}
	}
</style>
