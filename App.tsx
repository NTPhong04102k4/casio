import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';


const DATA = ['/', '*', 'DEL', '+', '-', 'AC', '7', '8', '9', '4', '5', '6', '1', '2', '3', ".", '0', '='];
const char = ['+', '-', '*', '/'];
export default function App() {
  const [resultText, setResultText] = useState("");
  const [calcText, setCalcText] = useState("");
  const [lastChar, setLastChar] = useState("");
  const onButtonClick = (text: string) => {


    switch (text) {
      case "AC":
        setCalcText('');
        setResultText('');
        break;
      case "DEL":
        setCalcText(
          calcText.substring(0, calcText.length - 1)
        );
        break;
      case "=":
        onSubmit();
        break;
      default:
        setCalcText(calcText + text);
        break;
    }
  }

  const onSubmit = () => {
    var dell = /([+\-*/])/g;
    let newArray = calcText.split(dell);
    console.log("newArray", newArray);
    var result = 0; var count;
    var x;
    while (newArray.length > 1) {
      for (let i = 0; i < newArray.length; i++) {
        switch (newArray[i]) {
          case "*":
            count = (Number(newArray[i - 1]) * Number(newArray[i + 1]));
            x = i;
            newArray.splice(x - 1, 3, count.toString());
            console.log(count);
            console.log(newArray); break;
          case "/":
            count = Number(newArray[i - 1]) / Number(newArray[i + 1]);
            x = i;
            newArray.splice(x - 1, 3, count.toString());
            console.log(count);
            console.log(newArray); break;
          case "+":
            if (newArray[i + 2] == "+" || newArray[i + 2] == "-" || newArray.length < 4) {
              count = Number(newArray[i - 1]) + Number(newArray[i + 1]);
              x = i;
              newArray.splice(x - 1, 3, count.toString());
              console.log(count);
              console.log(newArray);
            }
            break;
          case "-":
            if (newArray[i + 2] == "+" || newArray[i + 2] == "-" || newArray.length < 4) {
              count = Number(newArray[i - 1]) - Number(newArray[i + 1]);
              x = i;
              newArray.splice(x - 1, 3, count.toString());
              console.log(count);
              console.log(newArray);
            }
            break;
          default:
            setResultText(result.toString());
            break;
        }
      }
    } setResultText(newArray[0]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.boxresult}>
          <Text style={[styles.resulttext, { color: 'black' }]}>{calcText}</Text>
        </View>
        <Text style={styles.caltext}>{resultText}</Text>

      </View>
      <View>
        <FlatList
          data={DATA}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onButtonClick(item)}
              style={styles.boxbutton}>
              <Text style={{ color: 'black', fontSize: 20 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  head: {
    flex: 5,
  },
  boxresult: {
    flex: 3,
    verticalAlign: 'bottom',
  },
  resulttext: {
    fontSize: 35,
    color: 'black',
  },

  caltext: {
    fontSize: 30,
    color: 'black',
  },
  boxbutton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderColor: '#F8F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
});