<template>
  <div class="admin-stats container py-4">
    <h1 class="mb-4 text-center fw-bold">📊 Thống kê hệ thống</h1>

    <!-- Tổng quan -->
    <section class="stats-cards mb-4">
      <div class="card p-3 shadow-sm text-center">
        <h4>📚 Tổng số sách</h4>
        <p class="fs-3 fw-bold text-primary">{{ stats.books }}</p>
      </div>

      <div class="card p-3 shadow-sm text-center">
        <h4>👤 Tổng số độc giả</h4>
        <p class="fs-3 fw-bold text-success">{{ stats.readers }}</p>
      </div>

      <div class="card p-3 shadow-sm text-center">
        <h4>📈 Tổng lượt mượn</h4>
        <p class="fs-3 fw-bold text-danger">{{ stats.borrows }}</p>
      </div>
    </section>

    <!-- Biểu đồ -->
    <section class="charts-container mb-4">
      <div class="chart-box shadow p-3 bg-white rounded">
        <h3 class="text-center mb-3">📅 Lượt mượn theo tháng</h3>
        <canvas id="chartMonth"></canvas>
      </div>
      <div class="chart-box shadow p-3 bg-white rounded">
        <h3 class="text-center mb-3">🏆 Top 5 sách mượn nhiều nhất</h3>
        <canvas id="chartTopBooks"></canvas>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  name: "AdminStats",
  data() {
    return {
      stats: {
        books: 0,
        readers: 0,
        borrows: 0,
      },
    };
  },
  mounted() {
    this.loadStats();
    this.loadCharts();
  },
  methods: {
    async loadStats() {
      try {
        const res = await axios.get("http://localhost:5000/api/thongke/tongquan");
        this.stats = res.data.data;
      } catch (err) {
        console.error(err);
      }
    },

    async loadCharts() {
      try {
        // Biểu đồ lượt mượn theo tháng
        const res1 = await axios.get("http://localhost:5000/api/thongke/muon-theo-thang");
        const labels = res1.data.data.map((m) => "Tháng " + m.month);
        const values = res1.data.data.map((m) => m.total);

        const ctxMonth = document.getElementById("chartMonth").getContext("2d");
        new Chart(ctxMonth, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Lượt mượn",
                data: values,
                backgroundColor: function(context) {
                  const gradient = ctxMonth.createLinearGradient(0, 0, 0, 300);
                  gradient.addColorStop(0, "#4e73df");
                  gradient.addColorStop(1, "#1cc88a");
                  return gradient;
                },
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
                grid: { color: "#eaeaea" },
              },
              x: { grid: { display: false } },
            },
          },
        });

        // Biểu đồ Top 5 sách
        const res2 = await axios.get("http://localhost:5000/api/thongke/top-sach");
        const labels2 = res2.data.data.map((s) => s.TenSach);
        const values2 = res2.data.data.map((s) => s.LuotMuon);

        const ctxTop = document.getElementById("chartTopBooks").getContext("2d");
        new Chart(ctxTop, {
          type: "doughnut",
          data: {
            labels: labels2,
            datasets: [
              {
                data: values2,
                backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"],
                hoverOffset: 15,
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom", labels: { boxWidth: 20, padding: 12 } },
              tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} lượt` } },
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.admin-stats {
  background: #f8f9fa;
  min-height: 100vh;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stats-cards .card {
  transition: transform 0.3s;
}
.stats-cards .card:hover {
  transform: translateY(-5px);
}

/* Biểu đồ responsive */
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.chart-box {
  width: 100%;
  max-width: 500px; /* nhỏ hơn 600px trước */
  min-height: 300px;
  position: relative;
}

.chart-box canvas {
  width: 100% !important;
  height: 300px !important;
}
</style>
