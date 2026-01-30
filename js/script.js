lucide.createIcons();

const ctx = document.getElementById("performanceChart").getContext("2d");

// Blue gradient
const blueGradient = ctx.createLinearGradient(0, 0, 0, 300);
blueGradient.addColorStop(0, "#2b4c7e");
blueGradient.addColorStop(1, "#0f1f3d");

const redGradient = ctx.createLinearGradient(0, 0, 0, 300);
redGradient.addColorStop(0, "#c0392b");
redGradient.addColorStop(1, "#7f1d1d");

const dataValues = [102.2, 80.3, 60, 40, 5.3, 68.2];

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["2020", "2021", "2022", "2023", "2024", "YTD 2025"],
    datasets: [
      {
        data: dataValues,
        backgroundColor: dataValues.map((v) =>
          v < 10 ? redGradient : blueGradient,
        ),
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 120,
        ticks: {
          callback: (value) => value + "%",
          font: { size: 14 },
        },
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 14 },
        },
      },
    },
  },
  plugins: [
    {
      id: "valueLabels",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets[0].data.forEach((value, index) => {
          const meta = chart.getDatasetMeta(0).data[index];
          ctx.fillStyle = value < 10 ? "#b91c1c" : "#0f172a";
          ctx.font = "bold 18px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(value + "%", meta.x, meta.y - (value < 0 ? -25 : 10));
        });
        ctx.restore();
      },
    },
  ],
});
