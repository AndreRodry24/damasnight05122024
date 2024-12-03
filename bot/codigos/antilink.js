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

// Função para notificar os administradores
const notifyAdmins = async (sock, groupId, offenderId) => {
    try {
        // Obtém informações do grupo
        const groupMetadata = await sock.groupMetadata(groupId);

        // Filtra os administradores
        const admins = groupMetadata.participants.filter(participant =>
            participant.admin === 'admin' || participant.admin === 'superadmin'
        );

        // Gera a lista de mentions (IDs dos administradores)
        const mentions = admins.map(admin => admin.id);

        // Log para verificar administradores encontrados
        console.log('Administradores identificados:', mentions);

        if (mentions.length === 0) {
            console.log('Nenhum administrador encontrado no grupo.');
            return;
        }

        // Mensagem a ser enviada com o usuário e os administradores mencionados
        const message = `🚨🔗 *ᴍᴇɴꜱᴀɢᴇᴍ ꜱᴜꜱᴘᴇɪᴛᴀ ʀᴇᴍᴏᴠɪᴅᴀ!* \n  
*𝚄𝚜𝚞𝚊𝚛𝚒𝚘:* @${offenderId.split('@')[0]} \n 
*𝙼𝚘𝚝𝚒𝚟𝚘:* 🚨⚠️ Esta mensagem contém um link que não é permitido no grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ NIGӇԵ* 💃🎶🍾🍸 \n  
*🚨🔊 𝙰𝚍𝚖𝚒𝚗𝚒𝚜𝚝𝚛𝚊𝚍𝚘𝚛𝚎𝚜:* ${mentions.map(admin => `@${admin.split('@')[0]}`).join(', ')} \n  
*𝙿𝙾𝚁 𝚅𝙰𝙵𝙾𝚁, 𝙰𝚅𝙰𝙻𝙸𝙴𝙼 𝙰 𝚂𝙸𝚃𝚄𝙰𝙲𝙰𝙾!*`;

        // Envia a mensagem para os administradores com menções
        await sock.sendMessage(groupId, {
            text: message,
            mentions: [offenderId, ...mentions], // Inclui o usuário e os administradores nas menções
        });

        console.log('Notificação enviada aos administradores.');
    } catch (error) {
        console.error('Erro ao notificar os administradores:', error);
    }
};

// Função principal para tratar links não permitidos
export const handleAntiLink = async (sock, msg, groupId) => {
    try {
        // Expressão regular para capturar URLs
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

        console.log('Texto da mensagem recebida:', text);

        // Obtém o link de convite do grupo
        const groupInviteLink = await getGroupInviteLink(sock, groupId);

        if (!groupInviteLink) {
            console.error('Não foi possível obter o link de convite do grupo.');
            return;
        }

        const normalizedGroupInviteLink = groupInviteLink.replace(/^https?:\/\//, '').toLowerCase();

        // Verifica se a mensagem contém links
        const links = text.match(linkPattern);

        if (links) {
            for (let link of links) {
                const normalizedLink = link.replace(/^https?:\/\//, '').toLowerCase();

                // Compara o link da mensagem com o link do grupo
                if (normalizedLink !== normalizedGroupInviteLink && !normalizedLink.includes(normalizedGroupInviteLink)) {
                    // Apaga a mensagem contendo o link
                    await sock.sendMessage(groupId, { delete: msg.key });

                    console.log('Mensagem contendo link removida:', normalizedLink);

                    // Notifica os administradores
                    await notifyAdmins(sock, groupId, msg.key.participant || msg.key.remoteJid);
                    break;  // Não precisa continuar verificando outros links na mesma mensagem
                }
            }
        } else {
            console.log('Nenhum link detectado na mensagem.');
        }
    } catch (error) {
        console.error('Erro no handleAntiLink:', error);
    }
};
