import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDeleteBankMutation, useGetBankQuery, usePostBankMutation, usePutBankMutation } from '../services/bank';
import { IBank } from '../store/slices/bank/bankSlice';
import { Box, Button, Input, Modal, Paper } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';

const BankPage = () => {
    const { data, isLoading } = useGetBankQuery()
    const [ postBank ] = usePostBankMutation()
    const [ putBank ] = usePutBankMutation()
    const [ deleteBank ] = useDeleteBankMutation()
    

    const [bank, setBank] = React.useState<IBank[]>([{id: 1, buyer: 'ds', name: 'fdf', quantity: 1, price: 10, date: ''}])


    const [change, setChange] = React.useState(-1)
    const [changeForm, setChangeForm] = React.useState<Omit<IBank, 'date'>>({
        id: 0,
        buyer: 'buyer', 
        name: 'name', 
        quantity: 0, 
        price: 0, 
    })



    React.useEffect(() => {
        if (data) {
            setBank(data)
        }
    }, [data])

    const handleChange = (id: number) => {
        if (change === id) {
            setChange(-1)
        } else {
            setChange(id)
        }
        
    }

    const handleChangeForm = (key: keyof Omit<IBank, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IBank, 'date'> = {...changeForm}
        if (key === 'buyer' || key === 'name') {
            obj[key] = e.target.value
        }
        if (key === 'price' || key === 'quantity') {
            obj[key] = parseFloat(e.target.value)
        }
        
        setChangeForm(obj)
    }




    if (isLoading) {
        return <h2 className='text-xl'>Loading...</h2>
    }

    return (
        <div>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">id</TableCell>
                        <TableCell align="right">buyer</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">quantity</TableCell>
                        <TableCell align="right">price for one</TableCell>
                        <TableCell align="right">date</TableCell>
                        <TableCell align="right">action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {bank.map((bank) => {
                        if (change === bank.id) {
                            return (
                                <TableRow
                                key={bank.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell component="th" scope="row">
                                            {bank.id}
                                        </TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('buyer', e)} value={changeForm.buyer} defaultValue={bank.buyer} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('name', e)} value={changeForm.name} defaultValue={bank.name} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('quantity', e)} value={changeForm.quantity} defaultValue={bank.quantity} type='number' /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('price', e)} value={changeForm.price} defaultValue={bank.price} type='number' /></TableCell>
                                        <TableCell align="right">{(dayjs(bank.date.slice(1, -1))).toString()}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => {
                                                putBank(changeForm)
                                                setChange(-1)
                                            }}
                                            >
                                                <SaveIcon />
                                            </Button>
                                            <Button onClick={() => setChange(-1)}><ClearIcon /></Button>
                                        </TableCell>
                                </TableRow>
                            )
                        } else 
                            return (
                                <TableRow
                                key={bank.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {bank.id}
                                    </TableCell>
                                    <TableCell align="right">{bank.buyer}</TableCell>
                                    <TableCell align="right">{bank.name}</TableCell>
                                    <TableCell align="right">{bank.quantity}</TableCell>
                                    <TableCell align="right">{bank.price}₽</TableCell>
                                    <TableCell align="right">{(dayjs(bank.date.slice(1, -1))).toString()}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => {
                                            handleChange(bank.id)
                                            setChangeForm({id: bank.id, buyer: bank.buyer, name: bank.name, quantity: bank.quantity, price: bank.price})
                                        }}
                                        >
                                            <ModeEditIcon />
                                        </Button>
                                        <Button onClick={() => deleteBank(bank)}><DeleteIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
  )
}

export default BankPage