import { Curve, Vector3 } from 'three';

export class SinCurve extends Curve<Vector3> {
    scale: number;

    constructor(scale: number) {
        super()
        this.scale = scale
    }

	getPoint(t: number, optionalTarget = new Vector3() ) {
        const amplitude = 3
        const repetitions = 2
		const tx = t * 5 -  1.5;
		const ty = amplitude * Math.sin( 2 * Math.PI * t * repetitions );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar(this.scale);
	}
}