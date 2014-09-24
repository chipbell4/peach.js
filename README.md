peach.js
========
![Build Status](https://travis-ci.org/chipbell4/peach.js.svg?branch=develop)

A small 2D game framework for JavaScript. Adds key listeners, a place for game
state, and an object model for game elements. However, its very lightweight
and allows you touch a good bit of internals.

## Start the engine
Here is how you start a game up:

### Init 
Initialize the library with the id of the canvas tag it is using:
```Javascript
Peach.init('canvasID'); //don't put any #'s
```

### Entities
Next, you need to add entities. An entity is a class (or function, or
whatever) that has a couple of things defined for it:
1. A flag `alive` that is either true or false. This value tells the
update loop to remove the item from the draw loop if it is dead.
2. A function `draw()`, that tells the engine how to draw it. It takes no
parameters, but can use the `Peach.context` canvas context or the
`Peach.Primitive` draw routines to draw it.
3. A function `update()`, that tells the engine how to update it after
every frame. If the object needs to know the amount of time since the last
frame, `Peach.gameState.frameTime` will give the milliseconds since the
last frame. If the object needs the width or height of the drawing area,
`Peach.gameState.width` or `Peach.gameState.height` will give that. If the
user needs access to the mouse state, `Peach.Input.state.mouseIsDown` and
`Peach.Input.state.mousePosition` will provide that. If the user needs
access to what keys are pressed, `Peach.Input.state.keys.i` will return
true if the 'i' key is down, but you can use any other letter.

To add an entity to the game, simply `push` it onto `Peach.entities`
manually either globally, or from within another entitys update loop. To
remove an entity, it is better to set the entitys alive = false, to prevent
the update loop from choking (possibly).

Your entities can also provide game state to Peach by ways of
`Peach.gameState`. You can store anything you need here, whether it be a
score, health or whatever. It was meant to be open for editing.

### Start
Call `Peach.start()` and the entities will behave like you told them to. 

## In Closing
Peach is small, lightweight, but simple. It could use extension, and
minification could help for deployment.

Todo
----
* Add support for native mobile events
* Check that all keys are working
* Add an intersection test mechanism
* SVG Branch (or conversion)?
* A pretty cool example game
* Performance tests
    * Max objects before FPS drop
