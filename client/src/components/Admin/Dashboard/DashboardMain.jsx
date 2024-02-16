import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStatsAction } from "../../../redux/slices/orders/oderSlice";
import ChartSVG from "../../SVG/ChartSVG";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Chart } from "chart.js/auto";

function DashboardMain() {
  const dispatch = useDispatch();
  const chartRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  useEffect(() => {
    dispatch(getOrderStatsAction());
  }, [dispatch]);

  // Get order stats from the Redux store
  const { stats, loading } = useSelector((state) => state.orders);

  // Calculate percentage change
  const percentageChange =
    (stats?.todaySales - stats?.yesterdaySales) / stats?.yesterdaySales || null;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calculate start and end indices for the current page
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const pageCount =
    Number(Math.ceil(stats?.productSales.length / perPage)) || 0;

  // Filter and slice the products based on the current page
  const productsToDisplay = stats?.productSales.slice(startIndex, endIndex);
  const chartInstanceRef = useRef(null); // Add a ref to store the chart instance

  useEffect(() => {
    if (stats) {
      if (chartInstanceRef.current) {
        // Destroy the existing chart if it exists
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Today",
            "Yesterday",
            "Last Month",
            "Total Sales",
            "Average Sales",
          ],
          datasets: [
            {
              label: "Sales",
              data: [
                stats.todaySales,
                stats.yesterdaySales,
                stats.lastMonthSales,
                stats.totalSales,
                stats.avgSales,
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Store the chart instance in the ref
      chartInstanceRef.current = chart;
    }
  }, [stats]);

  return (
    <div className="mt-12 max-w-7xl mx-auto">
      {loading && <LoadingSpinner />}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Sales */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <ChartSVG />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Sales
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${stats?.totalSales}
            </h4>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <ChartSVG />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Todays Sales
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${stats?.todaySales}
            </h4>
          </div>
        </div>

        {/* Yesterday's Sales */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <ChartSVG />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Yesterdays Sales
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${stats?.yesterdaySales}
            </h4>
          </div>
        </div>

        {/* Last Month's Sales */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <ChartSVG />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Last Months Sales
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${stats?.lastMonthSales}
            </h4>
          </div>
        </div>
      </div>

      {/* Percentage Change */}
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mb-5 ">
        <div className="p-4">
          <p className=" text-gray-900 mb-2">Sales Growth Percentage</p>
          <div className="flex items-center justify-end">
            <h4 className="text-2xl font-semibold text-blue-500">
              {percentageChange !== null
                ? `${(percentageChange * 100).toFixed(2)}%`
                : "N/A"}
            </h4>
            <span
              className={`ml-2 ${
                percentageChange !== null && percentageChange >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {percentageChange !== null && percentageChange >= 0
                ? "Positive Growth"
                : "Negative Growth"}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This percentage represents the change in sales compared to the
            previous period. A positive percentage indicates sales growth, while
            a negative percentage indicates a decline in sales.
          </p>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg my-5">
        <canvas ref={chartRef} width={400} height={200}></canvas>
      </div>
      {/* Product Sales Table */}
      <div className="relative bg-clip-border bg-white rounded-xl text-gray-700 shadow-md p-4">
        <h2 className="text-xl font-semibold">Product Sales</h2>
        <table className="mt-4 w-full border">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Total Sales</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Average Price</th>
              <th className="border p-2">Quality</th>
            </tr>
          </thead>
          <tbody>
            {productsToDisplay?.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.totalSales}</td>
                <td className="border p-2">{product.count}</td>
                <td className="border p-2">${product.avgSales.toFixed(2)}</td>
                <td className="border p-2">
                  {
                    // Product quality badge
                    product.avgSales > stats?.avgSales ? (
                      <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full">
                        Good
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full">
                        Bad
                      </span>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center mt-4"}
          pageLinkClassName={" px-3 py-1 hover:bg-blue-100 rounded-md mx-1"}
          previousLinkClassName={
            "text-blue-500 px-3 py-1 hover:bg-blue-100 rounded-md mx-1"
          }
          nextLinkClassName={
            "text-blue-500 px-3 py-1 hover:bg-blue-100 rounded-md mx-1"
          }
          activeClassName={"bg-blue-500 text-white px-2 py-1 rounded-md mx-1"}
        />
      </div>
    </div>
  );
}

export default DashboardMain;
