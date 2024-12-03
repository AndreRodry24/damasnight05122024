export const handleAntiLink = async (sock, msg) => {
    // Expressão regular para capturar URLs, incluindo http://, https://, www., e wa.me/<número>
    const linkPattern = /((https?:\/\/|www\.|wa\.me\/\d+)[^\s]+)/img;

    let text = '';

    // Verifica se a mensagem contém texto (pode ser uma mensagem simples ou uma extendedTextMessage)
    if (msg.message.conversation) {
        text = msg.message.conversation;
    } else if (msg.message.extendedTextMessage) {
        text = msg.message.extendedTextMessage.text;
    }

    // Ignora mensagens do bot
    if (msg.key.fromMe) return;

    // Obtém as informações do grupo (metadata)
    const groupId = msg.key.remoteJid; // ID do grupo

    // Verifica se a mensagem contém um link com base na expressão regular
    if (linkPattern.test(text)) {
        // Apaga a mensagem contendo o link
        await sock.sendMessage(groupId, {
            delete: msg.key,
        });
    }
};
