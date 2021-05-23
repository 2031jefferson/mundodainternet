module.exports = msgBot = async (client, message) => {
    const {id} = message

    client.sendText(id, 'Ola mundo')

}