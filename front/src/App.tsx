import { Box, Button, ButtonGroup, Paper } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGetPaymentQuery } from './services/payment'


const App: React.FC = () => {
  const { data: report, error, isLoading } = useGetPaymentQuery()
  
  return (
    <div>
      <div className='w-full flex justify-center'>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button><Link to='/payment'>An invoice for payment</Link></Button>
          <Button><Link to='/bank'>Sale for bank transfer</Link></Button>
          <Button><Link to='/receipt'>Sales Receipt</Link></Button>
          <Button><Link to='/returns'>Purchase returns</Link></Button>
          <Button><Link to='/report'>Report</Link></Button>
        </ButtonGroup>
      </div>
      
      
      <Outlet />
    </div>
  )
}

export default App
