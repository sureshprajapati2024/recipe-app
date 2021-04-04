import React ,{useState,useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';
import Button from '@material-ui/core/Button';


function App() {

const APP_ID="74a6e701";
const APP_KEY="dc3be850f73595e54a3ceb11d7e13749";



const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken');
const exampleReq=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

useEffect(() => {
  getRecipes();
  
}, [query]);

const getRecipes=async()=>{
  const response=await fetch(exampleReq);
  const data=await response.json();
  setRecipes(data.hits);
}


const upadateSearch=e=>{
  setSearch(e.target.value)
};

const getSearch=e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}


  return (
    <div className="App">
     
      <form onSubmit={getSearch} className="search-form">
      <input  className="search-bar" type="text" value={search} onChange={upadateSearch}  />
        <Button  className="search-button" variant="contained" color="primary" type="submit">Search</Button>
        
      </form>
      <div className='recipes'>
      { recipes.map(recipe=>( 
        
        <Recipe  key={recipe.recipe.key} title={recipe.recipe.label} calories={recipe.recipe.calories}
         image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />  ))}
    </div>
    </div>
  );
}

export default App;
