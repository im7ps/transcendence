import { AmbientLight, DirectionalLight } from "../node_modules/three/src/Three.js";

const ambientLight = new AmbientLight(0xffffff, 0.6)
const dirLight = new DirectionalLight(0xffffff, 0.7)

dirLight.position.set(30,40,30)
dirLight.castShadow = true
dirLight.shadow.mapSize.set(1024, 1024)

dirLight.shadow.camera.top = 40
dirLight.shadow.camera.bottom = -40
dirLight.shadow.camera.right = 40
dirLight.shadow.camera.left = -40

dirLight.shadow.radius = 3
dirLight.shadow.blurSamples = 20

const lights = [dirLight, ambientLight]

export default lights