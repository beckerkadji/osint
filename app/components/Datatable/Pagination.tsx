import PaginationButton from "flowbite-react/lib/esm/components/Pagination/PaginationButton";
import { useEffect, useMemo, useState } from "react"

export default function Pagination ({total=0, itemsPerPage=5, currentPages=1, onPageChange=(page:any)=>{}}){

    const[totalPages, setTotalPages] = useState(0);

    useEffect( ()=>{
        if(total > 0 && itemsPerPage > 0) {
            setTotalPages( Math.ceil(total / itemsPerPage))
        }
    }, [total, itemsPerPage])

    const paginationItems = useMemo(() =>{
        const pages = [];
        for(let i=1; i<=totalPages; i++){
            pages.push(<li>
                <button  key={i} onClick={()=> onPageChange(i)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i}</button>
            </li>)
        }

        return pages;
    }, [totalPages, currentPages])

    if( totalPages === 0) return null 

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                            onClick={()=> onPageChange(currentPages - 1 )} disabled={currentPages === 1}>
                                Previous
                        </button>
                    </li>
                        {paginationItems}
                    <li>
                        <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                            onClick={()=> onPageChange(currentPages + 1 )} disabled={currentPages === totalPages}>
                                Next
                        </button>                    
                    </li>
                </ul>
            </nav>
        </>
    )
}