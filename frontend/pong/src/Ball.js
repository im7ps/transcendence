import { SphereGeometry,  MeshStandardMaterial, Mesh, EventDispatcher, Raycaster, Vector3 } from "../node_modules/three/src/Three.js"

const MAXSPEED = 15
const DEFSPEED = 15
const ACCEL = 1.15

export default class Ball extends EventDispatcher {

	speed = DEFSPEED
	velocity = new Vector3(-1, 0, 0.5)
	bounce = 'down'
	//bounced = 0

	constructor(scene, boundaries, paddles) {
		super()
		this.bounced = 0;
		this.scene = scene
		this.paddles = paddles
		this.boundaries = boundaries
		this.radius = 0.5

		this.geometry = new SphereGeometry(this.radius)
		this.material = new MeshStandardMaterial( {
			color : 0x808080,
			emissive : 0x808080,
			emissiveIntensity : 5
		})
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.castShadow = true
		this.mesh.receiveShadow = true
		this.raycaster = new Raycaster()

		this.velocity.multiplyScalar(this.speed)
		// this.scene.add(this.mesh)

		this.raycaster.near = 0
		this.raycaster.far = Math.sqrt(boundaries.y * boundaries.y + boundaries.x * boundaries.x)  
	}

	update(dt) {
		
		const dir = this.velocity.clone().normalize()
		this.raycaster.set(this.mesh.position, dir)

		const s = this.velocity.clone().multiplyScalar(dt)
		const tPos = this.mesh.position.clone().add(s)

		const dx = (this.boundaries.x - (this.radius - 0.1)) - Math.abs(this.mesh.position.x)
		const dz = (this.boundaries.y - (this.radius - 0.1)) - Math.abs(this.mesh.position.z)

		// wall bounce
		if (dx <= 0) {
			tPos.x = (this.boundaries.x - this.radius + dx) * Math.sign(this.velocity.x)
			if (Math.abs(this.velocity.x) > Math.abs(this.velocity.z))
				this.velocity.set(1 * Math.sign(this.velocity.x), 0, 1 * Math.sign(this.velocity.z)).normalize().multiplyScalar(this.speed)
			this.bounce = this.velocity.x > 0 ? 'up':'down'
			this.velocity.x = -this.velocity.x
			this.dispatchEvent({type: 'wallbounce', message: this.bounce})
			this.bounced++;
		}

		// Goal scored
		if (dz <= 0) {
			const mm = this.mesh.position.z < 0 ? 'player1':'player2'
			this.dispatchEvent({type: 'goal', message: mm})

			tPos.copy(new Vector3(0, 0, 0))
			this.velocity.z = -this.velocity.z
			this.speed = DEFSPEED
			this.velocity.normalize().multiplyScalar(this.speed)
		}
 
		const paddle = this.paddles.find((paddle) => {
			return Math.sign(this.velocity.z) === Math.sign(paddle.mesh.position.z)
		})

		const [intersection] = this.raycaster.intersectObjects(paddle.mesh.children)

		if (intersection && intersection.distance < s.length()) {
			this.bounced++
			paddle.material.emissiveIntensity = 10
			tPos.copy(intersection.point)
			const d = s.length() - intersection.distance

			const n = intersection.normal
			n.y = 0
			n.normalize()
			this.velocity.reflect(n)
			const sColl = this.velocity.clone().normalize().multiplyScalar(d)
			tPos.add(sColl)
			if (this.speed < MAXSPEED)
				this.speed *= ACCEL
			this.velocity.normalize().multiplyScalar(this.speed)
		}

		this.mesh.position.copy(tPos)
	}
}