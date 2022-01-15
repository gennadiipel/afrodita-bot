const Stage = require('./Stage');
const { Scenes, Markup } = require('telegraf')

class RegistrationStage extends Stage {
    constructor(bot) {
        super(bot)
        this.bot = bot
    }


    init() {
        return new Scenes.Stage([this.nameScene(), this.ageScene(), this.genderScene()])
    }


    nameScene() {
        return this.scene(
            'nameScene',
            (ctx) => ctx.reply('Как я могу к Вам обращаться?'),
            'text',
            (ctx) => {
                ctx.session.user = {
                    name: ctx.message.text
                }
                return ctx.scene.enter('ageScene')
            },
            (ctx) => ctx.reply('Приятно познакомиться, ' + ctx.session.user.name)
        )
    }


    ageScene() {
        return this.scene(
            'ageScene',
            (ctx) => ctx.reply('Сколько вам лет?'),
            'text',
            (ctx) => {

                const age = ctx.message.text

                if (isNaN(+age) || +age <= 5 || +age > 100) {
                    return ctx.reply('Пожалуйста, укажите корректный возраст')
                }

                ctx.session.user.age = +age
                return ctx.scene.enter('genderScene')
            },
            (ctx) => ctx.reply('Отлично, ваш возраст - ' + ctx.session.user.age)
        )
    }

    genderScene() {

        const genderKeyboard = Markup.keyboard(['Мужчина', 'Женщина']).oneTime().resize(true)
        return this.scene(
            'genderScene',
            (ctx) => ctx.reply('Спасибо. Теперь необходимо выбрать Ваш пол. Вы...', genderKeyboard),
            'text',
            (ctx) => {
                const gender = ctx.message.text
    
                if (gender.toLowerCase() != 'мужчина' && gender.toLowerCase() != 'женщина') {
                    return ctx.reply('Пожалуйста, укажите корректный пол', genderKeyboard)
                }
    
                ctx.session.user.gender = ctx.message.text
                return ctx.scene.leave()
                // return ctx.scene.enter(photoScene)
            },
            (ctx) => ctx.reply('Отлично, перейдем к следующему шагу...')
        )
    }
}

module.exports = RegistrationStage