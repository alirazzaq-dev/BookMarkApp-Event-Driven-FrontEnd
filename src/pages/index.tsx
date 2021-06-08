import React, {useEffect, useState} from "react"
import { API } from "aws-amplify"
import {getbookmarks} from '../graphql/queries';
import {createBookmark, deleteBookmark, updateBookmark} from '../graphql/mutations';
import Grid from '@material-ui/core/Grid';
import copy from 'copy-to-clipboard';



const goldStar = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/FA_star.svg/1024px-FA_star.svg.png"
const blackStar = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Five_Pointed_Star_Solid.svg/815px-Five_Pointed_Star_Solid.svg.png"


interface BookMarkProp {
  id: string,
  title: string,
  link: string,
  star: false
}

const Home = () => {

  const resetBookMark:BookMarkProp = {id: "", title: "", link: "", star: false}
  const [bookMarks, setBookMarks] = useState([])
  const [bookMark, setBookMark] = useState<BookMarkProp>(resetBookMark)
  const [update, setUpdate] = useState<boolean>(false);
  const [updateBM, setUpdateBM] = useState<BookMarkProp | null >();

  
  console.log("All Bookmarks", bookMarks)
  // console.log("Current Bookmark", bookMark)


  const fetchBookMarks = async () => {
    console.log("Fetchingggg")
    try {
      const data = await API.graphql({
        query: getbookmarks,
      })
      console.log("Fetched")
      console.log(data.data.getbookmarks)
      setBookMarks(data.data.getbookmarks)

    } catch (e) {
      console.log(e)
    }
  }


  const Add_Bookmark = async () => {
    if(!bookMark.title || !bookMark.link){return}

    const newBookMark = await API.graphql({
      query: createBookmark,
      variables: { 
        title: bookMark.title,
        link: bookMark.link,
        star: false,
       },
    })
    setBookMark(resetBookMark)

    fetchBookMarks()

  }

  const Delete_BookMark = async (id) => {
    console.log(id)
    const deletedBookMark = await API.graphql({
      query: deleteBookmark,
      variables: { 
        id,
       },
    })

    fetchBookMarks()
  }

  // Handling Todo checking feature
  const handleCheck = async (item) => {

    const bookmark = {
      id: item.id,
      title: item.title,
      link: item.link,
      star: !item.star,
    }

    const updatedBookMark = await API.graphql({
      query: updateBookmark,
      variables: { 
        bookmark
       },
    })
    
   fetchBookMarks()

  }

  const handleUpdate = item => {
    setUpdate(!update)
    setUpdateBM(item)
  }


  const Update_Todo = async () => {
    
    setUpdate(!update)

    const bookmark = {
      id: updateBM.id,
      title: updateBM.title,
      link: updateBM.link,
      star: updateBM.star,
    }

    const updatedBookMark = await API.graphql({
      query: updateBookmark,
      variables: { 
        bookmark
       },
    })
   fetchBookMarks()
  }


  useEffect(() => {
    fetchBookMarks()
  }, [])

  return (
  <div>
    <Grid container spacing={2}>
    
        <Grid item xs={12} sm={6} lg={6} >
          <div style={{margin: "auto", padding: 50, height: 500, width: 500, flexDirection: "column", alignContent: "space-between"}}>
          <div style={{margin: 50, fontWeight: "bold", fontSize: 26}}>
          BookMarks</div>
        <div style={{margin: 10}}>
        <label> 
            Title:
            <input
              value={bookMark.title}
              onChange={({ target }) => setBookMark(bookmark => {return { ...bookmark, title: target.value }})}
            />
        </label>
        </div>
        <div style={{margin: 10}}>
        <label>
            Link:
            <input
              type="url"
              pattern="https://.*"
              required
              value={bookMark.link}
              placeholder="https://example.com"
              onChange={({ target }) => setBookMark(bookmark => {return { ...bookmark, link: target.value }})}
            />
        </label>
        </div>
          <button style={{margin: 50}} onClick={() => Add_Bookmark()}>Create Bookmark</button>
        </div>
        </Grid>

    <Grid item xs={12} sm={6} lg={6}>
    <div style={{margin: 50, fontWeight: "bold", fontSize: 26}}>
      My Bookmarks List</div>

    {!update? 
     bookMarks.map((item, ind) => {
        return (
          <div key={ind}
            style={{borderWidth: 10, borderColor: "black", marginLeft: "1rem", marginTop: "2rem", width: '50%', alignItems: "center" }}
            // key={item.id}
          >

            <div style={{width:25, height:25, marginBottom: 5}} onClick={()=> handleCheck(item)}>
            
            {item.star?
            <img src={goldStar} alt="blackStar" width={20} height={20} />:
            <img src={blackStar} alt="blackStar" width={20} height={20} />
            }

            </div>
            <div> Title: {item.title} </div>
            <div> URL:<img src={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.link}`} alt={bookMark.title} width="20px" height="20px" /> {item.link}</div>
                
            {"    "}
    
           <button onClick={() => Delete_BookMark(item.id)}> X </button>
           <button onClick={() => handleUpdate(item)}>update</button>
           <button onClick={() => copy(item.link)}>Copy Link</button>

          </div>
        )}) :
        <div style={{marginTop: 100, borderWidth: 1}}>
        <div style={{margin: 10}}>
          <label> Title:
            <input
              value={updateBM.title}
              onChange={({ target }) => setUpdateBM(state => {return { ...state, title: target.value }}      )}
            />
          </label>
          </div>
          <div style={{margin: 10}}>
          <label> URL
           <input
              value={updateBM.link}
              onChange={({ target }) => setUpdateBM(state => {return { ...state, link: target.value }}      )}
            />

          </label>
          </div>
          <div style={{margin: 10}}>
            <button onClick={() => Update_Todo()}>update</button>
          </div>
        </div>

      }
    </Grid>
    </Grid>

  </div>
  )}


export default Home;