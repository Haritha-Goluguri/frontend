// import axios from "axios"
// import { api } from "../actions/api"
// import {
//     Table,
//     Thead,
//     Tbody,
//     Tfoot,
//     Tr,
//     Th,
//     Td,
//     TableCaption,
//     TableContainer,
//   } from '@chakra-ui/react'
// export const students =()=>{
// const featchData=async()=>
//     await axios.post(api+'/students')
// .then((res)=>{
//     setData(res?.data)
// })
// return(
    
//     <TableContainer>
//         <Table variant='simple'>
//         <TableCaption>Imperial to metric conversion factors</TableCaption>
//        <Thead>
//       <Tr>
//         <Th>To convert</Th>
//         <Th>into</Th>
//         <Th isNumeric>multiply by</Th>
//       </Tr>
//       </Thead>
//       <Tbody>
//       <Tr>
//         <Td>inches</Td>
//         <Td>millimetres (mm)</Td>
//         <Td isNumeric>25.4</Td>
//       </Tr>
//       <Tr>
//         <Td>feet</Td>
//         <Td>centimetres (cm)</Td>
//         <Td isNumeric>30.48</Td>
//       </Tr>
//       <Tr>
//         <Td>yards</Td>
//         <Td>metres (m)</Td>
//         <Td isNumeric>0.91444</Td>
//       </Tr>
//       </Tbody>
//        <Tfoot>
//       <Tr>
//         <Th>To convert</Th>
//         <Th>into</Th>
//         <Th isNumeric>multiply by</Th>
//       </Tr>
//        </Tfoot>
//      </Table>
//      </TableContainer>

// )

// };
import axios from "axios"
import { api } from "../actions/api"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { useEffect, useState } from "react"
export const Students = () => {
    const [data,setData]=useState([])
    const featchData=async()=>
        await axios.post(api+'/students')
    .then((res)=>{
        setData(res?.data)
    })
    .catch((e)=>console.log(e))
    useEffect(()=>{
        featchData()
    },[])
    return(
        <>
        <TableContainer>
  <Table variant='simple'>
    <TableCaption>Bootcamp students data</TableCaption>
    <Thead>
      <Tr>
        <Th>Gmail</Th>
        <Th>Registraionno</Th>
        <Th>mobile</Th>
        <Th>password</Th>
      </Tr>
    </Thead>
    <Tbody>
        
      <Tr>
        <Td>val.Gmail</Td>
        <Td>val.Registrationno</Td>
        <Td>val.mobile</Td>
        <Td>val.password</Td>
        </Tr>
        <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
      
    </Tbody>
    
        
    
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
        </>
    )
}