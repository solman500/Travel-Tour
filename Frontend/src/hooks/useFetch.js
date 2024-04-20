import  { useEffect, useState } from "react";
// import { token } from "../config";


const useFetch = (url)=> {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      try{
        const res = await fetch( url);
        const result=await res.json();
          
          if (!res.ok){
           setError('Faild to Fetch Data');
          }

          setData(result.data);
            setLoading(false);

      }catch(error){
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
    // fetchData();
        // console.log("Token: ", token); // Add this line

  },[url])

  return {
    data,
    loading,
    error,
  }
};

export default useFetch;
