import { ImageContainer } from "./ImageContainer";
import { Text, View } from "react-native";
import Swiper from "react-native-swiper";

export function ContactSwiper({ title, plans, onPress }) {
  const handlePress = (event) => {
    //Invocar la función onPress pasada desde el componente padre
    if (onPress) {
      onPress(event);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Swiper
        loop={false}
        showsPagination={false}
        containerStyle={styles.swiperContainer}
      >
        {plans.map((p, index) => {
          return (
            <View style={styles.view} key={index}>
              <ImageContainer
                plan={p}
                onPress={handlePress} // Agrega el evento onPress aquí
              />
            </View>
          );
        })}
      </Swiper>
    </>
  );
}
