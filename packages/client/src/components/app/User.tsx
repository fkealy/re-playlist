import React from 'react';
import LogoSvg from './LogoSvg';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';


import { useParams } from 'react-router-dom';

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Button } from '@mui/joy';


function SelectBasic() {
  return (
    <Select className = "select" variant="soft" color="warning" placeholder="Select your playlist">
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
    </Select>
  );
}
function User() {
  const { accessToken, refreshToken  } = useParams();
  return (
    <div className="user">
      <LogoSvg/>
      <div className="buttonContainer">
      <Button className = "button"
          color="success"
          disabled={false}
          onClick={function(){}}
          size="md"
          variant="solid"> 
        Next
      </Button>
      </div>
      <div className="selectContainer">
      <SelectBasic/>
      </div>
    </div>
  );
}

export default User;
