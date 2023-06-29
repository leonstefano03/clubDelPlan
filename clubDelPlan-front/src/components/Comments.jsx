import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { GenericInput } from "./GenericInput";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../styles/PlanDetails";
import { addComment } from "../services/addComment";
import { GenericButton } from "./GenericButton";
import { setComments } from "../state/selectedPlan";
import { Feather } from "@expo/vector-icons";
import comentarios from '../assets/comentarios.png'

const Comments = () => {
  const plan = useSelector((state) => state.selectedPlan);
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = async () => {
    let newComment = await addComment(comment, plan._id);
    dispatch(setComments(newComment));
  };

  return (
    <>
     
      <Image style={styles.logo4} source={comentarios} />
      <View
        style={{
          height: 280,
          borderRadius: 15,
          marginTop: 5,
          padding: 10,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}>
        {plan.comments &&
          plan.comments.map((item, index) => {
            if (index < page * 4 && index >= (page - 1) * 4)
              return (
                <View style={styles.commentContainer} key={index}>
                  <Text style={styles.username}>{item.user.username}:</Text>
                  <Text style={styles.comment}>{item.text}</Text>
                </View>
              );
          })}
        <View style={{ marginBottom: 30 }}></View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {page > 1 ? (
          <Text
            style={{ color: "#fff", fontSize: 40 }}
            onPress={() => {
              setPage(page - 1);
            }}
          >
            {"<<"}
          </Text>
        ) : (
          <Text></Text>
        )}
        {plan.comments.length - (page + 1) * 4 >= -4 ? (
          <Text
            style={{
              color: "#fff",
              fontSize: 40,
            }}
            onPress={() => {
              setPage(page + 1);
            }}
          >
            {">>"}
          </Text>
        ) : (
          ""
        )}
      </View>
      <View style={styles.inputCont}>
        <GenericInput
          placeholder="agrega un comentario"
          value={comment}
          onChangeText={setComment}
          customStyle={{
            borderRadius: 15,
            fontSize: 16,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            width: "80%",
          }}
        />
    
        <TouchableOpacity onPress={handleComment}>
          <Feather
            name="arrow-right"
            size={30}
            color="white"
            style={{}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Comments;
