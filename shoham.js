//copyright sella.rafaeli@gmail.com

safeAttempt = function(func, elem) {
	try { 
		return func(elem);
	} 
	catch (e) {
			err("Internal Error calling "+func+" on "+elem+": "+e.toString());			
			return false;
	}
}

startAttempts = function(func, elem) {
	
	var attemptNumber = 1;
	var genMsg = 'running '+func+" on "+elem
	var attemptRunner = setInterval(function() { 
			if (attemptNumber > 1) log('attempt number '+attemptNumber+' on '+genMsg);
			attemptNumber++;
			var res = safeAttempt(func,elem);

			if (res == true) {
	  		clearInterval(attemptRunner);
	  		succ(func.successMsg || 'Success on '+genMsg);
	  		next();
			}
			
			if (attemptNumber > 10) {
				clearInterval(attemptRunner);
				err(func.errorMsg || 'FAIL '+genMsg);
			}
		}, 500)					
}

checkExists = function(elem) { 	

	arguments.callee.successMsg = elem+' exists.';
	return (getElem(elem) != null)
}

checkNotExists = function(elem) { 	
	arguments.callee.successMsg = elem+' does not exist.';
	return !checkExists(elem);
}

click = function(elem) { 	
	arguments.callee.successMsg = 'clicked on '+elem;
	getElem(elem).click();
	return true;
}

checkContainsWith = function(text) {
	var checkContains = function(elem) { 
		log('checking '+elem+' has text '+text);
		arguments.callee.successMsg = 'found '+elem+' contains '+text;
		return (getElem(elem).textContent.indexOf(text.toString()) > 0)
	}
	return checkContains;
}

goToURL = function(url) {
	window.location.href = url;
	arguments.callee.successMsg = 'gone to url '+url;
	return true;
}

angularFireEvents = function(elem) {
	if (typeof angular !== 'undefined') {
			angular.element(getElem(elem)).triggerHandler('change'); //notify angular of change. Sigh. Angular and its damn semi-walled garden.
		}	
}

setInputWith = function(text) {
	var setInput = function(elem) {
		getElem(elem).value = text;
		
		angularFireEvents(elem);
		return true;
	}	

	return setInput;
}

// assert = function(condition, desc) { 
// 	(condition) ? log(desc) : err(desc)
// }

log = function(s){ console.log(s) }
//succ = function(s) { console.log('%c'+s.toString(), 'background: #222; color: #bada55') };
succ = function(s) { console.log('%c'+s.toString(), 'color: green') };
err = logError = function(s){ console.error(s) }
logF = logStep = function(stepArgs) { log(stepArgs.callee.name+" called with: "); log(stepArgs)}

findElem = function(elem) {
	return window.top.document.querySelector(elem);			
}

setTempBorder = function(elem) {
	var elem = elem;
	try { 		
		if (elem) {
			var oldBorder = elem.style.border;
			elem.style.border='10px solid red';
			setTimeout(function(){ if (elem) elem.style.border = oldBorder;}, 500);
		}
	} catch (e) {
		err(e);
		x = elem; z = oldBorder;
	}
}
getElem = function(elem) { 	
	if (elem    instanceof HTMLElement) res = elem; //returns on JQ's $("#id")[0]
	else if (elem[0] instanceof HTMLElement) res = elem[0]; //returns on JQ's $("#id")
	else res = findElem(elem);	
	setTempBorder(res);
	return res;
}

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

getJQ = function() { //to be used if you need JQ to help debug or whatever.
	script = document.createElement('script');
  script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}

//now your actual business steps

log("login, logout")
addStep(goToURL,'/#/logout');
addStep(checkExists,'#login-intro');
addStep(checkExists,'#login-button');
addStep(click,'#login-button');
addStep(checkExists,'#helloDiv');
addStep(checkContainsWith('nadir'),'#helloDiv');
addStep(goToURL,'/#/logout');
addStep(checkNotExists,'#helloDiv');

log("fail to login with other user")
addStep(checkExists,'#login-intro');
addStep(setInputWith('other-username'),'#login-form input:first-of-type')
addStep(checkExists,'#login-button');
addStep(click,'#login-button');
addStep(checkNotExists,'#helloDiv');
addStep(checkExists,'#login-button');

//addStep(setInput(),'bla-di-bla')
clear();

//addStep(setInputWith('lolcat'),'input')
 nextStep();
//startAttempts(exists,'login-intro')