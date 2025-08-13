document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử trên trang
    const totalTimeInput = document.getElementById('total-time');
    const numTasksInput = document.getElementById('num-tasks');
    // CẬP NHẬT: Lấy các phần tử cho cả 2 thanh trượt
    const minTimeRangeInput = document.getElementById('min-time-range');
    const maxTimeRangeInput = document.getElementById('max-time-range');
    const minRangeValueDisplay = document.getElementById('min-range-value-display');
    const maxRangeValueDisplay = document.getElementById('max-range-value-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultTableBody = document.querySelector('#result-table tbody');
    const errorMessageDiv = document.getElementById('error-message');

    // CẬP NHẬT: Thêm sự kiện cho thanh trượt tối thiểu
    minTimeRangeInput.addEventListener('input', () => {
        minRangeValueDisplay.textContent = minTimeRangeInput.value;
    });
    maxTimeRangeInput.addEventListener('input', () => {
        maxRangeValueDisplay.textContent = maxTimeRangeInput.value;
    });

    calculateBtn.addEventListener('click', () => {
        resultTableBody.innerHTML = '';
        errorMessageDiv.textContent = '';

        // CẬP NHẬT: Lấy giá trị từ cả 2 thanh trượt
        const totalTime = parseInt(totalTimeInput.value);
        const numTasks = parseInt(numTasksInput.value);
        const minTimePerTask = parseInt(minTimeRangeInput.value);
        const maxTimePerTask = parseInt(maxTimeRangeInput.value);

        // --- CẬP NHẬT TOÀN BỘ LOGIC KIỂM TRA LỖI ---
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

        // --- THUẬT TOÁN PHÂN BỔ THỜI GIAN (Đã được điều chỉnh) ---
        let times = [];
        let remainingTime = totalTime;

        for (let i = 0; i < numTasks; i++) {
            const tasksLeft = numTasks - i;
            
            // Xác định khoảng thời gian ngẫu nhiên hợp lệ cho task hiện tại
            const lowerBound = Math.max(minTimePerTask, remainingTime - (tasksLeft - 1) * maxTimePerTask);
            const upperBound = Math.min(maxTimePerTask, remainingTime - (tasksLeft - 1) * minTimePerTask);
            
            let randomTime;
            if (tasksLeft === 1) {
                // Task cuối cùng sẽ nhận toàn bộ thời gian còn lại
                randomTime = remainingTime;
            } else {
                // Lấy một giá trị ngẫu nhiên trong khoảng hợp lệ
                if (lowerBound > upperBound) {
                    // Xử lý trường hợp không thể phân chia, dù hiếm khi xảy ra nếu các điều kiện trên đã pass
                    errorMessageDiv.textContent = "Không thể phân chia thời gian với các giới hạn này. Vui lòng thử lại.";
                    return;
                }
                randomTime = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
            }
            
            times.push(randomTime);
            remainingTime -= randomTime;
        }
        
        displayResults(times);
    });

    function displayResults(times) {
        // Xáo trộn mảng để kết quả hoàn toàn ngẫu nhiên
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
