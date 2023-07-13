import React, { useEffect, useState } from 'react'
import branch1 from '../branch/branch1.json';
import branch2 from '../branch/branch2.json';
import branch3 from '../branch/branch3.json';

function Product() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const mergedData = mergeData(branch1.products, branch2.products, branch3.products);
        setData(mergedData);
        setFilteredData(mergedData);
    }, []);
   
    const mergeData = (branch1, branch2, branch3) => {
        const mergedArray = [...branch1, ...branch2, ...branch3];
        const mergedData = mergedArray.reduce((result, product) => {
            const existingProduct = result.find((p) => p.name === product.name);

            if (existingProduct) {
                existingProduct.sold += product.sold;
            } else {
                result.push({...product});
            }
            return result;
        }, []);
        return mergedData;
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filtered = data.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredData(filtered);
    };
   
    const totalRevenue = filteredData.reduce(
        (total, product) => total + product.unitPrice * product.sold, 0
    );
    console.log(totalRevenue);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    };

    return (
        <div>
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((product, index) => 
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{formatNumber(product.unitPrice * product.sold)}</td>
                            </tr>
                        )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total Revenue:</td>
                        <td>{formatNumber(totalRevenue)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
    
}

export default Product