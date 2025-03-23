import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Share } from "react-native";
import axios from "axios";
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

interface Article {
  id: number;
  title: string;
  image: string | null;
  url: string;
  likes: number;
}

const WikeelsReels = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const fetchWikipediaArticles = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const randomResponse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=random&rnnamespace=0&rnlimit=10&rnoffset=${(page - 1) * 10}`
      );

      const randomArticles = randomResponse.data.query.random;
      const articleIds = randomArticles.map((article: any) => article.id).join("|");

      const imageResponse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|info&inprop=url&pithumbsize=600&pageids=${articleIds}`
      );

      const pages = imageResponse.data.query.pages;

      const filteredArticles: Article[] = randomArticles
        .map((article: any) => ({
          id: article.id,
          title: article.title,
          image: pages[article.id]?.thumbnail?.source || null,
          url: pages[article.id]?.fullurl || "",
          likes: 0,
        }))
        .filter((article: Article) => article.image !== null);

      setArticles((prevArticles) => [...prevArticles, ...filteredArticles]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching Wikipedia articles:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    fetchWikipediaArticles();
  }, []);

  const handleLike = async (id: number) => {
    try {
      const docRef = doc(collection(db, "likes"), id.toString());
      const docSnap = await getDoc(docRef);
      let newLikes = 1;

      if (docSnap.exists()) {
        newLikes = docSnap.data().likes + 1;
        await setDoc(docRef, { likes: newLikes }, { merge: true });
      } else {
        await setDoc(docRef, { likes: newLikes });
      }

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, likes: newLikes } : article
        )
      );
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const handleComment = (id: number) => {
    console.log("Comment on article:", id);
    // Implement your comment logic here
  };

  const handleShare = async (url: string) => {
    try {
      await Share.share({
        message: `Check out this Wikipedia article: ${url}`,
      });
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      pagingEnabled
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image
            source={{ uri: item.image || "https://via.placeholder.com/600" }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <Ionicons name="heart-outline" size={30} color="white" />
              <Text style={styles.likeText}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleComment(item.id)}>
              <Ionicons name="chatbubble-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare(item.url)}>
              <Ionicons name="share-social-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      onEndReached={fetchWikipediaArticles}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginVertical: 10,
  },
  likeText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
});

export default WikeelsReels;