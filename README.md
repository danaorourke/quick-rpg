Data Flow:


Game.js -> State -> Objects -> World Data


game:
	*	controlls everything through main loop
	*	provides canvas hooks
	*	provides switches for states
	*	calls states
	*	provides helper frameworks - builders
	*	provides save functionality

state:
	*	calls objects
	*	connects objects
	*	connects game functions to objects
	*	collects player input
	*	stores instances of objects
	*	terminates state
	
object:
	* stores object behavior