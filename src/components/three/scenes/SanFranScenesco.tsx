import { AmbientLight, Camera, CatmullRomCurve3, Color, Fog, Mesh, Group, MeshStandardMaterial, Vector3, BackSide } from "three";
import { useGLTF } from '@react-three/drei'
import { ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CityState, LOCAL_CITY_STATE_KEY, transitionDuration } from "../../../utils/constants";
import { useLocalStorage } from "@mantine/hooks";

const wireFrameMaterial = new MeshStandardMaterial()
wireFrameMaterial.color = new Color("#ff34ff")
wireFrameMaterial.wireframe = true

const duration = 50

const hoverOffset = 1
const pointsForCurve: Vector3[] = [
  new Vector3(220, hoverOffset, -175),
  new Vector3(210.80017238119, hoverOffset + 2, -165.80017238119),
  new Vector3(201.6000525266084, hoverOffset + 4.5, -156.6000525266084),
  new Vector3(192.4001522772, hoverOffset + 5.3, -147.4001522772),
  new Vector3(183.20015701359708, hoverOffset + 4.9, -138.20015701359708),
  new Vector3(174.0001098355971, hoverOffset + 2.6, -129.0001098355971),
  new Vector3(164.80008006377577, hoverOffset + 1.4, -119.80008006377578),
  new Vector3(155.60009053635662, hoverOffset + 3, -110.60009053635662),
  new Vector3(146.40012317056696, hoverOffset + 3, -101.40012317056696),
  new Vector3(137.20004955665522, hoverOffset + 4.3, -92.20004955665522),
  new Vector3(128.0000256363685, hoverOffset + 6, -83.0000256363685),
  new Vector3(118.80001948800455, hoverOffset + 5.4, -73.80001948800455),
  new Vector3(109.60009547843285, hoverOffset + 4.1, -64.60009547843285),
  new Vector3(100.40008937898318, hoverOffset + 4.1, -55.400089378983175),
  new Vector3(91.20003532120774, hoverOffset + 4.2, -46.20003532120774),
  new Vector3(82.000064659792, hoverOffset + 3.9, -37.00006465979201),
  new Vector3(72.80003123859039, hoverOffset + 3.5, -27.800031238590392),
  new Vector3(63.60006038362175, hoverOffset + 3.3, -18.600060383621752),
  new Vector3(54.40001384664159, hoverOffset + 3.1, -9.400013846641592),
  new Vector3(45.20000141515522, hoverOffset + 2.8, -0.20000141515522074),
  new Vector3(36.00002606870491, hoverOffset + 2.9, 8.999973931295088),
  new Vector3(26.80004507691912, hoverOffset + 2.9, 18.19995492308088),
  new Vector3(17.60000946433327, hoverOffset + 2.9, 27.39999053566673),
  new Vector3(8.40003441680858, hoverOffset + 2.8, 36.59996558319142),
  new Vector3(-0.7999787787517789, hoverOffset + 3.3, 45.79997877875178),
  new Vector3(-9.999997032445208, hoverOffset + 3.6, 54.99999703244521),
  new Vector3(-19.199993234471037, hoverOffset + 3.8, 64.19999323447104),
  new Vector3(-28.39999213914352, hoverOffset + 4.6, 73.39999213914352),
  new Vector3(-37.599994421099424, hoverOffset + 4.3, 82.59999442109942),
  new Vector3(-46.79999779596159, hoverOffset + 4, 91.79999779596159),
  new Vector3(-56.00000136985935, hoverOffset + 4.1, 101.00000136985935),
  new Vector3(-65.20000505017154, hoverOffset + 3.8, 110.20000505017154),
  new Vector3(-74.40000939817358, hoverOffset + 3.2, 119.40000939817358),
  new Vector3(-83.60001523949322, hoverOffset + 3, 128.60001523949322),
  new Vector3(-92.80002232871416, hoverOffset + 3.1, 137.80002232871416),
  new Vector3(-102.0000262899228, hoverOffset + 3.2, 147.0000262899228),
  new Vector3(-111.20001291872063, hoverOffset + 3.4, 156.20001291872063),
  new Vector3(-120.40003001399748, hoverOffset + 4, 165.40003001399748),
  new Vector3(-129.60003176235924, hoverOffset + 4.5, 174.60003176235924),
  new Vector3(-138.80004742602597, hoverOffset + 4.8, 183.80004742602597),
  new Vector3(-148.00003649468965, hoverOffset + 4.8, 193.00003649468965),
  new Vector3(-157.20004006966002, hoverOffset + 4.5, 202.20004006966002),
  new Vector3(-166.4000644915845, hoverOffset + 4.3, 211.4000644915845),
  new Vector3(-175.60002643726835, hoverOffset + 4.1, 220.60002643726835),
  new Vector3(-184.80007028573482, hoverOffset + 4.6, 229.80007028573482),
  new Vector3(-194.0000657463313, hoverOffset + 5.1, 239.0000657463313),
  new Vector3(-203.2000525585206, hoverOffset + 5.3, 248.2000525585206),
  new Vector3(-212.40002080287718, hoverOffset + 5.6, 257.4000208028772),
  new Vector3(-221.6000997415739, hoverOffset + 5.6, 266.6000997415739),
  new Vector3(-230.8001017814912, hoverOffset + 5.7, 275.8001017814912),
  new Vector3(-240, hoverOffset + 6, 285),
]

const curve = new CatmullRomCurve3(pointsForCurve)
curve.arcLengthDivisions = 100000
const discretePointsCount = 10000
const pointsPerSecond = discretePointsCount / duration
const lookAtOffset =  Math.max(pointsPerSecond * 0.1, 1)
const discretePointsOnPath = curve.getSpacedPoints(discretePointsCount)

function updateCameraOrientation(camera: Camera, time: number) {
  const pointIndex = Math.floor(((time * (pointsPerSecond) ) % (discretePointsCount)))
  
  const position = discretePointsOnPath[pointIndex]
  camera.position.x = position.x
  camera.position.y = position.y
  camera.position.z = position.z

  const lookAtPointIndex = pointIndex + lookAtOffset
  if (lookAtPointIndex < discretePointsOnPath.length) {
    // cannot pass values > 1 to curve, so just stop updating the camera direction
    camera.lookAt(discretePointsOnPath[lookAtPointIndex])
  }
}

const lightIntensity = 1

export function SanFranScenesco() {
  const [cityState] = useLocalStorage<CityState>({
    key: LOCAL_CITY_STATE_KEY,
    defaultValue: CityState.ENTRY_WORMHOLE
  });
  const { nodes } = useGLTF('/src/assets/san_francisco_california_usa.glb');
  const { scene, camera } = useThree();
  const lightRef = useRef<AmbientLight>(null!);
  const cityRef = useRef<Group>(null!);
  const wormholeRef = useRef<Mesh>(null!);

  useGSAP(() => {
    switch (cityState) {
      case CityState.ENTRY_WORMHOLE:
        cityRef.current.visible = false
        wormholeRef.current.visible = true
        break
      case CityState.CITY:
        lightRef.current.intensity = 1
        cityRef.current.visible = false
        gsap.to(lightRef.current, {
          intensity: 0,
          duration: transitionDuration,
          onComplete: () => {
            cityRef.current.visible = true
            wormholeRef.current.visible = false
          }
        });
        gsap.to(lightRef.current, {
          intensity: lightIntensity,
          duration: transitionDuration,
          delay: transitionDuration
        })
        break
      case CityState.EXIT_WORMHOLE:
        lightRef.current.intensity = 1
        gsap.to(lightRef.current, {
          intensity: 0,
          duration: transitionDuration,
          onComplete: () => {
            cityRef.current.visible = false
            wormholeRef.current.visible = true
          }
        });
        gsap.to(lightRef.current, {
          intensity: lightIntensity,
          duration: transitionDuration,
          delay: transitionDuration
        })
        break
    }
  }, [cityState])

  useEffect(() => {
    scene.fog = new Fog( 0x000000, 1, 50 )
    updateCameraOrientation(camera, 0)
  })

  useFrame(({camera, clock}) => {
    updateCameraOrientation(camera, clock.elapsedTime)
  })

  return (
    <group dispose={null} >
      <group ref={cityRef} position={[0, 0, 0]} scale={0.1} rotation={[-Math.PI / 2, 0, 0]}>
        {/* roads */}
        <group>
          <mesh
            geometry={nodes.Wayshighway__0.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_1.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_2.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_3.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_4.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_5.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_6.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_7.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_8.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_9.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_10.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_11.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_12.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Wayshighway__0_13.geometry}
            material={wireFrameMaterial}
          />
        </group>
        {/* buildings */}
        <group>
          <mesh
            geometry={nodes.Areasbuilding__0.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_1.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_2.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_3.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_4.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_5.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_6.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_7.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_8.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_9.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_10.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_11.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_12.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_13.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_14.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_15.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_16.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_17.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_18.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_19.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_20.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_21.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_22.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_23.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_24.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_25.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_26.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_27.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_28.geometry}
            material={wireFrameMaterial}
          />
          <mesh
            geometry={nodes.Areasbuilding__0_29.geometry}
            material={wireFrameMaterial}
          />
        </group>
      </group>
      <mesh ref={wormholeRef} >
        <tubeGeometry  args={[ curve, 200, 5, 12, ]} />
        <meshStandardMaterial color="white" side={BackSide} wireframe/>
      </mesh>
      <ambientLight ref={lightRef} color="white" intensity={lightIntensity} />
      <EffectComposer>
        <ChromaticAberration offset={[0.01, 0.01]} radialModulation modulationOffset={0.3}/>
      </EffectComposer>
    </group>
  )
}

useGLTF.preload('/san_francisco_california_usa.glb')

export default SanFranScenesco;
