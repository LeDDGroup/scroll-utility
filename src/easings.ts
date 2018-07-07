export { easing };

const easing = {
  linear: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
    return (distance * currentStep) / totalSteps + offsetValue;
  },
  in: {
    circ: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps;
      return -distance * (Math.sqrt(1 - currentStep * currentStep) - 1) + offsetValue;
    },
    expo: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      return distance * Math.pow(2, 10 * (currentStep / totalSteps - 1)) + offsetValue;
    },
    sine: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      return (
        -distance * Math.cos((currentStep / totalSteps) * (Math.PI / 2)) + distance + offsetValue
      );
    },
    quint: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps;
      return (
        distance * currentStep * currentStep * currentStep * currentStep * currentStep + offsetValue
      );
    },
    quart: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps;
      return distance * currentStep * currentStep * currentStep * currentStep + offsetValue;
    },
    cubic: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps;
      return distance * currentStep * currentStep * currentStep + offsetValue;
    },
    quad: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps;
      return distance * currentStep * currentStep + offsetValue;
    },
  },
  out: {
    circ: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps;
      currentStep--;
      return distance * Math.sqrt(1 - currentStep * currentStep) + offsetValue;
    },
    expo: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      return distance * (-Math.pow(2, (-10 * currentStep) / totalSteps) + 1) + offsetValue;
    },
    sine: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      return distance * Math.sin((currentStep / totalSteps) * (Math.PI / 2)) + offsetValue;
    },
    quint: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps;
      currentStep--;
      return (
        distance * (currentStep * currentStep * currentStep * currentStep * currentStep + 1) +
        offsetValue
      );
    },
    quart: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps;
      currentStep--;
      return -distance * (currentStep * currentStep * currentStep * currentStep - 1) + offsetValue;
    },
    cubic: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps;
      currentStep--;
      return distance * (currentStep * currentStep * currentStep + 1) + offsetValue;
    },
    quad: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps;
      return -distance * currentStep * (currentStep - 2) + offsetValue;
    },
  },
  inOut: {
    quad: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps / 2;
      if (currentStep < 1) return (distance / 2) * currentStep * currentStep + offsetValue;
      currentStep--;
      return (-distance / 2) * (currentStep * (currentStep - 2) - 1) + offsetValue;
    },
    cubic: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps / 2;
      if (currentStep < 1)
        return (distance / 2) * currentStep * currentStep * currentStep + offsetValue;
      currentStep -= 2;
      return (distance / 2) * (currentStep * currentStep * currentStep + 2) + offsetValue;
    },
    quart: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps / 2;
      if (currentStep < 1)
        return (distance / 2) * currentStep * currentStep * currentStep * currentStep + offsetValue;
      currentStep -= 2;
      return (
        (-distance / 2) * (currentStep * currentStep * currentStep * currentStep - 2) + offsetValue
      );
    },
    quint: function(
      currentStep: number,
      offsetValue: number,
      distance: number,
      totalSteps: number,
    ) {
      currentStep /= totalSteps / 2;
      if (currentStep < 1)
        return (
          (distance / 2) * currentStep * currentStep * currentStep * currentStep * currentStep +
          offsetValue
        );
      currentStep -= 2;
      return (
        (distance / 2) * (currentStep * currentStep * currentStep * currentStep * currentStep + 2) +
        offsetValue
      );
    },
    sine: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      return (-distance / 2) * (Math.cos((Math.PI * currentStep) / totalSteps) - 1) + offsetValue;
    },
    expo: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps / 2;
      if (currentStep < 1)
        return (distance / 2) * Math.pow(2, 10 * (currentStep - 1)) + offsetValue;
      currentStep--;
      return (distance / 2) * (-Math.pow(2, -10 * currentStep) + 2) + offsetValue;
    },
    circ: function(currentStep: number, offsetValue: number, distance: number, totalSteps: number) {
      currentStep /= totalSteps / 2;
      if (currentStep < 1)
        return (-distance / 2) * (Math.sqrt(1 - currentStep * currentStep) - 1) + offsetValue;
      currentStep -= 2;
      return (distance / 2) * (Math.sqrt(1 - currentStep * currentStep) + 1) + offsetValue;
    },
  },
};
