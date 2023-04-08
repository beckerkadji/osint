export default function TableHeader () {

    return(
        <thead className="border-b bg-thirdcolor text-blackcolor">
            <tr>
                <th scope="col" className="text-sm font-medium  px-3 py-2 text-left">
                    
                </th>
                <th scope="col" className="text-sm font-medium  px-3 py-2 text-left">
                    User name
                </th>
                <th scope="col" className="text-sm font-medium  px-3 py-2 text-left">
                    Email
                </th>
                <th scope="col" className="text-sm font-medium  px-3 py-2 text-left">
                    Role
                </th>
                <th scope="col" className="text-sm font-medium  px-3 py-2 text-left">
                    Actions
                </th>
            </tr>
        </thead>
    )
}