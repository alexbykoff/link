[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d76a5963342e443bae700ac345907ba9)](https://www.codacy.com/app/spbeat/link?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tomkallen/link&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/tomkallen/link.svg?branch=master)](https://travis-ci.org/tomkallen/link)
[![codecov](https://codecov.io/gh/tomkallen/link/branch/master/graph/badge.svg)](https://codecov.io/gh/tomkallen/link)


![](./link.png)
# Link  
### An extremly simple micro library that binds variables to DOM  

[Live demo here](https://tomkallen.github.io/link/)  

### Installation (dev)

1. Install the dependencies with `npm install`.
2. Run `npm run build` to create a build in `dist/` folder.
3. Run `npm run start` to start dev server at http://localhost:8080/

### Installation (usage)

1. `<script src="./dist/main.bundle.js"></script>`

## Usage

### HTML:  
currently there are three data attributes you can use in your HTML elements:  
`data-watchable` - this element is replaced with the watchable's value. (watchabale is created as `new Watchable(options)`)    
`data-link` - this element emits its value (i.e - input text) to the bound Watchable  
No listeners or manual HTML updates needed. 
`data-repeat` - this element is a wrapper for enumerable data you want to dispaly as a list. Its child
is used as a model for creating new clones with the same element type and classes.   

`<p>At the moment I have <span data-watchable="cats"></span> cats!</p>`  
create any HTML element with `watchable` attribute with value same as the name of your watchable variable.  
You can put any text or elements inside that will be displayed until watchable is linked. After that an every time the variable is changed the new value is rendered to the DOM.   

### JS: 
- `const cats = new Watchable("cats", {value: 2, type: "number"})`  
creates new watchable  
arguments: `(name, {value: value, type: type})`  
`name` - string, manadotry, must be the same as variable name  
`value, type` - optional.   
`value` can be of any reasonable type. Defaults to `null`  
`type` - string, can be `"string"`, `"number"`, `"boolean"`, `"any"`, defaults to `"any"`  

- `cats.subscribe( () => console.log("The number of cats has changed!"))`  
callback is invoked every time watchable value is changed  
- `cats.value()`  
returns current watchable value  
- `cats.set(cats.value() + 5)`  
DOM is updated with new value, callback is invoked  
- `cats.unsubscribe()`  
no more callbacks  
- `cats.detach()`  
removes watchable, DOM is not updated anymore, value changes are recorded  
- `cats.attach()`  
links to DOM again. Last set value is rendered   
- `cats.type()`  
returns watchable type

### One-way binding:  
`<input type="text" id="myinput" />` - create input with as id  
`<p data-watchable="myInputTracker"></p>` - create watchable element   
  
`const myText = new Watchable("myInputTracker")` - set up watchable  
`myText.binds("myinput")` - bind watchable to input  
`myText.binds()` - unbind watchable  

### Two-way binding:
`<input type="text" id="myinput" data-link="myInputTracker"/>` - add `data-link` attribute with watchable's name to refer to. Both elements are now linked.  
You can `data-link` as much elements to one watchable as you want.   
`myInputTracker.set("new value!");` - input field changes as well.  

## Repeatables:  
`<div data-repeat="mycats"><p>There goes my list of cats</p></div>`
`const catList = new Watchable("mycats")`
`let catArray =["Meower", "Bigelow", "Fluffy", "Jackson"]`
`catList.set(catArray)`  

###You are set.

