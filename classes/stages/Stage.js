const { Scenes } = require('telegraf')


class Stage {
    constructor(bot) {
        if (this.constructor == Stage) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        bot.use(this.init().middleware());
    }

    init() {
        throw new Error("Method 'init()' must be implemented.");
    }

    scene(
        name,
        onEnter,
        onAction,
        on,
        onLeave,
    ) {

        const scene = new Scenes.BaseScene(name)

        scene.enter((ctx) => onEnter(ctx))
        scene.on(onAction, (ctx) => on(ctx))
        scene.leave((ctx) => onLeave(ctx))

        return scene
    }
}


module.exports = Stage