import React from 'react';
import axios, { AxiosResponse } from 'axios';

export const App = () => {

  const [response, setResponse] = React.useState<AxiosResponse>();

  React.useEffect(() => {
    axios.get('/api/GetData')
    .then(response => {
      // handle success
      setResponse(response);
      console.log(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
    }, []);

  return (
    <React.Fragment>
      {response?.data.map((elm:any, index:number) => {
        return (
          <div key={index}>id: {elm.id}, name: {elm.name}</div>
        )
      })}
    </React.Fragment>
  );
}
