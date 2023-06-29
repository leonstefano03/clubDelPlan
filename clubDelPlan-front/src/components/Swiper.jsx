// Native
import { ImageContainer } from "./ImageContainer";
// Components
import { styles } from "../styles/swiperStyles";
import React from "react";
import { View, FlatList, Text, Image } from "react-native";

export function SwiperComponent({ plans, text, onPress , image, styleLogo}) {
  return (
    <View style={styles.container}>

 {/* <View style={{ textAlign: "center" }}> */}
       {/* //esto es lo nuevo */}
        <View style={styles.logoutContainer}>
          <Image style={styleLogo} source={image} />
        </View>
        {/* //esto es lo nuevo */}
      {/* </View> */}
      <FlatList
        data={plans}
        renderItem={({ item }) => {
          return (
            <View style={styles.view}>
              <ImageContainer plan={item} onPress={() => onPress(item)} />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        ItemSeparatorComponent={<View style={{ margin: 10 }}></View>}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
