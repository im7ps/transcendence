export default class AiController {

	lookForward = 25

	constructor(scene, paddle, ball) {
		this.paddle = paddle
		this.ball = ball
		this.scene = scene
		this.target = this.ball.mesh.position.clone()
		this.paddle.cpu = true
		this.paddle.setIsAi()
	}

	setTarget() {
		if (this.ball.velocity.z > 0)
			this.target.set(0, 0, 0)
		else {
			let ballDir = this.ball.velocity
			this.target = this.ball.mesh.position.clone()
			for (let i = 0; i < this.lookForward; i++) {
				if (Math.abs(this.target.x) > this.paddle.boundaries.x)
					ballDir.x = -ballDir.x
				this.target.add(ballDir)
				if (this.target.z < this.paddle.boundaries.y)
					break
			}
		}
	}

	update(dt) {
		if (this.paddle.mesh.position.x < this.target.x - 0.25)
			this.paddle.velocity.x = 1
		else if (this.paddle.mesh.position.x > this.target.x + 0.25)
			this.paddle.velocity.x = -1
		else
			this.paddle.velocity.x = 0
		const tPos = this.paddle.move(dt)

		this.paddle.setX(tPos.x)
	}
}