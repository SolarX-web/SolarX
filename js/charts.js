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
    {x: 0.04, y: 5.5},
    {x: 1, y: 5},
    {x: 1.2, y: 4.8},
    {x: 1.4, y: 4.5},
    {x: 1.5, v: 4.4},
    {x: 1.6, y: 4.35},
    {x: 1.7, y: null},
    {x: 1.8, y: 4.25},
    {x: 1.9, y: 3.9},
    {x: 1.96, y: 3.8},
    {x: 2.02, y: 3},
    {x: 2.03, y: 2.5},
    {x: 2.04, y: 2},
    {x: 2.05, y: 1.6},
];

var chartUI = new Chart("ui-diagram", {
    type: "scatter",
    data: {
        datasets: [
            {
                label: "Solarzelle 1",
                pointRadius: 4,
                showLine: true,
                pointBackgroundColor: "rgb(0,0,255)",
                borderColor: "rgb(0,0,255)",
                backgroundColor: "rgba(0,0,255,0.5)",
                data: uiValues1,
            }
        ]
    },
    options: {}
});

var upValues1 = [
    {x: 0.03, y: 0.00057},
    {x: 0.2, y: 0.0037},
    {x: 0.4, y: 0.0072},
    {x: 0.6, y: 0.0108},
    {x: 0.8, y: 0.01432},
    {x: 1., y: 0.0178},
    {x: 1.2, y: 0.021},
    {x: 1.4, y: 0.0238},
    {x: 1.6, y: 0.0264},
    {x: 1.8, y: 0.0288},
    {x: 2, y: 0.023},
    {x: 2.05, y: 0.01435},
    {x: 2.09, y: 0.005225},
]

var upChart = new Chart("up-diagram", {
    type: "scatter",
    data: {
        datasets: [
            {
                label: "Solarzelle 1",
                pointRadius: 4,
                showLine: true,
                pointBackgroundColor: "rgb(0,0,255)",
                borderColor: "rgb(0,0,255)",
                backgroundColor: "rgba(0,0,255,0.5)",
                data: upValues1,
            }
        ]
    },
    options: {}
});

var angle = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0, -10];
var voltage1 = [2.09, 2.08, 2.06, 2.05, 2.05, 1.99, 1.97, 1.90, 1.67, 1.48, 1.44];


var chartBestAngle = new Chart("angle-diagram", {
    type: "line",
    data: {
        labels: angle,
        datasets: [{
            label: "Spannung bei Lichteinfallswinkel",
            pointRadius: 4,
            pointBackgroundColor: "rgba(0,0,255,1)",
            data: voltage1
        }]
    },
    options: {}
});

