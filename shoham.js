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

safeAttempt = function(func, elemID) {
	try { 
		return func(elemID);
	} 
	catch (e) {
			err("Internal Error: "+e.toString());			
			return false;
	}
}

startAttempts = function(func, elemID) {
	var attemptNumber = 1;
	
	var attemptRunner = setInterval(function() { 
			log('attempt number '+attemptNumber);
			attemptNumber++;
			var res = safeAttempt(func,elemID);

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

click = function(elemID) { 
	log('clicking on '+elemID);
	document.getElementById('login-button').click();
	return true;
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

doStep = function(stepNum) { 
	var step = steps[stepNum]	
	startAttempts(step.func, step.id) 
}

counterSteps = 0;
//doStep(counterSteps++);

next = nextStep = function() {
	if (counterSteps >= steps.length) { succ('Done.'); return; }	
	doStep(counterSteps++);
}

//now your actual business steps
addStep(checkExists,'login-intro');
addStep(checkExists,'login-button');
addStep(click,'login-button');
addStep(checkExists,'helloDiv');

nextStep();
//startAttempts(exists,'login-intro')