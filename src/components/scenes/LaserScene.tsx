import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BackSide, LineCurve3, Vector3 } from "three";

const roomDimensions: Vector3 = new Vector3(100, 40, 80)
const laserCount = 100

function gridPoints() : { v1: Vector3, v2: Vector3 }[] {
    const result = []
    for(let i = 0; i < laserCount; i++) {
       result.push({ v1: new Vector3(0, 0, 50), v2: new Vector3(0, 0, 0)})
    }
    return result
}

const gridPointsConst = gridPoints()

function LaserScene() {
    return (
        <>
  
            <mesh>
                <boxGeometry args={Object.values(roomDimensions)}/>
                <meshPhongMaterial side={BackSide} color="black"/>
            </mesh>
            <mesh>
                {gridPointsConst.map((line, i) =>
                    <mesh rotation={[0, Math.PI, 0]} position={[i - laserCount / 2 + 1, -3, 2]}>
                        <tubeGeometry  args={[new LineCurve3(line.v1, line.v2), 64, 0.005, 8]}/>
                        <meshStandardMaterial emmissive="hotpink" emmissiveIntensity={100} toneMapped={false}/>
                    </mesh>
                )} 
                </mesh>
            <mesh position-z={-5} position-y={2}>
               {/* <gridHelper args={[8, 10]}/> */}
               <sphereGeometry args={[2, 32, 16]}/>
               <meshPhongMaterial color="white" />
            </mesh>
            <ambientLight intensity={1} color="hotpink" />
            <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={0} intensity={100}/>
            </EffectComposer>
            {/* <spotLight color="blue" position={[-1, 0, 5]} rotation-y={Math.PI / 2} intensity={100} />
            <spotLight color="red" position={[1, 0, 5]} rotation-y={Math.PI / 2} intensity={100} /> */}
        </>
    )
}

export default LaserScene;