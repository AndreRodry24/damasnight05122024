export const configurarDespedida = async (socket, groupId, participant) => {
    try {
        // Obtendo o nome do participante
        const participantName = participant.split('@')[0];
        console.log(`Nome do participante: ${participantName}`);

        // URL do GIF (sem conversão para MP4)
        const gifUrl = 'https://images2.imgbox.com/87/8b/XDyxkgPh_o.png'; // Exemplo de GIF

        // Lista de mensagens de despedida
        const farewellMessages = [
            
           `🙋‍♀️💔👋 *Tchau, sumido(a)!* @${participantName} \n Você só aparece quando é pra causar.🤪😹 \n Vai embora, já deu o que tinha que dar! 😂💨`,
           `💔 *Pior que "quem é você?"* @${participantName} \n O grupo vai ficar mais leve agora, e talvez até com mais inteligência.😏😹 \n Boa sorte no mundo real! 😹`,
           `🙋‍♀️💔 *Tchau, tá complicado te encontrar aqui!* @${participantName} \n Suas mensagens eram como Wi-Fi sem sinal... \n Sempre ausentes quando mais precisamos. 🛑📶`,
           `😭 *Adeus, expert em "não vi a mensagem"!@* @${participantName} \n Você é tipo aquele amigo que vai embora antes de todo mundo e ainda deixa a casa bagunçada! 😂🏃‍♂️`,
           `💔 *Adeus, fantasma do WhatsApp!* @${participantName} \n Agora que você foi 🥳🚀 \n Vamos poder conversar sem a sensação de estar sendo ignorado. 🤣✌️`,
           `😭👋 *Tchau, você estava aqui?* @${participantName} \n Ficou mais tempo offline do que em qualquer conversa.😎 \n Que sua conexão melhore agora que você foi! 😎😹`,
           `😭💔👋 *Que isso, [nome], você desapareceu de novo!?* @${participantName} \n Nem nos avisa quando vai embora❓ 🤯 \n Só sumiu como um story apagado... ⚰️`,
           `💔 *Adeus, a "mistério do WhatsApp"!@* @${participantName} \n Você já foi mais enigmático(a) que minha última pesquisa no Google! 😹💻🔍`,
           `😎✌️ *Tchau, expert em "vou sair logo depois"!@* @${participantName} \n Já vai tarde, só não vai nos deixar com aquele "depois eu volto", porque... \n sabemos que não volta! 👋⏳`,
           `😭 *Tchau, mestre das desculpas!* @${participantName} \n Mais uma desculpa sua foi pro espaço. \n Deixa a gente aqui, tentando entender como alguém sumiu tão rápido! 🤷‍♂️🚀😹`,
           `💔 *Vai nessa, mito do "nem sei quem é você"!@* @${participantName} \n Você fez tão pouco por aqui que eu até esqueci seu nome... 🤣 \n Só que não! 🤭`,
           `😭👋 *Adeus, especialista em "oi" e "tchau"!@* @${participantName} \n Seus "oi" eram mais esperados que o Wi-Fi em casa.😜 \n Agora é só o "tchau" mesmo! 👋😹`,
           `😭 *Te vejo por aí, criador(a) de drama!* @${participantName} \n Você saiu sem nem avisar se ia voltar. 🚶‍♂️😂 \n Agora vai deixar a gente de ressaca emocional. 🍻😭`,
           `💔 *Tchau, o ser humano mais rápido de sair!* @${participantName} \n Você entrou, causou e saiu antes que alguém dissesse "mas o quê❓" Adeus, ninja do WhatsApp! 🤣`,
           `🙋‍♀️💔 *Adeus, guru da ausência!* @${participantName} \n Você sumiu mais que meu carregador, e ainda vai deixar saudade... ou não! 😜🔌`,
           `😭💔👋 *Ah, e você ainda vai sair?* @${participantName} \n Da última vez que alguém saiu desse jeito, foi porque o Wi-Fi parou de funcionar.😂 \n Vai ver que o seu também parou, né❓ 😅`,
           `😭💔👋 *Tchau, que você não volte!* @${participantName} \n Mais rápido que você, só quem consegue desaparecer depois do "oi"! Se cuida, ou não. 🏃‍♀️💨`,
           `😭👋 *Adeus, lenda do "minha bateria acabou"* @${participantName} \n Você tem mais desculpas que o WhatsApp tem atualizações... \n E isso é muito, viu❓ 📱🔋`,
           `😭 *Tchau, mestre da fuga!* @${participantName} \n Você veio, botou uma piada sem graça, e desapareceu. \n Se precisar de uma dica de "desaparecer sem deixar rastro", chama a gente! 😂`,
           `👋 *Tchau, você deu o ar da graça e agora sumiu* @${participantName} \n  Que lenda do "entrei só pra ver como estava"! \n Ninguém entendeu nada, mas valeu mesmo assim! 😎`,
           `💔 *Saindo como quem não quer nada* @${participantName} \n Ainda ficou a dúvida: você entrou por acidente❓ Porque sumiu rapidinho! 🏃‍♂️💨`,
           `😭 *Deu tchau com a mesma velocidade com que chegou* @${participantName} \n Já vai❓ Só não vale a pena sair agora, estamos todos aqui, ainda tentando te entender! 🤷‍♂️`,
           `🙋‍♀️💔 *Eu não vou mentir, você vai fazer falta!* @${participantName} \n Mas só no sentido de que o grupo vai sentir sua "energia ausente". \n Boa sorte! 😜`,
           `💔 *Sabe aquele amigo que entra só pra falar "oi" e "tchau"?* @${participantName} \n Esse é você, né❓ 😂 Espero que o "tchau" tenha sido mais sincero! 👋`,
           `😭 *Agora sim, o grupo vai respirar* @${participantName} \n Sua energia sempre foi... digamos, um pouco forte demais para o nosso equilíbrio! 🤪`,
           `😭👋 *Adeus, a falta de vergonha em pessoa* @${participantName} \n Sua falta de presença no grupo sempre foi de um nível elevado, eu te admiro! 😹👏`,
           `💔 *Tchau, espírito livre!* @${participantName} \n Você apareceu, mas parece que se perdeu logo depois. \n Vai ser engraçado, porque provavelmente nem viu esse recado! 😜`,
           `😭 *Volta logo, ou não* @${participantName} \n Te mandaram embora ou você se mandou sozinho(a)❓ \n Fica a dúvida! 😂`,
           `😭👋 *Adeus, você foi uma memória passageira* @${participantName} \n Mal entrou e já foi embora. \n Fica a saudade... ou não! 😏😹`,
           `💔 *Tchau, ausente* @${participantName} \n Já fez o "oi", o "tchau" e desapareceu com mais classe do que eu. Respeito! 😹👏`,
           `😭 *O grupo agora vai ficar mais chato* @${participantName} \n Não vai ser o mesmo sem as suas mensagens de “não sei o que fazer aqui” 🤔`,
           `😭👋 *Adeus, o mestre do “nada para fazer aqui”* @${participantName} \n Sua mensagem era mais rara do que uma chuva no deserto. \n Boa sorte aí! 🏜️`,
           `💔 *Tchau, mestre das desculpas!* @${participantName} \n Mais uma desculpa sua foi pro espaço. \n Deixa a gente aqui, tentando entender como alguém sumiu tão rápido! 🚀`,
           `😭 *Até mais, especialista em sumir na hora certa!* @${participantName} \n Você estava mais sumido(a) que aquela pessoa que só aparece no final do rolê. 😅`,
           `🙋‍♀️💔 *Adeus, você é tipo Wi-Fi ruim* @${participantName} \n Sempre fora de alcance quando mais precisamos. \n Vai com Deus e uma conexão melhor! 😹`,
           `💔 *Tchau, estrela cadente* @${participantName} \n Apareceu por um segundo e já foi embora. \n O show estava bom, pena que não durou. ✨`,
           `😭 *Tchau, deus da fuga* @${participantName} \n Você entrou, causou e já saiu, deixando todos em dúvida. \n Vai ser difícil esquecer esse show de saída! 👀`,
           `😭👋 *Te vejo por aí... ou não* @${participantName} \n Você foi uma lenda! Se algum dia aparecer de novo, a gente vai lembrar que te viu! 🤡👋`,
           `💔 *Bye bye, adeus, partiu embora!* @${participantName} \n Vai ser difícil a vida continuar sem aquele "oi" só pra sumir depois.🤡😂`,
           `😭 *Te vejo no próximo "adeus"* @${participantName} \n Mais uma saída épica no grupo! Vai ser difícil te substituir. \n Ninguém mais vai sumir com estilo! 🙃`,
           `😭👋 *Tchau, lenda do "não sei como vim parar aqui"* @${participantName} \n Realmente, não sei como você entrou, mas também não sei como saiu.\n Se cuida! 👋`,
           `💔 *Tchau, sumido(a) do rolê* @${participantName} \n Vai deixar saudades.🤪 \n Não sei se boas ou ruins, mas pelo menos vai deixar algum tipo de emoção! 😆`,
           `😭 *Saiu como quem não quer nada* @${participantName} \n Você não deu tchau, não explicou nada, só foi embora e deixou todo mundo em choque.🙄😹 \n O drama nunca acaba. 🎭`,
           `🙋‍♀️💔 *Agora o grupo tem mais espaço* @${participantName} \n Sem você por aqui, já posso respirar de novo! 😜 Se cuida aí, com a sua vida e energia sempre em modo off. 💨`

        ];

        // Escolhendo uma mensagem aleatória
        const randomFarewellMessage = farewellMessages[Math.floor(Math.random() * farewellMessages.length)];

        console.log("Enviando GIF e mensagem de despedida...");

        // Criando a mensagem de despedida com menção
        const farewellMessage = {
            text: randomFarewellMessage,
            mentions: [participant]
        };

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
