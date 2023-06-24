function updateLastUserActivityTime(post, lastActivityTime) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        lastActivityTime = Date.now();
        resolve(lastActivityTime);
      }, 1000);
    });
  }
  
  function createPost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(post);
      }, 2000);
    });
  }
  
  function deletePost(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(post);
      }, 1500);
    });
  }
  
  const user = {
    name: "John",
    lastActivityTime: new Date("Fri Sep 02 2022 17:21:05 GMT+05:30")
  };
  
  const posts = [];
  
  function logPostsAndActivity(posts, lastActivityTime) {
    console.log("Posts:");
    posts.forEach((post, index) => {
      console.log(`post${index + 1}: ${post}`);
    });
    console.log("User last activity time:", new Date(lastActivityTime).toString());
  }
  
  function createAndDeletePost() {
    const post = "New post";
  
    console.log("Before creating post, user last activity time:", user.lastActivityTime.toString());
  
    Promise.all([createPost(post), updateLastUserActivityTime(post, user.lastActivityTime.getTime())])
      .then(([createdPost, updatedLastActivityTime]) => {
        posts.push(createdPost);
        user.lastActivityTime = updatedLastActivityTime;
        console.log("After creating post", createdPost);
        logPostsAndActivity(posts, updatedLastActivityTime);
        return deletePost(posts[posts.length - 1]);
      })
      .then(deletedPost => {
        const deletedIndex = posts.findIndex(post => post === deletedPost);
        if (deletedIndex !== -1) {
          posts.splice(deletedIndex, 1);
        }
       // console.log("New Set of Posts:");
        posts.forEach((post, index) => {
          console.log(`post${index + 1}: ${post}`);
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  
  createAndDeletePost();
  