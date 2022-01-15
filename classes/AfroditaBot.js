var AfroditaUser = require("./AfroditaUser")
const { Scenes, session, Markup } = require('telegraf')
const RegistrationStage = require("./stages/RegistrationStage")

class AfroditaBot {

    constructor(bot) {

        this.bot = bot
        
        bot.use(session())
        this.initStages()
        
        bot.start(
            (ctx) => this.start(ctx)
        )

        bot.launch()

    }

    start(ctx) {
        if (!AfroditaUser.isUserExist()) {
            ctx.scene.enter('nameScene')
        }
    }


    initStages() {
        const registrationStage = new RegistrationStage(this.bot)
    }

}


module.exports = AfroditaBot
// module.exports = Scenes