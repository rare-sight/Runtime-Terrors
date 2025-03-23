import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [likes, setLikes] = useState({}); // Like counts
  const [comments, setComments] = useState({}); // Comments per article

  const fetchArticles = async () => {
    try {
      // Fetch random articles
      const randomResponse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=random&rnnamespace=0&rnlimit=10`
      );
      const randomArticles = randomResponse.data.query.random;

      // Get article details (extract, image, and link)
      const articleIds = randomArticles.map((article) => article.id).join("|");
      const detailsResponse = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages|info&inprop=url&exintro&explaintext&pithumbsize=600&pageids=${articleIds}`
      );

      const pages = detailsResponse.data.query.pages;

      // Format articles & filter out those without images
      const filteredArticles = Object.values(pages)
        .filter((page) => page.thumbnail) // Only include articles with images
        .map((page) => ({
          id: page.pageid,
          title: page.title,
          image: page.thumbnail.source,
          extract: page.extract || "No summary available.",
          url: page.fullurl,
        }));

      setArticles((prev) => [...prev, ...filteredArticles]);
      setHasMore(filteredArticles.length > 0);
    } catch (error) {
      console.error("Error fetching Wikipedia content:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Handle like button click
  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

  // Handle comment submission
  const handleComment = (id, comment) => {
    if (!comment.trim()) return;
    setComments((prevComments) => ({
      ...prevComments,
      [id]: [...(prevComments[id] || []), comment],
    }));
  };

  // Handle sharing (copy link)
  const handleShare = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="app">
      <h1 className="title">Wikeels - Wikipedia Reels </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchArticles}
        hasMore={hasMore}
        loader={<h4 className="loading">Loading more articles...</h4>}
        endMessage={<p className="end-message">No more articles to show.</p>}
      >
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <img src={article.image} alt={article.title} className="article-image" />
            <div className="article-content">
              <h3 className="article-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="article-extract">{article.extract}</p>

              {/* Like, Comment, Share Buttons */}
              <div className="actions">
                <button className="like-button" onClick={() => handleLike(article.id)}>
                  👍 {likes[article.id] || 0}
                </button>
                <button className="share-button" onClick={() => handleShare(article.url)}>
                  🔗 Share
                </button>
              </div>

              {/* Comment Section */}
              <div className="comments-section">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleComment(article.id, e.target.value);
                  }}
                />
                <ul>
                  {(comments[article.id] || []).map((comment, index) => (
                    <li key={index} className="comment">{comment}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
