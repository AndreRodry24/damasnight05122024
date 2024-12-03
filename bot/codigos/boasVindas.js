export const configurarBoasVindas = async (socket, groupId, participant) => {
    try {
        // Obtendo o nome do participante
        const participantName = participant.split('@')[0];
        console.log(`Nome do participante: ${participantName}`);

        // Tentando obter a foto de perfil do participante
        let profilePictureUrl;
        try {
            profilePictureUrl = await socket.profilePictureUrl(participant, 'image');
            console.log(`URL da foto de perfil para ${participantName}:`, profilePictureUrl);
        } catch (error) {
            console.log(`Erro ao obter a foto de perfil de ${participantName}:`, error);
            profilePictureUrl = 'https://images2.imgbox.com/eb/c1/7E45VM2u_o.jpg'; // Imagem padrão se falhar
        }

        // Criando a mensagem de boas-vindas com menção
        const welcomeMessage = {
            text: `𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐚) 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ*💃🎶🍾🍸 @${participantName} ✨🎉 \n Aqui é um espaço de interação e diversão 24 horas! 🕛🔥 Participe das conversas e aproveite bons momentos com a gente! 💃🎶🍾🍸 \n \n Digite *#regras* para saber quais são.`,
            mentions: [participant]
        };

        console.log("Enviando foto de perfil e mensagem de boas-vindas...");

        // Enviando mensagem com ou sem a imagem de perfil
        if (profilePictureUrl) {
            try {
                await socket.sendMessage(groupId, { 
                    image: { url: profilePictureUrl }, 
                    caption: welcomeMessage.text, 
                    mentions: [participant]
                });
                console.log("Foto de perfil e mensagem de boas-vindas enviadas com sucesso!");
            } catch (sendError) {
                console.error("Erro ao enviar imagem de perfil:", sendError);
                // Se falhar ao enviar a imagem, envia a mensagem sem imagem
                await socket.sendMessage(groupId, { 
                    text: welcomeMessage.text, 
                    mentions: [participant]
                });
                console.log("Mensagem sem imagem de perfil enviada com sucesso!");
            }
        } else {
            await socket.sendMessage(groupId, { 
                text: welcomeMessage.text, 
                mentions: [participant]
            });
            console.log("Mensagem sem imagem de perfil enviada com sucesso!");
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem de boas-vindas:', error);
    }
};
