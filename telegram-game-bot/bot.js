const TelegramBot = require('node-telegram-bot-api');

// Coloca aquí el token que te dio BotFather
const token = "7754892903:AAEL0wfO1zSUDx2aNqfn9N9yvMo3AF7nDNc";

const bot = new TelegramBot(token, { polling: true });

// Estado de cada jugador
let jugadores = {};

// Dinámica del juego
const secuencias = {
    INICIO: "HOLA",
    LLAVE: "SI",
    JUGAR: "SI",
    CAJA: "SI",
    RESPUESTA_1: "3",
    RESPUESTA_2: "5",
    RESPUESTA_3: "7",
    RESPUESTA_4: "8",
    RESPUESTA_5: "0",
    RESPUESTA_CAJA: "HOLA DON JOSÉ",
    SETAS: "PAPELERA",
    SECUENCIA: "925378",
    SILENCIO: "SILENCIO",
    PEZ: "PEZ",
    VIENTO: "VIENTO",
    MADRE: "MI MADRE",
    FRASE_CLAVE: "LAS PISTAS DE UN PUZZLE ESCONDIDAS EN CADA",
    COLOR_MISTERIO: "NEGRO COMO UNA NOCHE SIN LUNA",
    CODIGO_FINAL: "004602"
};

// Función para enviar el siguiente mensaje basado en el progreso del jugador
function enviarSiguienteMensaje(chatId) {
    const jugador = jugadores[chatId];

    switch (jugador.estado) {
        case 0:
            bot.sendMessage(chatId, "Hola. He estado observando... Desde las sombras, esperando el momento preciso para aparecer ante vosotros. \n \nSoy Enigma, el guardián de los secretos, el tejedor de desafíos. Mi misión es simple, pero peligrosa:\n \nPondré a prueba vuestras mentes, vuestra astucia y vuestro valor. Cada prueba que enfrenteis estará envuelta en un misterio que solo los más ingeniosos podrán resolver.\n \nSi estáis listos para adentraros en lo desconocido, estad alerta. Mi primera prueba está cerca.\n \nNo confiéis en lo que veis... y recordad: nada es lo que parece.\n \n Por cierto, ¿No estaréis buscando una llave?");
            jugador.estado = 1;
            break;
        case 1:
            bot.sendMessage(chatId, "¿Queréis saber dónde está?");
            jugador.estado = 2;
            break;
        case 2:
            bot.sendMessage(chatId, " La tengo yo. Si queréis recuperarla os advierto que no va a ser nada fácil...\n \nTendréis que superar una serie de retos. Si seguís mis indicaciones y sois capaces de superarlos con éxito , puede que os la de...\n \nOs haré una última pregunta... ¿Estáis preparados para jugar?");
            jugador.estado = 3;
            break;
        case 3:
            bot.sendMessage(chatId, "Muy bien. Para jugar conmigo hay tres normas fundamentales: \n- Solo podréis buscar y coger lo que YO os diga. \n- Seguid TODAS mis indicaciones. \n- Hablad únicamente en mayúscula.\n \nSi no respetáis estas normas, automáticamente perderéis el juego. Recordad que Enigma lo ve todo.\n \nPara que lo sepáis, no contestaré si vuestra respuesta es incorrecta, así que pensadlo todo muy bien.\n \nBien, empecemos con la primera prueba....\n \n ¿Véis una caja con un candado?");
            jugador.estado = 4;
            break;
        case 4:
            bot.sendMessage(chatId, "Para conseguir la combinación tendréis que contestar a mis preguntas.\nEmpecemos:\n \nEn un triángulo, cuento sus vértices. ¿Qué soy?");
            jugador.estado = 5;
            break;
        case 5:
            bot.sendMessage(chatId, "Soy el número de dedos en una mano.");
            jugador.estado = 6;
            break;
        case 6:
            bot.sendMessage(chatId, "Si cuentas hacia atrás desde diez, soy el que aparece en el cuarto lugar.");
            jugador.estado = 7;
            break;
        case 7:
            bot.sendMessage(chatId, "Si soy un octópodo, ¿Cuántas patas tengo?");
            jugador.estado = 8;
            break;
        case 8:
            bot.sendMessage(chatId, "Soy un número que no tiene valor, pero me ves en todos lados.");
            jugador.estado = 9;
            break;
        case 9:
            bot.sendMessage(chatId, "Lo tenéis, abrid la caja.");
            jugador.estado = 10;
            break;
        case 10:
            bot.sendMessage(chatId, "Guau, me habéis sorprendido ... .ya veo que sois astutos ... .muy bien, vayamos a la siguiente prueba.\n \nBuscad TODAS las setas de colores. Hay 10 setas de cada color. Cuando tengáis todas, resolved el enigma que esconden.\nVolved a hablarme cuando lo hayáis resuelto. Espero vuestro mensaje..");
            jugador.estado = 11;
            break;
        case 11:
            bot.sendMessage(chatId, "Entonces, ¿Por qué no buscáis en las que tenéis cerca? Encontraréis otro enigma. Cuando lo resolváis, enviadme la SECUENCIA.");
            jugador.estado = 12;
            break;
        case 12:
            bot.sendMessage(chatId, "No pensaba que fuerais a hacerlo tan bien... la verdad que me habéis sorprendido otra vez.\nAhora vamos a jugar a las adivinanzas:\nSoy algo que puedes romper sin tocar. Cuanto más fuerte me gritas, más me alejo. ¿Qué soy?");
            jugador.estado = 13;
            break;
        case 13:
            bot.sendMessage(chatId, "¿Qué es algo y a la vez nada?");
            jugador.estado = 14;
            break;
        case 14:
            bot.sendMessage(chatId, "No tengo alas, pero puedo volar. No tengo boca, pero puedo hablar. ¿Qué soy?");
            jugador.estado = 15;
            break;
        case 15:
            bot.sendMessage(chatId, "Pensando me vuelvo loco, pensando me quedo enana, ¿Qué relación tengo yo con la suegra de la mujer de mi hermana?");
            jugador.estado = 16;
            break;
        case 16:
            bot.sendMessage(chatId, "Muy bien. Ahora que hablas de tu madre, ¿Por qué no le preguntas si tiene algo para vosotros?\nResolved este último acertijo, y quizás os devuelva la llave. Cuando terminéis, decidme la frase clave.");
            jugador.estado = 17;
            break;
        case 17:
            bot.sendMessage(chatId, "Muy bien, ahora tenéis que buscar los “8 sobres de color amarillo” que hay escondidos, dentro de ellos está la respuesta. Os ayudarán a conocerme un poquito mejor….");
            jugador.estado = 18;
            break;
        case 18:
            bot.sendMessage(chatId, "Habéis llegado al final del juego. Desde las sombras, he estado observando cada uno de vuestros pasos, y debo decir que habéis demostrado un gran ingenio y valor.\n\nYa tenéis lo que buscabais y ha llegado la hora de despedirnos.\n\nRecordad que el misterio nunca se aleja. Siempre habrá más enigmas esperando ser resueltos.\n\nAsí que, mantened vuestros corazones llenos de curiosidad. La llave que habéis ganado con vuestro esfuerzo abrirá muchas puertas en vuestro camino.\n\nTened los ojos abiertos, ENIGMA siempre está presente.\n\nNada es lo que parece.");
            delete jugadores[chatId]; // Eliminar el estado del jugador al finalizar
            break;
    }
}

// Comando /start para iniciar el juego
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    jugadores[chatId] = { estado: 0 };
    bot.sendMessage(chatId, "¡Bienvenidos al juego de Enigma! Escribid HOLA para comenzar.");
});

// Escuchar mensajes y verificar respuestas
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const texto = msg.text.trim().toUpperCase();

    if (jugadores[chatId]) {
        const jugador = jugadores[chatId];

        switch (jugador.estado) {
            case 0:
                if (texto === secuencias.INICIO) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 1:
            case 2:
            case 3:
                if (texto.includes(secuencias.LLAVE)) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 4:
                if (texto.includes (secuencias.CAJA)) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 5:
                if (texto === secuencias.RESPUESTA_1) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 6:
                if (texto === secuencias.RESPUESTA_2) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 7:
                if (texto === secuencias.RESPUESTA_3) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 8:
                if (texto === secuencias.RESPUESTA_4) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 9:
                if (texto === secuencias.RESPUESTA_5) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 10:
                if (texto === secuencias.RESPUESTA_CAJA) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 11:
                if (texto === secuencias.SETAS) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 12:
                if (texto === secuencias.SECUENCIA) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 13:
                if (texto.includes(secuencias.SILENCIO)) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 14:
                if (texto.includes(secuencias.PEZ)) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 15:
                if (texto.includes(secuencias.VIENTO)) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 16:
                if (texto === secuencias.MADRE) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 17:
                if (texto.includes(secuencias.FRASE_CLAVE)) {
                    enviarSiguienteMensaje(chatId);
                }
                break;
            case 18:
                if (texto === secuencias.CODIGO_FINAL) {
                        enviarSiguienteMensaje(chatId);
                }
                break;
        }
    }
});
