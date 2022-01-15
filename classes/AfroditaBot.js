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

        AfroditaUser.isUserExist(ctx.message.from.id).then(isUserExist => {
            if (!isUserExist) {
                ctx.scene.enter('nameScene')
            } else {
                ctx.reply('вы уже зарегистрированы')
            }
        })
    }


    initStages() {
        const registrationStage = new RegistrationStage(this.bot)
    }

}


module.exports = AfroditaBot