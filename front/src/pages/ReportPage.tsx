import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Input, MenuItem, Modal, Paper, Select, SelectChangeEvent } from '@mui/material';
import { queryParams, useGetReportQuery } from '../services/report';
import dayjs from 'dayjs';


const ReportPage = () => {
    const [ sort, setSort] = React.useState<queryParams>({sorting: '', direction: ''})

    const { data, isLoading, refetch } = useGetReportQuery(sort)

    const [ type, setType ] = React.useState<string>('')


    const handleSelectType = (e: SelectChangeEvent<string>) => {
        setType(e.target.value)
    }

    React.useEffect(() => {
        let query = {sorting: '', direction: ''}
        if (type === 'SaleForBankTransfer') {
            query = {sorting: 'SaleForBankTransfer', direction: ''}
        }
        if (type === 'PurchaseReturns') {
            query = {sorting: 'PurchaseReturns', direction: ''}
        }
        if (type === 'SalesReceipts') {
            query = {sorting: 'SalesReceipts', direction: ''}
        }
        // refetch(query)
        setSort(query)
    }, [type])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <p>Type of sale</p>
                                <Select
                                sx={{width: '300px'}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="type"
                                onChange={(e) => handleSelectType(e)}
                                >
                                    <MenuItem value={'SaleForBankTransfer'}>Sale For Bank Transfer</MenuItem>
                                    <MenuItem value={'PurchaseReturns'}>Purchase Returns</MenuItem>
                                    <MenuItem value={'SalesReceipts'}>Sales Receipts</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell align="right">
                                <p>Date of sale</p>
                                <span className=''>
                                    <span onClick={() => setSort({sorting: 'date', direction: 'up'})}>
                                        <ArrowDropUpIcon />
                                    </span>
                                    <span onClick={() => setSort({sorting: 'date', direction: 'down'})}>
                                        <ArrowDropDownIcon /> 
                                    </span>
                                </span>
                            </TableCell>
                            <TableCell align="right">
                            <p>Sum</p>
                            <span className=''>
                                <span onClick={() => setSort({sorting: 'sum', direction: 'up'})}>
                                    <ArrowDropUpIcon />
                                </span>
                                <span onClick={() => setSort({sorting: 'sum', direction: 'down'})}>
                                    <ArrowDropDownIcon /> 
                                </span>
                            </span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.map((item, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">{item.type}</TableCell>
                                        <TableCell align="right">{(dayjs(item.date.slice(1, -1))).toString()}</TableCell>
                                        <TableCell align="right">{item.sum}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>    
        </div>
    )
}

export default ReportPage