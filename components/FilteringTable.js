import React, {useMemo} from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS, GROUPED_COLUMNS} from './columns'
import {Table} from 'react-bootstrap'
import { GLobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

export const FilteringTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const defaultColumn = useMemo(() => {
        return{
            Filter: ColumnFilter
        }
    }, [])

    const {getTableProps, 
           getTableBodyProps, 
           headerGroups,
           footerGroups, 
           rows, 
           prepareRow,
           state,
           setGlobalFilter
        } = useTable({
        columns,
        data,
        defaultColumn
    },useFilters,    
    useGlobalFilter)

    const { globalFilter } = state
    return(
        <>
        <GLobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />
        <Table {...getTableBodyProps()} striped bordered hover>
            <thead>
                {headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}
                                    <div>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </div>   
                                </th>
                        ))}           
                    </tr>   
                ))}    
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) =>{
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}       
                            </tr>   
                        )})
                }         
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr  {...footerGroup.getFooterGroupProps()}> 
                           {footerGroup.headers.map(column => (
                                   <td {...column.getFooterProps}>
                                       {column.render('Footer')}
                                   </td>    
                            ))}
                        </tr>
                    ))}
            </tfoot>        
        </Table>   
        </> 
    )
 }