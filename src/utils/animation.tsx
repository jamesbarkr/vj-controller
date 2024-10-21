type AnimationState = string | symbol | number

export interface AnimationKeyframe {
    state: AnimationState
    duration: number 
}

export interface AnimationSpecs {
    states: {[key in AnimationState] : number[]}
    initialState: number[]
    orderedAnimations: AnimationKeyframe[]
}

export interface AnimationKeyFrameData {
    startData: number[]
    endData: number[]
    startTime: number
    endTime: number
}

export function animationSpecsToData({states, initialState, orderedAnimations} : AnimationSpecs) : AnimationKeyFrameData[] {
    if (orderedAnimations.length === 0) {
        console.error("Animation specs must have at least one state")
    }

    let currentState = initialState
    let currentTime = 0
    const animationData: AnimationKeyFrameData[] = []
    for (let i = 0; i < orderedAnimations.length; i++) {
        const animation = orderedAnimations[i]
        const nextState = states[animation.state]
        const nextTime = currentTime + animation.duration

        animationData.push({startData: currentState, endData: nextState, startTime: currentTime, endTime: nextTime})

        currentState = nextState
        currentTime = nextTime
    }

    return animationData
}

export function interpolateAnimationDataAtTime(data: AnimationKeyFrameData[], time: number, repeating: boolean) : number[] {
    if (time < 0) {
        console.error("Animation time to interpolate must be > 0")
        return []
    }

    if (data.length === 0) {
        console.error("Animation data should not be empty when interpolating")
        return []
    }

    const finalKeyframe = data[data.length - 1]
    const totalDuration = finalKeyframe.endTime

    if (repeating && time >= totalDuration) {
        time = time % totalDuration
    }

    for (const keyframeData of data) {
        if (time >= keyframeData.startTime && time < keyframeData.endTime) {
            // Found a keyframe the specified time is in, interpolate and return
            if (keyframeData.startData.length != keyframeData.endData.length) {
                console.error("Animation keyframe states should have the same number of values to interpolate")
                return []
            }

            const normalizedAnimationProgress = (time - keyframeData.startTime) / (keyframeData.endTime - keyframeData.startTime)
            const interpolatedValues: number[] = []
            for (let i = 0; i < keyframeData.startData.length; i++) {
                const delta = (keyframeData.endData[i] - keyframeData.startData[i]) * normalizedAnimationProgress
                interpolatedValues.push(keyframeData.startData[i] + delta)
            }

            return interpolatedValues
        }
    }

    // Time is beyond the final keyframe, returning the final state
    return finalKeyframe.endData
}
