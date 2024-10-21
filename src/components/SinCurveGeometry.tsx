import { Curve, Vector3 } from 'three';

class CustomSinCurve extends Curve<Vector3> {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

function SinCurveGeometry () {

    return (
        <mesh>
         <TubeGeometry/>
        </mesh>
    )
}

export default SinCurveGeometry