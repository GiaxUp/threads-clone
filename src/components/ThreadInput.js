function ThreadInput({ user, text, setText, postThread }) {
  return (
    <>
      <p>{user.handle}</p>
      <input vaulue={text} onChange={(e) => setText(e.target.value)}></input>
      <button className="primary" onClick={postThread}>
        Post
      </button>
    </>
  );
}

export default ThreadInput;
