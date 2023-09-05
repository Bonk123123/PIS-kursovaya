import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDeleteReceiptMutation, useGetReceiptQuery, usePostReceiptMutation, usePutReceiptMutation } from '../services/receipt';
import { IReceipt } from '../store/slices/receipt/receiptSlice';
import { Box, Button, Input, Modal, Paper } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';

const ReceiptPage = () => {
    const { data, isLoading } = useGetReceiptQuery()
    const [ postReceipt ] = usePostReceiptMutation()
    const [ putReceipt ] = usePutReceiptMutation()
    const [ deleteReceipt ] = useDeleteReceiptMutation()
    

    const [receipt, setReceipt] = React.useState<IReceipt[]>([{id: 1, departmentnumber: 'ds', name: 'fdf', quantity: 1, price: 10, date: ''}])

    const [addModal, setAddModal] = React.useState(false)
    const [addForm, setAddForm] = React.useState<Omit<IReceipt, 'id' | 'date'>>({
        departmentnumber: 'departmentnumber', 
        name: 'name', 
        quantity: 0, 
        price: 0, 
    })

    const [change, setChange] = React.useState(-1)
    const [changeForm, setChangeForm] = React.useState<Omit<IReceipt, 'date'>>({
        id: 0,
        departmentnumber: 'departmentnumber', 
        name: 'name', 
        quantity: 0, 
        price: 0, 
    })



    React.useEffect(() => {
        if (data) {
            setReceipt(data)
        }
    }, [data])

    const handleChange = (id: number) => {
        if (change === id) {
            setChange(-1)
        } else {
            setChange(id)
        }
        
    }

    const handleChangeForm = (key: keyof Omit<IReceipt, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IReceipt, 'date'> = {...changeForm}
        if (key === 'departmentnumber' || key === 'name') {
            obj[key] = e.target.value
        }
        if (key === 'price' || key === 'quantity') {
            obj[key] = parseFloat(e.target.value)
        }
        
        setChangeForm(obj)
    }

    const handleAddForm = (key: keyof Omit<IReceipt, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IReceipt, 'id' | 'date'> = {...addForm}
        if (key === 'departmentnumber' || key === 'name') {
            obj[key] = e.target.value
        }
        if (key === 'price' || key === 'quantity') {
            obj[key] = parseFloat(e.target.value)
        }
        
        setAddForm(obj)
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
                    <Input onChange={(e) => handleAddForm('departmentnumber', e)} value={addForm.departmentnumber} />
                    <Input onChange={(e) => handleAddForm('name', e)} value={addForm.name} />
                    <Input onChange={(e) => handleAddForm('quantity', e)} value={addForm.quantity} type='number' />
                    <Input onChange={(e) => handleAddForm('price', e)} value={addForm.price} type='number' />
                    <Button onClick={() => {
                        postReceipt(addForm)
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
                        <TableCell align="right">departmentnumber</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">quantity</TableCell>
                        <TableCell align="right">price for one</TableCell>
                        <TableCell align="right">date</TableCell>
                        <TableCell align="right">action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {receipt.map((receipt) => {
                        if (change === receipt.id) {
                            return (
                                <TableRow
                                key={receipt.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell component="th" scope="row">
                                            {receipt.id}
                                        </TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('departmentnumber', e)} value={changeForm.departmentnumber} defaultValue={receipt.departmentnumber} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('name', e)} value={changeForm.name} defaultValue={receipt.name} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('quantity', e)} value={changeForm.quantity} defaultValue={receipt.quantity} type='number' /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('price', e)} value={changeForm.price} defaultValue={receipt.price} type='number' /></TableCell>
                                        <TableCell align="right">{(dayjs(receipt.date.slice(1, -1))).toString()}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => {
                                                putReceipt(changeForm)
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
                                key={receipt.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {receipt.id}
                                    </TableCell>
                                    <TableCell align="right">{receipt.departmentnumber}</TableCell>
                                    <TableCell align="right">{receipt.name}</TableCell>
                                    <TableCell align="right">{receipt.quantity}</TableCell>
                                    <TableCell align="right">{receipt.price}₽</TableCell>
                                    <TableCell align="right">{(dayjs(receipt.date.slice(1, -1))).toString()}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => {
                                            handleChange(receipt.id)
                                            setChangeForm({id: receipt.id ,departmentnumber: receipt.departmentnumber, name: receipt.name, quantity: receipt.quantity, price: receipt.price})
                                        }}
                                        >
                                            <ModeEditIcon />
                                        </Button>
                                        <Button onClick={() => deleteReceipt(receipt)}><DeleteIcon /></Button>
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

export default ReceiptPage