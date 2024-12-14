import { AmbientLight, Camera, CatmullRomCurve3, Color, Fog, Mesh, Group, MeshStandardMaterial, Vector3, BackSide } from "three";
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CityState, LOCAL_CITY_STATE_KEY, transitionDuration } from "../../../utils/constants";
import { useLocalStorage } from "@mantine/hooks";
import { BowlingColor } from "../../../utils/bowlingCarpet";

const wireFrameMaterial = new MeshStandardMaterial()
wireFrameMaterial.color = new Color("#ff34ff")
wireFrameMaterial.wireframe = true

const hoverOffset = 1
const entryPoint = new Vector3(400, 100, -350)
const startOfMarket = new Vector3(220, 14, -175)

const cityFromAbovePoints: Vector3[] = [
  // start flying in
  entryPoint,
  startOfMarket,
];

const pointsForCurve: Vector3[] = [
  // move down market
  startOfMarket,
  new Vector3(210.80017238119, 12, -165.80017238119),
  new Vector3(201.6000525266084, 10, -156.6000525266084),
  new Vector3(192.4001522772, 8, -147.4001522772),
  new Vector3(183.20015701359708, 6, -138.20015701359708),
  new Vector3(174.0001098355971, 4, -129.0001098355971),
  new Vector3(164.80008006377577, 4, -119.80008006377578),
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
  new Vector3(-350, 18, 260),
  new Vector3(-370, 12, 200),
  new Vector3(-350, 12, 150),
  new Vector3(-100, 12, 0),
  new Vector3(-100, 14, -100),
  new Vector3(50, 12, -200),
  new Vector3(200, 10, 0),
  new Vector3(200, 4, 100),
  new Vector3(-50, 12, 10),
  new Vector3(-150, 8, 100),
  new Vector3(-50, 4, 250),
  new Vector3(80, 4, 150),
  new Vector3(180, 6, 250),
  new Vector3(280, 4, 150),
  new Vector3(230, 10, 0),
  new Vector3(100, 14, 0),
  new Vector3(100, 10, -200),
  new Vector3(0, 8, -300),
  new Vector3(-200, 14, -300),
  new Vector3(-150, 16, -100),
  new Vector3(50, 14, -100),
  new Vector3(50, 8, 100),
  new Vector3(-200, 12, 100),
  new Vector3(-100, 12, -200),
  new Vector3(-250, 12, -300),
  new Vector3(-380, 14, -200),
  new Vector3(-300, 14, -50),
  new Vector3(-400, 16, 80),
  new Vector3(-200, 12, 180),
  new Vector3(-150, 14, -180),
  new Vector3(-50, 14, -300),
  new Vector3(120, 12, -300),
  startOfMarket,
]

const offsetsForWormhole: Vector3[] = [
  new Vector3(-100, 0, 0),
  new Vector3(0, 100, -100),
  new Vector3(-100, 60, -80),
  new Vector3(70, -40, -100),
  new Vector3(50, 20, -200),
  new Vector3(150, -120, 200),
  new Vector3(-100, -20, 60),
  new Vector3(100, 0, 200),
  // new Vector3(0, 0, 0),
]

function makeWormholeCurve(startPoint: Vector3) : CatmullRomCurve3 {
  const wormholePoints: Vector3[] = [startPoint]
  let prevPoint = startPoint
  for (let i = 0; i < offsetsForWormhole.length; i++) {
    const nextPoint = new Vector3(
      prevPoint.x - offsetsForWormhole[i].x,
      prevPoint.y - offsetsForWormhole[i].y,
      prevPoint.z - offsetsForWormhole[i].z
    )
    wormholePoints.push(nextPoint)
    prevPoint = nextPoint
  }
  const wormholeCurve = new CatmullRomCurve3(wormholePoints, true)
  wormholeCurve.arcLengthDivisions = 100000

  return wormholeCurve
}

const startWormholeCurve = makeWormholeCurve(entryPoint)

const cityFromAboveCurve = new CatmullRomCurve3(cityFromAbovePoints)
cityFromAboveCurve.arcLengthDivisions = 100000
const cityCurve = new CatmullRomCurve3(pointsForCurve, true)
cityCurve.arcLengthDivisions = 100000

const cityFromAboveDuration = 20
const cityDuration = 600
const wormholeDuration = 100
const discretePointsCount = 100000
const discretePointsOnCityPath = cityCurve.getSpacedPoints(discretePointsCount)
const discretePointsOnWormholePath = startWormholeCurve.getSpacedPoints(discretePointsCount)
const discretePointsOnAboveCity = cityFromAboveCurve.getSpacedPoints(discretePointsCount)

function pointsPerSecond(state: AnimationState) : number {
  switch(state) {
    case AnimationState.FIRST_WORMHOLE_ACTIVE:
    case AnimationState.FIRST_WORMHOLE_EXITING:
    case AnimationState.SECOND_WORMHOLE_ACTIVE:
      return discretePointsCount / wormholeDuration
    case AnimationState.CITY_FROM_ABOVE:
      return discretePointsCount / cityFromAboveDuration
    case AnimationState.CITY_ACTIVE:
    case AnimationState.CITY_EXITING:
      return discretePointsCount / cityDuration
  }
}

function discretePointsOnPath(state: AnimationState) : Vector3[] {
  switch(state) {
    case AnimationState.FIRST_WORMHOLE_ACTIVE:
    case AnimationState.FIRST_WORMHOLE_EXITING:
    case AnimationState.SECOND_WORMHOLE_ACTIVE:
      return discretePointsOnWormholePath
    case AnimationState.CITY_FROM_ABOVE:
      return discretePointsOnAboveCity
    case AnimationState.CITY_ACTIVE:
    case AnimationState.CITY_EXITING:
      return discretePointsOnCityPath
  }
}

function updateCameraOrientation(camera: Camera, time: number, state: AnimationState) {
  const pointsPerSec = pointsPerSecond(state)
  const pointIndex = Math.floor(((time * (pointsPerSec) ) % (discretePointsCount)))
  const discretePoints = discretePointsOnPath(state)
  
  const position = discretePoints[pointIndex]
  camera.position.x = position.x
  camera.position.y = position.y
  camera.position.z = position.z

  if (state == AnimationState.CITY_FROM_ABOVE) {
    // to make transition smooth between city_from_above and city_active look at second point on city_active
    // curve since city_from_above is linear
    camera.lookAt(discretePointsOnCityPath[20])
  } else {
    const lookAtPointIndex = pointIndex + 1
    if (lookAtPointIndex < discretePoints.length) {
      // cannot pass values > 1 to curve, so just stop updating the camera direction
      camera.lookAt(discretePoints[lookAtPointIndex])
    }
  }
}

const lightIntensity = 1

enum AnimationState {
  FIRST_WORMHOLE_ACTIVE,
  FIRST_WORMHOLE_EXITING,
  CITY_FROM_ABOVE,
  CITY_ACTIVE,
  CITY_EXITING,
  SECOND_WORMHOLE_ACTIVE
}

export function SanFranScenesco() {
  const [cityState] = useLocalStorage<CityState>({
    key: LOCAL_CITY_STATE_KEY,
    defaultValue: CityState.ENTRY_WORMHOLE
  });
  const { nodes } = useGLTF('/src/assets/san_francisco_california_usa.glb');
  const { scene, camera, clock } = useThree();
  const lightRef = useRef<AmbientLight>(null!);
  const cityRef = useRef<Group>(null!);
  const wormholeRef = useRef<Mesh>(null!);
  const [animationStartTime, setAnimationStartTime] = useState(0);
  const [animationState, setAnimationState] = useState(AnimationState.FIRST_WORMHOLE_ACTIVE)
  const [fog] = useState(new Fog( 0x000000, 1, 500 ))

  useEffect(() => {
    switch (cityState) {
      case CityState.ENTRY_WORMHOLE:
        setAnimationState(AnimationState.FIRST_WORMHOLE_ACTIVE)
        break
      case CityState.CITY:
        setAnimationState(AnimationState.FIRST_WORMHOLE_EXITING)
        break
      case CityState.EXIT_WORMHOLE:
        setAnimationState(AnimationState.CITY_EXITING)
    }
  }, [cityState])

  useGSAP(() => {
    switch(animationState) {
      case AnimationState.FIRST_WORMHOLE_ACTIVE:
        fog.far = 50
        updateCameraOrientation(camera, 0, animationState)
        cityRef.current.visible = false
        wormholeRef.current.visible = true
        setAnimationStartTime(clock.elapsedTime)
        break
      case AnimationState.FIRST_WORMHOLE_EXITING:
        lightRef.current.intensity = 1
        cityRef.current.visible = false
        gsap.to(lightRef.current, {
          intensity: 0,
          duration: transitionDuration,
          onComplete: () => {
            setAnimationState(AnimationState.CITY_FROM_ABOVE)
          }
        });
        break
      case AnimationState.CITY_FROM_ABOVE:
        fog.far = 500
        setAnimationStartTime(clock.elapsedTime)
        updateCameraOrientation(camera, 0, animationState)
        cityRef.current.visible = true
        wormholeRef.current.visible = false
        camera.lookAt(new Vector3(startOfMarket.x, startOfMarket.y, startOfMarket.z))
        gsap.to(lightRef.current, {
          intensity: lightIntensity,
          duration: transitionDuration
        })
        break
      case AnimationState.CITY_ACTIVE:
        // animate increasing fog
        gsap.to(fog, {far: 100, duration: 3})
        setAnimationStartTime(clock.elapsedTime)
        break
      case AnimationState.CITY_EXITING:
        lightRef.current.intensity = 1
        gsap.to(lightRef.current, {
          intensity: 0,
          duration: transitionDuration,
          onComplete: () => {
            setAnimationState(AnimationState.SECOND_WORMHOLE_ACTIVE)
          }
        });
        break
      case AnimationState.SECOND_WORMHOLE_ACTIVE:
        fog.far = 50
        setAnimationStartTime(clock.elapsedTime)
        updateCameraOrientation(camera, 0, animationState)
        cityRef.current.visible = false
        wormholeRef.current.visible = true
        gsap.to(lightRef.current, {
          intensity: lightIntensity,
          duration: transitionDuration
        })
        break
    }
  }, [animationState])

  useEffect(() => {
    scene.fog = fog
    updateCameraOrientation(camera, 0, animationState)
    return (() => {
      scene.fog = null;
    });
  }, [])

  useFrame(({camera, clock}) => {
    const animationProgress = clock.elapsedTime - animationStartTime
    if (animationState === AnimationState.CITY_FROM_ABOVE && animationProgress >= cityFromAboveDuration) {
        setAnimationState(AnimationState.CITY_ACTIVE)
   } else {
      updateCameraOrientation(camera, animationProgress,  animationState) 
    }
  })

  return (
    <group dispose={null}>
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
      <mesh ref={wormholeRef}> 
        <mesh>
          <tubeGeometry  args={[ startWormholeCurve, 400, 5, 12, ]} />
          <meshStandardMaterial color={BowlingColor.CYAN} side={BackSide} wireframe/>
        </mesh>
        <mesh>
          <tubeGeometry  args={[ startWormholeCurve, 400, 5.5, 12, ]} />
          <meshStandardMaterial color="black" side={BackSide} />
        </mesh>
      </mesh>
      <ambientLight ref={lightRef} color="white" intensity={lightIntensity} />
    </group>
  )
}

useGLTF.preload('/san_francisco_california_usa.glb')

export default SanFranScenesco;
