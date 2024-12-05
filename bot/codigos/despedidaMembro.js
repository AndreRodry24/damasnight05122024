export const configurarDespedida = async (socket, groupId, participant) => {
    try {
        // Obtendo o nome do participante
        const participantName = participant.split('@')[0];
        console.log(`Nome do participante: ${participantName}`);

        // URL do GIF (sem conversão para MP4)
        const gifUrl = 'https://images2.imgbox.com/87/8b/XDyxkgPh_o.png'; // Exemplo de GIF

        // Criando a mensagem de despedida com menção
        const farewellMessage = {
            text: `😭👋 *ADEUS, Manteiga do meu pão* 🙋‍♀️💔 @${participantName}... \n \n  😎✌️ *Foi bom enquanto durou, mas a ilusão foi forte demais!* 😹✌️ \n \n 😹 *Agora vai ser vaquinha e chifre pra todo lado!  🐂🐄😂*`,
            mentions: [participant]
        };

        console.log("Enviando GIF e mensagem de despedida...");

        // Enviando mensagem com o GIF
        try {
            await socket.sendMessage(groupId, {
                image: { url: gifUrl }, // Aqui é tratado como uma imagem (GIF)
                caption: farewellMessage.text,
                mentions: [participant]
            });
            console.log("GIF e mensagem de despedida enviados com sucesso!");
        } catch (sendError) {
            console.error("Erro ao enviar GIF:", sendError.message || sendError);
            // Se falhar ao enviar o GIF, envia apenas a mensagem sem o GIF
            await socket.sendMessage(groupId, { 
                text: farewellMessage.text, 
                mentions: [participant]
            });
            console.log("Mensagem sem GIF enviada com sucesso!");
        }
    } catch (error) {
        console.error('Erro ao processar a despedida:', error.message || error);
    }
};
