document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử trên trang
    const totalTimeInput = document.getElementById('total-time');
    const numTasksInput = document.getElementById('num-tasks');
    const timeRangeInput = document.getElementById('time-range');
    const rangeValueDisplay = document.getElementById('range-value-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultTableBody = document.querySelector('#result-table tbody');
    const errorMessageDiv = document.getElementById('error-message');

    // Cập nhật giá trị hiển thị của thanh trượt khi thay đổi
    timeRangeInput.addEventListener('input', () => {
        rangeValueDisplay.textContent = timeRangeInput.value;
    });

    // Gắn sự kiện click cho nút tính toán
    calculateBtn.addEventListener('click', () => {
        resultTableBody.innerHTML = '';
        errorMessageDiv.textContent = '';

        // Lấy và chuyển đổi giá trị đầu vào
        const totalTime = parseInt(totalTimeInput.value);
        const numTasks = parseInt(numTasksInput.value);
        const maxTimePerTask = parseInt(timeRangeInput.value);
        const minTimePerTask = 5; // Giả sử thời gian tối thiểu cho 1 task là 5 phút

        // Kiểm tra tính hợp lệ của dữ liệu
        if (!totalTime || !numTasks || totalTime <= 0 || numTasks <= 0) {
            errorMessageDiv.textContent = 'Vui lòng nhập đầy đủ và chính xác tổng thời gian và số lượng task.';
            return;
        }
        if (totalTime < numTasks * minTimePerTask) {
            errorMessageDiv.textContent = `Tổng thời gian quá ít. Cần ít nhất ${numTasks * minTimePerTask} phút cho ${numTasks} task.`;
            return;
        }
        if (totalTime > numTasks * maxTimePerTask) {
             errorMessageDiv.textContent = `Tổng thời gian quá lớn so với giới hạn. Hãy tăng giới hạn thời gian tối đa mỗi task.`;
             return;
        }

        // Bắt đầu thuật toán phân bổ thời gian
        let times = [];
        let remainingTime = totalTime;

        for (let i = 0; i < numTasks - 1; i++) {
            // Xác định khoảng thời gian ngẫu nhiên hợp lệ cho task hiện tại
            const lowerBound = Math.max(minTimePerTask, remainingTime - (numTasks - 1 - i) * maxTimePerTask);
            const upperBound = Math.min(maxTimePerTask, remainingTime - (numTasks - 1 - i) * minTimePerTask);
            
            // Lấy một giá trị ngẫu nhiên trong khoảng đó
            const randomTime = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
            
            times.push(randomTime);
            remainingTime -= randomTime;
        }

        // Task cuối cùng sẽ nhận toàn bộ thời gian còn lại
        times.push(remainingTime);
        
        // Hiển thị kết quả ra bảng
        displayResults(times);
    });

    function displayResults(times) {
        times.forEach((time, index) => {
            const row = resultTableBody.insertRow();
            const taskCell = row.insertCell(0);
            const timeCell = row.insertCell(1);

            taskCell.textContent = `Task ${index + 1}`;
            timeCell.textContent = `${time} phút`;
        });
    }
});