// We need to specify the range of possible values for 
// the stimuls and psychometric parameters

const contrast_samples = [-5, -4 , -3, -2 , -1, 0];
const threshold_samples = [-5, -4 , -3, -2 , -1, 0];
const slope_samples = [2, 3, 4 ,5];
const lapse_samples = [0, 0.01, 0.02, 0.03, 0.04];
const guess = [0.5];


// The function representing probabilities for incorect responses
function func_resp0(stim, threshold, slope, guess, lapse) {
    const tmp = slope * (stim - threshold) / 20;
    return lapse - (guess + lapse -1) * Math.exp(-Math.pow(10, tmp));
}

// The function representing probabilities for correct responses
function func_resp1(stim, threshold, slope, guess, lapse) {
    return 1 - func_resp0(stim, threshold, slope, guess, lapse)
}


// What we are looking for
// interested in finding the combination of parameters (including the threshold)
// that results in the highest probability of correct responses 
// or the lowest probability of incorrect responses.

const jsqp = new jsQuestPlus({
    psych_func: [func_resp0, func_resp1],
    stim_samples: [contrast_samples],
    psych_samples: [threshold_samples, slope_samples, guess, lapse_samples]
})
