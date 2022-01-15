const { Telegraf, session } = require('telegraf')
const AfroditaBot = require('./classes/AfroditaBot')
const { BOT_CONFIG } = require('./config')

const bot = new Telegraf(BOT_CONFIG.TOKEN) //сюда помещается токен, который дал botFather

const afroditaBot = new AfroditaBot(bot)