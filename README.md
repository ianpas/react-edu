# Introduction
This project is inspired by this article: [Gooact: React in 160 lines of JavaScript](https://medium.com/@sweetpalma/gooact-react-in-160-lines-of-javascript-44e0742ad60f). In order to fully understand react, I decided to implement my own react, named as "rigid".

# Scope
Instead of writing another demo of react, this project focuses on code quality. I tried hard to make code readable, maintainable and scalable. Main features of this project are:

* Developed with typescript and unit test
* All examples come from official react tutorial and documentation

Currently, it's capable of running all examples in react documentation [Main Concepts](https://reactjs.org/docs/hello-world.html) part and the tic-tac-toe game in [tutorial](https://reactjs.org/tutorial/tutorial.html) part .

# Examples

For ease of reference, links in react documentation to codepen are listed parallel with rigid implementations. 

Since the APIs are almost the same (eg. differ in naming convension, such as setState and SetState), source code of examples are almost the same and they are placed in /example folder.

| Main Concepts                                                                              	| Rigid                                                                                                                                                             	| React                                                                                                                                                                                 	|
|--------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| [3. Rendering Elements](https://reactjs.org/docs/rendering-elements.html)                  	| [react-3-rendering-elements](https://ianpas.github.io/react-edu/react-3-rendering-elements/)                                                                      	| [codepen](https://reactjs.org/redirect-to-codepen/rendering-elements/update-rendered-element)                                                                                         	|
| [4. Components and Props](https://reactjs.org/docs/components-and-props.html)              	| [react-4-components-and-props](https://ianpas.github.io/react-edu/react-4-components-and-props/)                                                                  	| [codepen](https://reactjs.org/redirect-to-codepen/components-and-props/extracting-components-continued)                                                                               	|
| [5. State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)                	| [react-5-state-and-lifecycle](https://ianpas.github.io/react-edu/react-5-state-and-lifecycle/)                                                                    	| [codepen](http://codepen.io/gaearon/pen/zKRqNB?editors=0010)                                                                                                                          	|
| [6. Handling Events](https://reactjs.org/docs/handling-events.html)                        	| [react-6-handling-events](https://ianpas.github.io/react-edu/react-6-handling-events/)                                                                            	| [codepen](http://codepen.io/gaearon/pen/xEmzGg?editors=0010)                                                                                                                          	|
| [7. Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)            	| [react-7-conditional-rendering](https://ianpas.github.io/react-edu/react-7-conditional-rendering/)                                                                	| [codepen](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)                                                                                                                         	|
| [8. Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)                          	| [index version](https://ianpas.github.io/react-edu/react-8-lists-and-keys(index)/), [key version](https://ianpas.github.io/react-edu/react-8-lists-and-keys(id)/) 	| [index version](https://reactjs.org/redirect-to-codepen/reconciliation/index-used-as-key), [key version](https://reactjs.org/redirect-to-codepen/reconciliation/no-index-used-as-key) 	|
| [9. Forms](https://reactjs.org/docs/forms.html)                                            	| [react-9-forms](https://ianpas.github.io/react-edu/react-9-forms/)                                                                                                	| [codepen](https://codepen.io/gaearon/pen/wgedvV?editors=0010)                                                                                                                         	|
| [10. Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)                     	| [react-10-lifting-state-up](https://ianpas.github.io/react-edu/react-10-lifting-state-up/)                                                                        	| [codepen](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)                                                                                                                         	|
| [11. Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) 	| [react-11-composition-vs-inheritance](https://ianpas.github.io/react-edu/react-11-composition-vs-inheritance/)                                                    	| [codepen](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)                                                                                                                         	|
| [12. Thinking In React](https://reactjs.org/docs/thinking-in-react.html)                   	| [react-12-thinking-in-react](https://ianpas.github.io/react-edu/react-12-thinking-in-react/)                                                                      	| [codepen](https://codepen.io/gaearon/pen/LzWZvb)                                                                                                                                      	|
| [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)                     	| [react-tutorial-tic-tac-toe](https://ianpas.github.io/react-edu/react-tutorial-tic-tac-toe/)                                                                      	| [codepen](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)                                                                                                                         	|

# Project structure

* /example : source code of examples
* /public : examples are built and placed here
* /src : 
  * /src/common : common utility functions
  * /src/element : create rigit element, JSX will be translated into CreateElement
  * /src/component : rigid component class def
  * /src/renderer : take vdom in, return rendered dom
  * /src/patcher : take dom and vdom in, return patched
* /test :
  * /test/common: utility for building vdom data
  * /test/rendering: test rendering
  * /test/patch: test patching

# Code coverage

[coverage report](https://ianpas.github.io/react-edu/coverage/lcov-report/index.html)

# Local setup

Run "npm install" to install packages required by this project.

```
$ npm install
```

You may want to run "npm run build" to generate aforementioned examples in /public folder, and then explore the code.

```
$ npm run build
```

To run unit test:

```
$ npm test
```

# License

MIT