import { Global, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import BarChart from './components/BarChart';
import CountryList from './components/CountryList';

import GlobalInfo from './components/GlobalInfo';
import type { Country, ResponseData } from './types';


const  App: React.FC = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined)
  const [activeCountry, setActiveCountry] = useState<Country[]>([])

  const fetchData = async() => {
   const result = await fetch('https://api.covid19api.com/summary')
   const data: ResponseData = await result.json()

   setData(data)

}

useEffect(() => {
  fetchData()
},[])



const handleOnClick = (country: Country) => {
  const countryIndex = activeCountry.findIndex(
    item => item.ID === country.ID
  )

  if(countryIndex > -1) {
    const NewActiveCountry = [...activeCountry]
    NewActiveCountry.splice(countryIndex, 1)
    setActiveCountry(NewActiveCountry)
  }else {
    setActiveCountry([...activeCountry, country])
  }

  
  
}

  return (
    <div >
      <Global
      styles={css`
      body {
        box-sizing: border-box;
        background-color: #f1f1f1
      }
        
      `}
      />
      
      {data ? (
        <>
          <GlobalInfo 
          newConfirmed={data?.Global.NewConfirmed} 
          newDeaths={data?.Global.NewDeaths}
          newRecovered={data?.Global.NewRecovered}
          />
          <hr/>
          {activeCountry.length ? <BarChart countries={activeCountry}/> : null}
          
          <CountryList countries={data?.Countries} onItemClick={handleOnClick} />
        </>
       
      ) : ('Loading...')
    }
     
    </div>
  );
}

export default App;
