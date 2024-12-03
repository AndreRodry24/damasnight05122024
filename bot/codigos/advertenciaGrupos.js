// advertenciaGrupos.js

// Objeto para armazenar as advertências
const advertencias = {};

// Função para lidar com mensagens
async function handleMessage(c, message) {
    const { key, message: msg } = message;
    const from = key.remoteJid; // Identificador do grupo
    const sender = key.participant || key.remoteJid; // Identificador do remetente

    // Log da mensagem recebida
    console.log(`Mensagem recebida de ${sender} no grupo ${from}:`, msg);

    // Verifica se o remetente é um administrador
    const groupMetadata = await c.groupMetadata(from);
    const isAdmin = groupMetadata.participants.some(participant => participant.id === sender && participant.admin);

    // Log dos metadados do grupo
    console.log(`Metadados do grupo:`, groupMetadata);
    console.log(`É administrador: ${isAdmin}`);

    // Verifica se a mensagem é uma imagem
    if (msg && msg.imageMessage) {
        const imageCaption = msg.imageMessage.caption;

        // Se a imagem contém #adv e o remetente é um administrador
        if (imageCaption && imageCaption.includes('#adv') && isAdmin) {
            const imageSender = msg.imageMessage.context?.participant; // Captura o remetente da imagem
            await tratarAdvertencia(c, from, imageSender);
        } else if (imageCaption && imageCaption.includes('#adv')) {
            await sendMessage(c, from, `@${sender.split('@')[0]}, você *NÃO tem permissão* para executar esse comando 🚫👨🏻‍✈️ *Ele é EXCLUSIVO dos administradores* do grupo 👏🍻DﾑMﾑS💃🔥Dﾑ NIGӇԵ💃🎶🍾🍸`, sender);
        }
    }

    // Verifica se a mensagem é um comentário (na resposta a uma imagem)
    if (msg && msg.extendedTextMessage) {
        const commentText = msg.extendedTextMessage.text;

        if (commentText && commentText.includes('#adv') && isAdmin) {
            const quotedMessage = msg.extendedTextMessage.contextInfo; // Captura informações da mensagem citada
            const imageSender = quotedMessage?.participant; // Identifica quem enviou a imagem original

            // Se o remetente da imagem original for encontrado, aplica a advertência
            if (imageSender) {
                await tratarAdvertencia(c, from, imageSender);
            } else {
                // Mensagem caso a advertência não possa ser aplicada
                await sendMessage(c, from, `@${sender.split('@')[0]}, você mencionou #adv, mas não foi em um comentário de imagem.`, sender);
            }
        } else if (commentText && commentText.includes('#adv')) {
            await sendMessage(c, from, `@${sender.split('@')[0]}, você *NÃO tem permissão* para executar esse comando 🚫👨🏻‍✈️ *Ele é EXCLUSIVO dos administradores* do grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ*💃🎶🍾🍸`, sender);
        }
    }
}

// Função para tratar advertências
async function tratarAdvertencia(c, groupId, userId) {
    // Inicializa advertências se o usuário não tiver
    if (!advertencias[userId]) {
        advertencias[userId] = 0;
    }

    // Incrementa o contador de advertências
    advertencias[userId]++;

    // Verifica se o usuário atingiu o limite de advertências
    if (advertencias[userId] >= 3) {
        // Banir o usuário
        await banUser(c, groupId, userId);
        await sendMessage(c, groupId, `@${userId.split('@')[0]}, *você foi removido do grupo ❌ devido a três advertências anteriores. Por favor, revise as regras para evitar futuras penalizações.*`, userId);
        delete advertencias[userId]; // Reiniciar o contador
    } else {
        await sendMessage(c, groupId, `@${userId.split('@')[0]}, você recebeu uma *ADVERTÊNCIA* ${advertencias[userId]}/3 ⚠️ por violar as regras do grupo. Por favor, leia as regras antes de postar. *Lembre-se:* ao atingir *três advertências*, você será removido do grupo.❌`, userId);
    }
}

// Função para enviar mensagens
async function sendMessage(c, chatId, message, senderId) {
    await c.sendMessage(chatId, { text: message, mentions: [senderId] });
}

// Função para banir usuário
async function banUser(c, groupId, userId) {
    await c.groupParticipantsUpdate(groupId, [userId], 'remove');
}

export { handleMessage };