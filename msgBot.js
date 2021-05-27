
const fs = require('fs-extra')
const {decryptFile } = require('venom-bot')
const http = require('http')
const axios = require('axios')
const { index } = require('mathjs')
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const simi = JSON.parse(fs.readFileSync('./settings/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./settings/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
const prem = JSON.parse(fs.readFileSync('./lib/database/prem.json'))
const json = require('./lib/json.js')

//Variaveis referente a FS-EXTRA
let vip = JSON.parse(fs.readFileSync('./cadastro/vip.json'))
let cadastrar = JSON.parse(fs.readFileSync('./cadastro/cadastro.json'))
let cadastrarUserName = JSON.parse(fs.readFileSync('./cadastro/username.json'))

let { 
    ownerNumber, 
    groupLimit, 
    memberLimit,
    prefix,
    vhtearkey,
    keepSave,
    iTechApi,
    apiKey
} = setting

const {
    apiNoBg,
	apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit){
    let	reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
    }
    return false;
}


module.exports = msgBot = async (client, message) => {
    try{
        const {filehash, fromMe, height, filename, deprecateMms3Url, directPath, clientUrl, content, broadcast, ack, type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList, messageId} = message
        let { body, user } = message
        var { name, formattedTitle, gcok} = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        //const botNumber = await client.getHostNumber() + '@c.us'
      //  const groupId = isGroupMsg ? client.groupmetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(from) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const serial = sender.id
        //const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
       // const blockNumber = await client.getBlockedIds()
       // const groupMembers = isGroupMsg ? await client.participants(groupId) : ''
        //const GroupLinkDetector = antilink.includes(chatId)
       // const stickermsg = message.type === 'sticker'

        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
		const argx = chats.slice(0).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
		
        // [IDENTIFY]
        const ownerNumber = "554598331383@c.us"
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isOwner = ownerNumber.includes(pengirim)
        const isOwnerB = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
		const isSimi = simi.includes(chatId)
		const isNgegas = ngegas.includes(chatId)
        const isImage = type === 'image'
        const isPrem = prem.includes(pengirim)
        var nomegrupo = name

        const mess = {
            wait: '[ wait ], em andamento jovem'
        }

        client.onAddedToGroup((chat) => {
            client.sendText(chat.id, 'Ola amigo')
        })
        var regExp1 = /(Http:\/\/)|(Https:\/\/)|(\.com)/gi
        var status = regExp1.test(message.body)
        if(status == true){
            client.reply(from, `Link detectado`, id)
        }


        switch(command){
            case 'wallpaper':
                client.reply(from, mess.wait, id);
                axios.get('https://akaneko-api.herokuapp.com/api/mobileWallpapers').then(res => {
                    client.sendFileFromBase64(from, res.data.url, 'Desktop Wallpaper.jpeg', 'Enjoy :>', id);
                });
                break
            case 'cadastrar':
                if(verificarCadastros() == true) return client.reply(from, `voce ja esta no sistema.`, id)
                cadastrarUser(args[0])
                break;
            case 'admin':
                console.log(isAdminGrupo())
                if(isAdminGrupo() == false) return client.reply(from, `^-^ *${pushname}* Você não é Adminstrador(a)`, id)
                if(isGroupMsg == false) return client.reply(from, '*USO apenas em grupo*, Valeu a tentativa..', id)
                client.reply(from, `*${pushname}* _ACESSO LIBERADO_ - Enviei um codigo no chat privado seu! Tambem enviei as informações importante desta função `, id)
                client.reply(author, `_[cod00000] Fala cheef_ esta função esta sendo desenvolvida ainda! mais em breve estara supor funcionando.`, id)
                break;
            case 'vip':
                if(verificarCadastroVip() == true) return client.reply(from, '*Uau kk* Você ja se cadastrou! Obrigado, Divirta-se com os privilegios!', id);
                cadastrandoVip() // função de cadastro
                break;
            case 'menu':
                
                let text = `
*>>>  MENU - BOT  <<<*

_Status VIP_: *${verificarCadastroVip()}* 

-- OPÇÕES:
*${prefix}sobre* - Sobre o bot
*${prefix}regras* - Regras do Clã ONU
*${prefix}vip* - Ativar vip no Bot
*${prefix}inst* - Instagram Creator (Owner)

\`\`\`Envie um das opções acima destacado em negrito para mais detalhes\`\`\`  `

                client.reply(from, text, id)
                break;
            case 'message':
                let txt1 = `
body ${body}
ack ${ack}
author ${author}
*broadcast* : ${broadcast}
*caption* : ${caption}
*chat* : ${chat}
*chatId* : ${chatId}
*clientUrl* : ${clientUrl}
*content* : ${content}
*deprecateMms3Url* : ${deprecateMms3Url}
*directPath* : ${directPath}
*filehash* : ${filehash}
*filename* : ${filename}
*from* : ${from}
*fromMe* : ${fromMe}
*height* : ${height}
grupo de admins: ${groupAdmins[0], groupAdmins[1]}
                
                `
                client.reply(from, txt1, id)
                break;
            case 'linkgrupo':
                if(message.author == config.Admin + '@c.us') return client.reply(from, `você nao é administrador do grupo!`, id)
                var linkg = await client.getGroupInviteLink(from)
                await client.sendMessageWithThumb('e', linkg, `JEF - ${name}`, 'link deste chat', chatId) 
                break;
            case 'criador':

                await client.getNumberProfile(id, 'feito')
                await client.sendContactVcard(from, '554598331383@c.us', 'Jefferson Alionco')
                break;
            case 'inst':
                await client.sendMessageWithThumb('e', 'https://www.instagram.com/jeffersonla_/', 'JEFFERSON - NAÇÕES UNIDAS', 'O clã nações unidas é um dos melhores grupos brasileiros dentro do game Mafia City', chatId)
                break;
            case 'sobre':
                if (isGroupMsg){ 
                console.log(author)
                client.reply(author, `_posso responder aqui!!_`, id)
                return client.reply(from, '*Desculpe, este comando só pode ser usado no meu privado!* _JÁ ENVIEI UM UP NO PV KK_', id)
                }
                client.reply(from, '_- Sou um sistema sendo desenvolvido em javascript, baseado no Projeto venom... PARA MAIS INFOMAÇÃO CONSULTA O DOCS VENOM_', id);
                break;
            case 'regras':
                var texto = `
                
💥    REGRAS DO CLÃ    💥
                
BOT JHEFFER: 


                1° Nunca atacar outros jogadores, nem mesmo gangue de coletas!
                
                2°  Contribuir na opção de propriedades do Clã, ficando ativo no minimo 1 vez por dia, se ficar mais deve justificar antes, para nao ser rebaixado.
                
                4° Respeite os outros 
                
                5° Os ataques são permitidos apenas durante a morte. 
                
                6° Ataques na mansão de outro clã são permitidos se eles estiverem na colméia do seu clã. 
                
                7° Não ataque torres, fazendas, zonas comerciais de outros clãs. 
                
                8°. Não colete recursos no território de outras alianças. 
                
                9° As fazendas devem ter a palavra "Fazenda" nelas, ter a bandeira do Vaticano e ser membros apenas de clãs agrícolas. 
                
                10° Mansões abandonadas e sem clãs podem ser atacadas a qualquer momento ... 9
                
                 11° O ataque de um jogador é banido mais de duas vezes em 24 horas por uma villa.
                
                
                
                _____ESSAS REGRAS NAO SE APLICA NO DESERTO! APENAS NA CIDADE! NO DESERTO É LIVRE.`
                client.reply(from, `*${pushname}* ${texto}`, id)
                break;

        }
    function idUsuario(){
        let fiduser
        if(isGroupMsg){
            fiduser = author
        }else{
            fiduser = from
        }
        return fiduser // retorna id do usuario
    }
    function verificarCadastroVip(){
        let cadastradoOuNao
                let qtdCadastro = vip.length - 1
                for(let i = 0; i <= qtdCadastro; i++){
                    if(vip[i] == idUsuario()){
                        cadastradoOuNao = true;
                    }else{
                        cadastradoOuNao = false;
                    }
                }
                return cadastradoOuNao // Retorna true para cadastrado // false para nao cadastrado no vip
    }
    function isAdminGrupo(){
        let resultt = false
        let nTotalAdmins = groupAdmins.length
        console.log(nTotalAdmins)
        
        
        for(let i = 0; i < nTotalAdmins; i++){
            let iduser = `${groupAdmins[i].user}@c.us`

            if(idUsuario() == iduser){
                resultt = true
            }else{
                resultt = false
            }
            console.log('n', i)
        }
        return resultt;
    }
    function verificarCadastros(){
        for(let i = 0; i < cadastrar.length; i++){
            if(idUsuario() == cadastrar[i]){
                return true
            }
        }
    }
    function cadastrarUser(args0){
        cadastrar.push(json.cadastro(idUsuario(), args0, pushname))
        fs.writeFileSync('./cadastro/id.js', JSON.stringify(cadastrar))
        
        cadastrarUserName.push(args0)
        fs.writeFileSync('./cadastro/username.js', JSON.stringify(cadastrarUserName))
        client.reply(from, `${pushname}, você cadastrou seu contato no sistema com o user-Name *${args0}*`)

    }
    function cadastrandoVip(){
        if(isGroupMsg){
            vip.push(author)
            fs.writeFileSync('./cadastro/vip.json', JSON.stringify(vip))
            client.reply(from, '_- Ok, Cadastrado(a) com sucesso._', id)
        }else{
            vip.push(from)
            fs.writeFileSync('./cadastro/vip.json', JSON.stringify(vip))
            client.reply(from, '_- Ok, Cadastro efetuado com sucesso..._', id)
        }
    }
    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
      }
      

    }catch(err){
        console.log('[ERROR]', err)
    }

}