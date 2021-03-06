from pymitter import EventEmitter


ee = EventEmitter()


# decorator usage
@ee.on("myevent")
def handler1(arg):
    print("handler1 called with", arg)


# callback usage
def handler2(arg):
    print("handler2 called with", arg)
ee.on("myotherevent", handler2)


# emit
ee.emit("myevent", "foo")
# -> "handler1 called with foo"

ee.emit("myotherevent", "bar")
# -> "handler2 called with bar"