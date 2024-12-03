// Função para obter o link de convite do grupo
const getGroupInviteLink = async (sock, groupId) => {
    try {
        // Obtém o código de convite do grupo
        const inviteCode = await sock.groupInviteCode(groupId);
        
        // Gera o link de convite com base no código
        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
        
        return inviteLink;
    } catch (error) {
        console.error('Erro ao obter o link de convite do grupo:', error);
        return null;
    }
};

export const handleAntiLink = async (sock, msg, groupId) => {
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

    // Obtém o link de convite do grupo
    const groupInviteLink = await getGroupInviteLink(sock, groupId);

    if (!groupInviteLink) return; // Se não conseguiu obter o link, não continua

    // Normaliza o link de convite do grupo (remover qualquer `http://` ou `https://` para facilitar a comparação)
    const normalizedGroupInviteLink = groupInviteLink.replace(/^https?:\/\//, '').toLowerCase();

    // Verifica se a mensagem contém um link com base na expressão regular
    const links = text.match(linkPattern);

    if (links) {
        // Verifica se algum link é diferente do link do grupo
        for (let link of links) {
            // Normaliza o link da mensagem
            const normalizedLink = link.replace(/^https?:\/\//, '').toLowerCase();

            // Compara o link da mensagem com o link do grupo
            if (normalizedLink !== normalizedGroupInviteLink && !normalizedLink.includes(normalizedGroupInviteLink)) {
                // Se o link for diferente, apaga a mensagem contendo o link
                await sock.sendMessage(groupId, {
                    delete: msg.key,
                });
                break; // Para assim que encontrar um link diferente
            }
        }
    }
};
