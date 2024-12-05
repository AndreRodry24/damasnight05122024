export const blacklist = [
    '556781366643@s.whatsapp.net', 
    '5519992350482@s.whatsapp.net',
    '5511970662569@s.whatsapp.net',
    '5511999680582@s.whatsapp.net',
    '5524999331275@s.whatsapp.net',
    '+14259810678@s.whatsapp.net',
    '5521989812827@s.whatsapp.net',
    '5521975528535@s.whatsapp.net'  
];

const BATCH_SIZE = 500; // Tamanho de cada lote para processamento da blacklist

// Função para dividir a blacklist em lotes
function splitBlacklist(blacklist, batchSize) {
    const batches = [];
    for (let i = 0; i < blacklist.length; i += batchSize) {
        batches.push(blacklist.slice(i, i + batchSize));
    }
    return batches;
}

// Função que verifica se o usuário está na blacklist em lotes
async function checkBlacklistInBatches(sock, groupId, participants) {
    const batches = splitBlacklist(blacklist, BATCH_SIZE);

    for (const batch of batches) {
        for (const participant of participants) {
            const usuarioId = participant.id;

            // Verifica se o usuário está na blacklist
            if (batch.includes(usuarioId)) {
                console.log(`Usuário ${usuarioId} está na blacklist. Removendo do grupo.`);

                // Remove o usuário do grupo
                await banUser(sock, groupId, usuarioId);

                // Notifica o grupo
                await notifyUserRemoved(sock, groupId, usuarioId);
            }
        }
    }
}

export async function handleGroupParticipants(sock, groupId) {
    try {
        // Obtém os participantes do grupo
        const groupMetadata = await sock.groupMetadata(groupId);
        const participants = groupMetadata.participants;

        console.log(`Verificando participantes do grupo ${groupId}...`);

        // Verifica os participantes em lotes
        await checkBlacklistInBatches(sock, groupId, participants);
    } catch (err) {
        console.error(`Erro ao verificar participantes do grupo ${groupId}:`, err);
    }
}

export async function handleMessage(sock, message) {
    console.log("Mensagem recebida:", message);

    const textoMensagem = message.message?.conversation || message.message?.imageMessage?.caption;

    if (textoMensagem) {
        const grupoId = message.key.remoteJid;
        const usuarioId = message.key.participant || message.key.remoteJid;

        // Verifica se o usuário está na blacklist
        if (blacklist.includes(usuarioId)) {
            console.log(`Usuário ${usuarioId} está na blacklist. Ignorando e removendo mensagem.`);

            // Apaga a mensagem do grupo
            await sock.sendMessage(grupoId, { delete: message.key });

            // Remove o usuário do grupo
            await banUser(sock, grupoId, usuarioId);

            // Notifica o grupo
            await notifyUserRemoved(sock, grupoId, usuarioId);
        }
    }
}

export async function banUser(sock, groupId, userId) {
    try {
        await sock.groupParticipantsUpdate(groupId, [userId], 'remove');
        console.log(`Usuário ${userId} removido do grupo ${groupId}`);
    } catch (err) {
        console.error(`Erro ao remover usuário ${userId} do grupo ${groupId}:`, err);
    }
}

export async function notifyUserRemoved(sock, groupId, userId) {
    try {
        const userMention = `@${userId.split('@')[0]}`;
        await sock.sendMessage(groupId, { 
            text: `*Usuário(a):* ${userMention} foi *BANIDO(a)* do grupo 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ*💃🎶🍾🍸 \n \n *Motivo:* Está na lista negra! 🚷🚫`,
            mentions: [userId]
        });
        console.log(`Notificação enviada ao grupo ${groupId} para usuário ${userId}.`);
    } catch (err) {
        console.error(`Erro ao enviar notificação ao grupo ${groupId}:`, err);
    }
}

// Exemplo de uso: Verificar participantes ao entrar no grupo
export async function onGroupJoin(sock, groupId) {
    console.log(`Bot entrou no grupo ${groupId}. Iniciando verificação.`);
    await handleGroupParticipants(sock, groupId);
}
