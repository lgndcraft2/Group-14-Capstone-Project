const token = localStorage.getItem("accessToken");
const logoutBtn = document.getElementById("logoutBtn");

const totalDebtsOwedElem = document.getElementById("totalDebtsOwed");
const creditSalesElem = document.getElementById("creditSales");
const paymentsReceivedElem = document.getElementById("paymentsReceived");
const activeDebtorsElem = document.getElementById("activeDebtors");
const overduePaymentsElem = document.getElementById("overduePayments");

currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  window.location.href = "login.html";
});

getStats = async () => {
  try {
    const response = await fetch(
      `https://gbese-6f0j.onrender.com/api/admin/stats?start=2025-11-01&end=${formattedDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      if (data.statistics.totalDebtOwed === null) {
        totalDebtsOwedElem.textContent = '₦0.00';
      }
      if (data.statistics.creditSales === null) {
        creditSalesElem.textContent = '₦0.00';
      }
      if (data.statistics.paymentReceived === null) {
        paymentsReceivedElem.textContent = '₦0.00';
      }
      if (data.statistics.activeDebtors === null) {
        activeDebtorsElem.textContent = '₦0.00';
      }
      if (data.statistics.overduePayments === null) {
        overduePaymentsElem.textContent = '₦0.00';
      }
      totalDebtsOwedElem.textContent = `₦${data.statistics.totalDebtOwed}`;
      creditSalesElem.textContent = `₦${data.statistics.creditSales}`;
      paymentsReceivedElem.textContent = `₦${data.statistics.paymentReceived}`;
      activeDebtorsElem.textContent = data.statistics.activeDebtors;
      overduePaymentsElem.textContent = `₦${data.statistics.overduePayments}`;
    } else {
      console.error("Failed to fetch stats:", data.message);
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
  } finally {
    console.log("Fetch stats attempt finished.");
    document.querySelector(".dashboard").style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (!token) {
    window.location.href = "login.html";
    return;
  } else {
    getStats();
  }
});
