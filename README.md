# ShohamJS - testing for humans
---


ShohamJS is an ultra-light tool for acceptance testing your web-app. You can use it to test FE separately or the entire running app, emulating a real user. 

## Usage

Shoham is completely standalone and has no external dependencies, and currently runs in your browser. Configure your steps in shoham.js, paste it in browser console, and view the results run live. 

##Configuration 

Shoham is configured by creating 'steps', where each step takes a function and and HTML element, and performs an assertion or operation on that element. 

Two example steps (one assertion, one operation) that ship with Shoham by default are 'checkExists' and 'click' (here in a simplified version):

```` javascript
checkExists = function(elem) { 	
	return (document.getElementById(elem) != null)
}

click = function(elem) { 	
	document.getElementById(elem).click();
	return true;
}

addStep(checkExists,'#login-button');
````

Your steps are added at the bottom of shoham.js:

```javascript
log("running shoham...")
addStep(goToURL,'/#/logout');
addStep(checkExists,'#login-button');
addStep(click,'#login-button');
addStep(checkExists,'#helloDiv');

nextStep() // initiate running tests
```

## Async

Shoham performs a step and checks the return value. Due to JS's asynchronous nature, after each step, Shoham allows up to 10 attempts of 500 milliseconds each to check for a successful completion of the operation. Thus performing a 'click' on a button which updates the DOM pending a server response (for example) has up to 5 seconds to successfully complete. 