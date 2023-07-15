import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayTeamatesStyles from  './GetTeamates.module.css';

const TeamatesPage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null); 

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            try{
                
                const response = await fetch("http://localhost:5050/record",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                
                if(!response.ok){
                    throw new Error("Failed to fetch data");
                }

                const recordsList = await response.json();
                setData(recordsList);

            }
            catch(err){
                window.alert("Error fetching Data", err);
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchData();
        
    },[])
    return(
        
        <>
        {
            isLoading ?(
                <div>Fetching records animation TODO</div>
            ) : (<>
                <div>Not loading</div>
                <div className={`${DisplayTeamatesStyles.listDiv}`}>
                    <ul>
                    {Object.keys(data[0]).map((key) => (
          <li key={key}>
            {key}: {data[0][key]}
          </li>
        ))}
                    </ul>
                </div>
                </>
            )
        }

        <h1>TODO</h1>
        <ul>
            <li>Get all elements from DB to display here in a list format</li>
            <li>Style list using CSS</li>
            <li>Add a sidebar to deal with filters</li>
            <li>skill first filter</li>
            <li>Multiple Skills next filter</li>
            <li>Have corresponding query optimization in DB for filters</li>
            <li>Use redis or another caching serviec to cache returned Users</li>
            <li>Limit cache</li>
            <li>ML to add auto suggest teamates *BETA*</li>
        </ul>
        </>
    ) 
}

export default TeamatesPage;