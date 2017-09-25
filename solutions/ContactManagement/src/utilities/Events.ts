/*!
 * Strongly Typed Events for TypeScript - 1.0.1
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

/**
 * Event handler function with a generic sender and a generic argument.
 */

export interface IEventHandler<TSender, TArgs> {
    /**
      * @sender The sender.
      * @args The argument.
      */
    (sender: TSender, args: TArgs);
}

/**
 * Event handler function with a generic argument
 */
export interface ISimpleEventHandler<TArgs> {
    /**
      * @args The argument.
      */
    (args: TArgs);
}

/**
 * Event handler function without arguments
 */
export interface ISignalHandler {
    ();
}

/**
 * Indicates the object implements generic subscriptions. 
 */
export interface ISubscribable<THandlerType> {

    /** 
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: THandlerType, scope? : any): void;

    /** 
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    sub(fn: THandlerType, scope? : any): void;

    /** 
     * Unsubscribe from the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(fn: THandlerType): void;

    /** 
     * Unsubscribe from the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsub(fn: THandlerType): void;

    /**
     * Subscribes to the event only once.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    one(fn: THandlerType): void;

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn: THandlerType): boolean;

    /**
     * Clears all the subscriptions.
     */
    clear(): void;
}

/**
 * Models an event with a generic sender and generic argument.
 */
export interface IEvent<TSender, TArgs> extends ISubscribable<IEventHandler<TSender, TArgs>> {
}

/** 
 * Models a simple event with a generic argument.
 */
export interface ISimpleEvent<TArgs> extends ISubscribable<ISimpleEventHandler<TArgs>> {
}

/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {
}

/** 
 * Base interface for event handling.
 */
export interface IBaseEventHandling<TEventHandler> {

    /** 
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(name: string, fn: TEventHandler): void;

    /** 
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    sub(name: string, fn: TEventHandler): void;

    /** 
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(name: string, fn: TEventHandler): void;

    /** 
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsub(name: string, fn: TEventHandler): void;

    /** 
     * Subscribe once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    one(name: string, fn: TEventHandler): void;

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: TEventHandler): boolean;
}

/**
 * Indicates the object is capable of handling named events.
 */
export interface IEventHandling<TSender, TArgs> extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {
}

/**
 * Indicates the object is capable of handling named simple events.
 */
export interface ISimpleEventHandling<TArgs> extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {
}

/**
 * Indicates the object is capable of handling named signals.
 */
export interface ISignalHandling extends IBaseEventHandling<ISignalHandler> {
}

/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
export class Subscription<TEventHandler> {

    /**
     * Indicates if the subscription has been executed before.
     */
    public isExecuted = false;
    public scope : any;

    /**
     * Creates an instance of Subscription.
     * 
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed` once.
     */
    constructor(public handler: TEventHandler, public isOnce: boolean) {
    }

    /**
     * Executes the handler.
     * 
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    public execute(executeAsync: boolean, scope: any, args: IArguments) {

        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;

            var fn: any = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    }
}

/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
export abstract class DispatcherBase<TEventHandler> implements ISubscribable<TEventHandler> {

    private _wrap = new DispatcherWrapper(this);
    private _subscriptions = new Array<Subscription<TEventHandler>>();

    protected parent : any;

    constructor(incomingParent : any)
    {
        this.parent = incomingParent;
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public subscribe(fn: TEventHandler, scope? : any): void {
        if (fn) {
            let sub = new Subscription<TEventHandler>(fn, false);
            
            sub.scope = scope;

            this._subscriptions.push(sub);
        }
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public sub(fn: TEventHandler, scope? : any): void {
        this.subscribe(fn, scope);
    }

    /** 
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public one(fn: TEventHandler): void {
        if (fn) {
            this._subscriptions.push(new Subscription<TEventHandler>(fn, true));
        }
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    public has(fn: TEventHandler): boolean {

        if (fn) {
            for (let sub of this._subscriptions) {
                if (sub.handler == fn) {
                    return true;
                }
            }
        }

        return false;
    }


    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    public unsubscribe(fn: TEventHandler): void {

        if (fn) {
            for (let i = 0; i < this._subscriptions.length; i++) {
                let sub = this._subscriptions[i];
                if (sub.handler == fn) {
                    this._subscriptions.splice(i, 1);
                    break;
                }
            }
        }
    }


    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    public unsub(fn: TEventHandler): void {
        this.unsubscribe(fn);
    }

    /**
     * Generic dispatch will dispatch the handlers with the given arguments. 
     * 
     * @protected
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    protected _dispatch(executeAsync: boolean, scope: any, args: IArguments): void {
        for (let i = 0; i < this._subscriptions.length; i++) {
            let sub = this._subscriptions[i];

            if (sub.isOnce) {
                if (sub.isExecuted === true) {
                    continue;
                }

                this._subscriptions.splice(i, 1);
                i--;
            }

            sub.execute(executeAsync, sub.scope ? sub.scope : scope, args);
        }
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISubscribable<TEventHandler> {
        return this._wrap;
    }

    /**
     * Clears all the subscriptions.
     */
    public clear(): void {
        this._subscriptions.splice(0, this._subscriptions.length);
    }
}

/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
export class EventDispatcher<TSender, TArgs> extends DispatcherBase<IEventHandler<TSender, TArgs>> implements IEvent<TSender, TArgs>
{
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor(incomingParent : any) {
        super(incomingParent);
    }

    /**
     * Dispatches the event.
     * @param sender The sender.
     * @param args The arguments object.
     */
    public dispatch(sender: TSender, args: TArgs): void {
        this._dispatch(false, this.parent, arguments);
    }

    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    public dispatchAsync(sender: TSender, args: TArgs): void {
        this._dispatch(true, this.parent, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): IEvent<TSender, TArgs> {
        return super.asEvent();
    }
}

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event 
 */
export class SimpleEventDispatcher<TArgs> extends DispatcherBase<ISimpleEventHandler<TArgs>> implements ISimpleEvent<TArgs>
{
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor(incomingParent : any) {
        super(incomingParent);
    }

    /**
     * Dispatches the event.
     * @param args The arguments object.
     */
    public dispatch(args: TArgs): void {
        this._dispatch(false, this.parent, arguments);
    }

    /**
     * Dispatches the events thread.
     * @param args The arguments object.
     */
    public dispatchAsync(args: TArgs): void {
        this._dispatch(true, this.parent, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISimpleEvent<TArgs> {
        return super.asEvent();
    }
}

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event. 
 */
export class SignalDispatcher extends DispatcherBase<ISignalHandler> implements ISignal {

    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor(incomingParent : any) {
        super(incomingParent);
    }

    /**
     * Dispatches the signal.
     */
    public dispatch(): void {
        this._dispatch(false, this.parent, arguments);
    }

    /**
     * Dispatches the signal threaded.
     */
    public dispatchAsync(): void {
        this._dispatch(true, this.parent, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISignal {
        return super.asEvent();
    }
}

/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
export class DispatcherWrapper<THandler> implements ISubscribable<THandler>
{
    private _subscribe: (fn: THandler, scope? : any) => void;
    private _unsubscribe: (fn: THandler) => void;
    private _one: (fn: THandler) => void;
    private _has: (fn: THandler) => boolean;
    private _clear: () => void;

    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher: ISubscribable<THandler>) {
        this._subscribe = (fn: THandler, scope? : any) => dispatcher.subscribe(fn, scope);
        this._unsubscribe = (fn: THandler) => dispatcher.unsubscribe(fn);
        this._one = (fn: THandler) => dispatcher.one(fn);
        this._has = (fn: THandler) => dispatcher.has(fn);
        this._clear = () => dispatcher.clear();
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public subscribe(fn: THandler, scope? : any): void {
        this._subscribe(fn, scope);
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public sub(fn: THandler, scope? : any): void {
        this.subscribe(fn, scope);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsubscribe(fn: THandler): void {
        this._unsubscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsub(fn: THandler): void {
        this.unsubscribe(fn);
    }

    /** 
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public one(fn: THandler): void {
        this._one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    public has(fn: THandler): boolean {
        return this._has(fn);
    }

    /**
     * Clears all the subscriptions.
     */
    public clear(): void {
        this._clear();
    }
}

/**
 * Base class for event lists classes. Implements the get and remove. 
 */
export abstract class EventListBase<TEventDispatcher> {

    private _events: { [name: string]: TEventDispatcher; } = {};

    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    public get(name: string): TEventDispatcher {

        let event = this._events[name];

        if (event) {
            return event;
        }

        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }

    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    public remove(name: string): void {
        this._events[name] = null;
    }

    /**
     * Creates a new dispatcher instance.
     */
    protected abstract createDispatcher(): TEventDispatcher;
}

/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export class EventList<TSender, TArgs> extends EventListBase<EventDispatcher<TSender, TArgs>> {

    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }


    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): EventDispatcher<TSender, TArgs> {
        return new EventDispatcher<TSender, TArgs>(this);
    }
}

/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export class SimpleEventList<TArgs> extends EventListBase<SimpleEventDispatcher<TArgs>> {

    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }


    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SimpleEventDispatcher<TArgs> {
        return new SimpleEventDispatcher<TArgs>(this);
    }
}

/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export class SignalList extends EventListBase<SignalDispatcher> {

    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }

    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SignalDispatcher {
        return new SignalDispatcher(this);
    }
}

/**
 * Extends objects with event handling capabilities.
 */
export abstract class EventHandlingBase<TSender, TArgs> implements IEventHandling<TSender, TArgs> {

    private _events = new EventList<TSender, TArgs>();

    /**
     * Gets the list with all the event dispatchers.
     */
    protected get events(): EventList<TSender, TArgs> {
        return this._events;
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public subscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public sub(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public unsub(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this.unsubscribe(name, fn);
    }

    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public one(name: string, fn: IEventHandler<TSender, TArgs>): void {
        this._events.get(name).one(fn);
    }

    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public has(name: string, fn: IEventHandler<TSender, TArgs>): boolean {
        return this._events.get(name).has(fn);
    }
}

/**
 * Extends objects with simple event handling capabilities.
 */
export abstract class SimpleEventHandlingBase<TArgs> implements ISimpleEventHandling<TArgs> {

    private _events = new SimpleEventList<TArgs>();

    protected get events(): SimpleEventList<TArgs> {
        return this._events;
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public subscribe(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public sub(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this.subscribe(name, fn);
    }

    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public one(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this._events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public has(name: string, fn: ISimpleEventHandler<TArgs>) {
        return this._events.get(name).has(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public unsubscribe(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public unsub(name: string, fn: ISimpleEventHandler<TArgs>): void {
        this.unsubscribe(name, fn);
    }
}

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class SignalHandlingBase implements ISignalHandling {

    private _events = new SignalList();

    protected get events(): SignalList {
        return this._events;
    }

    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public one(name: string, fn: ISignalHandler): void {
        this._events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public has(name: string, fn: ISignalHandler): boolean {
        return this._events.get(name).has(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public subscribe(name: string, fn: ISignalHandler): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public sub(name: string, fn: ISignalHandler): void {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public unsubscribe(name: string, fn: ISignalHandler): void {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    public unsub(name: string, fn: ISignalHandler): void {
        this.unsubscribe(name, fn);
    }
}

export function createEventDispatcher<TSender, TArgs>() {
    return new EventDispatcher<TSender, TArgs>(this);
}

export function createEventList<TSender, TArgs>() {
    return new EventList<TSender, TArgs>();
}

export function createSimpleEventDispatcher<TArgs>() {
    return new SimpleEventDispatcher<TArgs>(this);
}

export function createSimpleEventList<TArgs>() {
    return new SimpleEventList<TArgs>();
}

export function createSignalDispatcher() {
    return new SignalDispatcher(this);
}

export function createSignalList() {
    return new SignalList();
}

var StronglyTypedEventsStatic = {

    EventList: EventList,
    SimpleEventList: SimpleEventList,
    SignalList: SignalList,

    createEventList: createEventList,
    createSimpleEventList: createSimpleEventList,
    createSignalList: createSignalList,

    EventDispatcher: EventDispatcher,
    SimpleEventDispatcher: SimpleEventDispatcher,
    SignalDispatcher: SignalDispatcher,

    EventHandlingBase: EventHandlingBase,
    SimpleEventHandlingBase: SimpleEventHandlingBase,
    SignalHandlingBase: SignalHandlingBase,

    createEventDispatcher: createEventDispatcher,
    createSimpleEventDispatcher: createSimpleEventDispatcher,
    createSignalDispatcher: createSignalDispatcher,

    EventListBase: EventListBase,
    DispatcherBase: DispatcherBase,
    DispatcherWrapper: DispatcherWrapper
};

export var IStronglyTypedEvents = StronglyTypedEventsStatic;

export default StronglyTypedEventsStatic;