# state-management-rx
State management with RxJS PoC (Proof of Concept)

This repository contains a simple Todo application implemented using Redux and RxJS for state management.
The implementation language is TypeScript (unless for the Polymer elements) transpiled into es6 (so only works in
browsers with good es6 support as for instance in Chrome).
![Todos](/images/todos.png)

The view has been implemented using 4 different technologies:
* DOM and RxJS ([master branch](tree/master))
* Angular 2 ([ng2 branch](tree/ng2))
* React ([react branch](tree/react))
* Polymer ([polymer branch](tree/polymer))

In regards to *state management with Redux*, you can find the actions [here](blob/master/src/state/actions.ts),
the reducer [here](tree/master/src/state/reducer) and an overview of the state structure [here](blob/master/src/state/state.ts).

The view components (*app*, *header*, *body* and *footer*) are divided in **container components** (*app*) and
**presentational components** (*header*, *body* and *footer*).

The **container components** are bound to the Redux store and their responsibilities are:
* to pass the *application state* as data to the **presentational components**
* to transform the events emitted by the **presentational components** into *application actions*

Because of this, **container components** are usually application-specific and therefore not as reusable as
**presentational components**. Typically, there is a **container component** by application route which subscribes to
the Redux store when its route gets activated (component attached to the DOM) and unsubscribes when its route gets
deactivated (component dettached from the DOM).

The **presentational components** are less application-specific and therefore more reusable. Typically, they receive
data input as individual properties and fire custom events with arbitrary payload to communicate with the **container**,
which will translate such events into *application actions*.

Except for the DOM and RxJS approach (where the different parts of the view are no components in a strict sense), all
the other technologies follow a component approach and their implementation seems quite similar no matter if
done with Angular 2, React or Polymer.

Component               | ng2                                                                      | react                                                                         | polymer                                                                      | DOM and RxJS
------------------------|--------------------------------------------------------------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------|-------------------------------------------------------
App (container)         | [app-component.ts](blob/ng2/src/view/app-component.ts)                   |  [app-component.tsx](blob/react/src/view/app-component.tsx)                   | [app-element.html](blob/polymer/src/view/app-element.html)                   | [view.ts](blob/master/src/view/index.ts)
Header (presentational) | [todos-header-component.ts](blob/ng2/src/view/todos-header-component.ts) |  [todos-header-component.tsx](blob/react/src/view/todos-header-component.tsx) | [todos-header-element.html](blob/polymer/src/view/todos-header-element.html) | [header-view.ts](blob/master/src/view/header-view.ts)
Body (presentational)   | [todos-body-component.ts](blob/ng2/src/view/todos-body-component.ts)     |  [todos-body-component.tsx](blob/react/src/view/todos-body-component.tsx)     | [todos-body-element.html](blob/polymer/src/view/todos-body-element.html)     | [body-view.ts](blob/master/src/view/body-view.ts)
Footer (presentational) | [todos-footer-component.ts](blob/ng2/src/view/todos-footer-component.ts) |  [todos-footer-component.tsx](blob/react/src/view/todos-footer-component.tsx) | [todos-footer-element.html](blob/polymer/src/view/todos-footer-element.html)   | [footer-view.ts](blob/master/src/view/footer-view.ts)
