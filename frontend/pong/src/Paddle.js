import { CapsuleGeometry,  MeshStandardMaterial, MeshNormalMaterial, Mesh, Vector3, MathUtils } from "../node_modules/three/src/Three.js"

const MATERIAL = new MeshStandardMaterial( {
	color : 0x808080,
	emissive : 0xffffff,
	emissiveIntensity : 0
})
const GEOMETRY = new CapsuleGeometry(0.5, 5, 20, 20)
const COLLISIONGEOMETRY = new CapsuleGeometry(0.5 + 0.5, 5, 8, 8)
const COLLISIONMATERIAL = new MeshNormalMaterial({transparent : true, opacity: 0})
GEOMETRY.rotateZ(-Math.PI * 0.5)
COLLISIONGEOMETRY.rotateZ(-Math.PI * 0.5)
COLLISIONGEOMETRY.rotateX(-Math.PI * 0.125)



export default class Paddle {

	speed = 10
	velocity = new Vector3(0,0,0)
	cpu = false

	constructor(scene, position, boundaries) {
		this.scene = scene
		this.boundaries = boundaries
		this.geometry = GEOMETRY.clone()
		this.material = MATERIAL.clone()
		this.mesh = new Mesh(this.geometry, this.material)
		this.collMesh = new Mesh(COLLISIONGEOMETRY, COLLISIONMATERIAL)
		this.mesh.add(this.collMesh)
		this.mesh.castShadow = true
		this.mesh.receiveShadow = true
		this.isAi = false
		this.distance = 0
		

		this.mesh.position.copy(position)
		// this.scene.add(this.mesh)
	}

	setIsAi() {
		this.isAi = true
	}

	updateEmission() {
		if (this.material.emissiveIntensity > 0)
			this.material.emissiveIntensity = MathUtils.lerp(this.material.emissiveIntensity, 0, 0.1)
	}

	setX(x) {
		this.updateEmission()
		if (x < -(this.boundaries.x - 3))
			x = -(this.boundaries.x - 3)
		else if ( x > this.boundaries.x - 3)
			x = this.boundaries.x - 3
		
		this.mesh.position.x = x
	}

	move(dt) {
		const s = this.velocity.clone().multiplyScalar(this.speed * dt)
		return this.mesh.position.clone().add(s)
	}

	update(dt) {
		const tPos = this.move(dt)

		if (tPos.x != 0)
		{
			this.distance++;
		}
		this.setX(tPos.x)
	}
}