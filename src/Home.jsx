import React from 'react';
import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, AreaChart, Area } from 'recharts';

function generateRandomData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const getRandomNumber = () => Math.floor(Math.random() * 1000);
    return months.map(month => ({
        month,
        sales: getRandomNumber(),
        profit: getRandomNumber() * 0.2, // Assuming profit is 20% of sales
    }));
}

function Home() {
    const productSalesData = generateRandomData();
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff3860']; // Custom color palette

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>SALES AND PROFIT/LOSS OF A PRODUCT IN DIFFERENT MONTHS</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TOTAL SALES</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{productSalesData.reduce((total, entry) => total + entry.sales, 0)}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TOTAL PROFIT</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{productSalesData.reduce((total, entry) => total + entry.profit, 0).toFixed(2)}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>AVERAGE PROFIT/LOSS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{(productSalesData.reduce((total, entry) => total + entry.profit, 0) / productSalesData.length).toFixed(2)}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>LAST MONTH PROFIT/LOSS</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h1>{productSalesData[productSalesData.length - 1].profit.toFixed(2)}</h1>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={productSalesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                        <Bar dataKey="profit" fill="#82ca9d" name="Profit/Loss" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={productSalesData} dataKey="sales" nameKey="month" fill="#8884d8" label>
                            {/* Assigning colors to different categories */}
                            {productSalesData.map((entry, index) => (
                                <Pie key={`pie-${index}`} data={entry} dataKey="sales" nameKey="month" fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        width={500}
                        height={300}
                        data={productSalesData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="sales" fill="#8884d8" name="Sales" />
                        <Area type="monotone" dataKey="profit" fill="#82ca9d" name="Profit/Loss" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
