const userMessageCount = new Map(); // Armazena o histórico de mensagens por usuário

const ANTI_FLOOD_TIME = 10000; // Intervalo de tempo (10 segundos)
const MAX_MESSAGES = 10; // Limite máximo de mensagens permitido no intervalo

/**
 * Verifica se o usuário excedeu o limite de mensagens permitido
 * e aplica a punição em caso de flood.
 */
export async function verificarFlood(bot, chatId, message, mentions) {
    const sender = message.key.participant || message.key.remoteJid; // Identifica o remetente da mensagem

    // Inicializa o histórico de mensagens do usuário, caso ainda não exista
    if (!userMessageCount.has(sender)) {
        userMessageCount.set(sender, []);
    }

    const now = Date.now(); // Timestamp atual
    const timestamps = userMessageCount.get(sender);

    // Adiciona o timestamp da mensagem atual ao histórico
    timestamps.push(now);

    // Remove mensagens fora do intervalo definido
    userMessageCount.set(
        sender,
        timestamps.filter((timestamp) => now - timestamp <= ANTI_FLOOD_TIME)
    );

    // Verifica se o usuário excedeu o limite de mensagens
    if (userMessageCount.get(sender).length > MAX_MESSAGES) {
        await aplicarPunicaoPorFlood(bot, chatId, sender);
    }
}

/**
 * Aplica a punição ao usuário que cometeu flood.
 */
async function aplicarPunicaoPorFlood(bot, chatId, user) {
    try {
        // Remove o usuário do grupo
        await bot.groupParticipantsUpdate(chatId, [user], 'remove');

        // Limpa o histórico de mensagens do usuário
        userMessageCount.delete(user);
    } catch (error) {
        console.error('Erro ao aplicar punição por flood:', error);
    }
}
