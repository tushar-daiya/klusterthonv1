import React from "react";
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
function Dashboard() {
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
            return "$" + data.formattedValue;
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
  const data = {
    labels: labels,
    datasets: [
      {
        data: [
          3925, 2866, 1524, 3108, 2677, 2033, 1438, 3771, 3221, 1295, 1234,
          3424,
        ],
        backgroundColor: "#eeeeee",
        hoverBackgroundColor: "#ef0000",
      },
    ],
  };
  const {user}=useSelector((state)=>state.auth)
  return (
    <div className="w-full">
      <Header title={`Hi, Welcome ${user?.firstName}`} desc="Welcome to your dashboard" />
      <div className="mt-10">
        <div className="mt-10 h-36 bg-white rounded-2xl grid grid-cols-4">
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
              <p className="text-[28px] font-semibold">$ 5,084.52</p>
            </div>
            <div className="absolute top-[30%] bottom-[30%] right-0 h-2/5 border-r-2 border-solid border-greyBg"></div>
          </div>
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
              <p className="text-[28px] font-semibold">$ 5,084.52</p>
            </div>
            <div className="absolute top-[30%] bottom-[30%] right-0 h-2/5 border-r-2 border-solid border-greyBg"></div>
          </div>
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
              <p className="text-[28px] font-semibold">$ 5,084.52</p>
            </div>
            <div className="absolute top-[30%] bottom-[30%] right-0 h-2/5 border-r-2 border-solid border-greyBg"></div>
          </div>
          <div className="w-full flex items-center justify-center ">
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
              <p className="text-[28px] font-semibold">$ 5,084.52</p>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-white rounded-2xl px-5">
          <div className="py-5 px-2 flex justify-between items-center border-b border-solid border-[#eeeee]">
            <p className="font-semibold text-2xl">Revenue Metric</p>
            <button className="px-5 py-2 bg-black text-white font-medium rounded-lg">
              Monthly
            </button>
          </div>
          <div className="mt-5">
            <Bar width={"100%"} data={data} options={options} height={""} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
