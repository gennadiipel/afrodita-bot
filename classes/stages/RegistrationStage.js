const Stage = require('./Stage');
const { Scenes, Markup } = require('telegraf')
const needle = require('needle');
const { BOT_CONFIG, MYSQL_CONNECTION } = require('../../config');
const fs = require('fs');



class RegistrationStage extends Stage {
    constructor(bot) {
        super(bot)
        this.bot = bot
    }


    init() {
        return new Scenes.Stage([this.nameScene(), this.ageScene(), this.genderScene(), this.photoScene()])
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
                return ctx.scene.enter('photoScene')
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
                return ctx.scene.enter('photoScene')
            },
            (ctx) => ctx.reply('Отлично, перейдем к последнему шагу...')
        )
    }


    photoScene() {
        return this.scene(
            'photoScene',
            (ctx) => {
                ctx.reply('Теперь необходимо выбрать фотографию, которую\
                 будут оценивать другие пользователи.')
                ctx.reply('Ее позже можно будет изменить.')
                return ctx.reply('Пожалуйста, пришлите Вашу фотографию.')
            },
            'text',
            (ctx) => ctx.reply('Пожалуйста, пришлите Вашу фотографию.'),
            (ctx) => ctx.reply('OK.'),
            (scene) => {
                scene.on('photo', (ctx) => {
                    this.downloadPhoto(ctx.message.from.id, ctx.message.photo[ctx.message.photo.length - 1].file_id)
                })
            }
        )
    }

    downloadPhoto(userId, fileId) {
        needle.get(`https://api.telegram.org/bot${BOT_CONFIG.TOKEN}/getFile?file_id=${fileId}`, function(error, response) {
            if (!error && response.statusCode == 200) {
                const filePath = response.body.result.file_path

                var path = require('path')
                fs.mkdir(BOT_CONFIG.DIR + '/photos/userpics/' + userId, {recursive: true}, (error) => {
                    if (error) throw error
                })
                const localFilePath = BOT_CONFIG.DIR + '/photos/userpics/' + userId + '/' + fileId + '.jpg';

  
                needle.get(`https://api.telegram.org/file/bot${BOT_CONFIG.TOKEN}/${filePath}`)
                .pipe(
                    fs.createWriteStream(localFilePath)                    
                )
                .on('finish', () => {
                    
                })
            }
        });
    }
}

module.exports = RegistrationStage