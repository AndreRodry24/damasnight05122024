// Função principal para gerenciar mensagens de banimento
export async function handleBanMessage(c, message) {
    try {
        const { key, message: msg } = message;
        const from = key.remoteJid; // Identificador do grupo
        const sender = key.participant || key.remoteJid; // Identificador do remetente

        const groupMetadata = await c.groupMetadata(from);
        const isAdmin = groupMetadata.participants.some(
            participant => participant.id === sender && participant.admin
        );

        // Verificação se o remetente é administrador
        if (!isAdmin) {
            console.log('Ação não permitida, o remetente não é um administrador.');
            return;
        }

        if (msg?.imageMessage) {
            const imageCaption = msg.imageMessage.caption;

            if (imageCaption?.includes('#ban')) {
                const imageSender = msg.imageMessage.context?.participant;
                if (imageSender) await executeBanUser(c, from, imageSender);
            }
        }

        if (msg?.extendedTextMessage) {
            const commentText = msg.extendedTextMessage.text;

            if (commentText?.includes('#ban')) {
                const quotedMessage = msg.extendedTextMessage.contextInfo;
                const imageSender = quotedMessage?.participant;
                if (imageSender) await executeBanUser(c, from, imageSender);
            }
        }

        const messageContent = msg?.conversation || msg?.extendedTextMessage?.text;

        if (messageContent?.startsWith('#ban')) {
            const mentionedUserName = messageContent.match(/@([^\s][^@]*)/)?.[1]?.trim();
            if (!mentionedUserName) return;

            const userToBan = groupMetadata.participants.find(p =>
                p.id.includes(mentionedUserName.replace(/ /g, '').toLowerCase())
            );

            if (userToBan) await executeBanUser(c, from, userToBan.id);
        }
    } catch (error) {
        console.error('Erro ao processar a mensagem:', error);
    }
}

// Função auxiliar para executar banimento de usuário
async function executeBanUser(c, groupId, userId) {
    try {
        await c.groupParticipantsUpdate(groupId, [userId], 'remove');
    } catch (error) {
        console.error('Erro ao banir usuário:', error);
    }
}
