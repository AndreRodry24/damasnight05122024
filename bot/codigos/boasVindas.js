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

        // Array com mensagens de boas-vindas
        const welcomeMessages = [

            `🎉💃 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ*💃🎶🍾🍸 @${participantName} ✨🎉 
            \n Aqui é um espaço de interação e diversão 24 horas! 🕛🔥 Participe das conversas e aproveite bons momentos com a gente! 💃🎶🍾🍸 
            \n \n Digite *#regras* para saber quais são.`,

            `💃👏 𝐎𝐁𝐀! 𝐓𝐄𝐌𝐎𝐒 𝐍𝐎𝐕𝐈𝐃𝐀𝐃𝐄𝐒! 🎊✨  
            \n 𝐒𝐄𝐉𝐀 𝐌𝐔𝐈𝐓𝐎 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) 𝐀𝐎 𝐆𝐑𝐔𝐏𝐎 🌟💬 *DﾑMﾑS* 💃🔥 *Dﾑ NIGӇԵ* 🎶💥 @${participantName}, sua presença já deixou tudo mais animado! 🙌🎉
            \n 🎈 Aqui é o espaço perfeito pra se divertir e trocar ideias incríveis, 24/7! 💬🔥 Bora interagir e fazer parte dessa festa❓ 🥳 
            \n \n 📌 Não deixe de digitar *#regras* pra ficar por dentro das diretrizes do grupo. 😉✅`,

            `💃👏 𝐒𝐄𝐍𝐒𝐀𝐂𝐈𝐎𝐍𝐀𝐋! ✨ 𝐌𝐀𝐈𝐒 𝐔𝐌𝐀 𝐏𝐄𝐒𝐒𝐎𝐀 𝐀𝐍𝐈𝐌𝐀𝐃𝐀 𝐍𝐎 𝐆𝐑𝐔𝐏𝐎! 🎉🔥  
            \n 𝐎𝐋𝐀́, @${participantName} 🌟💃 *DﾑMﾑS* 🎶 *Dﾑ NIGӇԵ* 🎊 está em festa com sua chegada! 🙌💥  
            \n 🎈 Aqui a diversão rola solta e a troca de ideias não para, 24/7! 💬✨ Sinta-se à vontade para interagir e brilhar com a galera! 🌟🥳  
            \n \n 📌 Não esqueça de digitar *#regras* pra conhecer as diretrizes e manter o grupo top! ✅😉`,

            `💃💥 *𝐄𝐒𝐓𝐎𝐔𝐑𝐎𝐔!* 🎇 𝐍𝐎𝐒𝐒𝐎 𝐆𝐑𝐔𝐏𝐎 𝐆𝐀𝐍𝐇𝐎𝐔 𝐌𝐀𝐈𝐒 𝐔𝐌 𝐌𝐄𝐌𝐁𝐑𝐎 𝐒𝐔𝐏𝐄𝐑 𝐄𝐒𝐓𝐈𝐋𝐎(𝐀)! 🔥✨
            \n 🥳 𝐒𝐄𝐉𝐀 𝐌𝐔𝐈𝐓𝐎 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) @${participantName} 🌟🎶 *DﾑMﾑS* 💃 *Dﾑ NIGӇԵ* 🎉 está com tudo agora com você por aqui! 💬✨  
            \n 🚀 Aqui o clima é de energia positiva e muita conexão! Não economize nos emojis e nem nas risadas! 😂🎉
            \n \n 📖 Já sabe, né❓ Digite *#regras* pra ficar por dentro e deixar o ambiente incrível pra todo mundo! ✅😉`,
            
            `💃🎶🔥 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ* 💃🎶🍾🍸 @${participantName}💃🍾 Você acaba de aterrissar no grupo mais animado de todos! 💃🎶🍾🍸
            \n O clima aqui é pura festa, diversão e muita interação 24h por dia! 🕛🔥 Vamos agitar as conversas e aproveitar cada segundo com muita alegria! 💬🎶🍾🍸
            \n \n *E aí, pronto para se jogar na diversão* ❓ Não perca tempo e digite *#regras* para saber tudo o que você precisa para arrasar por aqui! ✅😉`,

            `💃🎊🌟 *PREPARA QUE A DIVERSÃO COMEÇOU @${participantName} 🎉* Agora a vibe é só alegria, dança e muita energia boa no 💃🔥 *DﾑMﾑS* 🎶 *Dﾑ* *NIGӇԵ* 🍸💥
            \n A festa agora tá completa com você por aqui! O clima é de pura energia 24h por dia! 🕛🔥 Vamos agitar, dançar e se divertir até não aguentar mais! 💬🎶🍾🍸
            \n \n Não perca tempo e mande logo *#regras* para entrar na onda e aproveitar tudo o que o grupo tem a oferecer! 😜🎉`,

             `💃🍾🍸 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ* 💃🎶🍾🍸 @${participantName} 
             \n *Agora a energia do grupo subiu!* 🚀 Aqui, a diversão não tem hora pra começar e nem pra terminar! *24h de pura interação e boas vibrações!* 🕛🔥 Prepare-se para momentos épicos com muitos emojis, risadas e danças até o amanhecer! 💃🎶🍾🍸
             \n \n *Não perca tempo!* 💃🔥 Digite *#regras* e entre na vibe que já está rolando por aqui! Vamos juntos agitar o grupo! 😎🎉`,

             `🎉👏💃 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) @${participantName} 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ* 💃🎶🍾🍸 Agora o grupo *DﾑMﾑS* está ainda mais poderoso!
              \n 🚀💃 Prepare-se para uma onda de diversão, risadas e muita dança! 🎶🔥 Aqui, a diversão nunca para! Emojis, vibrações positivas e muita interação o tempo todo! 🕛🎉
              \n \n *Não fique de fora!* 💃🎉 Digite *#regras* e entre no clima dessa festa sem fim! Vamos juntos fazer o grupo explodir de energia! 🎊🍾`,


            `👏💃🔥 𝐁𝐄𝐌-𝐕𝐈𝐍𝐃𝐎(𝐀) @${participantName} 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ* 💃🎶🍾🍸
             \n Agora o clima do grupo *DﾑMﾑS* está ON FIRE! 🔥 Vamos criar momentos inesquecíveis com muitas risadas, emojis e danças! 🎶💥 *Aqui, a diversão é garantida 24h por dia! Não tem hora pra parar!* 💃🕛🍸🍾 
             \n \n *Entre no clima agora!* 💃🎉 Digite *#regras* e venha agitar com a gente! 🎤💃🔥 `,

             `🎉💥 𝑩𝑬𝑴-𝑽𝑰𝑵𝑫𝑶(𝐀) @${participantName} 𝐚𝐨 𝐠𝐫𝐮𝐩𝐨 👏🍻 *DﾑMﾑS* 💃🔥 *Dﾑ* *NIGӇԵ* 💃🎶🍾🍸
             \n A vibe do grupo *DﾑMﾑS* acaba de subir ainda mais com você aqui! 🚀🎶 Prepare-se para curtir uma energia contagiante, com risadas, dança e emojis 24h por dia! 💃🎉🔥 Aqui, a diversão nunca tem fim! Vamos agitar, rir e viver os melhores momentos juntos! 🎊🍾🕛  
             \n \n *Não fique de fora!* 💃🎉 Digite *#regras* e entre na vibe dessa festa incrível! 😎💥`
            
        ];

        // Selecionando uma mensagem aleatória
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        const selectedMessage = welcomeMessages[randomIndex];

        console.log("Enviando foto de perfil e mensagem de boas-vindas...");

        // Enviando mensagem com ou sem a imagem de perfil
        if (profilePictureUrl) {
            try {
                await socket.sendMessage(groupId, { 
                    image: { url: profilePictureUrl }, 
                    caption: selectedMessage, 
                    mentions: [participant]
                });
                console.log("Foto de perfil e mensagem de boas-vindas enviadas com sucesso!");
            } catch (sendError) {
                console.error("Erro ao enviar imagem de perfil:", sendError);
                // Se falhar ao enviar a imagem, envia a mensagem sem imagem
                await socket.sendMessage(groupId, { 
                    text: selectedMessage, 
                    mentions: [participant]
                });
                console.log("Mensagem sem imagem de perfil enviada com sucesso!");
            }
        } else {
            await socket.sendMessage(groupId, { 
                text: selectedMessage, 
                mentions: [participant]
            });
            console.log("Mensagem sem imagem de perfil enviada com sucesso!");
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem de boas-vindas:', error);
    }
};

