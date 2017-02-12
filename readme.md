# Link

## Installation

1. Install the dependencies with `npm install`.
2. Run `npm run start` to create a build in `dist/` folder.

## Usage

### HTML:
`<p>At the moment I have <span watchable="cats"></span> cats!</p>`  
create any HTML element with `watchable` attribute with value same as the name of your watchable variable.  
You can put any text or elements inside that will be displayed until watchable is linked.  

### JS: 
- `const cats = new Watchable("cats", {value: 2})`  
creates new watchable
- `cats.link()`  
links watchable to DOM   
- `cats.subscribe( () => console.log("I have more cats now!"));`  
callback is invoked every time watchable value is changed  
- `cats.set(5)`  
DOM is updated with new value, callback is invoked  
- `cats.unsubscribe()`  
no more callbacks  
- `cats.detach()`  
removes watchable, DOM is not updated anymore  
