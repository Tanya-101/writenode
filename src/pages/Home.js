import { useState, useEffect, useRef } from "react";
import { useTitle } from "../hooks/useTitle";
import { getDocs, collection } from "firebase/firestore";
import { PostCard } from "../components";
import { db } from "../firebase/config";
import { SkeletonCard } from "../components";

export const Home = () => {
  
  const [posts, setPosts] = useState(new Array(3).fill(false));
  const [toggle, setToggle] = useState(false);
  useTitle("Home");
  const postsRef = useRef(collection(db, "posts"));

  useEffect(() => {
    async function getPosts(){
      const data = await getDocs(postsRef.current);
      data.docs.map(() => (
        setPosts(data.docs.map((document) => (
          {...document.data(), id: document.id}))
        )
      ));
    }
    getPosts();
  },[postsRef, toggle]);

  return (
    <section>
      {
        posts.map((post, index) => (
          post ? (<PostCard key = {post.id}  post ={post} toggle={toggle} setToggle={setToggle}/>) : (<SkeletonCard key={index}/>)
        ))
      }
    </section>
  )
}
