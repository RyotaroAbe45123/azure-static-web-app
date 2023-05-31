import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export const App = () => {

  const [response, setResponse] = useState<AxiosResponse>();

  const url = "https://jsonplaceholder.typicode.com/posts"

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setResponse(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])
  
  return (
    <Fragment>
      {
        response && response.data.map((data: any) => (
          <>
          <p>{data.id}</p>
          <p>{data.title}</p>
          </>
        ))}
    </Fragment>
  );
}
