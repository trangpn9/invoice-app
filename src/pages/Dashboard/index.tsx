import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

import CustomPagination from '../../components/CustomPagination';
import useAuth from '../../hooks/useAuth';
import { fetchInvoices } from '../../services/apis/fetchInvoices';
import Loading from '../../components/Loading';
import useRequestPrivate from '../../hooks/useRequestPrivate';
import { GET_INVOICES_URL } from '../../utils/constants';

function Dashboard(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const [currentPageSize] = useState(10);
  const privateRequest = useRequestPrivate();

  const params = {
    pageNum: pageActive,
    pageSize: 10,
    dateType: 'INVOICE_DATE',
    sortBy: 'CREATED_DATE',
    ordering: 'DESCENDING', // Descending Order
    // fromDate: '2023-01-28',
    // toDate: '2023-03-10',
  };

  useEffect(() => {
    const controller = new AbortController();
    getInvoices();

    return () => {
      controller.abort();
    };
  }, [pageActive]);

  const handlePageActive = (page: number) => {
    setPageActive(page);
  };

  const getInvoices = async () => {
    setIsLoading(true);

    try {
      const fetchInvoicesService: any = await fetchInvoices(auth.accessToken, auth.orgToken, params);
      if (fetchInvoicesService === 401) {
        navigate('/auth/login', { replace: true });
      }

      setInvoices(fetchInvoicesService?.data);
      const { totalRecords } = fetchInvoicesService?.paging;
      setTotalItems(totalRecords);
    } catch (error) {
      console.log('error getInvoices: ', error);
    }

    setIsLoading(false);

    // test interceptor
    try {
      const responseInvoice = await privateRequest.get(GET_INVOICES_URL, {params});
      console.log('responseInvoice: ', responseInvoice.data);
      
      
    } catch (error) {
      console.log('error getInvoices: ', error);
    }
  };

  return (
    <div id="dashboard">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">My Invoices</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/invoice/create" className="btn btn-sm btn-danger mx-3">
            <i className="iconNav">
              <FontAwesomeIcon icon={faRocket} />
            </i>
            Create Invoice
          </Link>
        </div>
      </div>
      {/* Search form */}
      <div className="row d-flex justify-content-between align-items-end">
        <div className="col-md-5 col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your invoice"
              aria-label="Enter your invoice"
              aria-describedby="button-addon2"
              width={'50px'}
            />
            <button className="btn btn-outline-primary" type="button" id="button-addon2">
              Search
            </button>
            {/* <button className="btn btn-danger" type="button" id="button-addon2" onClick={() => refresh()}>
              Refresh
            </button> */}
          </div>
        </div>

        {/* Set filter */}
        <div className="col-md-5 col-12 d-flex justify-content-between align-items-end flex-wrap flex-md-nowrap">
          <div className="wrapDatePicker">
            <span>Form: </span>
            <DatePicker dateFormat="yyyy/MM/dd" selected={fromDate} onChange={(date: Date) => setFromDate(date)} />
          </div>
          <div className="wrapDatePicker">
            <span>To: </span>
            <DatePicker dateFormat="yyyy/MM/dd" selected={toDate} onChange={(date: Date) => setToDate(date)} />
          </div>
          <div className="btn-toolbar ms-1">
            <button type="button" className="btn btn-success">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Outlet */}

      <div className="table-responsive mt-3">
        {invoices && (
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Currency</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Total Paid</th>
              </tr>
            </thead>
            <tbody>

              {!isLoading &&
                invoices.map((invoice, index) => (
                  <tr key={invoice['invoiceNumber']}>
                    <td>{index + 1}</td>
                    <td>{invoice['createdAt']}</td>
                    <td>{invoice['description']}</td>
                    <td>{invoice['currency']}</td>
                    <td>{invoice['totalAmount']}</td>
                    <td>{invoice['totalPaid']}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {isLoading && <Loading />}
      </div>

      {/* Pagination */}
      {totalItems > currentPageSize && (
        <div className="wrapPagination d-flex justify-content-center">
          <CustomPagination
            totalRecords={totalItems}
            active={pageActive}
            limit={currentPageSize}
            onSetPageActive={handlePageActive}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
