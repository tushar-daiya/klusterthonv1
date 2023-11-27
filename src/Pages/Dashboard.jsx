import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import {
  useGetAnalysisQuery,
  useGetMonthAnalysisQuery,
} from "../features/auth/authServices";
function Dashboard() {
  const { data, isLoading, isSuccess, error } = useGetAnalysisQuery();
  const {
    data: analysisData,
    isLoading: analysisLoading,
    isSuccess: analysisSuccess,
  } = useGetMonthAnalysisQuery();
  const [chartDataSet, setChartDataSet] = useState([]);
  useEffect(() => {
    const resultArray = Array(12).fill(0);
    analysisData?.data.forEach((item) => {
      const month = parseInt(item.monthYear.split("-")[1], 10);

      const monthIndex = month - 1;

      resultArray[monthIndex] += item.total;
    });
    setChartDataSet(resultArray);
  }, [analysisData]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ef0000",
        yAlign: "bottom",
        boxPadding: 1,
        caretPadding: 20,
        padding: 20,
        bodyAlign: "center",
        callbacks: {
          title: function (data) {
            return "Revenue";
          },
          label: function (data) {
            return "NG " + data.formattedValue;
          },
        },
      },
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: chartDataSet,
        backgroundColor: "#eeeeee",
        hoverBackgroundColor: "#ef0000",
      },
    ],
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-full">
      <Header
        title={`Hi, Welcome ${user?.firstName || "User"}`}
        desc="Welcome to your dashboard"
      />
      <div className="mt-10">
        <div className="mt-10 h-36 bg-white rounded-2xl">
          {isLoading && <LoadingScreen />}
          {isSuccess && data?.data && (
            <div className="grid grid-cols-4 w-full h-full">
              <div className="relative w-full flex items-center justify-center ">
                <div>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.792029"
                      y="1.11088"
                      width="22.7783"
                      height="22.7787"
                      rx="11.3891"
                      stroke="#EF0000"
                      stroke-width="0.584059"
                    />
                    <path
                      d="M6.34082 13.6686C6.34082 11.4661 6.34082 10.3645 7.02534 9.68061C7.70927 8.99609 8.8108 8.99609 11.0133 8.99609H13.3495C15.552 8.99609 16.6535 8.99609 17.3375 9.68061C18.022 10.3645 18.022 11.4661 18.022 13.6686C18.022 15.871 18.022 16.9726 17.3375 17.6565C16.6535 18.341 15.552 18.341 13.3495 18.341H11.0133C8.8108 18.341 7.70927 18.341 7.02534 17.6565C6.34082 16.9726 6.34082 15.871 6.34082 13.6686Z"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                    />
                    <path
                      opacity="0.5"
                      d="M14.5172 8.9959C14.5172 7.89437 14.5172 7.34418 14.1749 7.00193C13.8327 6.65967 13.2825 6.65967 12.181 6.65967C11.0794 6.65967 10.5292 6.65967 10.187 7.00193C9.84473 7.34418 9.84473 7.89437 9.84473 8.9959"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                    />
                    <path
                      opacity="0.5"
                      d="M12.1818 15.6159C12.8272 15.6159 13.3499 15.1802 13.3499 14.6429C13.3499 14.1055 12.8272 13.6692 12.1818 13.6692C11.5364 13.6692 11.0137 13.2335 11.0137 12.6956C11.0137 12.1583 11.5364 11.7226 12.1818 11.7226M12.1818 15.6159C11.5364 15.6159 11.0137 15.1802 11.0137 14.6429M12.1818 15.6159V16.0055M12.1818 11.7226V11.333M12.1818 11.7226C12.8272 11.7226 13.3499 12.1583 13.3499 12.6956"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p className="text-sm font-medium text-sv-grey mt-2">
                    TOTAL REVENUE
                  </p>
                  <p className="text-[28px] font-semibold">
                    NG {data?.data?.totalAmount.toLocaleString("en-US")}
                  </p>
                </div>
                <div className="absolute top-[30%] bottom-[30%] right-0 h-2/5 border-r-2 border-solid border-greyBg"></div>
              </div>
              <div className="relative w-full flex items-center justify-center ">
                <div>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.07719"
                      y="1.11088"
                      width="22.7783"
                      height="22.7783"
                      rx="11.3891"
                      stroke="#EF0000"
                      stroke-width="0.584059"
                    />
                    <path
                      d="M12.4666 11.7033C13.6396 11.7033 14.5905 10.7524 14.5905 9.57942C14.5905 8.40645 13.6396 7.45557 12.4666 7.45557C11.2937 7.45557 10.3428 8.40645 10.3428 9.57942C10.3428 10.7524 11.2937 11.7033 12.4666 11.7033Z"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                    />
                    <path
                      opacity="0.5"
                      d="M15.651 11.1734C16.5308 11.1734 17.2438 10.5787 17.2438 9.84596C17.2438 9.11323 16.5308 8.51855 15.651 8.51855M9.27941 11.1734C8.39961 11.1734 7.68652 10.5787 7.68652 9.84596C7.68652 9.11323 8.39961 8.51855 9.27941 8.51855"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                      stroke-linecap="round"
                    />
                    <path
                      d="M12.466 17.5441C14.2255 17.5441 15.6518 16.5932 15.6518 15.4202C15.6518 14.2473 14.2255 13.2964 12.466 13.2964C10.7066 13.2964 9.28027 14.2473 9.28027 15.4202C9.28027 16.5932 10.7066 17.5441 12.466 17.5441Z"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                    />
                    <path
                      opacity="0.5"
                      d="M16.7143 16.4815C17.6456 16.2771 18.3071 15.7599 18.3071 15.1541C18.3071 14.5482 17.6456 14.0311 16.7143 13.8267M8.21886 16.4815C7.28756 16.2771 6.62598 15.7599 6.62598 15.1541C6.62598 14.5482 7.28756 14.0311 8.21886 13.8267"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                      stroke-linecap="round"
                    />
                  </svg>

                  <p className="text-sm font-medium text-sv-grey mt-2">
                    TOTAL CLIENTS
                  </p>
                  <p className="text-[28px] font-semibold">
                    {data?.data?.client}
                  </p>
                </div>
                <div className="absolute top-[30%] bottom-[30%] right-0 h-2/5 border-r-2 border-solid border-greyBg"></div>
              </div>
              <div className="relative w-full flex items-center justify-center ">
                <div>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.27187"
                      y="1.30556"
                      width="22.3889"
                      height="22.3889"
                      rx="11.1945"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                    />
                    <path
                      d="M7.44094 14.89V8.8353H6.62598V14.891H7.44094V14.89ZM18.3071 14.89V8.79999H17.4922V14.8905L18.3071 14.89ZM16.8435 7.35206C16.2246 7.3738 15.4167 7.43736 14.7946 7.62372L15.0283 8.405C15.5444 8.2507 16.2638 8.18768 16.8717 8.16649L16.8435 7.35206ZM14.7946 7.62372C14.2541 7.78563 13.6461 8.10238 13.1718 8.37675L13.5803 9.08196C14.0422 8.81466 14.5828 8.53865 15.0283 8.405L14.7946 7.62372ZM8.08531 8.19691C8.61015 8.22897 9.20453 8.29145 9.64624 8.40826L9.85378 7.61992C9.33221 7.48192 8.67154 7.41618 8.13529 7.38303L8.08531 8.19691ZM9.64624 8.40826C10.1689 8.54626 10.8122 8.84834 11.343 9.12869L11.7233 8.40826C11.1827 8.12194 10.4715 7.78345 9.85433 7.62046L9.64624 8.40826ZM13.5423 17.3821C14.0807 17.0952 14.7479 16.779 15.2869 16.6367L15.0793 15.8489C14.4437 16.0162 13.7069 16.371 13.1593 16.6628L13.5423 17.3821ZM15.2869 16.6367C15.7232 16.5215 16.3094 16.4585 16.8304 16.4259L16.7794 15.6126C16.2469 15.6462 15.5955 15.712 15.0788 15.8484L15.2869 16.6367ZM11.7738 16.6628C11.2262 16.371 10.49 16.0162 9.85378 15.8484L9.64624 16.6362C10.1852 16.779 10.8524 17.0952 11.3903 17.3821L11.7738 16.6628ZM9.85378 15.8484C9.33764 15.7125 8.68567 15.6462 8.15322 15.6126L8.10269 16.4259C8.62373 16.4585 9.20996 16.5215 9.6457 16.6367L9.85378 15.8489V15.8484ZM17.4922 14.8905C17.4922 15.2632 17.1836 15.5876 16.7794 15.6126L16.8304 16.4259C17.6313 16.3759 18.3071 15.7245 18.3071 14.89L17.4922 14.8905ZM18.3071 8.79999C18.3071 8.00458 17.6742 7.32218 16.8435 7.35098L16.8717 8.16649C17.2059 8.15453 17.4922 8.42891 17.4922 8.7989H18.3071V8.79999ZM6.62598 14.89C6.62598 15.7245 7.30185 16.3759 8.10269 16.4264L8.15322 15.6126C7.749 15.5876 7.44094 15.2621 7.44094 14.89H6.62598ZM13.1593 16.6628C12.9459 16.7759 12.7081 16.8355 12.4666 16.8355C12.2251 16.8355 11.9872 16.7759 11.7738 16.6628L11.3908 17.3821C11.7221 17.5579 12.0915 17.6499 12.4666 17.6499C12.8416 17.6499 13.211 17.5579 13.5423 17.3821L13.1593 16.6628ZM13.1718 8.37566C12.9526 8.50235 12.705 8.57171 12.4519 8.57731C12.1988 8.58291 11.9484 8.52458 11.7239 8.40772L11.343 9.12869C11.6896 9.31002 12.0764 9.40023 12.4675 9.39197C12.8585 9.3837 13.2412 9.27669 13.5798 9.08088L13.1718 8.37566ZM7.44094 8.8353C7.44094 8.45661 7.74085 8.17572 8.08531 8.19691L8.13529 7.38303C7.28882 7.33142 6.62598 8.02142 6.62598 8.8353H7.44094Z"
                      fill="#EF0000"
                    />
                    <path
                      opacity="0.5"
                      d="M12.4668 9.30078V17.5298"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                    />
                    <path
                      opacity="0.5"
                      d="M8.66406 11.0098L10.8373 11.5531M8.66406 13.183L10.8373 13.7263M16.2704 13.183L14.0972 13.7263"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.2689 9.10693V11.2856C16.2689 11.4356 16.2689 11.5105 16.2173 11.541C16.1657 11.5708 16.0956 11.5372 15.9544 11.4703L15.2796 11.1498C15.2318 11.127 15.2079 11.1161 15.1823 11.1161C15.1568 11.1161 15.1329 11.127 15.0851 11.1498L14.4103 11.4703C14.269 11.5372 14.1984 11.5708 14.1473 11.541C14.0957 11.51 14.0957 11.435 14.0957 11.2856V9.89473"
                      stroke="#EF0000"
                      stroke-width="0.973431"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p className="text-sm font-medium text-sv-grey mt-2">
                    TOTAL PAID
                  </p>
                  <p className="text-[28px] font-semibold">
                    {data?.data?.paid}
                  </p>
                </div>
                <div className="absolute top-[30%] bottom-[30%] right-0 h-2/5 border-r-2 border-solid border-greyBg"></div>
              </div>
              <div className="w-full flex items-center justify-center ">
                <div>
                  <svg
                    width="29"
                    height="27"
                    viewBox="0 0 29 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M14.2852 25.2749C20.9126 25.2749 26.2852 19.9023 26.2852 13.2749C26.2852 6.64749 20.9126 1.2749 14.2852 1.2749C7.65774 1.2749 2.28516 6.64749 2.28516 13.2749C2.28516 19.9023 7.65774 25.2749 14.2852 25.2749Z"
                      stroke="#EF0000"
                    />
                    <path
                      d="M14.2855 6.07471V20.4747M17.8855 10.2747C17.8855 8.61871 16.2739 7.27471 14.2855 7.27471C12.2971 7.27471 10.6855 8.61871 10.6855 10.2747C10.6855 11.9307 12.2971 13.2747 14.2855 13.2747C16.2739 13.2747 17.8855 14.6187 17.8855 16.2747C17.8855 17.9307 16.2739 19.2747 14.2855 19.2747C12.2971 19.2747 10.6855 17.9307 10.6855 16.2747"
                      stroke="#EF0000"
                      stroke-linecap="round"
                    />
                  </svg>

                  <p className="text-sm font-medium text-sv-grey mt-2">
                    TOTAL PENDING
                  </p>
                  <p className="text-[28px] font-semibold">
                    {data?.data?.pending}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-10 bg-white rounded-2xl px-5">
          <div className="py-5 px-2 flex justify-between items-center border-b border-solid border-[#eeeee]">
            <p className="font-semibold text-2xl">Revenue Metric</p>
            <button className="px-5 py-2 bg-black text-white font-medium rounded-lg">
              Monthly
            </button>
          </div>
          <div className="mt-5">
            <Bar
              width={"100%"}
              data={chartData}
              options={options}
              height={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
