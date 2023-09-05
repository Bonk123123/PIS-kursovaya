import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDeleteReturnsMutation, useGetReturnsQuery, usePostReturnsMutation, usePutReturnsMutation } from '../services/returns';
import { useGetBankQuery } from '../services/bank';
import { useGetReceiptQuery } from '../services/receipt';
import { IReturns } from '../store/slices/returns/returnsSlice';
import { Box, Button, Input, MenuItem, Modal, Paper, Select, SelectChangeEvent } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import { IBank } from '../store/slices/bank/bankSlice';

interface Ids {
    id: number,
    name: string
}


const ReturnsPage = () => {
    const { data, isLoading } = useGetReturnsQuery()
    const { data: bankData } = useGetBankQuery()
    const { data: receiptData } = useGetReceiptQuery()
    const [ postReturns ] = usePostReturnsMutation()
    const [ putReturns ] = usePutReturnsMutation()
    const [ deleteReturns ] = useDeleteReturnsMutation()
    
    const [allId, setAllId] = React.useState<Ids[]>()

    const [returns, setReturns] = React.useState<IReturns[]>([{id: 1, buyer: 'ds', reasonforreturn: 'fdf', name: 'fdf', quantity: 1, date: '', saleid: 10, price: 10}])

    const [addModal, setAddModal] = React.useState(false)
    const [addForm, setAddForm] = React.useState<Omit<IReturns, 'id' | 'date'>>({
        buyer: 'buyer', 
        reasonforreturn: 'reasonforreturn',
        name: 'name', 
        quantity: 0, 
        saleid: 0,
        price: 0, 
    })

    const [change, setChange] = React.useState(-1)
    const [changeForm, setChangeForm] = React.useState<Omit<IReturns, 'date'>>({
        id: 0,
        buyer: 'buyer', 
        reasonforreturn: 'reasonforreturn',
        name: 'name', 
        quantity: 0, 
        saleid: 0,
        price: 0, 
    })



    React.useEffect(() => {
        if (data) {
            setReturns(data)
        }
    }, [data])

    React.useEffect(() => {
        const ids1 = bankData?.map((item) => {
            return {id: item.id, name: item.name}
        })
        const ids2 = receiptData?.map((item) => {
            return {id: item.id, name: item.name}
        })
        if (ids1 && ids2) {
            const ids = ids1.concat(ids2)
            setAllId(ids)
        }
        
    }, [bankData, receiptData])

    const handleChange = (id: number) => {
        if (change === id) {
            setChange(-1)
        } else {
            setChange(id)
        }
        
    }

    const handleChangeForm = (key: keyof Omit<IReturns, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IReturns, 'date'> = {...changeForm}
        if (key === 'buyer' || key === 'name' || key === 'reasonforreturn') {
            obj[key] = e.target.value
        }
        if (key === 'price' || key === 'quantity' || key === 'saleid') {
            obj[key] = parseFloat(e.target.value)
        }
        
        setChangeForm(obj)
    }

    const handleAddForm = (key: keyof Omit<IReturns, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IReturns, 'id' | 'date'> = {...addForm}
        
        if (key === 'buyer' || key === 'name' || key === 'reasonforreturn') {
            obj[key] = e.target.value
        }
        if (key === 'price' || key === 'quantity') {
            obj[key] = parseFloat(e.target.value)
        }
        
        setAddForm(obj)
    }

    const handleSelectAddForm = (value: string) => {
        let obj1 = bankData?.find(item => item.id === Math.round(parseFloat(value)))
        let obj2 = receiptData?.find(item => item.id === Math.round(parseFloat(value)))
        if (obj1) {
            let obb: Omit<IReturns, "date" | "id"> = {...addForm, buyer: obj1.buyer, name: obj1.name, quantity: obj1.quantity, price: obj1.price, saleid: Math.round(parseFloat(value))}
            setAddForm(obb)
        }
        if (obj2) {
            let obb: Omit<IReturns, "date" | "id"> = {...addForm, buyer: obj2.departmentnumber, name: obj2.name, quantity: obj2.quantity, price: obj2.price, saleid: Math.round(parseFloat(value))}
            setAddForm(obb)
        }
        
    }


    if (isLoading) {
        return <h2 className='text-xl'>Loading...</h2>
    }

    return (
        <div>
            <Modal
            open={addModal}
            onClose={() => setAddModal(false)}
            sx={{
                display: 'flex',
                p: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={{position: 'relative',
                          width: 400,
                          bgcolor: 'background.paper',
                          border: '2px solid #000',
                          boxShadow: (theme) => theme.shadows[5],
                          display: 'flex',
                          flexDirection: 'column',
                          p: 4,
                        }}
                >
                    <p className='text-center'>Create Order</p>
                    <Input onChange={(e) => handleAddForm('buyer', e)} value={addForm.buyer} />
                    <Input onChange={(e) => handleAddForm('reasonforreturn', e)} value={addForm.reasonforreturn} />
                    <Input onChange={(e) => handleAddForm('name', e)} value={addForm.name} />
                    <Input onChange={(e) => handleAddForm('quantity', e)} value={addForm.quantity} type='number' />
                    <Input onChange={(e) => handleAddForm('price', e)} value={addForm.price} type='number' />
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addForm.name}
                    label="sale id"
                    onChange={(e) => handleSelectAddForm((e.target.value).toString())}
                    >
                        {
                            allId?.map((item) => {
                                return (
                                    <MenuItem value={item.id}>{item.id + ' ' + item.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <Button onClick={() => {
                        postReturns(addForm)
                        setAddModal(false)
                    }}
                    >
                        create
                    </Button>
                </Box>
            </Modal>
            <Button onClick={() => setAddModal(true)} className='flex w-full'>add order</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">id</TableCell>
                        <TableCell align="right">buyer</TableCell>
                        <TableCell align="right">reason for return</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">quantity</TableCell>
                        <TableCell align="right">price for one</TableCell>
                        <TableCell align="right">sale id</TableCell>
                        <TableCell align="right">date</TableCell>
                        <TableCell align="right">action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {returns.map((returns) => {
                        if (change === returns.id) {
                            return (
                                <TableRow
                                key={returns.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell component="th" scope="row">
                                            {returns.id}
                                        </TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('buyer', e)} value={changeForm.buyer} defaultValue={returns.buyer} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('reasonforreturn', e)} value={changeForm.reasonforreturn} defaultValue={returns.reasonforreturn} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('name', e)} value={changeForm.name} defaultValue={returns.name} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('quantity', e)} value={changeForm.quantity} defaultValue={returns.quantity} type='number' /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('price', e)} value={changeForm.price} defaultValue={returns.price} type='number' /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('saleid', e)} value={changeForm.saleid} defaultValue={returns.saleid} type='number' /></TableCell>
                                        <TableCell align="right">{(dayjs(returns.date.slice(1, -1))).toString()}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => {
                                                putReturns(changeForm)
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
                                key={returns.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {returns.id}
                                    </TableCell>
                                    <TableCell align="right">{returns.buyer}</TableCell>
                                    <TableCell align="right">{returns.reasonforreturn}</TableCell>
                                    <TableCell align="right">{returns.name}</TableCell>
                                    <TableCell align="right">{returns.quantity}</TableCell>
                                    <TableCell align="right">{returns.price}₽</TableCell>
                                    <TableCell align="right">{returns.saleid}</TableCell>
                                    <TableCell align="right">{(dayjs(returns.date.slice(1, -1))).toString()}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => {
                                            handleChange(returns.id)
                                            setChangeForm({id: returns.id, buyer: returns.buyer, reasonforreturn: returns.reasonforreturn, name: returns.name, quantity: returns.quantity, saleid: returns.saleid, price: returns.price})
                                        }}
                                        >
                                            <ModeEditIcon />
                                        </Button>
                                        <Button onClick={() => deleteReturns(returns)}><DeleteIcon /></Button>
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

export default ReturnsPage