document.addEventListener('DOMContentLoaded', () => {
    // ---- PHẦN 1: LẤY TẤT CẢ CÁC PHẦN TỬ GIAO DIỆN ----
    const totalTimeInput = document.getElementById('total-time');
    const numTasksInput = document.getElementById('num-tasks');
    const minTimeRangeInput = document.getElementById('min-time-range');
    const maxTimeRangeInput = document.getElementById('max-time-range');
    const minRangeValueDisplay = document.getElementById('min-range-value-display');
    const maxRangeValueDisplay = document.getElementById('max-range-value-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultTableBody = document.querySelector('#result-table tbody');
    const errorMessageDiv = document.getElementById('error-message');
    const averageTimeDisplay = document.getElementById('average-time-display');
    const hoursInput = document.getElementById('hours-input');
    const minutesInput = document.getElementById('minutes-input');
    const convertBtn = document.getElementById('convert-btn');

    // ---- PHẦN 2: GẮN CÁC SỰ KIỆN CHO CÁC NÚT VÀ THANH TRƯỢT ----

    // Sự kiện cho nút "Quy đổi"
    convertBtn.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const totalMinutes = (hours * 60) + minutes;

        if (totalMinutes > 0) {
            totalTimeInput.value = totalMinutes;
            maxTimeRangeInput.max = totalMinutes;

            if (parseInt(maxTimeRangeInput.value) > totalMinutes) {
                maxTimeRangeInput.value = totalMinutes;
            }
            maxRangeValueDisplay.textContent = maxTimeRangeInput.value;
        }
    });

    // Sự kiện cho thanh trượt "Tối thiểu"
    minTimeRangeInput.addEventListener('input', () => {
        minRangeValueDisplay.textContent = minTimeRangeInput.value;
    });

    // Sự kiện cho thanh trượt "Tối đa"
    maxTimeRangeInput.addEventListener('input', () => {
        maxRangeValueDisplay.textContent = maxTimeRangeInput.value;
    });

    // Sự kiện chính cho nút "Tính Toán và Phân Bổ"
    calculateBtn.addEventListener('click', () => {
        // Xóa kết quả cũ
        resultTableBody.innerHTML = '';
        errorMessageDiv.textContent = '';
        averageTimeDisplay.textContent = '';

        // Lấy giá trị đầu vào
        const totalTime = parseInt(totalTimeInput.value);
        const numTasks = parseInt(numTasksInput.value);
        const minTimePerTask = parseInt(minTimeRangeInput.value);
        const maxTimePerTask = parseInt(maxTimeRangeInput.value);

        // --- Bắt đầu kiểm tra lỗi ---
        if (!totalTime || !numTasks || totalTime <= 0 || numTasks <= 0) {
            errorMessageDiv.textContent = 'Vui lòng quy đổi thời gian và nhập số lượng task.';
            return;
        }
        if (maxTimePerTask > totalTime) {
            errorMessageDiv.textContent = 'Giới hạn tối đa mỗi task không thể lớn hơn tổng thời gian.';
            return;
        }
        if (minTimePerTask >= maxTimePerTask) {
            errorMessageDiv.textContent = 'Thời gian tối thiểu phải nhỏ hơn thời gian tối đa.';
            return;
        }
        if (totalTime < numTasks * minTimePerTask) {
            errorMessageDiv.textContent = `Tổng thời gian quá ít. Cần ít nhất ${numTasks * minTimePerTask} phút.`;
            return;
        }
        if (totalTime > numTasks * maxTimePerTask) {
            errorMessageDiv.textContent = `Tổng thời gian quá lớn so với giới hạn. Tối đa là ${numTasks * maxTimePerTask} phút.`;
            return;
        }
        // --- Kết thúc kiểm tra lỗi ---

        // Nếu không có lỗi, bắt đầu tính toán
        const averageTime = totalTime / numTasks;
        averageTimeDisplay.textContent = `⏳ Thời gian trung bình mỗi task: ${averageTime.toFixed(1)} phút`;

        let times = [];
        let remainingTime = totalTime;

        for (let i = 0; i < numTasks; i++) {
            const tasksLeft = numTasks - i;
            const lowerBound = Math.max(minTimePerTask, remainingTime - (tasksLeft - 1) * maxTimePerTask);
            const upperBound = Math.min(maxTimePerTask, remainingTime - (tasksLeft - 1) * minTimePerTask);
            
            let randomTime;
            if (tasksLeft === 1) {
                randomTime = remainingTime;
            } else {
                if (lowerBound > upperBound) {
                    errorMessageDiv.textContent = "Không thể phân chia thời gian với các giới hạn này. Vui lòng thử lại.";
                    averageTimeDisplay.textContent = '';
                    return;
                }
                randomTime = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
            }
            
            times.push(randomTime);
            remainingTime -= randomTime;
        }
        
        // Gọi hàm để hiển thị kết quả ra bảng
        displayResults(times);
    });

    // ---- PHẦN 3: HÀM HIỂN THỊ KẾT QUẢ ----
    function displayResults(times) {
        // Xáo trộn mảng để kết quả ngẫu nhiên hơn
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
