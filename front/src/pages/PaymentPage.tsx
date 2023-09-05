import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import React from 'react'
import { useDeletePaymentMutation, useGetPaymentQuery, usePostPaymentMutation, usePutPaymentMutation, useDeletePaymentBankMutation } from '../services/payment'
import { IPayment } from '../store/slices/payment/paymentSlice'

const PaymentPage = () => {
    const { data, isLoading } = useGetPaymentQuery()
    const [ postPayment ] = usePostPaymentMutation()
    const [ putPayment ] = usePutPaymentMutation()
    const [ deletePayment ] = useDeletePaymentMutation()
    const [ deletePaymentBank ] = useDeletePaymentBankMutation() 
    

    const [payment, setPayment] = React.useState<IPayment[]>([{id: 1, buyer: 'ds', name: 'fdf', quantity: 1, price: 10, date: ''}])

    const [addModal, setAddModal] = React.useState(false)
    const [addForm, setAddForm] = React.useState<Omit<IPayment, 'id' | 'date'>>({
        buyer: 'buyer', 
        name: 'name', 
        quantity: 0, 
        price: 0, 
    })

    const [change, setChange] = React.useState(-1)
    const [changeForm, setChangeForm] = React.useState<Omit<IPayment, 'date'>>({
        id: 0,
        buyer: 'buyer', 
        name: 'name', 
        quantity: 0, 
        price: 0, 
    })



    React.useEffect(() => {
        if (data) {
            setPayment(data)
        }
    }, [data])

    const handleChange = (id: number) => {
        if (change === id) {
            setChange(-1)
        } else {
            setChange(id)
        }
        
    }

    const handleChangeForm = (key: keyof Omit<IPayment, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IPayment, 'date'> = {...changeForm}
        if (key === 'buyer' || key === 'name') {
            obj[key] = e.target.value
        }
        if (key === 'price' || key === 'quantity') {
            obj[key] = parseFloat(e.target.value)
        }
        
        setChangeForm(obj)
    }

    const handleAddForm = (key: keyof Omit<IPayment, 'id'>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let obj: Omit<IPayment, 'id' | 'date'> = {...addForm}
        if (key === 'buyer' || key === 'name') {
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
                    <Input onChange={(e) => handleAddForm('buyer', e)} value={addForm.buyer} />
                    <Input onChange={(e) => handleAddForm('name', e)} value={addForm.name} />
                    <Input onChange={(e) => handleAddForm('quantity', e)} value={addForm.quantity} type='number' />
                    <Input onChange={(e) => handleAddForm('price', e)} value={addForm.price} type='number' />
                    <Button onClick={() => {
                        postPayment(addForm)
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
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">quantity</TableCell>
                        <TableCell align="right">price for one</TableCell>
                        <TableCell align="right">date</TableCell>
                        <TableCell align="right">action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {payment.map((payment) => {
                        if (change === payment.id) {
                            return (
                                <TableRow
                                key={payment.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell component="th" scope="row">
                                            {payment.id}
                                        </TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('buyer', e)} value={changeForm.buyer} defaultValue={payment.buyer} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('name', e)} value={changeForm.name} defaultValue={payment.name} /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('quantity', e)} value={changeForm.quantity} defaultValue={payment.quantity} type='number' /></TableCell>
                                        <TableCell align="right"><Input onChange={(e) => handleChangeForm('price', e)} value={changeForm.price} defaultValue={payment.price} type='number' /></TableCell>
                                        <TableCell align="right">{(dayjs(payment.date.slice(1, -1))).toString()}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => {
                                                putPayment(changeForm)
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
                                key={payment.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {payment.id}
                                    </TableCell>
                                    <TableCell align="right">{payment.buyer}</TableCell>
                                    <TableCell align="right">{payment.name}</TableCell>
                                    <TableCell align="right">{payment.quantity}</TableCell>
                                    <TableCell align="right">{payment.price}₽</TableCell>
                                    <TableCell align="right">{(dayjs(payment.date.slice(1, -1))).toString()}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => deletePaymentBank(payment)}>paid</Button>
                                        <Button onClick={() => {
                                            handleChange(payment.id)
                                            setChangeForm({id: payment.id, buyer: payment.buyer, name: payment.name, quantity: payment.quantity, price: payment.price})
                                        }}
                                        >
                                            <ModeEditIcon />
                                        </Button>
                                        <Button onClick={() => deletePayment(payment)}><DeleteIcon /></Button>
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

export default PaymentPage