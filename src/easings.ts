export {
    easing,
}

const easing = {

    // simple linear tweening - no easing, no acceleration
    linearTween: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return distance * currentStep / totalSteps + offsetValue;
    },


    // quadratic easing in - accelerating from zero velocity

    easeInQuad: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        return distance * currentStep * currentStep + offsetValue;
    },


    // quadratic easing out - decelerating to zero velocity

    easeOutQuad: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        return -distance * currentStep * (currentStep - 2) + offsetValue;
    },



    // quadratic easing in/out - acceleration until halfway, then deceleration

    easeInOutQuad: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps / 2;
        if (currentStep < 1) return distance / 2 * currentStep * currentStep + offsetValue;
        currentStep--;
        return -distance / 2 * (currentStep * (currentStep - 2) - 1) + offsetValue;
    },


    // cubic easing in - accelerating from zero velocity

    easeInCubic: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        return distance * currentStep * currentStep * currentStep + offsetValue;
    },



    // cubic easing out - decelerating to zero velocity

    easeOutCubic: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        currentStep--;
        return distance * (currentStep * currentStep * currentStep + 1) + offsetValue;
    },



    // cubic easing in/out - acceleration until halfway, then deceleration

    easeInOutCubic: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps / 2;
        if (currentStep < 1) return distance / 2 * currentStep * currentStep * currentStep + offsetValue;
        currentStep -= 2;
        return distance / 2 * (currentStep * currentStep * currentStep + 2) + offsetValue;
    },


    // quartic easing in - accelerating from zero velocity

    easeInQuart: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        return distance * currentStep * currentStep * currentStep * currentStep + offsetValue;
    },



    // quartic easing out - decelerating to zero velocity

    easeOutQuart: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        currentStep--;
        return -distance * (currentStep * currentStep * currentStep * currentStep - 1) + offsetValue;
    },



    // quartic easing in/out - acceleration until halfway, then deceleration

    easeInOutQuart: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps / 2;
        if (currentStep < 1) return distance / 2 * currentStep * currentStep * currentStep * currentStep + offsetValue;
        currentStep -= 2;
        return -distance / 2 * (currentStep * currentStep * currentStep * currentStep - 2) + offsetValue;
    },


    // quintic easing in - accelerating from zero velocity

    easeInQuint: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        return distance * currentStep * currentStep * currentStep * currentStep * currentStep + offsetValue;
    },



    // quintic easing out - decelerating to zero velocity

    easeOutQuint: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        currentStep--;
        return distance * (currentStep * currentStep * currentStep * currentStep * currentStep + 1) + offsetValue;
    },



    // quintic easing in/out - acceleration until halfway, then deceleration

    easeInOutQuint: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps / 2;
        if (currentStep < 1) return distance / 2 * currentStep * currentStep * currentStep * currentStep * currentStep + offsetValue;
        currentStep -= 2;
        return distance / 2 * (currentStep * currentStep * currentStep * currentStep * currentStep + 2) + offsetValue;
    },


    // sinusoidal easing in - accelerating from zero velocity

    easeInSine: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return -distance * Math.cos(currentStep / totalSteps * (Math.PI / 2)) + distance + offsetValue;
    },



    // sinusoidal easing out - decelerating to zero velocity

    easeOutSine: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return distance * Math.sin(currentStep / totalSteps * (Math.PI / 2)) + offsetValue;
    },



    // sinusoidal easing in/out - accelerating until halfway, then decelerating

    easeInOutSine: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return -distance / 2 * (Math.cos(Math.PI * currentStep / totalSteps) - 1) + offsetValue;
    },



    // exponential easing in - accelerating from zero velocity

    easeInExpo: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return distance * Math.pow(2, 10 * (currentStep / totalSteps - 1)) + offsetValue;
    },



    // exponential easing out - decelerating to zero velocity

    easeOutExpo: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        return distance * (-Math.pow(2, -10 * currentStep / totalSteps) + 1) + offsetValue;
    },



    // exponential easing in/out - accelerating until halfway, then decelerating

    easeInOutExpo: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps / 2;
        if (currentStep < 1) return distance / 2 * Math.pow(2, 10 * (currentStep - 1)) + offsetValue;
        currentStep--;
        return distance / 2 * (-Math.pow(2, -10 * currentStep) + 2) + offsetValue;
    },


    // circular easing in - accelerating from zero velocity

    easeInCirc: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        return -distance * (Math.sqrt(1 - currentStep * currentStep) - 1) + offsetValue;
    },



    // circular easing out - decelerating to zero velocity

    easeOutCirc: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps;
        currentStep--;
        return distance * Math.sqrt(1 - currentStep * currentStep) + offsetValue;
    },



    // circular easing in/out - acceleration until halfway, then deceleration

    easeInOutCirc: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
        currentStep /= totalSteps / 2;
        if (currentStep < 1) return -distance / 2 * (Math.sqrt(1 - currentStep * currentStep) - 1) + offsetValue;
        currentStep -= 2;
        return distance / 2 * (Math.sqrt(1 - currentStep * currentStep) + 1) + offsetValue;
    },
}

