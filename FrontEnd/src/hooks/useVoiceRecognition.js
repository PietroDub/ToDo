import { set } from "mongoose";
import { useState, useEffect, useRef } from "react";

//função tratar
function interpretarDataVoz(texto){
    const fala = texto.toLowerCase();

    const hoje =  new Date();
    if(fala.includes("hoje")){
        // 2025-08-09 | T | 09:10:07
        return hoje.toISOString().split("T")[0];
    }

    if(fala.includes("amanhã") || fala.includes("amanha")){
        const amanha = new Date();
        amanha.setDate(hoje.getDate()+1);
        return amanha.toISOString().split("T")[0];
    }

    // fazer o dps de amanhã

    const matchDias = fala.match(/daqui a (\d+) dias/);
    if(matchDias){
        const dias = parseInt(matchDias[1], 10); //transformou em número a posição do vetor matchdias [1] , que representa a quantidade de dias
        const dataFutura = new Date();
        
        dataFutura.setDate(hoje.getDate() + dias);
            return dataFutura.toISOString().split("T")[0];
    }
    return("");
}

export function useVoiceRecognition(){
    const [textoOuvido, settextoOuvido] = useState("");
    const [ouvindo, setOuvindo] = useState(false);
    const [suportado, setsuportado] = useState(true);
    const recognitionRef = useRef(null);
    useEffect(()=>{
        // verifica a disponibilidade da API
        if(typeof window !== "undefined"){
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if(SpeechRecognition){
                const recognition = new SpeechRecognition();

                //microfone ficar contínuo
                recognition.continuous = true;

                //permitir capturar e processar
                // os trechos parciais enquanto o usuário fala

                recognition.interimResults = true;

                // confirmaar o idioma
                recognition.lang = "pt-BR";

                //evento dispara quando o áudio é processado
                // convertendo em texto

                recognition.onresult = (event)=>{
                    let transcricaoFinal = "";

                    // acumula todos os trechos da fala confirmados
                    // durante a sessão ativa
                    for(let i = event.resultIndex; i < event.result.length; i++){
                        if(event.results[1].isFinal){
                            transcricaoFinal += event.results[i][0].transcript + "";
                        }
                    } 
                    if(transcricaoFinal){
                        settextoOuvido(transcricaoFinal.trim());
                    }

                    // evento erro
                    recognition.oneError = (event) => {
                        console.error("error no reconhecimento de voz", event.error);
                        setOuvindo(false);
                    }

                    //fim da fala
                    recognition.onEnd = () => {
                        setOuvindo(false);
                    }
                }
            } else {
                setsuportado(false);
            }
        }
    }, []);

    //indica ou interrompe a gravação (liga-desliga)
    const iniciarEscuta = ()=> {
        if(!recognitionRef.current) return;
        if(ouvindo){
            // se já estiver ouvindo o click manual encerra a gravação
            recognitionRef.current.stop();
            setOuvindo(false);
        } else {
            // limpa textos e inicia a escuta
            settextoOuvido("");
            setOuvindo(true);
            recognitionRef.current.start();
        }
    }

    //Função  para parar a gravação manualmente
    const pararEscuta = () => {
        if(recognitionRef.current && ouvindo){
            recognitionRef.current.stop();
            setOuvindo(false);
        }
    };

    // processar a frase capturada e atualiza o estado correspondente
    // baseado na palavra chave

    const procesarComandoVoz = (
        fala,
        setTítulo,
        setDescricao,
        setDataLimite,
        usuarios = [],
        handleCheckBoxChange
    ) => {
        // expressões
        const regexTitulo = /(?:título|titulo)\s+(.+)/i;
        const regexDescricao = /(?:descrição|descricao)\s+(.+)/i;
        const regexDataLimite = /(?:DataLimite|Data Limite)\s+(.+)/i;
        const regexParticipante = /(?:participante|participantes|Adicionar|incluir)\s+(.+)/i;
    }
}