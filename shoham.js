// steps = [];

// function step1() { 
// 	window.location.href = 'http://localhost:8001';	
// }

// steps.push(step1)


// function check(){
// 	x = setInterval 	
// }

// run step
// attempt 10 times to perform a check (run code)
// if check successful, increment step_number and run next step
// run next step 

// lib
startAttempts = function(checkFunc, elemID) {
	var attemptNumber = 0;
	
	var attemptRunner = setInterval(function() { 
			
			attemptNumber++;
			var res = checkFunc(elemID);
			if (res == true) {
	  		clearInterval(attemptRunner);
	  		succ('success on '+elemID);
	  		next();
			}

			if (attemptNumber > 10) {
				clearInterval(attemptRunner);
				err('FAIL on '+elemID);
			}
		}, 500)					
}

checkExists = function(elemID) { 
	log('checking for '+elemID);	
	return (document.getElementById(elemID) != null)
}

assert = function(condition, desc) { 
	(condition) ? log(desc) : err(desc)
}

log = function(s){ console.log(s) }
//succ = function(s) { console.log('%c'+s.toString(), 'background: #222; color: #bada55') };
succ = function(s) { console.log('%c'+s.toString(), 'color: green') };
err = logError = function(s){ console.error(s) }
logF = logStep = function(stepArgs) { log(stepArgs.callee.name+" called with: "); log(stepArgs)}

clear();

//now define steps
steps = [];
addStep = function(f,id) { var obj = {func: f, id: id}; steps.push(obj); }

addStep(checkExists,'login-intro');

doStep = function(stepNum) { 
	log('executing step '+stepNum);
	var step = steps[stepNum]	
	startAttempts(step.func, step.id) 
}

counterSteps = 0;
//doStep(counterSteps++);

nextStep = function() {
	log('will now call next step: '+counterSteps);
}

doStep(0);
//startAttempts(exists,'login-intro')