import {useState} from 'react'
import {NavLink} from 'react-router-dom'

function Art({posts}) {

  let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

  const [addComment, setAddComment] = useState(false)
  const [comment, setComment] = useState("")
  const [post_id , setPostId] = useState("")

  function postClick(e){
    setAddComment(true)
    console.log(addComment)
    setPostId(e.id)
    console.log(e.id)
    console.log(e)
  }

  function postComment(e){

    const newComment = {
      post_id,
      comment
    }

    fetch('/comments',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(newComment)
    })
    .then(r => r.json())
    .then(console.log)
    setAddComment(false)
    setComment("")
}
        const showPost = posts.filter( p => p.user.discipline_id === 1).map( a => {
            return(
                <div className="center posts" onClick={(e) => postClick(a)} key={a.id}>
                  <h3 className="inputs">{a.content} ~ by: {a.user.username}</h3>
                  <img className="posts image" width="400px" src={a.upload} alt={a.id}/>
                  { addComment ? <div className="center">
                    <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="add comment"></input>
                    <button onClick={postComment}>post</button>
                    </div> : null }
                </div>
            )
          }).reverse();

  return (
    <div>
        <div className="left">
        <NavLink
            className="links"
            to="/feed">
            Studio
        </NavLink>
        </div>

        <h1 style={{ color: randomColor }} className="center">Art</h1>

        {/* { addComment ? <div className="inputs">
          <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="add comment"></input>
          <button onClick={postComment}>post</button>
          </div> : null } */}
        <div className="blogs">
          {showPost}
        </div>

    </div>
  )
}

export default Art