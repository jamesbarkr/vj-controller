import { Curve, Vector3 } from 'three';

export class SpiralCurve extends Curve<Vector3> {
    constructor() {
        super()
    }

	getPoint(t: number, optionalTarget = new Vector3() ) {
        const w = 20 // angular velocity
		const tx = Math.cos(w * t) - t * Math.sin(w * t)
		const ty = Math.sin(w * t) + t * Math.cos(w * t)
		const tz = (t - 0.5) * 5

		return optionalTarget.set( tx, ty, tz );
	}
}