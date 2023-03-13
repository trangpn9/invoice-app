import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

import useAuth from '../../hooks/useAuth';
import { createInvoice } from '../../services/apis/createInvoice';
import Loading from '../../components/Loading';

function CreateInvoice(): React.ReactElement {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const { auth } = useAuth();

  // Fake data to create a new invoice
  const fakeData = {
    customer: {
      firstName: 'John',
      lastName: ' Doe',
      name: 'British Auto Repair',
      contact: {
        email: 'johndoe@barepaire.co.uk',
        mobileNumber: '+44 7700 900662',
      },
      addresses: [
        {
          premise: 'Acme House',
          countryCode: 'UK',
          addressType: 'INVOICE',
          postcode: 'BK16',
          county: 'Berkshire',
          city: 'Southampton',
        },
      ],
    },
    documents: [
      {
        documentId: '35f2169c-c9dc-42d6-a756-764aeeb59adc',
        documentName: 'Bill',
        documentUrl: 'http://www.exampleinvoice.com/documents/23456789876',
      },
    ],
    invoiceReference: '#1234890',
    currency: 'GBP',
    invoiceDate: '2020-05-28',
    dueDate: '2020-12-31',
    description: 'Invoice for TrangPN',
    customFields: [],
    extensions: [
      {
        addDeduct: 'ADD',
        value: 10,
        type: 'PERCENTAGE',
        name: 'tax',
      },
      {
        addDeduct: 'DEDUCT',
        type: 'FIXED_VALUE',
        value: 1000,
        name: 'discount',
      },
    ],
    items: [
      {
        itemReference: 'platinumauto-10923',
        description: 'Vehicle Parts',
        quantity: 1000,
        rate: 20,
        itemName: 'Tires',
        itemUOM: '',
        customFields: [],
        extensions: [],
      },
    ],
  };

  const handleCreateInvoice = async () => {
    setIsLoading(true);

    // Random invoice number
    const rdInvoiceNum = Math.floor(Math.random() * 100 + 1);
    const newFakeData = { ...fakeData, invoiceNumber: `INVJACKIE${rdInvoiceNum}` };
    const payload = {
      invoices: [newFakeData],
    };

    // Call service post data
    try {
      const createInvoiceService = await createInvoice(auth.accessToken, auth.orgToken, payload);
      if (createInvoiceService === 401) {
        navigate('/auth/login', { replace: true });
      }
      console.log('createInvoiceService: ', createInvoiceService);
      // if (status == 201) navigate('/dashboard', { replace: true });
    } catch (error) {
      console.log('error getInvoices: ', error);
    }

    setIsLoading(false);
  };

  return (
    <div id="createInvoice">
      {/* Title content */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Create a new invoice</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/dashboard" className="btn btn-sm btn-danger mx-3">
            <i className="iconNav">
              <FontAwesomeIcon icon={faEarthAsia} />
            </i>
            Dashboard
          </Link>
        </div>
      </div>

      {/* Form create invoice */}
      <div className="row">
        <div className="col-6 row">
          <div className="mb-3 col-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Invoice Reference
            </label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Amount
            </label>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                $
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Amount"
                aria-label="Amount"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Date
            </label>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={invoiceDate}
              onChange={(date: Date) => setInvoiceDate(date)}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={5}></textarea>
          </div>
        </div>
      </div>

      {/* Item invoice */}
      <div className="table-responsive">
        <table className="table">
          <thead className="table-secondary">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Des</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>1</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>2</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th colSpan={4}>Total</th>
              <td>$0,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Button action invoice */}
      <div className="wrapBtnInvoice d-flex justify-content-end">
        <button type="button" className="btn btn-outline-dark">
          Cancel
        </button>
        <button type="button" className="btn btn-primary ms-2" onClick={handleCreateInvoice} disabled={isLoading}>
          {!isLoading && 'Submit'}
          {isLoading && <Loading />}
        </button>
      </div>
    </div>
  );
}

export default CreateInvoice;
