import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getStockData } from './utils/api';
import Chart from 'chart.js/auto';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavScrollExample() {
  const [ticker, setTicker] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = await getStockData(ticker);
    if (stockData && stockData.length > 0) {
      const chartData = {
        labels: stockData.map((data) => data.date),
        datasets: [
          {
            label: `${ticker} Closing Price`,
            data: stockData.map((data) => data.close),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
      setChartData(chartData);
    } else {
      setChartData(null);
    }
    
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    <Navbar bg="light" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#">STOCK TRACKER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="https://www.nseindia.com/">Market</Nav.Link>
              <Nav.Link href="https://github.com/deepraj21"><a href="#" className="fa fa-github" /></Nav.Link>

          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            <Button variant="outline-success" type="submit">Submit</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
    chartData ? (
          
          <div style={{ width: '1500px', height: '600px', alignItems:'center' }}>
            <center><h2>{`${ticker} Closing Price`}</h2></center>
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false,
                width: '100%',
                height: '100%'
              }}
            />
          </div>

    ) : (
      <p>Please enter a valid ticker symbol to see the stock price graph.</p>
    )
  }

  </>
  );
}

export default NavScrollExample;
