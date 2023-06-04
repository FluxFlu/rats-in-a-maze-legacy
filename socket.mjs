class socket {
    static sides;
    
    static init () {
        socket.sides ||= {};
    }
    
    constructor (side) {
        socket.init();
        
        this.side = side;
        this.emitList = {};
        
        socket.sides[side] = this;
    }
    get_other() {
        if (this.side == "Client")
            return socket.sides["Server"]
        return socket.sides["Client"]
    }
    emit(name, ...args) {
        if (this.get_other() && this.get_other().emitList[name])
            this.get_other().emitList[name](...args);
    }
    on (name, fn) {
        this.emitList[name] = fn;
    }
}