import pkg from '@whiskeysockets/baileys';
const { fetchProfilePictureUrl } = pkg;

// Defina seus números de WhatsApp
const yourNumbers = [
    '558599495181@s.whatsapp.net',
    '558596603268@s.whatsapp.net',
    '558398759516@s.whatsapp.net',
    '558396805283@s.whatsapp.net',
    '558588272385@s.whatsapp.net'
];

// Função para lidar com atualizações de participantes de grupo
export async function handleGroupParticipantsUpdate(c, update, botInfo) {
    console.log('Update recebido:', update);

    const sendMessages = async (message, mentions, image = null) => {
        const sendPromises = yourNumbers.map(number => {
            const messageData = {
                text: message,
                mentions: mentions,
                quoted: null
            };
            if (image) {
                messageData.image = { url: image };
                messageData.caption = message;
            }
            return c.sendMessage(number, messageData);
        });
        await Promise.all(sendPromises);
    };

    // Função para formatar a data e hora
    const getFormattedDateTime = () => {
        const now = new Date();
        return now.toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' }); // Formato local e fuso horário
    };

    if (update.action === 'promote' && update.participants.length >= 1) {
        const adminPromoted = update.participants[0];
        const adminWhoPromoted = update.author;

        const message = `✅ O usuário @${adminPromoted.split('@')[0]} foi *PROMOVIDO(a) A ADMINISTRADOR(a)* do grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ NIGӇԵ* 💃🎶🍾🍸 por @${adminWhoPromoted.split('@')[0]}.`;
        await sendMessages(message, [adminPromoted, adminWhoPromoted]);
        console.log('Mensagem de promoção enviada:', message);

    } else if (update.action === 'demote' && update.participants.length >= 1) {
        const adminDemoted = update.participants[0];
        const adminWhoDemoted = update.author;

        const message = `❌ O usuário @${adminDemoted.split('@')[0]} foi *REBAIXADO(a) DE ADMINISTRADOR(a)* do grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ NIGӇԵ* 💃🎶🍾🍸 por @${adminWhoDemoted.split('@')[0]}.`;
        await sendMessages(message, [adminDemoted, adminWhoDemoted]);
        console.log('Mensagem de rebaixamento enviada:', message);

    } else if (update.action === 'add' && update.participants.length >= 1) {
        const userAdded = update.participants[0];
        const adminWhoAdded = update.author;

        // Obter a foto de perfil do usuário adicionado
        let profilePic;
        try {
            profilePic = await fetchProfilePictureUrl(userAdded, 'image');
        } catch (error) {
            console.log('Erro ao obter a foto de perfil:', error);
            profilePic = 'default-profile-pic-url'; // URL padrão caso não consiga obter a foto
        }

        const dateTime = getFormattedDateTime();
        const message = `👋 O usuário @${userAdded.split('@')[0]} foi *ADICIONADO(a)* ao grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ NIGӇԵ* 💃🎶🍾🍸 por @${adminWhoAdded.split('@')[0]} em ${dateTime}.`;
        await sendMessages(message, [userAdded, adminWhoAdded], profilePic);
        console.log('Notificação de adição enviada:', message);

    } else if (update.action === 'remove' && update.participants.length >= 1) {
        const userRemoved = update.participants[0];
        const adminWhoRemoved = update.author;

        // Obter a foto de perfil do usuário removido
        let profilePic;
        try {
            profilePic = await fetchProfilePictureUrl(userRemoved, 'image');
        } catch (error) {
            console.log('Erro ao obter a foto de perfil:', error);
            profilePic = 'default-profile-pic-url'; // URL padrão caso não consiga obter a foto
        }

        const dateTime = getFormattedDateTime();
        const message = `👋 O usuário @${userRemoved.split('@')[0]} foi *REMOVIDO(a)* do grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ NIGӇԵ* 💃🎶🍾🍸 por @${adminWhoRemoved.split('@')[0]} em ${dateTime}.`;
        await sendMessages(message, [userRemoved, adminWhoRemoved], profilePic);
        console.log('Notificação de remoção enviada:', message);

    } else {
        console.log('Ação não é uma promoção, rebaixamento, adição ou remoção, ou participantes insuficientes.');
    }
}

// Configurar reconexão
const reconnect = async (client) => {
    console.log('Conexão perdida. Tentando reconectar...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de tentar reconectar
    // Aqui você deve adicionar o código para reestabelecer a conexão
};

// Assinatura do evento de fechamento do cliente
export const setupClient = (c) => {
    c.on('close', () => reconnect(c));
};