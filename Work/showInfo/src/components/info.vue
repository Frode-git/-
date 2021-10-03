<template>
	<div class="info">
		<form action="?">
			<ul>
				<li>用户信息</li>
				<li>
					<span>姓名：</span>
					<input
						type="text"
						class="name"
						name="userId"
						maxlength="25"
					/>
				</li>
				<li>
					<span>性别：</span>
					<div class="sex">
						<label for="sexMan" style="margin-right: 5px">男</label
						><input
							type="radio"
							name="sex"
							id="sexMan"
							maxlength="1"
							style="vertical-align: middle; margin-right: 10px"
						/><label for="sexWom" style="margin-right: 5px"
							>女</label
						><input
							type="radio"
							name="sex"
							id="sexWom"
							maxlength="1"
							style="vertical-align: middle"
						/>
					</div>
				</li>
				<li>
					<span>学号：</span>
					<input
						type="text"
						class="num"
						name="userNum"
						maxlength="25"
					/>
				</li>
				<li>
					<input type="submit" class="submit" value="保存" />
				</li>
			</ul>
		</form>
	</div>
</template>

<script>
	export default {
		name: "info",
	};
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.info {
		position: relative;
		margin: 150px auto 0;
		width: 400px;
		height: 400px;
		overflow: hidden;
		box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
	}

	.info ul li {
		position: relative;
		list-style: none;
		margin: 5px 0;
		padding: 20px;
		width: 100%;
		height: 50px;
		font-size: 14px;
		line-height: 14px;
	}

	.info ul li span:nth-child(1) {
		position: absolute;
		top: 15px;
		left: 90px;
		cursor: default;
	}

	.info ul li .name,
	.info ul li .num {
		position: absolute;
		left: 130px;
		top: 12px;
		padding-left: 5px;
		width: 200px;
		height: 20px;
		font-size: 14px;
		border: 0;
		background: none;
		border-bottom: 1px solid #ccc;
		outline: none;
		border-radius: 3px;
	}

	.info ul li .sex {
		position: absolute;
		left: 130px;
		top: 14px;
		padding-left: 5px;
		width: 200px;
		height: 20px;
	}

	.info ul li:nth-child(1) {
		margin-bottom: 25px;
		text-align: center;
		color: #fff;
		font-weight: 700;
		letter-spacing: 15px;
		font-size: 24px;
	}

	.info ul li .submit {
		position: absolute;
		bottom: -45px;
		left: 145px;
		width: 100px;
		height: 50px;
		border-radius: 5px;
		background-image: linear-gradient(
			110.5deg,
			rgba(248, 196, 249, 0.66) 22.8%,
			rgba(253, 122, 4, 0.15) 64.6%
		);
	}
</style>
