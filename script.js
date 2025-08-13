document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử trên trang
    const totalTimeInput = document.getElementById('total-time');
    const numTasksInput = document.getElementById('num-tasks');
    const minTimeRangeInput = document.getElementById('min-time-range');
    const maxTimeRangeInput = document.getElementById('max-time-range');
    const minRangeValueDisplay = document.getElementById('min-range-value-display');
    const maxRangeValueDisplay = document.getElementById('max-range-value-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultTableBody = document.querySelector('#result-table tbody');
    const errorMessageDiv = document.getElementById('error-message');

    // Cập nhật giá trị hiển thị của thanh trượt
    minTimeRangeInput.addEventListener('input', () => {
        minRangeValueDisplay.textContent = minTimeRangeInput.value;
    });
    maxTimeRangeInput.addEventListener('input', () => {
        maxRangeValueDisplay.textContent = maxTimeRangeInput.value;
    });

    // Gắn sự kiện click cho nút tính toán
    calculateBtn.addEventListener('click', () => {
        resultTableBody.innerHTML = '';
        errorMessageDiv.textContent = '';

        // Lấy và chuyển đổi giá trị đầu vào
        const totalTime = parseInt(totalTimeInput.value);
        const numTasks = parseInt(numTasksInput.value);
        const minTimePerTask = parseInt(minTimeRangeInput.value);
        const maxTimePerTask = parseInt(maxTimeRangeInput.value);

        // --- KIỂM TRA TÍNH HỢP LỆ CỦA DỮ LIỆU ---
        if (!totalTime || !numTasks || totalTime <= 0 || numTasks <= 0) {
            errorMessageDiv.textContent = 'Vui lòng nhập đầy đủ và chính xác tổng thời gian và số lượng task.';
            return;
        }
        if (minTimePerTask >= maxTimePerTask) {
            errorMessageDiv.textContent = 'Thời gian tối thiểu phải nhỏ hơn thời gian tối đa.';
            return;
        }
        if (totalTime < numTasks * minTimePerTask) {
            errorMessageDiv.textContent = `Tổng thời gian quá ít. Cần ít nhất ${numTasks * minTimePerTask} phút để đảm bảo mỗi task có tối thiểu ${minTimePerTask} phút.`;
            return;
        }
        if (totalTime > numTasks * maxTimePerTask) {
            errorMessageDiv.textContent = `Tổng thời gian quá lớn. Với ${numTasks} task và giới hạn tối đa ${maxTimePerTask} phút/task, tổng thời gian không thể vượt quá ${numTasks * maxTimePerTask} phút.`;
            return;
        }

        // --- THUẬT TOÁN PHÂN BỔ THỜI GIAN ---
        let times = [];
        let remainingTime = totalTime;

        for (let i = 0; i < numTasks; i++) {
            const tasksLeft = numTasks - i;
            // Xác định khoảng thời gian ngẫu nhiên hợp lệ cho task hiện tại
            // Giới hạn dưới: phải đủ lớn để các task còn lại không vượt maxTime
            const lowerBound = Math.max(minTimePerTask, remainingTime - (tasksLeft - 1) * maxTimePerTask);
            // Giới hạn trên: phải đủ nhỏ để các task còn lại không dưới minTime
            const upperBound = Math.min(maxTimePerTask, remainingTime - (tasksLeft - 1) * minTimePerTask);
            
            // Nếu là task cuối cùng, nó nhận hết thời gian còn lại
            if (tasksLeft === 1) {
                times.push(remainingTime);
            } else {
                 // Lấy một giá trị ngẫu nhiên trong khoảng hợp lệ
                const randomTime = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
                times.push(randomTime);
                remainingTime -= randomTime;
            }
        }
        
        // Hiển thị kết quả ra bảng
        displayResults(times);
    });

    function displayResults(times) {
        // Xáo trộn mảng thời gian để kết quả không bị theo thứ tự
        times.sort(() => Math.random() - 0.5);

        times.forEach((time, index) => {
            const row = resultTableBody.insertRow();
            const taskCell = row.insertCell(0);
            const timeCell = row.insertCell(1);

            taskCell.textContent = `Task ${index + 1}`;
            timeCell.textContent = `${time} phút`;
        });
    }
});
