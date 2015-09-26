---
layout: post
title:  "Things to be aware when you are starting in JavaScript"
date:   2015-09-26 16:50:00
categories: Front-end Javascript
---

JavaScript is the world's most misunderstood programming language, [said Douglas Crockford](http://www.crockford.com/javascript/javascript.html). I tried to compile some topics which I think is too confusing to work with if you are just starting in JavaScript. It is almost about the scope.

## Table of contents

1. [Scope](#scope)
  1. [What is Scope?](#what-is-scope)
  2. [Global Scope](#global-scope)
  3. [Local Scope](#local-scope)
  4. [Function Scope](#function-scope)
  5. [Lexical Scope](#lexical-scope)
2. [The `this` keyword](#the-this-keyword)
3. [Closure](#closure)
4. [Hoisting](#hoisting)

## 1. Scope <a name="scope"></a>
Different from other languages like `C`, `C++` or `C#`, JavaScript doesn't has block-level scope, but it has function-level scope. Which means that only function can create a new scope. They aren't created by `for` or `while` loops or expression statements like `if` ir `switch`.

### 1.1. What is Scope? <a name="what-is-scope"></a>
Be aware that the scope refers to the context of your code so it could be `globally` or `locally` defined. Understanding it is key to be a better JavaScript developer by knowing where variables and function are accessible
and be able to change the scope of your code's context when it is neccessary.

### 1.2. Global Scope <a name="global-scope"></a>
By default, when write a line of JavaScript you're in what is called `Global Scope` or `Global Object`. So, if we are declaring a variable in the default scope, we are doing it on global scope.

{% highlight javascript %}
// app.js
var fullName = "David Gilmour";
{% endhighlight%}

Control the global scope is easy and in doing so, you'll run into no issues with global scope. You'll hear people saying "Global Scope is _bad_", but it isn't. You need it to creade Modules and APIs that are accessible across scopes and take it as your advantage.

Think about it as a global object where each global variable is present as a property of this object. In browsers,  the global scope object is stored in the `window` variable.

### 1.3. Local Scope <a name="local-scope"></a>
Everything defined past the global scope refers to local scope. You'll have one global scope and for each function defined it has its own local scope. Like I said before, only functions can create new scopes. So, if I have a function with variables inside it, those variables are in the local scope (the function scope). Look at the example below.

{% highlight javascript %}
// Scope A: Global scope
var myFunction = function() {
	// Scope B: Local scope
	var fullName = "David Gilmour";
	console.log(fullName); // David Gilmour
}
console.log(fullName); // Uncaught ReferenceError: fullname is not defined
{% endhighlight%}

We can't access the `fullName` variable because it is locally scoped and it isn't exposed to the parent scope.

### 1.4. Function Scope <a name="function-scope"></a>
Just remember: Functions creates scopes.

{% highlight javascript %}
// Scope A
var myFunction = function() {
	// Scope B
	var someOtherFunction = function() {
		// Scope C
	}
}
{% endhighlight%}

### 1.5. Lexical Scope <a name="lexical-scope"></a>
Also called as Closure or Static Scope, Lexical Scope is the possibility of an inner scope access a variable or function in parent scope.

{% highlight javascript %}
// Scope A
var myFunction = function() {
	// Scope B
	var fullName = "David Gilmour"; // It is defined in Scope B
	var someOtherFunction = function() {
		// Scope C
		console.log("I'm listening " + fullName + " albuns.");
	}
	console.log(fullName); // "David Gilmour"	
	someOtherFunction(); // Will log out: "I'm listening David Gilmour albuns."
}
{% endhighlight%}

Lexical scope is easy to understand and work with. Just think that _any_ variable, object and functions defined in **it's** parent scope are available in the scope chain. The important thing to remember is that Lexical scope **doesn't** work backwards.

{% highlight javascript %}
// Scope A
// fullName = undefined
var myFunction = function() {
	// Scope B
	// fullName = undefined
	var someOtherFunction = function() {
		// Scope C
		var fullName = "David Gilmour"; // Local scope
	}
}
{% endhighlight%}


##2. The `this` keyword <a name="the-this-keyword"></a>
`this` keyword could be hard to use if you don't exacly know how it works.
The `this` keyword always refers to **owner** of the function we're executing, or rather, to the object that a function is a method of.

Here is a few very important points to remember about the `this` keyword:
- The `this` keyword value isn't related to the function itself but how the function is called. So it can be dynamic.
- Yoo can change the `this` context through .call(), .apply() and .bind()

### Default context
We can change the `this` vaue in a few different ways and it's usually the _caller_ of a function that can change his context.

#### Window Object, Global Scope
From a regular function declaration we can expect that the `this` value would be `window Object`, which refers to the global scope. The _ownership_ of `this` will be `window`.

{% highlight javascript %}
var someFunction = function() {
	console.log(this); // [object Window]	
};
{% endhighlight%}

#### Object literals
In the case of Object literals, the ownership will be the it's own Object.

{% highlight javascript %}
var someObject = {};
someObject.someMethod = function() {
	console.log(this);	// someObject
};
{% endhighlight%}

So, why isn't `window` the ownership in this case? Because the `window Object` didn't call the function but `someObject` did. It is the same for `constructors`.

#### Prototypes and Constructors

{% highlight javascript %}
var musician = function() {
	var _firstName;
	var _lastName;
	this.setFirstName = function(firstName) {
		this._firstName = firstName;
	};
	this.setLastName = function(lastName) {
		this._lastName = lastName;
	};
};

musician.prototype.getFullName = function() {
	return this._firstName + ' ' + this._lastName;
};


var Gilmour = new musician();
Gilmour.setFirstName('David');
Gilmour.setLastName('Gilmour');
Gilmour.getFullName(); // David Gilmour
{% endhighlight%}

In both cases above, the `this` ownership is the Constructor object, which is `musician`;

#### Events
Same rules are applied when we bind events. The `this` refers to his owner.

{% highlight javascript %}
// .musician = <div class="musician">David Gilmour</div>
var musician = document.querySelector('.musician');
var someFunction = function() {
	console.log(this); // <div class="musician">David Gilmour</div>
};
element.addEventListener('click', someFunction, false);
{% endhighlight%}

To see how `this` is dynamic you can just invoke the function and the return will be different from the event call.

{% highlight javascript %}
// .musician = <div class="musician">David Gilmour</div>
var musician = document.querySelector('.musician');
var someFunction = function() {
	console.log(this);
};
element.addEventListener('click', someFunction, false);  // <div class="musician">David Gilmour</div>

someFunction(); // [object Window]
{% endhighlight%}


### Changing `this` context
There are many reasons why we need to change the context of a function and we have a few methods that use can use to do it: `.call()`,`.apply()` and `.bind()`.

You will use the methods above when you want `this` to refer to something different thant the scope it's in.

With [`.call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) we can pass a new scope and arguments.  They immediately invoke the function.

{% highlight javascript %}
var Musician = function()
{
	this.getFullName = function() {
		console.log(this.firstName + ' ' + this.lastName);
	};
}

var GuitarMan = new Musician();
GuitarMan.getFullName(); //undefined undefined

var Gilmour = {
	firstName: "David",
	lastName: "Gilmour"
};
GuitarMan.getFullName.call(Gilmour); //David Gilmour
GuitarMan.getFullName.apply(Gilmour); //David Gilmour
{% endhighlight%}

Different from `.call()` and `.apply()` the [`.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) method doesn't invoke the function when it is called. It is used to `setup` the context for a function.

{% highlight javascript %}
var Gilmour = {
	firstName: "David",
	lastName: "Gilmour",
	instrument: "Guitar"
};

var Musician = function()
{
	console.log(this);
}.bind(Gilmour);

Musician(); //Gilmour object
{% endhighlight%} 

It can also be used in event handlers to add some extra information: 

{% highlight javascript %}
// .musician = <div class="musician">David Gilmour</div>
var Gilmour = {
	firstName: "David",
	lastName: "Gilmour",
	instrument: "Guitar"
};

var musician = document.querySelector('.musician');
var someFunction = function() {
	console.log(this);
};
element.addEventListener('click', someFunction.bind(Gilmour), false); // Gilmour
{% endhighlight%}

## 3. Closures <a name="closure"></a>
Private and public members in JavaScript is possible using _closures_. Closures treat functions as values, and as functions have his own scope, local variables are "re-created" every time a function is called. It emulates public and private scopes.

JavaScript have some design patterns, such as the `Module` pattern which can create a `public` and `private` scope. As we know that functions create scope, we can create a private scope by wrapping a function inside other function:

{% highlight javascript %}
(function(){
	// here is a private scope
})();
{% endhighlight%}

We can add some functions for use:

{% highlight javascript %}
(function(){
	var myFunction = function() {
		// your code here
	};
})();
{% endhighlight%}

Remember that the function is defined inside a private scope, so it isn't possible to access it from the global scope:

{% highlight javascript %}
(function(){
	var myFunction = function() {
		// your code here
	};
})();
myFunction(); // Uncaught ReferenceError: myFunction is not defined
{% endhighlight%}

So, that's it! If we need the function to be public, we can now use the `Module Pattern` which allow us to scope our functions using private and public scopes and an `Object`. Basically, to turn a function public, we need to return a function or an `Object`.

### Module Pattern

{% highlight javascript %}
var Module = (function(){
	return {
		myPublicMethod: function() {
			console.log('myPublicMethod called');
		}
	};	
})();
Module.myPublicMethod();
{% endhighlight%}

So, follow this idea, everything that **isn't** be returned is private.

{% highlight javascript %}
var Module = (function(){
	var _myPrivateMethod = function() {
		console.log('myPrivateMethod called');
	};
	return {
		myPublicMethod: function() {
			console.log('myPublicMethod called');
		}
	};	
})();
Module.myPublicMethod();
{% endhighlight%}

You myght notice that JavaScript have a naming convetion to begin `private` methods with an underscore, which visually helps you differentiate between public and private methods. This allow us to return an anonymous `Object` simply assigning the function references.

{% highlight javascript %}
var Module = (function(){
	var _myPrivateMethod = function() {
		console.log('myPrivateMethod called');
	};
	var publicMethod = function() {
		console.log('myPublicMethod called');
	};
	return {
		myPublicMethod: publicMethod
	};	
})();
Module.myPublicMethod();
{% endhighlight%}

## 4. Hoisting  <a name="hoisting"></a>
Functions and variable declarations are always moved invisibly to the top of theirs containing scope by JavaScript interpreter. This JavaScript behaviour is called "hoisting".

With variables, only the declaration name is _hoisted_. With `function declaration`, the entire function body will be hoisted. It doesn't is applied for `function expressions` assigned to local variable. Follow the examples below: 

{% highlight javascript %}
console.log(fullName); // undefined
var fullName = "David Gilmour";
console.log(fullName); // David Gilmour
{% endhighlight%}

This will be interpreted like this: 

{% highlight javascript %}
var fullName;
    fullName = "David Gilmour";
{% endhighlight%}

As this is applied to the scope, lets take a look in this function scope.

{% highlight javascript %}
function getFoo() {
	if(true)
	{
		var a = 1;
	}
	var b = 2;
	return;
}
{% endhighlight%}

Will be interpreted like this: 

{% highlight javascript %}
function getFoo() {
	var a, b;
	if(true)
	{
		a = 1;
	}
		b = 2;
	return;
}
{% endhighlight%}

Notice that only the name is hoisted, not the variables value. It isn't he case with `function declarations`, where the entire function body will be hoisted as well.

{% highlight javascript %}
function fooBar() {
	foo(); // TypeError "foo is not a function"
	bar(); // "bar() function"
	/*
		this is a `function expression` which isn't hoisted like `function declaration`.
	*/
	var foo = function () { 
		console.log("foo() function");
	}
	/*
		function declaration
	*/
	function bar() {
		console.log("bar() function");
	}
}
fooBar();
{% endhighlight%}

It is a good practice always declare your variables with just one `var` statement per scope and that it be at the top. Forcing yourself to do this, will be hard to get into some hoisting-related confusion. 

------

Hope it helped you.

------

##### References
> - [Understanding the “this” keyword in JavaScript](http://toddmotto.com/understanding-the-this-keyword-in-javascript/)
> - [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
> - [The this keyword](http://www.quirksmode.org/js/this.html)
> - [Functions : Eloquent Javascript](http://eloquentjavascript.net/03_functions.html)
> - [Private Members in JavaScript - Douglas Crockford](http://javascript.crockford.com/private.html)
> - [JavaScript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)