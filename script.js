function createRandomPromise(id) {
    return new Promise((resolve) => {
        const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ id: `Promise ${id}`, time: parseFloat(time) });
        }, time * 1000);
    });
}

function addRowToTable(data) {
    const tableBody = document.getElementById('output');
    const row = document.createElement('tr');

    const cell1 = document.createElement('td');
    cell1.textContent = data.id;

    const cell2 = document.createElement('td');
    cell2.textContent = data.time;

    row.appendChild(cell1);
    row.appendChild(cell2);

    tableBody.appendChild(row);
}

// Create an array of promises
const promises = [
    createRandomPromise(1),
    createRandomPromise(2),
    createRandomPromise(3)
];

const startTime = Date.now();

// Display a loading row initially
addRowToTable({ id: 'Loading...', time: '' });

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
    const totalTime = (Date.now() - startTime) / 1000;

    // Clear the loading row
    const tableBody = document.getElementById('output');
    tableBody.innerHTML = '';

    // Add rows for each resolved promise
    results.forEach(result => {
        addRowToTable(result);
    });

    // Add the total time row
    addRowToTable({ id: 'Total', time: totalTime.toFixed(3) });
});
