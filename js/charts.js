const uiValues1 = [
    {x: 0.03, y: 19},
    {x: 0.2, y: 18.5},
    {x: 0.4, y: 18},
    {x: 0.6, y: 18},
    {x: 0.8, y: 17.9},
    {x: 1., y: 17.8},
    {x: 1.2, y: 17.5},
    {x: 1.4, y: 17},
    {x: 1.6, y: 16.5},
    {x: 1.8, y: 16},
    {x: 2, y: 11.5},
    {x: 2.05, y: 7},
    {x: 2.09, y: 2.5},
];
const uiValues2 = [
    {x: 0.03, y: 12},
    {x: 0.2, y: 11.5},
    {x: 0.4, y: 11.2},
    {x: 0.6, y: 11},
    {x: 0.8, y: 10.5},
    {x: 1, y: 10.1},
    {x: 1.2, y: 9.4},
    {x: 1.4, y: 9.0},
    {x: 1.6, y: 8.5},
    {x: 1.7, y: 4.4},
    {x: 1.75, y: 1.2},
    {x: 1.76, y: 0.6},
];

const chartUI = new Chart("ui-diagram", {
    type: "scatter",
    data: {
        datasets: [
            {
                label: "SolarX Solarzelle",
                pointRadius: 5,
                pointStyle: 'rectRot',
                showLine: true,
                pointBackgroundColor: '#8DB3FA',
                borderColor: "#456BB4",
                backgroundColor: "#8DB3FA",
                data: uiValues1,
            },
            {
                label: "Konkurrenz Solarzelle",
                pointRadius: 5,
                pointStyle: 'rectRot',
                showLine: true,
                pointBackgroundColor: '#FA8D8D',
                borderColor: "#B44545",
                backgroundColor: "#FA8D8D",
                data: uiValues2,
            }
        ]
    },
    options: {}
});

const upValues1 = [
    {x: 0.03, y: 0.57},
    {x: 0.2, y: 3.7},
    {x: 0.4, y: 7.2},
    {x: 0.6, y: 10.8},
    {x: 0.8, y: 14.32},
    {x: 1., y: 17.8},
    {x: 1.2, y: 21.0},
    {x: 1.4, y: 23.8},
    {x: 1.6, y: 26.4},
    {x: 1.8, y: 28.8},
    {x: 2, y: 23.},
    {x: 2.05, y: 14.35},
    {x: 2.09, y: 5.225},
]
const upValues2 = [
    {x: 0.03, y: 0.36},
    {x: 0.2, y: 2.3},
    {x: 0.4, y: 4.48},
    {x: 0.6, y: 6.6},
    {x: 0.8, y: 8.4},
    {x: 1, y: 10.1},
    {x: 1.2, y: 11.28},
    {x: 1.4, y: 12.6},
    {x: 1.6, y: 13.6},
    {x: 1.7, y: 7.48},
    {x: 1.75, y: 2.1},
    {x: 1.76, y: 1.056},
]

var upChart = new Chart("up-diagram", {
    type: "scatter",
    data: {
        datasets: [
            {
                label: "SolarX Solarzelle",
                pointRadius: function (context) {
                    const index = context.dataIndex;
                    return index === 9 ? 6 : 5;
                },
                pointStyle: 'rectRot',
                showLine: true,
                pointBackgroundColor: function (context) {
                    const index = context.dataIndex;
                    return index === 9 ? '#F0DC3D' : '#8DB3FA';
                },
                borderColor: "#456BB4",
                backgroundColor: "#8DB3FA",
                data: upValues1,
            },
            {
                label: "Konkurrenz Solarzelle",
                pointRadius: 5,
                pointStyle: 'rectRot',
                showLine: true,
                pointBackgroundColor: '#FA8D8D',
                borderColor: "#B44545",
                backgroundColor: "#FA8D8D",
                data: upValues2,
            }
        ]
    },
    options: {}
});

const angle = [180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
const voltage1absolute = [1.48, 1.67, 1.90, 1.97, 1.99, 2.03, 2.05, 2.06, 2.08, 2.09, 2.08, 2.06, 2.05, 2.04, 2.00, 1.97, 1.90, 1.67, 1.48];
const voltage1 = [70.8, 79.9, 90.9, 94.3, 95.2, 97.1, 98.1, 98.6, 99.5, 100, 99.5, 98.6, 98.1, 97.6, 95.7, 94.3, 90.9, 79.9, 70.8]
const voltage2 = [43.2, 58.1, 65.3, 82.7, 90.0, 92.5, 94.1, 95.8, 96.9, 100, 97.1, 95.9, 94.2, 92.4, 90.2, 82, 65, 58, 43]

var chartBestAngle = new Chart("angle-diagram", {
    type: "line",
    data: {
        labels: angle,
        datasets: [
            {
                label: "SolarX Solarzelle",
                pointRadius: 5,
                pointStyle: 'rectRot',
                showLine: true,
                borderColor: "#456BB4",
                backgroundColor: "#8DB3FA",
                data: voltage1
            },
            {
                label: "Konkurrenz Solarzelle",
                pointRadius: 5,
                pointStyle: 'rectRot',
                showLine: true,
                borderColor: "#B44545",
                backgroundColor: "#FA8D8D",
                data: voltage2
            }
        ]
    },
    options: {}
});

