import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ba6477',
        textAlign: 'center',
        marginVertical: 20,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f8ff',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#e7f3ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cce6ff',
    },
    infoContainer: {
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#8c6cb5',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'Vivid Sky Blue',
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        color: 'black',
    },
});


let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=nonchainstoresvi&format=json&case=default")
        .then((response) =>
        { return response.json();
        })
        .then((myJson) => {
          if (originalData.length < 1)
          {
            setMyData(myJson);
            originalData = myJson;
          }
        })
  }, []);

  const FilterData = (text) => {
    if(text !== ''){
        const lowercasedText = text.toLowerCase();
      let myFilteredData = originalData.filter((item) =>
          item.StoreName.toLowerCase().includes(lowercasedText) ||
          item.StreetAddress.toLowerCase().includes(lowercasedText) ||
          item["2NdAddress"].toLowerCase().includes(lowercasedText) ||
          item.City.toLowerCase().includes(lowercasedText) ||
          item.Location.toLowerCase().includes(lowercasedText));
        setMyData(myFilteredData);
    }
    else{
      setMyData(originalData);
    }
  }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Store Name:</Text>
                    <Text style={styles.infoText}>{item.StoreName}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Street Address:</Text>
                    <Text style={styles.infoText}>{item.StreetAddress}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>2nd Address:</Text>
                    <Text style={styles.infoText}>{item["2NdAddress"] || "N/A"}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>City:</Text>
                    <Text style={styles.infoText}>{item.City}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>State:</Text>
                    <Text style={styles.infoText}>{item.State}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Location:</Text>
                    <Text style={styles.infoText}>{item.Location}</Text>
                </View>
            </View>
        );
    };


    return (
      <View style = {styles.container}>
        <StatusBar/>
          <Text style={styles.headerText}>Non Chain Stores</Text>
        <TextInput style={{borderWidth:1}} onChangeText={(text) => {FilterData(text)}}/>
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}

export default App;
