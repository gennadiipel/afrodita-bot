const Stage = require('./Stage');
const { Scenes, Markup } = require('telegraf')
const needle = require('needle');
const { BOT_CONFIG } = require('../../config');
const fs = require('fs');



class MainStage extends Stage {
    constructor(bot) {
        super(bot)
        this.bot = bot
    }


    init() {
        return new Scenes.Stage([this.nameScene(), this.ageScene(), this.genderScene(), this.photoScene()])
    }


    voteScene() {
        return this.scene(
            'voteScene',
            (ctx) => ctx.replyWith('Как я могу к Вам обращаться?'),
            'text',
            (ctx) => {
                ctx.session.user = {
                    name: ctx.message.text
                }
                return ctx.scene.enter('photoScene')
            },
            (ctx) => ctx.reply('Приятно познакомиться, ' + ctx.session.user.name)
        )
    }


}

module.exports = RegistrationStage