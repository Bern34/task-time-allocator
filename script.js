document.addEventListener('DOMContentLoaded', () => {
    // --- LẤY CÁC PHẦN TỬ (Không đổi) ---
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

    // --- SỰ KIỆN QUY ĐỔI (Không đổi) ---
    convertBtn.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const totalMinutes = (hours * 60) + minutes;
        totalTimeInput.value = totalMinutes;
    });

    // --- CÁC SỰ KIỆN THANH TRƯỢT (Không đổi) ---
    minTimeRangeInput.addEventListener('input', () => { /* ... */ });
    maxTimeRangeInput.addEventListener('input', () => { /* ... */ });

    // --- SỰ KIỆN TÍNH TOÁN (Đã cập nhật logic kiểm tra) ---
    calculateBtn.addEventListener('click', () => {
        resultTableBody.innerHTML = '';
        errorMessageDiv.textContent = '';
        averageTimeDisplay.textContent = '';

        const totalTime = parseInt(totalTimeInput.value);
        const numTasks = parseInt(numTasksInput.value);
        const minTimePerTask = parseInt(minTimeRangeInput.value);
        const maxTimePerTask = parseInt(maxTimeRangeInput.value);

        // --- LOGIC KIỂM TRA LỖI ---
        if (!totalTime || !numTasks || totalTime <= 0 || numTasks <= 0) {
            errorMessageDiv.textContent = 'Vui lòng nhập đầy đủ và chính xác tổng thời gian và số lượng task.';
            return;
        }

        // ⭐ CẬP NHẬT ⭐: Thêm điều kiện kiểm tra mới tại đây
        if (maxTimePerTask > totalTime) {
            errorMessageDiv.textContent = 'Giới hạn tối đa mỗi task không thể lớn hơn tổng thời gian.';
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
        
        // --- CÁC PHẦN CÒN LẠI GIỮ NGUYÊN ---
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
        
        displayResults(times);
    });

    function displayResults(times) {
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
