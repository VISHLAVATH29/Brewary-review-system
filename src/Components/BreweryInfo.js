import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BreweryInfo.css'
import { firestore } from '../firebase';
import { addDoc,collection,getDocs } from 'firebase/firestore';


const ref = collection(firestore,"reviews");
const fetchReviews = async ()=>{
  const snapshot = await getDocs(ref);
  const data = [];
  snapshot.forEach(doc=>{
    data.push({...doc.data()});
  })
  return data;
};
function BreweryInfo() {
  const { id} = useParams();
  const userName = sessionStorage.getItem('username');
  const [prevId,setPrevId] = useState(1);
  const [storedRev,setStoredRev] = useState([]);
  const [review,setReview] = useState({
    productId: id,
    id:prevId,
    desc:'',
    rating:'',
    username:userName,
  });
  const [brewery, setBrewery] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
          );
          setBrewery(response.data);
          } catch (error) {
            setError(error.message);
          }
      };
    fetchBrewery();
  },[id]);
  useEffect(()=>{
    async function fetchData(){
      const existingRevs = await fetchReviews();
      const related = existingRevs.filter((rev)=>rev.productId===id);
      setStoredRev(related);
    }
    fetchData();
  },[storedRev,id]);
  const handleAddReview = async (e) => {
    e.preventDefault();

    try{
      setPrevId(prevId=>prevId+1);
      const newRev = ({...review,id:prevId})
      addDoc(ref,newRev);
    }catch(e){console.log(e);}
  };
  return (
    <div>
      {error && console.log(error)}
      {brewery && (
        <div className='desc'>
          <h2>{brewery.name}</h2>
          <p>{brewery.street}</p>
          <p>{brewery.phone}</p>
          <p>{brewery.website_url}</p>
          <p>State: {brewery.state}, City: {brewery.city}</p>
          
          <form onSubmit={handleAddReview}>
            <input
              type="text"
              value={review.desc}
              onChange={(e) => setReview({...review,desc:e.target.value})}
              placeholder="Add a review"
            />
            <select
              value={review.rating}
              onChange={(e) => setReview({...review,rating:e.target.value})}
              placeholder="Rating"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className='addReview' type="submit">Add Review</button>
          </form>
          <h3>Reviews</h3>
          <ul className='reviews'>
            {storedRev && storedRev.map((rev)=>{
              return(
                <li key={rev.id}>
                  <h4>{rev.username}</h4>
                  <div className='rev-desc'>
                    <p>{rev.desc}</p>
                    <p>{rev.rating} Star</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BreweryInfo;