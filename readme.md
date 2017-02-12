[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d76a5963342e443bae700ac345907ba9)](https://www.codacy.com/app/spbeat/link?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tomkallen/link&amp;utm_campaign=Badge_Grade)

# Link

## Installation

1. Install the dependencies with `npm install`.
2. Run `npm run build` to create a build in `dist/` folder.
3. Run `npm run start` to start dev server at http://localhost:8080/

## Usage

### HTML:
`<p>At the moment I have <span watchable="cats"></span> cats!</p>`  
create any HTML element with `watchable` attribute with value same as the name of your watchable variable.  
You can put any text or elements inside that will be displayed until watchable is linked.  

### JS: 
- `const cats = new Watchable("cats", {value: 2, type: "number"})`  
creates new watchable  
arguments: `(name, {value: value, type: type})`  
`name` - manadotry, must be the same as variable name  
`value, type` - optional.   
`value` can be any reasonable type. Defaults to `null`  
`type` can be `"string"`, `"number"`, `"boolean"`, `"any"`, defaults to `"any"`  
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
