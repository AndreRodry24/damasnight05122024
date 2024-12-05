// Arquivo: bloquearUsuarios.js

// Função para inicializar e configurar o bot com bloqueio de mensagens privadas
async function configurarBloqueio(sock) {
    // Armazena contadores de mensagens de usuários
    const contadoresMensagens = new Map();

    // IDs dos usuários que não devem ser bloqueados
    const usuariosPermitidos = [
        '558599495181@s.whatsapp.net',
        '558398759516@s.whatsapp.net',
        '558396805283@s.whatsapp.net',
        '558588272385@s.whatsapp.net',
        '558596603268@s.whatsapp.net'
    ];

    // Função para processar mensagens recebidas
    sock.ev.on('messages.upsert', async (msg) => {
        const mensagem = msg.messages[0];
        if (!mensagem.message) return;

        const remetenteId = mensagem.key.remoteJid;

        // Verifica se a mensagem é privada (ID termina com '@s.whatsapp.net')
        if (remetenteId.endsWith('@s.whatsapp.net')) {
            // Ignora usuários permitidos
            if (usuariosPermitidos.includes(remetenteId)) {
                console.log(`Mensagem de usuário permitido: ${remetenteId}`);
                return; // Não bloqueia e sai da função
            }

            // Incrementa o contador de mensagens para o remetente
            if (!contadoresMensagens.has(remetenteId)) {
                contadoresMensagens.set(remetenteId, 1);
                console.log(`Recebendo mensagem privada de: ${remetenteId}`);
            } else {
                const contador = contadoresMensagens.get(remetenteId);
                contadoresMensagens.set(remetenteId, contador + 1);
                console.log(`Usuário ${remetenteId} enviou ${contador + 1} mensagens.`);

                // Envia a mensagem de aviso antes de bloquear
                if (contador + 1 === 2) {
                    try {
                        const mensagemAviso = '⚠️ Você foi bloqueado por enviar mensagens privadas para este bot. 🚫 Mensagens não solicitadas não são permitidas. 🙅‍♂️';
                        await sock.sendMessage(remetenteId, { text: mensagemAviso });
                        console.log(`Mensagem de aviso enviada para ${remetenteId}`);

                        // Bloqueia o usuário após enviar a mensagem de aviso
                        await sock.updateBlockStatus(remetenteId, 'block');
                        console.log(`Usuário ${remetenteId} bloqueado após enviar 2 mensagens.`);
                    } catch (error) {
                        console.error(`Erro ao enviar mensagem ou bloquear usuário ${remetenteId}: ${error.message}`);
                    }
                }
            }
        }
    });
}

export default configurarBloqueio;
