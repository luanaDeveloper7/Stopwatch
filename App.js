//Importando o useState xda biblioteca do React e os componentes necessários para a construção do aplicativo.
import React, {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

//Variáveis do cronômetro (timer), dos segundos, dos minutos e das horas, respectivamente.
let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;


export default function App() {
  //Usando useState para pegar um parâmetro e mudá-lo de acordo com o contexto (botões, último tempo e o número que aparece no cronômetro).
  const[number, setNumber] = useState(0);
  const[button, setButton] = useState('Cronometrar');
  const[lastTime, setLastTime] = useState(null);

  //Função para inicializar o cronômetro e pará-lo quando o botão de "Cronometrar" estiver com o status de "Parar".
  function goStopWatch(){
     //Se o timer for diferente de nulo, o tempo será zerado ao clicar no botão "Parar" e o texto deste será alterado para "Cronometrar".
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setButton('Cronometrar');
    }

    //Se o timer for igual a nulo (condição inicial), o tempo começará a ser contado.
    else{
        timer = setInterval(()=>{
          //Somando os segundos.
          seconds++;

          //Se os segundos atingirem o valor de 60, será somado 1 minuto, já que 60 segundos consistem 1 minuto.
          if(seconds == 60){
            seconds = 0;
            minutes++;
          }

          //Se os minutos atingirem o valor de 60, será somado 1 hora, já que 60 minutos consistem em 1 hora.
          if(minutes == 60){
            minutes = 0;
            hours++;
          }
          
          //Formatando os segundos, os minutos e as horas e mostrando-os na tela do app no modo hh:mm:ss. Se o número das horas, dos minutos e dos segundos for menor que 10, um 0 será adicionado à sua frente (ex.: 09:09:09). Por fim, no lugar de "Cronometrar", aparecerá o texto "Parar", visto que o tempo ja está sendo cronometrado.
          let format = (hours < 10? '0'+ hours : hours) + ':'+ (minutes < 10? '0'+ minutes : minutes) + ':'+ (seconds < 10? '0'+ seconds : seconds);
          setNumber(format);
          }, 1000);
          setButton('Parar');
        }
  }
  
  //Função para limpar o texto do cronômetro.
  function cleanStopWatch(){
    //Se o timer for diferente de nulo, ao clicar no botão de "Limpar", o texto do cronômetro será limpo. 
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }

    //Zerando o valor dos segundos, dos minutos e das horas quando o botão "Limpar" for clicado, substituindo o texto do botão "Parar" para "Cronometrar". Além disso, o número no qual o cronômetro foi parado passa para o status de último tempo pelo parâmetro setLastTime do useState.
    setLastTime(number);
    setNumber(0);
    seconds = 0;
    minutes = 0;
    hours = 0;
    setButton('Cronometrar');
  }

  return (
    //Tela do aplicativo do cronômetro
    <SafeAreaView style = {styles.screen}>
        {/*Imagem do cronômetro*/}
        <View style = {styles.stopWatchImageContainer}>
          <Image source={require('./assets/crono.png')}/>
        </View>
        
        {/*Container dos botões*/}
        <View style = {styles.buttonsView}>
          {/*Botão "Cronometrar"*/}
          <TouchableOpacity style = {styles.button} onPress = {goStopWatch}>
              <Text style = {styles.buttonText}> {button} </Text>
          </TouchableOpacity>

          {/*Botão "Limpar"*/}
          <TouchableOpacity style = {styles.button} onPress = {cleanStopWatch}>
              <Text style = {styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/*View do texto do timer*/}
        <View style = {styles.timerTextContainer}> 
          <Text style = {styles.timerText}>{number}</Text>
        </View>
        
        {/*View do texto do último tempo cronometrado*/}
        <View style ={styles.lastTimeView}>
          <Text style={styles.lastTimeText}>{lastTime ? 'Último tempo: '+ lastTime : ''}</Text>
        </View>
    </SafeAreaView>
  );
}


//Estilização do cronômetro
const styles = StyleSheet.create({
    screen:{
      backgroundColor: "#4B0082",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonsView:{
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
      marginTop: 30,
    },

    button:{
      backgroundColor: "#FFF",
      padding: 10,
      borderRadius: 10,
      width: 110,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonText:{
      color: "#4B0082",
      fontSize: 15,
      alignContent: "center"
    },

    stopWatchImageContainer:{
      justifyContent: "center",
      alignItems: "center",
    },

    timerTextContainer:{
      justifyContent: "center",
      alignItems: "center",
    },

    timerText:{
      marginTop: -400,
      color: "#FFF",
      fontWeight: 700,
      fontSize: 35,
    },

    lastTimeView:{
      marginTop: 80,
      height:40,
    },

    lastTimeText:{
      fontSize: 20,
      color: '#FFFFFF',
      fontStyle: 'bold',
    },
});
